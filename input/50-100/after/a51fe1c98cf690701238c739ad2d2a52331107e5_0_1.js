function() {
      var rel;
      rel = $(this).attr('rel');
      $("#subscribe_email").attr('data-slug', rel);
      $("#subscribe_form").attr('action', "/subscribe/" + rel);
      $("#subscribe").modal('show');
      return false;
    }