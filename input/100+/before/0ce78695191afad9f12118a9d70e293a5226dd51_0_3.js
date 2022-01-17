function() {
    this.contentLeft = null;
    this.contentRight = null;
    this.commentUl = null;
    this.comment = null;

    this.create = function(Memplex) {
        this.contentLeft = $("<div class=\"contentLeft\">").appendTo(View.content);
        this.contentRight = $("<div class=\"contentRight\">").appendTo(View.content);
        
        if ( Memplex.children.length > 0 ) {
            this.commentUl = $("<ul class=\"comment\">");
            this.loadComments(Memplex,this.commentUl);
        }
        this.commentUl.appendTo(this.contentRight);
        
        $("<div class=\"solutionContent\">" + Memplex.text + "</div>").appendTo(this.contentLeft);
        
    };
    
    this.loadComments = function(Memplex,parent) {
        var ul = $("<ul class=\"comment\">");
        var li = $("<li class=\"comment\">");
        
        $("<a class=\"argumentlink\" onclick=\"Controller.load(" + Memplex.id + ")\">" + Memplex.title + " - " + Memplex.author + "</a>").appendTo(li);
        
        for ( c in Memplex.children ) {
            this.loadComments(Memplex.children[c],li);
        }
        
        li.appendTo(ul);
        ul.appendTo(parent);
    };
}