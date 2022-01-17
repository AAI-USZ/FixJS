function(html, parse) {
      if (parse) {
        html = this.parent.parse(html);
      }
      
      try {
        this.element.innerHTML = html;
      }
      catch (e) {
        this.element.innerText = html;
      }
    }