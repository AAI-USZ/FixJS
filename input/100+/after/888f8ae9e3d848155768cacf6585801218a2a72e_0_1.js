function(data){
      var html = $(data);
      html.eq(0).prepend("<p class='close'><a href='#' title='Click or press escape to close the settings panel'>Close</a></p>");
      BetaPopup.popup(html, "customisation-tools");

      if(getCookie("govuk-accessibility") == "wordsdifficult"){
        $('input[name=acc-options]:eq(1)').attr('checked', 'checked');
      } else{
        $('input[name=acc-options]:eq(0)').attr('checked', 'checked');
      }
    }