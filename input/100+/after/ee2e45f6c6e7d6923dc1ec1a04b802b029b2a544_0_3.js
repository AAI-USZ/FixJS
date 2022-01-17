function attachItemSelectActions(item) {
      $(item).find('a[rel="gallery"]').unbind('click')
      $(item).find('a[rel="gallery"]').click(function(e) { e.preventDefault(); });
      $(item).find('a[rel="gallery"]').removeAttr('rel')
      $(item).find(".icon-top-right").show();
      $(item).hover(function(e) {$(this).addClass('red');}, function(e) {$(this).removeClass('red');});
      $(item).click(function(e) {
        var cd = $(this).find("input[name='share[]']");
        cd.prop('checked', !cd.is(':checked'))
        $(this).find('.checkbox-img').attr("src", cd.is(':checked') ? '/img/checked.png' : '/img/unchecked.png');
        if (cd.is(':checked')) {
          enableSelectActions();
        } else {
          if (!haveSelectedItems()) {
            disableSelectActions();
          }
        }
      });
    }