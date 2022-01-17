function() {
    this.container = null;
    this.headline = null;
    this.content = null;
    this.footer = null;
    this.overlay = null;

    this.create = function(Memplex) {
        this.clear();
        
        this.container = $("<div class=\"container\">");
        this.headline = $("<div class=\"headline\">").appendTo(this.container);
        this.content = $("<div class=\"content\">").appendTo(this.container);
        this.footer = $("<div class=\"footer\">").appendTo(this.container);
        this.container.appendTo("body");
        
        for ( i = 0 ; i < Memplex.layer ; i++ ) {
            $("<span class=\"title\"><a onclick=\"Controller.load(" + Controller.navigation[i].id + ")\"> &gt; " + Controller.navigation[i].title + "</a></span>").appendTo(View.headline);
        }
        if ( Memplex.layer - 2 >= 0 ) {
            $("<span class=\"title back\"><a onclick=\"Controller.load(" + Controller.navigation[Memplex.layer - 2].id + ")\">&lt;&lt; Back</a></span>").appendTo(View.headline);
        }
        
        switch ( Memplex.layer ) {
            case 1: break;
            case 2: 
                this.createButton("Create Issue", function() {
                    CreateIssue.create();
                });/*Create Issue*/ break;
            case 3: /*Create Solution*/ break;
            case 4: /*Create Argument*/ break;
            case 5: case 6: case 7: case 8: /*Create Comment*/ break;
        }
        
        switch ( Memplex.layer ) {
            case 1: case 2: case 3: ViewList.create(Memplex); break;
            case 4: ViewSolution.create(Memplex); break;
            case 5: case 6: case 7: case 8: ViewComment.create(Memplex); break;
        }
    };
    
    this.createButton = function(name, handler) {
        $("<button>" + name + "</button>").click(handler).appendTo(this.footer);
    }

    this.clear = function() {
        if ( this.container != null ) {
            this.container.remove();
        }
        if ( this.overlay != null ) {
            this.overlay.remove();
        }
    };

	this.block = function() {
        this.overlay = $("<div class=\"overlay\">")
            .appendTo("body");
	};
}