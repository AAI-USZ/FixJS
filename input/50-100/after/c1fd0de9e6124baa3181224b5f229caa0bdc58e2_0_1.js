function(l, t){
            this.animate({

                // Tried to use jquery's animate() on top and left directly, but it has a bug with zoomed webkit windows (something to do with position() not really working the same way on webkit and mozilla), so had to use fake properties
                ttop: t,
                lleft: l
            },{
                // and write my own step.
                step: function(now, fx){
                    Canvas.css(fx.prop.slice(1), now);
                },

                // Using the queue here is tempting, since it forces the reader to go through all the right places even if he is paging quickly, but in reality it's just tedious
                queue: false,
                // and we do not want to be tedious.
                duration: 200
            });
        }