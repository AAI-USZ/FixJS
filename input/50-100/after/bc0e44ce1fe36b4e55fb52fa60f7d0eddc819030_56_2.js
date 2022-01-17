function buildKey(label, className, width, dataset) {
    var content = '<button class="keyboard-key ' + className + '"';
    dataset.forEach(function(data) {
      content += ' data-' + data.key + '="' + data.value + '" ';
    });
    content += ' style="width: ' + width + '"';
    content += '><span class="visual-wrapper"><span>' +
               label + '</span></span></button>';
    return content;
  }