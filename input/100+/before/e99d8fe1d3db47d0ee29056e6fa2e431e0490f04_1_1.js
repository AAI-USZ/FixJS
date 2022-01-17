function onViewTransitionEnd(evt) {
         var target = evt.target, viewId = target.id, viewInfo = views[viewId], el;
         
         if(!viewInfo) {
            return; // not a view
         }
         
         //viewPort.removeClass("view-transitioning");
         //alert(viewPort.hasClass("view-transitioning"));
         
         el = viewInfo.ui;
         
         // deactivate if the view has transitioned out
         if(el.hasClass("out")) {
            el.removeClass("showing");
            viewPort.dispatch("viewtransitionout", {view: viewId});
         }
         
         // deactivate if the view was popped, remove all transitions and all transition CSS so that the view is
         // returned to its original position
         if(el.hasClass("pop")) {
            el.removeClass("showing").removeClass("transition").removeClass("pop");
            viewPort.dispatch("viewtransitionout", {view: viewId});
         }
         
         // for history support, experimental!
         if(el.hasClass("in")) {
            // don't have the hash value same as the view id. This will cause the  URL bar to be shown
            // on every hashchange event
            window.location.hash = "view:"+ viewId;
            viewPort.dispatch("viewtransitionin", {view: viewId});
         }
      }