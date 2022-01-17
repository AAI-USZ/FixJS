function fillSamples(sources) {
  var loadedImages = []
  for (i = 0; i < sources.length; i++) {
    var id = sources[i].id
    $("samples" + i % 2).innerHTML += "<div class='diagramEntry' id='s.i." + id + "'/>"
    loadedImages[i] = image(id)
    loadedImages[i].id = "i." + id
    loadedImages[i].alt = sources[i].source
    setListeners(loadedImages[i], id)
  }
}