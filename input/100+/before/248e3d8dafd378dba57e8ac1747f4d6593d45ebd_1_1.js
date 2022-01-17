function destroyUI() {
  images = [];

  var items = thumbnails.querySelectorAll('li');
  for (var i = 0; i < items.length; i++) {
    var thumbnail = items[i];
    var url = thumbnail.style.backgroundImage.splice(5, -2);
    URL.revokeObjectURL(url);
    thumbnails.removeChild(thumbnail);
  }

  document.getElementById('nophotos').classList.remove('hidden');
}