const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get video info
app.get('/api/info', async (req, res) => {
  try {
    const videoURL = req.query.url;
    
    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    const info = await ytdl.getInfo(videoURL);
    
    // Extract basic info and available formats
    const videoDetails = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      duration: info.videoDetails.lengthSeconds,
      videoFormats: info.formats
        .filter(format => format.hasVideo && format.hasAudio)
        .map(format => ({
          itag: format.itag,
          quality: format.qualityLabel,
          container: format.container
        })),
      audioFormats: info.formats
        .filter(format => !format.hasVideo && format.hasAudio)
        .map(format => ({
          itag: format.itag,
          quality: format.audioBitrate + 'kbps',
          container: format.container
        }))
    };
    
    res.json(videoDetails);
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
});

// Download video
app.get('/api/download', async (req, res) => {
  try {
    const { url, itag, format, title } = req.query;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    // Set appropriate headers for download
    const cleanTitle = title.replace(/[^\w\s]/gi, '') || 'youtube-video';
    const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
    const contentType = format === 'mp3' ? 'audio/mp3' : 'video/mp4';
    
    res.setHeader('Content-Disposition', `attachment; filename="${cleanTitle}.${fileExtension}"`);
    res.setHeader('Content-Type', contentType);
    
    const options = {
      quality: itag || (format === 'mp3' ? 'highestaudio' : 'highest')
    };
    
    // If mp3 format requested, use audioonly filter
    if (format === 'mp3') {
      options.filter = 'audioonly';
    }
    
    // Stream the video/audio data
    ytdl(url, options).pipe(res);
    
  } catch (error) {
    console.error('Error downloading:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
