function(Memplex) {
        this.contentLeft = $("<div class=\"contentLeft\">").appendTo(View.content);
        this.contentRight = $("<div class=\"contentRight\">").appendTo(View.content);
        
        this.argumentPro = $("<ul class=\"argumentPro\">").appendTo(this.contentRight);
        this.argumentCon = $("<ul class=\"argumentCon\">").appendTo(this.contentRight);
        this.argumentNeut = $("<ul class=\"argumentNeut\">").appendTo(this.contentRight);
        
        $("<span class=\"title\">" + Memplex.title + "</span>").appendTo(View.headline);
        $("<div class=\"solutionContent\">" + Memplex.text + "</div>").appendTo(this.contentLeft);
        
        for ( c in Memplex.children ) {
            var li = $("<li>");
            $("<a class=\"argumentlink\" onclick=\"Controller.load(" + Memplex.children[c].id + ")\">" + Memplex.children[c].title + "</a>").appendTo(li);
            switch ( Memplex.children[c].layer ) {
                case 5: li.appendTo(this.argumentPro); break;
                case 6: li.appendTo(this.argumentCon); break;
                case 7: li.appendTo(this.argumentNeut); break;
            }
        };
    }