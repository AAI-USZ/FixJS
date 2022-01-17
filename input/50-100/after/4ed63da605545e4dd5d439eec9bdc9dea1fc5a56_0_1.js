function() {
    _.bindAll(this,"_check");

    // Get label text
    var text = this.$input.attr("data-label");

    // If this field doesn't have data-label, that means it 
    // doesn't need a placeholder :)
    if (!text) {
      return false;
    }

    // Create the placeholder label
    this.$label = $("<label>").text(text);

    // Prepend label
    this.$input.before(this.$label);

    return this;
  }