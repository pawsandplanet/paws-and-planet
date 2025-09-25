//qr overlay
function openQROverlay() {
    const overlay = document.getElementById('qrOverlay');
    overlay.style.display = 'flex';
    overlay.classList.add('show');
  }

  function closeQROverlay() {
    const overlay = document.getElementById('qrOverlay');
    overlay.style.display = 'none';
    overlay.classList.remove('show');
  }

    