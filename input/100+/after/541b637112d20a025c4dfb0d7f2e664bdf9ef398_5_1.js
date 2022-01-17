function getInnerText(element) {
  // jQuery.text() returns content of <script> tags, we need to ignore those
  var list = [];
  element.find("*").andSelf().contents()
    .filter(function () {
      return this.nodeType == 3 && this.parentNode.tagName != "SCRIPT";
    })
    .each(function () {
      list.push(this.nodeValue);
    });
  return list.join("");
}