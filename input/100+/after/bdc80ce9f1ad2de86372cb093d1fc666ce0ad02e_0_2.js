function(image, size) {
    var canvas1, canvas2;
    canvas1 = stamp(image, size, 0, 0);
    image.parentNode.appendChild(canvas1);
    canvas2 = stamp(image, size, 0, -size);
    canvas2.className = 'active';
    image.parentNode.appendChild(canvas2);
    image.parentNode.removeChild(image);
    localStorage[hashcode + image.src] = canvas1.toDataURL();
    localStorage[hashcode + image.src + ':hover'] = canvas2.toDataURL();
    return console.log(localStorage[hashcode + image.src + ':hover'] != null);
  }