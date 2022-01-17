function(repository) {
    $('.summary', this.element).replaceWith($(this.build_template(this.repository.attributes.last_build)));
  }