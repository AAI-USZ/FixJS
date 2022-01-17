function(score) {
    $("#score").html("");
    for (var i in score) {
      (function(s){
        var el = $("<div></div>");
        var html = ""
        if (!window.roomobj.properties.type == "ffa") {
          html += "<b>Team "+i+":</b> "+score[i].total;
        }
        for (var player in s.players) {
          (function(p,el, html) {
            $.getJSON('/api/service?method=user.get&user='+p, function(resp) {
              var response = resp.data;
              html += "<div>"+response.name +": "+(s.players)[p]+"</div>";
              el.html(html);
            });
          })(player,el, html);
        }
        el.html(html);
        $("#score").append(el);
      })(score[i]);
    }
  }