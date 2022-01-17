function(Memplex) {
        this.contentLeft = $("<div class=\"contentLeft\">").appendTo(View.content);
        this.contentRight = $("<div class=\"contentRight\">").appendTo(View.content);
        
        if ( Memplex.layer <= 7 && Memplex.layer >= 5 ) {
            this.commentUl = $("<ul class=\"comment\">");
            this.loadComments(Memplex,this.commentUl);
        }
        this.commentUl.appendTo(this.contentRight);
        
        $("<span class=\"title\">" + Memplex.title + "</span>").appendTo(View.headline);
        $("<div class=\"content solutionContent\">" + Memplex.text + "</div>").appendTo(this.contentLeft);
        
    }