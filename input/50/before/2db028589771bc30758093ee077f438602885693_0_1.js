function onKeypress(event) {
    if (event.which === 13) {
      // IE8 does not trigger the submit event when hitting enter. Submit the
      // form if the key press was an enter and prevent the default action so
      // the form is not submitted twice.
      event.preventDefault();
      this.submit();
    }
   }