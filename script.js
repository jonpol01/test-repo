const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const waifuImage = document.getElementById('waifu-image');
const newImageBtn = document.getElementById('new-image-btn');

function setClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegrees = ((seconds / 60) * 360) - 90;
  const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) - 90;
  const hoursDegrees = (((hours % 12) / 12) * 360) + ((minutes / 60) * 30) - 90;

  if (secondHand) secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  if (hourHand) hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

async function fetchWaifuImage() {
  try {
    const response = await fetch('https://api.waifu.pics/sfw/waifu', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.url && waifuImage) {
      waifuImage.src = data.url;
      waifuImage.alt = 'Random Anime Girl';
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching waifu image:', error);
    if (waifuImage) {
      waifuImage.src = 'https://picsum.photos/400/600?random=1';
      waifuImage.alt = 'Fallback image';
    }
  }
}

function init() {
  setClock();
  fetchWaifuImage();

  setInterval(setClock, 1000);

  if (newImageBtn) {
    newImageBtn.addEventListener('click', fetchWaifuImage);
  }

  // Handle image load errors
  if (waifuImage) {
    waifuImage.addEventListener('error', () => {
      console.error('Failed to load image');
      waifuImage.src = 'https://picsum.photos/400/600?random=1';
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}