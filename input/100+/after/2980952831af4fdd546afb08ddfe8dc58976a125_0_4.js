function comment_expand (param) {
  var msgid  = $(param).parent().attr("comment-id");
  var level  = parseInt($(param).parent().attr("level"));
  var msgdiv = $(param).parent().parent();
  $.post("", {
    act : "comment-expand",
    id  : msgid
  }, function(data) {
    // alert("TODO: Rebuild comments: " + data);
    if (data != null) {
      for (var i = 0; i < data.length; i++) {
        var newmsg = $("#msg").clone();
        $(newmsg).attr("id", "msg" + data[i]["id"]);
        $(newmsg).find(".comment-msg").html(data[i]["id"] + " : " + data[i]["msg"]);

        actdiv = $(newmsg).find("div[comment-id]");
        actdiv.attr("comment-id", data[i]["id"]);
        actdiv.attr("level",      data[i]["level"] + level);

        $(newmsg).css("margin-left", (level + data[i]["level"]) * 10);
        // $(newmsg).find(".comment-expand").css("visibility", "hidden");
        $(newmsg).find(".comment-del").click(function(){
          comment_del(this);
        });
        $(newmsg).find(".comment-reply").click(function(){
          comment_reply(this);
        });
        $(newmsg).insertAfter(msgdiv).slideDown();
      }
    }
    // $(param).css("visibility", "hidden");
  }, "json");
}