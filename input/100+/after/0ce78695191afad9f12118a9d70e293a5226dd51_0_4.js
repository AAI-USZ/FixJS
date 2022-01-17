function(Memplex) {
        $("<div class=\"description\">" + Memplex.text + "</div>").appendTo(View.content);
        
        for ( c in Memplex.children ) {
            var div = $("<div class=\"listelement\">").appendTo(View.content);
            $("<a class=\"layer1title\" onclick=\"Controller.load(" + Memplex.children[c].id + ")\">" + Memplex.children[c].title + "</a><br>").appendTo(div);
            console.log(Memplex.children[c]);
            for ( s in Memplex.children[c].children ) {
                $("&gt;<a class=\"layer1link\" onclick=\"Controller.load(" + Memplex.children[c].children[s].id + ")\">" + Memplex.children[c].children[s].title + "</a><br>").appendTo(div);
            }
        };
        $("<br class=\"clear\">").appendTo(View.content);
    }