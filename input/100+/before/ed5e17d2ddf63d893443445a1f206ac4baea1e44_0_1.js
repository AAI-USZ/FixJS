function __printComment( $this, comment, position ) {
    var update = settings.update, deletion = settings.deletion, comments = $this.data('comments'),
    commentBox;
    if (position === 'top' && comments.comments.length > 0) {
      commentBox = $("<div>").appendTo($("<div id='comment" + comment.id + "'>").addClass("oneComment").insertBefore($('#comment' + comments.comments[0].id)));
    } else {
      commentBox = $("<div>").appendTo($("<div id='comment" + comment.id + "'>").addClass("oneComment").appendTo($("#list-box")));
    }
    var actionsPane = $("<div>").addClass("action").appendTo(commentBox);
    $("<img>").attr("src", comment.author.avatar).appendTo($("<div>").addClass("avatar").appendTo(commentBox));
    if (settings.author && settings.author.id == comment.author.id)
      $("<span>").addClass("date").text(" - " + comment.creationDate).appendTo($("<p>").addClass("author").text(comment.author.fullName).appendTo(commentBox));
    else
      $("<span>").addClass("date").text(" - " + comment.creationDate).appendTo($("<p>").addClass("author").append($('<span>').text(comment.author.fullName).userZoom(comment.author)).appendTo(commentBox));
    $("<pre>").addClass("text").append(comment.text.replace(/\n/g, '<br/>')).appendTo(commentBox);

    if (update['activated']( comment )) {
      $("<img>").attr("src", update.icon).attr("alt", update.altText).click(function() {
        __updateComment($this, comment.id)
      }).appendTo(actionsPane);
    }
    $("<span>").html("&nbsp").appendTo(actionsPane);
    if (deletion.activated( comment )) {
      $("<img>").attr("src", deletion.icon).attr("alt", deletion.altText).click(function() {
        __deleteComment($this, comment.id)
      }).appendTo(actionsPane);
    }
  }