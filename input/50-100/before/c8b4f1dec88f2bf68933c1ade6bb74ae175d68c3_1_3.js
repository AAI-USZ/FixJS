function() {
  fillIn()
  var historyHtml = ""
  for (var i = 0; i < MAX_HISTORY_LENGTH; i++) {
    historyHtml += "<div class=diagramEntry>"
                 + "<img id=\"h." + i + "\" width=100 style='visibility:hidden' "
                 + "onclick='choose(this.src)'/>" + "</div>"
  }
  $("history").innerHTML = historyHtml
  showHistory()
}