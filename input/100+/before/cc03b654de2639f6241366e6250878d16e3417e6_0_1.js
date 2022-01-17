function() {
        // .addClass('ui-corner-all ui-widget ui-widget-content')
        
        $('#content')
            .empty();
        var mycontent = $('<div id="mycontent">').appendTo('#content');
        
        var memplexes = MemplexRegister.getLayer(3);
        var i = 0;
        var act = -1;
        for ( m in memplexes ) {
            var debate = new Debate(MemplexRegister.get(memplexes[m]));
            if ( !debate.matchFilter() ) {
                continue;
            }
            if ( this.activeDebate == debate.memplex.id ) {
                console.log(i);
                act = i++;
            }
            debate.appendTo(mycontent);
        }
        if ( act == -1 ) {
            act = false;
        }
        mycontent.accordion({
            collapsible: true,
            active: act,
            change: function(event,ui) {
                View.activeDebate = Helper.getIdFromString(ui.newContent.attr('id'));
                console.log(event,ui,View.activeDebate);
            }
        });
    }