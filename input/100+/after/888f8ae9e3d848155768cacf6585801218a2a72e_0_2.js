function setStyleSheet(match){
    if(match == "core"){
      deleteCookie("govuk-accessibility");
      $(".wordsdifficult").attr("rel", "alternate stylesheet");
      $(".wordsdifficult").attr('disabled', 'disabled');
      $('input[name=acc-options]:eq(0)').attr('checked', 'checked');
    } else if(match == "wordsdifficult"){
      $(".wordsdifficult").attr("rel", "stylesheet");
      $(".wordsdifficult").removeAttr('disabled');
      $('input[name=acc-options]:eq(1)').attr('checked', 'checked');
    }

    $cust.find('.close').click();
  }