function justShow(id) {
  $("d_png").src  = imgRef(id)
  $("d_pdf").href = pdfRef(id)
  getSrc(id)
  $("d_results").style.display="block"
}