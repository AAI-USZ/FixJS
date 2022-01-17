function(image) {
        this.element.show();
        jQuery('.activeImage', this.element).attr('src', image.url);
        if (image.label) {
          jQuery('input', this.element).val(image.label);
          return jQuery('.metadata', this.element).show();
        }
      }