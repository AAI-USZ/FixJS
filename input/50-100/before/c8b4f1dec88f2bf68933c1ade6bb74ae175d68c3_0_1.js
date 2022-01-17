function choose(imgsrc) {
  var id = imgsrc.match("/([^\./]+)\.png")[1]
  addToHistory(id)
  justShow(id)
}