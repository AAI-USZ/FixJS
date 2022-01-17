function (evt) {
      var $sourceGroup = $('#id_source_group'),
          $cidrContainer = $('#id_cidr').closest(".control-group");
      if($sourceGroup.val() === "") {
        $cidrContainer.removeClass("hide");
      } else {
        $cidrContainer.addClass("hide");
      }
    }