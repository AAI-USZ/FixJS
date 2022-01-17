function(feature, $ul) {
      var $deleteButton, $liVetting, classification, comment, featureData,
        _this = this;
      featureData = feature.data;
      classification = featureData['classification'];
      comment = featureData['comment'];
      $deleteButton = $('<button class="ui-state-default ui-corner-all delete_polygon"' + 'title="modify areas"><span class="ui-icon ui-icon-trash">' + '</span></button>');
      $deleteButton.click(function(e) {
        alert("You clicked the button...");
        return null;
      });
      $liVetting = $('<li class="ui-state-default vetting_listing"><span class="classification">' + classification + '</span><span class="comment">' + comment + '</span>' + '</li>');
      $liVetting.prepend($deleteButton);
      $liVetting.data('feature', feature);
      $liVetting.hover(function() {
        var thisFeature;
        thisFeature = $(this).data('feature');
        Edgar.vetting.myHabitatClassifications.selectControl.select(thisFeature);
        return $(this).addClass("ui-state-hover");
      }, function() {
        Edgar.vetting.myHabitatClassifications.selectControl.unselectAll();
        return $(this).removeClass("ui-state-hover");
      });
      return $ul.append($liVetting);
    }