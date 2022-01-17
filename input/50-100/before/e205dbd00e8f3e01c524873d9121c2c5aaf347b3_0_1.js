function(html, parse) {
      if (parse) {
        html = this.parent.parse(html);
      }
      this.element.innerHTML = html;
    }