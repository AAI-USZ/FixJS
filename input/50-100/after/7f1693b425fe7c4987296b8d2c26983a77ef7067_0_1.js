function(e, el) {
    var hideId, toggleId;
    hideId = $(el).attr('data-hide-id');
    toggleId = $(el).attr('data-toggle-id');
    $(document.getElementById(hideId)).hide();
    return $(document.getElementById(toggleId)).toggle();
  }