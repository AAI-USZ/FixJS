function(Memplex) {
        this.clear();
        console.log(Memplex);
        this.container = $("<div class=\"container\">");
        this.headline = $("<div class=\"headline\">").appendTo(this.container);
        this.content = $("<div class=\"content\">").appendTo(this.container);
        this.footer = $("<div class=\"footer\">").appendTo(this.container);
        this.container.appendTo("body");
        
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
    }