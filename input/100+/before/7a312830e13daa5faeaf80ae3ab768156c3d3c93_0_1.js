function() {
  fr.set_button($(this));
  var btn = $(this);
  $.ajax({
    type: "GET",
    cache: false,
    url: searchNewAdministratorsEndpoint,
    success: function(res) {
      var target = $("#manage-role-members");
      target.html(res);
      applyBehaviourTo(target);
      target.fadeIn();
      
      fr.reset_button(btn);
      btn.hide();     
    },
    error: function (xhr, ajaxOptions, thrownError) {
      fr.reset_button(btn);
      fr.popuperror();
    }
  });
  
}