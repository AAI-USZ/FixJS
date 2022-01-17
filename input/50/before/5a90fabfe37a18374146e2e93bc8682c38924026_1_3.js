function(jqXHR) {
      this.trigger('fail', JSON.parse(jqXHR.responseText), jqXHR);
    }