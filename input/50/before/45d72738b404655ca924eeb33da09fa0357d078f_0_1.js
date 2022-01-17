function() {
    $.post(this.action, $(this).serialize(), null, "script");
    return false;
  }