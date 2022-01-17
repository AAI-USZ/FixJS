function message_onmessage(e) {
    var d = JSON.parse(e.data);
    var comment_id = d.id.split('/')[1];
    var outerbox = $("<div class='outerborder hentry ajax' id='"+comment_id+"'>");
    var comment = $("<div class='comment'>");
    comment.append("<img class='avatar' alt='avatar' "+
                   "src='/u/"+d.user+"/avatar/thumb' />");
    if (d.thumbs.length) {
        var previews = $("<div class='imgpreviews'>");
        d.thumbs.forEach(function(thumb) {
            previews.append("<a class='imglink' href='"+thumb[0]+"'>"+
                            "<img class='imgpreview ajax' src='"+thumb[1]+
                            "' /></a>")
        })
        comment.append(previews);
    }
    var pre = $("<pre class='comment_body pw entry-title entry-content'>");
    if (d.thumbs.length) {
        pre.addClass("hasthumbs");
    }
    pre.append(d.linkified);
    var sign = $("<div class='sign'>");
    sign.append("<a class='msgid' rel='bookmark' href='/p/"+d.id+
                "'>#"+d.id+"</a>");
    sign.append("<span id='cmtb-"+d.id+"' class='cmtb'></span> / ");
    sign.append("<a class='usrid' href='/u/"+d.user+"'>@"+d.user+"</a>");
    if (d.replyto) {
        sign.append(" --&gt; <a class='usrid' "+
                    "href='/p/"+d.replyto.replace('/', '#')+"'>#"+
                    d.replyto+"</a>");
    }
    comment.append(pre);
    comment.append(sign);
    outerbox.append(comment);
    outerbox.appendTo($("div.comments")).show("slow");
    event_favicon();
}