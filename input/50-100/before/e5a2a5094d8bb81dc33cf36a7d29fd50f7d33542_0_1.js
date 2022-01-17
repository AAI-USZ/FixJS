function(html, click) {
      var row = $('<li>' + html + '</li>');
      this.element.append(row); 
      if (click)
        row.find('a').click(click);
    }