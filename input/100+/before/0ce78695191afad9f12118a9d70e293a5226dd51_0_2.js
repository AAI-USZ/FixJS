function(Memplex) {
        this.contentLeft = $("<div class=\"contentLeft\">").appendTo(View.content);
        this.contentRight = $("<div class=\"contentRight\">").appendTo(View.content);
        
        if ( Memplex.children.length > 0 ) {
            this.commentUl = $("<ul class=\"comment\">");
            this.loadComments(Memplex,this.commentUl);
        }
        this.commentUl.appendTo(this.contentRight);
        
        $("<div class=\"solutionContent\">" + Memplex.text + "</div>").appendTo(this.contentLeft);
        
    }