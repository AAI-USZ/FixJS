function(e) {
    var $a = $(this);
    var $notif = $a.closest("div.notification");
    var follow = !$a.hasClass("close");
    $.ajax($notif.find("a.close").attr("href"), {
      type: "delete",
      success: function() {
        if (follow) location.href = $a.attr("href");
      }
    });
    $notif.remove();
    return false;
  }