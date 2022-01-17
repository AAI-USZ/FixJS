function destroyUI() {
  images = [];
  try {
    var items = thumbnails.querySelectorAll('li');
    for (var i = 0; i < items.length; i++) {
      var thumbnail = items[i];
      var backgroundImage = thumbnail.style.backgroundImage;
      if (backgroundImage)
        URL.revokeObjectURL(backgroundImage.slice(5, -2));
      thumbnails.removeChild(thumbnail);
    }
    
    document.getElementById('nophotos').classList.remove('hidden');
  }
  catch(e) {
    console.error("destroyUI", e);
  }
}