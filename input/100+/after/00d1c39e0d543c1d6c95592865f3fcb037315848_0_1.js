function(target) {
        var content = $('#content').empty();
        
        var solution = MemplexRegister.get(target);
        if ( this.solutionbutton != null ) {
            this.solutionbutton.remove();
        }
        
        if ( this.commentbutton != null ) {
            this.commentbutton.remove();
        }
        this.solutionbutton = $('<button id="solution' + solution.id + 'button">L&ouml;sungsvorschlag: ' + solution.title + '</button>')
            .appendTo('#menuright')
            .click(function(data) {
                var id = Helper.getIdFromString(data.currentTarget.id);
                Controller.loadSolution(id);
            })
            .button()
            .attr('style','font-size: 0.7em;');
        
        
        var tmp = new Solution(solution);
        tmp.getObject().appendTo(content);
        
        var target = Controller.popCommentTarget();
        if ( target != null ) {
            tmp.showComment(target);
        }
    }