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

// Get video info with enhanced metadata
app.get('/api/info', async (req, res) => {
  try {
    const videoURL = req.query.url;
    
    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    const info = await ytdl.getInfo(videoURL);
    
    // Choose high quality thumbnail
    const thumbnails = info.videoDetails.thumbnails;
    const bestThumbnail = thumbnails[thumbnails.length - 1].url;
    
    // Extract and sort formats for better quality selection
    const formats = info.formats;
    
    // Extract video formats with both audio and video
    const videoFormats = formats
      .filter(format => format.hasVideo && format.hasAudio)
      .map(format => ({
        itag: format.itag,
        quality: format.qualityLabel,
        container: format.container,
        fps: format.fps,
        size: format.contentLength ? formatSize(format.contentLength) : 'Unknown'
      }))
      .sort((a, b) => {
        // Sort by resolution (height) in descending order
        const resA = parseInt(a.quality.match(/\d+/)[0]);
        const resB = parseInt(b.quality.match(/\d+/)[0]);
        return resB - resA;
      });
    
    // Extract audio formats
    const audioFormats = formats
      .filter(format => !format.hasVideo && format.hasAudio)
      .map(format => ({
        itag: format.itag,
        quality: format.audioBitrate + 'kbps',
        container: format.container,
        size: format.contentLength ? formatSize(format.contentLength) : 'Unknown'
      }))
      .sort((a, b) => {
        // Sort by bitrate in descending order
        const bitrateA = parseInt(a.quality.match(/\d+/)[0]);
        const bitrateB = parseInt(b.quality.match(/\d+/)[0]);
        return bitrateB - bitrateA;
      });
    
    // Enhanced video details
    const videoDetails = {
      title: info.videoDetails.title,
      thumbnail: bestThumbnail,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      videoFormats,
      audioFormats
    };
    
    res.json(videoDetails);
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
});

// Download video with enhanced error handling
app.get('/api/download', async (req, res) => {
  try {
    const { url, itag, format, title } = req.query;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    // Set appropriate headers for download
    const cleanTitle = title.replace(/[^\w\s]/gi, '') || 'airstream-download';
    const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
    const contentType = format === 'mp3' ? 'audio/mp3' : 'video/mp4';
    
    res.setHeader('Content-Disposition', `attachment; filename="${cleanTitle}.${fileExtension}"`);
    res.setHeader('Content-Type', contentType);
    
    // Setup options for ytdl
    const options = {
      quality: itag || (format === 'mp3' ? 'highestaudio' : 'highest')
    };
    
    // If mp3 format requested, use audioonly filter
    if (format === 'mp3') {
      options.filter = 'audioonly';
    }
    
    // Stream the video/audio data with error handling
    const videoStream = ytdl(url, options);
    
    // Handle potential errors during streaming
    videoStream.on('error', (err) => {
      console.error('Error during download:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error during download process' });
      }
    });
    
    videoStream.pipe(res);
    
  } catch (error) {
    console.error('Error downloading:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Helper function to format file size
function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

// Start the server
app.listen(port, () => {
  console.log(`Airstream server running at http://localhost:${port}`);
});
