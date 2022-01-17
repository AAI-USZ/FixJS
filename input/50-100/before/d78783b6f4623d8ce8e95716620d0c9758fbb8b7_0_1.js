function(Memplex) {
        $("<span class=\"title\">" + Memplex.title + "</span>").appendTo(View.headline);
        $("<div class=\"description\">" + Memplex.text + "</div>").appendTo(View.content);
        
        for ( c in Memplex.children ) {
            $("<a class=\"layer1link\" onclick=\"Controller.load(" + Memplex.children[c].id + ")\">" + Memplex.children[c].title + "</a>").appendTo(View.content);
        };
        $("<br class=\"clear\">").appendTo(View.content);
    }