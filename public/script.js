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
  const progressBar = document.getElementById('progressBar');
  const loaderText = document.getElementById('loaderText');
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

    // Show loader with animated progress
    showLoader();
    hideError();
    hideVideoInfo();
    
    // Simulate progress (since we don't have real-time progress from the API)
    simulateProgress();

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

      // Select first option by default for better UX
      const firstVideoOption = mp4Options.querySelector('.quality-option');
      const firstAudioOption = mp3Options.querySelector('.quality-option');
      
      if (firstVideoOption) {
        firstVideoOption.classList.add('selected');
        currentVideo.selectedItag = firstVideoOption.getAttribute('data-itag');
      }
      
      if (firstAudioOption) {
        firstAudioOption.classList.add('selected');
      }

      // Show video info section with a slight delay for smooth transition
      setTimeout(() => {
        showVideoInfo();
        hideLoader();
      }, 500);
      
    } catch (error) {
      hideLoader();
      showError(error.message || 'Error fetching video information');
    }
  }

  function createQualityOption(label, itag) {
    const option = document.createElement('div');
    option.className = 'quality-option';
    option.textContent = label;
    option.setAttribute('data-itag', itag);

    option.addEventListener('click', () => {
      // Update selected quality
      const parent = option.parentElement;
      parent.querySelectorAll('.quality-option').forEach(opt => {
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

    // Show loader with download message
    showLoader('Preparing Download...');
    simulateDownloadProgress();

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
    
    // Small delay to allow progress animation
    setTimeout(() => {
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Hide loader after a short delay
      setTimeout(() => {
        hideLoader();
        showSuccessMessage('Download started successfully!');
      }, 1000);
    }, 1500);
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

  function simulateProgress() {
    // Reset progress bar
    progressBar.style.width = '0%';
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress > 90) {
        clearInterval(interval);
      }
      progressBar.style.width = `${progress}%`;
    }, 100);
  }

  function simulateDownloadProgress() {
    // Reset progress bar
    progressBar.style.width = '0%';
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress > 100) {
        clearInterval(interval);
        loaderText.textContent = 'Download Ready!';
        return;
      }
      progressBar.style.width = `${progress}%`;
      
      if (progress > 50 && progress < 80) {
        loaderText.textContent = 'Converting...';
      } else if (progress >= 80) {
        loaderText.textContent = 'Finalizing...';
      }
    }, 200);
  }

  // UI Helper functions
  function showLoader(message = 'Processing...') {
    loader.classList.remove('hidden');
    loaderText.textContent = message;
  }

  function hideLoader() {
    loader.classList.add('hidden');
  }

  function showError(message) {
    error.classList.remove('hidden');
    errorMessage.textContent = message;
    
    // Automatically hide error after 5 seconds
    setTimeout(() => {
      error.classList.add('hidden');
    }, 5000);
  }

  function hideError() {
    error.classList.add('hidden');
  }

  function showVideoInfo() {
    videoInfoSection.classList.remove('hidden');
    
    // Add entrance animation
    videoInfoSection.style.opacity = '0';
    videoInfoSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      videoInfoSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      videoInfoSection.style.opacity = '1';
      videoInfoSection.style.transform = 'translateY(0)';
    }, 10);
  }

  function hideVideoInfo() {
    videoInfoSection.classList.add('hidden');
    videoInfoSection.style.transition = '';
    videoInfoSection.style.opacity = '';
    videoInfoSection.style.transform = '';
  }

  function showSuccessMessage(message) {
    // Create success message if it doesn't exist
    let successEl = document.querySelector('.success-message');
    
    if (!successEl) {
      successEl = document.createElement('div');
      successEl.className = 'success-message';
      
      const icon = document.createElement('i');
      icon.className = 'fas fa-check-circle';
      
      const text = document.createElement('p');
      
      successEl.appendChild(icon);
      successEl.appendChild(text);
      
      // Insert after video info
      videoInfoSection.parentNode.insertBefore(successEl, videoInfoSection.nextSibling);
    }
    
    successEl.querySelector('p').textContent = message;
    
    // Automatically hide success message after 5 seconds
    setTimeout(() => {
      successEl.remove();
    }, 5000);
  }

  // Check system preference for dark/light mode
  function checkSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Initialize system theme check
  checkSystemTheme();
  
  // Listen for changes in system theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkSystemTheme);
});
