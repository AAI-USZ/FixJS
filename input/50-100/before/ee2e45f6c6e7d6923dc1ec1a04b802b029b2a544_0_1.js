function clearSelectMode() {
      $(".icon-top-right").hide();
      $(".item").unbind('hover');
      $('.item').unbind('click');
      $('.item').removeClass('red');
      resetItemCheckboxes();
      attachItemActions();
      enableGalleryClick();
      disableSelectNav();
    }