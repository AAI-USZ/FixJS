function(data) {
    // alert("***TODO***: Rebuild comments");
    $('.editor').hide();

    var newmsg = $("#msg").clone();
    $(newmsg).attr("id", "msg" + data["id"]);
    $(newmsg).find(".comment-msg").html(data["id"] + " : " + data["msg"]);

    actdiv = $(newmsg).find("div[comment-id]");
    actdiv.attr("comment-id", data["id"]);
    actdiv.attr("level",      (level+1));

    $(newmsg).css("margin-left", ((level+1)*10));
    $(newmsg).find(".comment-del").click(function(){
      comment_del(this);
    });
    $(newmsg).find(".comment-reply").click(function(){
      comment_reply(this);
    });
    // если уже развернут - убрать развернуть ***TODO***
    alert($("div[comment-id='"+parent+"']").find(".comment-expand").click());
  }