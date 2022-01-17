function(){
      var id = $('input[name=acc-options]:checked').attr("id");
      _gaq.push(['_trackEvent', 'Citizen-Accessibility', id]);
      if(getCookie("govuk-accessibility")){
        deleteCookie("govuk-accessibility");
      }
      setCookie("govuk-accessibility", id, 4 * 30);
      setStyleSheet(id);
      return false;
    }