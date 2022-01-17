function(a, start, level, middle, end){
      var id = middle.replace(/<[^>]*>/g,'').toLowerCase().replace(/[^a-zA-Z0-9\_\.]/g,'-');
      headings.push({ id: id, text: middle.replace(/<[^>]*>/g,''), level: level });
      return '\n<div class="pilwrap" id="' + id + '">\n  '+
                start +
                '\n    <a href="#' + id + '" class="pilcrow">&#182;</a>\n    ' +
                middle + '\n  ' +
                end +
              '\n</div>\n';
    }