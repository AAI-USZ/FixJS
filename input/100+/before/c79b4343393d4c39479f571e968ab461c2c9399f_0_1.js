function () {

  var Gallery = window.Gallery
    , options =
      { selector: '.gallery'
      , interval: 2000
      , transitionTime: 300
      }
    , images = []

  function pad(num) {
    return num < 10 ? '0' + num : num
  }

  var i = 1
  while (i <= 10) {
    images.push({
        full: './images/' + pad(i) + '.jpg'
      , thumb: './images/' + pad(i) + '-thumb.jpg'
      , caption: 'This is image number ' + i
      , credit: 'Flickr User'
    })
    i++
  }

  var gallery = new Gallery(options)
    .images(images)
    .play()

}