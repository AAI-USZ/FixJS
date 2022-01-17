function() {
    // Delegate this handler to form, so it only should be init once
    $("form").live("change", "#id_source_group", function(evt) {
      var $sourceGroup = $(this).find('#id_source_group');
      var $cidrContainer = $(this).find('#id_cidr').parent().parent();
      if($sourceGroup.val() === "") {
        $cidrContainer.removeClass("hide");
      } else {
        $cidrContainer.addClass("hide");
      }
    });
  }