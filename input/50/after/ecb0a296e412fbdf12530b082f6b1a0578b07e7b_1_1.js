function() {
      return this.getTextContent() == this.textarea.element.getAttribute("placeholder") && this.placeholderSet;
    }