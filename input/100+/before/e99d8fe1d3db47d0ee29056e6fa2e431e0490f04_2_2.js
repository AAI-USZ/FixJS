function(e) {
            oUrl = nUrl;
            nUrl = window.location.href;
            
            var startId = options.startView, 
               id = getViewId(nUrl) || startId, 
               oId = getViewId(oUrl) || startId, 
               curId = getCurrentViewId(), 
               lastId;
               
            if(!views[id]) { // this hash change was triggered by some link or something else
               return;
            }
               
            if(curId !== id) { // either front or back button is pressed
               lastId = viewStack[viewStack.length - 2];
               if(lastId === id) { // back button pressed
                  popView();
               }else {
                  pushView(id);
               }
            }
         }