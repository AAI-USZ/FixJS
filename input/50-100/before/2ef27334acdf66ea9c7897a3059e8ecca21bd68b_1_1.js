function addThumbnail(imagenum) {
  var li = document.createElement('li');
  li.dataset.index = imagenum;
  li.classList.add('thumbnail');
  thumbnails.appendChild(li);

  var imagedata = images[imagenum];
  // XXX When is it save to revoke this url?
  // Can't do it on load as I would with an <img>
  // Currently doing it in destroyUI()
  var url = URL.createObjectURL(imagedata.metadata.thumbnail);
  li.style.backgroundImage = 'url("' + url + '")';
}