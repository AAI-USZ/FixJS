function(event) {
    event.preventDefault();
    $(this).closest(".alert-box").fadeOut(function(event){
      $(this).remove();
    });
  }