function(image) {
    var canvas1, canvas2;
    canvas1 = stamp(image, 0, 0);
    image.parentNode.appendChild(canvas1);
    canvas2 = stamp(image, 0, -image.width);
    canvas2.className = 'active';
    image.parentNode.appendChild(canvas2);
    image.parentNode.removeChild(image);
    localStorage[hashcode + image.src] = canvas1.toDataURL();
    localStorage[hashcode + image.src + ':hover'] = canvas2.toDataURL();
    return console.log(localStorage[hashcode + image.src + ':hover'] != null);
  }