function ( selector, event, callback, capturePhase ) {
      	 capturePhase = capturePhase || false;
         this.addEventListener(event, function(e) {
            var target = e.target;
            $.$$(selector, this).each(function(element) {
               if (element === target) {
                  callback.apply(this, arguments);
               } else {
                  try {
                     var ancestor = target.ancestor(selector);
                     if (element === ancestor) {
                        e.stopPropagation();
                        callback.call(this, ancestor);
                     }
                  } catch(err) {}
               }
            });
         }, capturePhase);
      }