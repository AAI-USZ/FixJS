function createTipsy(mark) {
        var c = mark.root.canvas();
        
        $canvas = $(c);
        
        c.style.position = "relative";
        $canvas.mouseleave(hideTipsy);
        
        /* Share one div per canvas
         * as a way to mutually exclude visibility of tooltips 
         * on different marks. 
         */
        if(!id){
            id = c.__tipsyBehaviorId || c.id;
            if(!id){
                id = c.__tipsyBehaviorId = '' + new Date().getTime();
            }
            
            id = "tipsyPvBehavior" + id;
        }
        
        /* Reuse the specified div id */
        var fakeTipTarget = document.getElementById(id);
        if(fakeTipTarget) {
            var tipsy = $.data(fakeTipTarget, 'tipsy');
            if(tipsy) {
                tipsy.hide();
                $.data(fakeTipTarget, 'tipsy', null);
                tipsy = null;
            }
        } else {
            fakeTipTarget = document.createElement("div");
            fakeTipTarget.id = id;
            c.appendChild(fakeTipTarget);
            
            var fakeStyle = fakeTipTarget.style;
            fakeStyle.padding = '0px';
            fakeStyle.margin  = '0px';
            fakeStyle.position = 'absolute';
            fakeStyle.pointerEvents = 'none'; // ignore mouse events
            fakeStyle.display = 'block';
            
            // <Debug>
            if(_tip.debug >= 5){
                fakeStyle.borderColor = 'red';
                fakeStyle.borderWidth = '1px';
                fakeStyle.borderStyle = 'solid';
            }
            // </Debug>
        }
        
        $fakeTipTarget = $(fakeTipTarget);
        
        // Create the tipsy instance
        $fakeTipTarget.tipsy(opts);
    }