function(e) {
            var target = e.target;
            if (e.target.nodeType == 3) {
            	target = e.target.parentNode;
            }
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
         }