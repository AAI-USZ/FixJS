function(index) {
    var tableStart = '<table><tbody><tr><td class="gutter">',
        lineNumbers = '<pre class="line-numbers">',
        tableMiddle = '</pre></td><td class="code">',
        tableEnd = '</td></tr></tbody></table>',
        count = $('.line', this).length;
    for (var i=1;i<=count; i++) {
      lineNumbers += '<span class="line-number">'+i+'</span>\n';
    }
    var table = tableStart + lineNumbers + tableMiddle + '<pre>'+$('pre', this).html()+'</pre>' + tableEnd;
    $(this).html(table);
  }