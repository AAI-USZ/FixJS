function main_onmessage(e) {
    var d = JSON.parse(e.data);
    var outerbox = $("<div class='outerborder hentry ajax' id='"+d.id+"'>");
    var msg = $("<div class='msg'>");
    msg.append("<img class='avatar' alt='avatar' "+
                   "src='/u/"+d.user+"/avatar/thumb' />");
    msg.append(d.wtags);
    if (d.thumbs.length) {
        var previews = $("<div class='imgpreviews'>");
        d.thumbs.forEach(function(thumb) {
            previews.append("<a class='imglink' href='"+thumb[0]+"'>"+
                            "<img class='imgpreview ajax' src='"+thumb[1]+
                            "' /></a>")
        })
        msg.append(previews);
    }
    var pre = $("<pre class='pw entry-title entry-content'>");
    if (d.thumbs.length) {
        pre.addClass("hasthumbs");
    }
    pre.append(d.linkified);
    var sign = $("<div class='sign'>");
    sign.append("<a class='msgid' rel='bookmark' href='/p/"+d.id+
                "'>#"+d.id+"</a>");
    sign.append("<span id='msgb-"+d.id+"' class='msgb'></span> ");
    sign.append("("+d.replycount);
    var reccount = d.recommendations.length;
    if (reccount) { sign.append("+"+reccount); }
    sign.append(") / <a class='usrid' href='/u/"+d.user+"'>@"+d.user+"</a>");
    msg.append(pre);
    msg.append(sign);
    outerbox.append(msg);
    outerbox.prependTo($("div.messages")).show("slow");
    event_favicon();
}