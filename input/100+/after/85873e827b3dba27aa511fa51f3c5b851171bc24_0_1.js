function onContentLoad(){
  $('.flash.error').hide().each(function(index, item) {
     if ($('.alert-message.alert-error.base').length == 0) {
       if ($('#host-conflicts-modal').length == 0) {
         $.jnotify($(item).text(), { type: "error", sticky: true });
       }
     }
   });

   $('.flash.warning').hide().each(function(index, item) {
     $.jnotify($(item).text(), { type: "warning", sticky: true });
   });

   $('.flash.notice').hide().each(function(index, item) {
     $.jnotify($(item).text(), { type: "success", sticky: false });
   });

  // adds buttons classes to all links
  $("#title_action a").addClass("btn");
  $("#title_action li a").removeClass("btn").addClass("la");
  $("#title_action span").removeClass("btn").addClass("btn-group");
  $("#title_action a[href*='new']").addClass("btn-success");

  // highlight tabs with errors
  $(".tab-content").find(".control-group.error").each(function() {
    var id = $(this).parentsUntil(".tab-content").last().attr("id");
    $("a[href=#"+id+"]").addClass("tab-error");
  })

  //set the tooltips
  $('a[rel="popover"]').popover();
  $('[rel="twipsy"]').tooltip();

  $('[data-onready!=""]').each(function(){
    eval($(this).attr('data-onready'));
  });
}