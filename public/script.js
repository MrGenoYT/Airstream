document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const videoUrlInput = document.getElementById('videoUrl');
  const fetchBtn = document.getElementById('fetchBtn');
  const videoInfoSection = document.getElementById('videoInfo');
  const thumbnail = document.getElementById('thumbnail');
  const videoTitle = document.getElementById('videoTitle');
  const videoDuration = document.getElementById('videoDuration');
  const formatBtns = document.querySelectorAll('.format-btn');
  const mp4Options = document.getElementById('mp4Options');
  const mp3Options = document.getElementById('mp3Options');
  const downloadBtn = document.getElementById('downloadBtn');
  const loader = document.getElementById('loader');
  const error = document.getElementById('error');
  const errorMessage = document.getElementById('errorMessage');

  // Variables to store video data
  let currentVideo = {
    url: '',
    title: '',
    selectedFormat: 'mp4',
    selectedItag: null
  };

  // Event listeners
  videoUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      fetchVideoInfo();
    }
  });

  fetchBtn.addEventListener('click', fetchVideoInfo);
  downloadBtn.addEventListener('click', downloadVideo);

  formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update UI
      formatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update selected format
      const format = btn.getAttribute('data-format');
      currentVideo.selectedFormat = format;
      currentVideo.selectedItag = null; // Reset selected quality

      // Show relevant quality options
      if (format === 'mp4') {
        mp4Options.classList.remove('hidden');
        mp3Options.classList.add('hidden');
      } else {
        mp4Options.classList.add('hidden');
        mp3Options.classList.remove('hidden');
      }

      // Remove all selected classes from quality options
      document.querySelectorAll('.quality-option').forEach(option => {
        option.classList.remove('selected');
      });
    });
  });

  // Functions
  async function fetchVideoInfo() {
    const url = videoUrlInput.value.trim();
    
    if (!url) {
      showError('Please enter a valid YouTube URL');
      return;
    }

    // Show loader
    showLoader();
    hideError();
    hideVideoInfo();

    try {
      const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video information');
      }

      // Store video data
      currentVideo.url = url;
      currentVideo.title = data.title;

      // Update UI with video details
      thumbnail.src = data.thumbnail;
      videoTitle.textContent = data.title;
      videoDuration.textContent = formatDuration(data.duration);

      // Clear previous options
      mp4Options.innerHTML = '';
      mp3Options.innerHTML = '';

      // Add MP4 quality options
      data.videoFormats.forEach(format => {
        const option = createQualityOption(format.quality, format.itag);
        mp4Options.appendChild(option);
      });

      // Add MP3 quality options
      data.audioFormats.forEach(format => {
        const option = createQualityOption(format.quality, format.itag);
        mp3Options.appendChild(option);
      });

      // Show video info section
      showVideoInfo();
    } catch (error) {
      showError(error.message || 'Error fetching video information');
    } finally {
      hideLoader();
    }
  }

  function createQualityOption(label, itag) {
    const option = document.createElement('div');
    option.className = 'quality-option';
    option.textContent = label;
    option.setAttribute('data-itag', itag);

    option.addEventListener('click', () => {
      // Update selected quality
      document.querySelectorAll('.quality-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
      currentVideo.selectedItag = itag;
    });

    return option;
  }

  function downloadVideo() {
    if (!currentVideo.url || !currentVideo.selectedItag) {
      showError('Please select a video quality to download');
      return;
    }

    const params = new URLSearchParams({
      url: currentVideo.url,
      itag: currentVideo.selectedItag,
      format: currentVideo.selectedFormat,
      title: currentVideo.title
    });

    // Create and click a hidden link to start download
    const downloadLink = document.createElement('a');
    downloadLink.href = `/api/download?${params.toString()}`;
    downloadLink.download = '';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    let result = '';
    if (hours > 0) {
      result += `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      result += `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    
    return result;
  }

  // UI Helper functions
  function showLoader() {
    loader.classList.remove('hidden');
  }

  function hideLoader() {
    loader.classList.add('hidden');
  }

  function showError(message) {
    error.classList.remove('hidden');
    errorMessage.textContent = message;
  }

  function hideError() {
    error.classList.add('hidden');
  }

  function showVideoInfo() {
    videoInfoSection.classList.remove('hidden');
  }

  function hideVideoInfo() {
    videoInfoSection.classList.add('hidden');
  }
});
