function() {
      var noop = function() {},
         // default application options, overriden in opts
         defaults = {
            startView: "main",
            hideUrlBar: true
         },
         options, 
         // all the views are stored here keyed by view ids
         views = {},
         // current views on the stack to manage transitions. This stores the view ids
         viewStack = [],
         // the view port object
         app,
         
         viewPort,
         
         controllerMethods = ["initialize", "activate", "deactivate", "destroy"],
         
         defController = {
            initialize: noop,
            activate: noop,
            deactivate: noop,
            destroy: noop
         };
         
      function defViewFactory() {
         return defController;
      }
         
      /**
       * Just ensures that all the lifecycle methods are available for the specified view object
       * If not adds them
       * @param controller The view object
       */
      function ensureLifecycle(controller) {
         forEach(controllerMethods, function(m) {
            var method = controller[m];
            if(!method) {
               controller[m] = noop;
            }
         });
      }
      
      function getViewIndexOnStack(id) {
         for(var i = 0, len = viewStack.len; i < len && viewStack[i] !== id; i++);
         return i === len ? -1 : i;
      }
      
      function getViewId(url) {
         if(!url) {
            return null;
         }
         var hashViewIdx = url.lastIndexOf("#view:"); 
         if(hashViewIdx === -1) {
            return null;
         }
         return url.substring(hashViewIdx + 6); // 6 is "#view:".length
      }
      
      function initialize(id, info, data) {
         // see if the wrapper element for this view exists
         var ui = info.ui = $("#" + id), controller;
         if(!ui.count()) {
            delete views[id];
            throw new Error("Wrapper element for " + id + " not found");
         }

         // add transition handling listener
         ui.on(transitionEndEvent, info.overlay ? onOverlayTransitionEnd : onViewTransitionEnd);

         controller = info.controller = info.factory(app, ui);
         ensureLifecycle(controller);
         
         // make the view visible
         ui.addClass("showing");
         
         // initialize the newly created controller
         controller.initialize(data);
      }
      
      /**
       * Pushes the view specified by 'id' and makes the view active. Following are the steps:
       * <ol>
       *    <li>Find and create (if necessary from the supplied factory function) the view object</li>
       *    <li>If newly created, initialize the view by calling 'initialize(app) function</li>
       *    <li>Activate the view by calling the activate(data) function on the view object</li>
       *    <li>Transition the current view out of view port</li>
       *    <li>Deactivate the transitioned view on completion of the transition</li>
       * </ol>
       * 
       * @param {String} id The view id
       * @param {Object} data The data for the new view
       */
      function pushView(id, data) {
         var nxtInfo = views[id], 
            nxtUi,
            currInfo, 
            len = viewStack.length,
            currId = len ? viewStack[len - 1] : null;
            
         if(currId === id) {
            return;
         }
            
         // check if the view exists
         if(!nxtInfo) {
            throw new Error("No such view: " + id);
         }
         
         // create and initialize new view if applicable
         if(!nxtInfo.ui) {
            initialize(id, nxtInfo, data);
         }

         nxtUi = nxtInfo.ui;
         
         // check if this view was earlier transitioned out because some other view was shown over it.
         if(nxtUi.hasClass("out")) {
            nxtUi.removeClass("transition").removeClass("out");
         }
         nxtUi.addClass("showing");
         
         // activate the new view
         nxtInfo.controller.activate(data);
         
         // transition views
         setTimeout(function() {
            // transition out the old view, this is not the same as popping a view
            if(currId) {
               // experimental set overflow of viewport to hidden while transitioning
               //viewPort.addClass("view-transitioning");
               
               currInfo = views[currId];
               currInfo.controller.deactivate();
               // transition out the current view
               currInfo.ui.addClass("out").removeClass("in");
               // if no transition support dispatch custom event
               if(!hasTransitionSupport) {
                  currInfo.ui.dispatch("transitionend");
               }
            }
            // transition in the new view
            nxtUi.addClass("transition").addClass("in");
            // if no transition support dispatch custom event
            if(!hasTransitionSupport) {
               nxtUi.dispatch("transitionend");
            }
         }, 100);
         viewStack.push(id);
         // console.log("view stack: " + viewStack.join(","));
      }
      
      /**
       * Pops the current view and restores the previous view. Following are the sequence of actions taken:
       * <ol>
       *    <li>Pop the current view from the stack</li>
       *    <li>Activate the last view on the stack by calling activate method on the view</li>
       *    <li>Transition the popped view out of the view port</li>
       *    <li>Transition the restored view into the view port</li>
       *    <li>After transition completes, deactivate the popped view</li>
       * </ol>
       * 
       * @param {Object} data The data to provide to the restored view. This is passed to the activate() function
       */
      function popView(data) {
         var prevInfo, prevUi, currInfo, len = viewStack.length;
         if(len === 1) {
            console.log("Can't pop, last in stack");
            return;
         }
         currInfo = views[viewStack.pop()];
         prevInfo = views[viewStack[len - 2]]; // because we popped, the last item is at len - 1 - 1 
         
         // console.log("popping: " + currInfo.id + ", showing: " + prevInfo.id);
         
         prevUi = prevInfo.ui;
         
         // activate the new view
         prevInfo.controller.activate(data);
         
         if(!prevUi.hasClass("out") && !prevUi.hasClass("transition")) {
            prevUi.addClass("transition").addClass("out");
         }
         
         prevUi.addClass("showing");
         
         // transition the views
         setTimeout(function() {
            // experimental set overflow of viewport to hidden while transitioning
            //viewPort.addClass("view-transitioning");
            
            currInfo.controller.deactivate();
            currInfo.ui.removeClass("in").addClass("pop");
            
            prevUi.removeClass("out").addClass("in");
            
            // if no transition support dispatch custom event
            if(!hasTransitionSupport) {
               currInfo.ui.dispatch("transitionend");
            }
            
         }, 100);
         
         // console.log("view stack: " + viewStack.join(","));
      }
      
      function pushOverlay(id, data) {
         // @TODO: Implement
      }
      
      function popOverlay(data) {
         // @TODO: Implement
      }
      
      /**
       * Handles some actions after views transition in or out of the view port
       */
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
      
      function onOverlayTransitionEnd(evt) {
         // @TODO: Implement
      }
      
      function getCurrentViewId() {
         var len = viewStack.length;
         return len ? viewStack[len - 1] : null;
      }
      
      function register(id, fac, bOverlay) {
         var info, old = views[id];

         // check if this view is trying to register itself again
         old = views[id];
         if(old) {
            throw new Error("View " + id + " already exists");
         }

         // maintain the state of this view in a secret :) object
         info = {
            id: id,
            ui: null,
            controller: null,
            overlay: !!bOverlay,
            factory: fac || defViewFactory
         };
         views[id] = info;
      }
      
      /**
       * Handle back button
       */
      (function() {
         // some browsers do not support hashchange's event.oldURL and event.newURL 
         var oUrl = null, nUrl = window.location.href;
         
         $(window).on("hashchange", function(e) {
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
         });         
      })();
       
      app = {
         /**
          * Registeres a view with this application. The id of the view and a factory function is
          * provided for registeration. 
          * At the time of instantiation, a DOM element corrosponding to the view (whose id is the same
          * as view id) has to exist or it will cause an exception to be thrown
          * @param {String} id The id of the new view
          * @param {Function} fac The factory function that creates the view object. This function is
          * passed two parameters, the application object and the h5 UI element
          * @example 
          * application.registerView("myView", function(app, ui) {
          *    return {
          *       initialize: function() {
          *          var action = document.createTouch ? "tap" : "click";
          *          ui.on(action, function(e) {
          *             if(app.getCurrentViewId() === "yetanother") {
          *                app.popView(["From", "Yet", "Another", "View"]);
          *                e.stopPropagation();
          *                e.preventDefault();
          *             }
          *          });
          *       }
          *    };
          * });
          */
         registerView: function(id, fac) {
            register(id, fac);
         },
         
         /**
          * Pushes the view specified by 'id' and makes the view active. Following are the steps:
          * <ol>
          *    <li>Find and create (if necessary from the supplied factory function) the view object</li>
          *    <li>If newly created, initialize the view by calling 'initialize(app) function</li>
          *    <li>Activate the view by calling the activate(data) function on the view object</li>
          *    <li>Transition the current view out of view port</li>
          *    <li>Deactivate the transitioned view on completion of the transition</li>
          * </ol>
          * 
          * @param {String} id The view id
          * @param {Object} viewData The data for the new view
          */
         showView: function(id, viewData) {
            pushView(id, viewData);
         },
         
         getViewPort: function() {
            return viewPort;
         },
         
         /**
          * Loads a remote view (in a different file) inside the view port and calls the specified
          * callback after the view is loaded
          * Experimental!!!
          * @param {String} id The view id
          * @param {String} url The url of the remote view
          * @param {Function} callback The callback function to call if the view loads successfully
          */
         loadView: function(id, url, callback) {
            if(views[id]) {
               callback(id);
               return;
            }
            $.xhr({
               url: url, 
               method: "GET", 
               dataType: "text", 
               success: function(content) {
                  var html = $(content), scripts = html.find("script"), view, exeScripts = [], code = [], finalScript;
                  scripts.forEach(function(script) {
                     var scr = $(script), type = scr.attr("type");
                     if(!scr.attr("src") && (!type || type.indexOf("/javascript") !== -1)) {
                        html.remove(script);
                        exeScripts[exeScripts.length] = script;
                     }
                  });
                  
                  viewPort.append(html);
                  view = $("#" + id);
                  
                  forEach(exeScripts, function(script) {
                     code[code.length] = script.textContent;
                  });
                  
                  finalScript = document.createElement("script");
                  finalScript.textContent = code.join('\n');
                  view.append(finalScript);
                  
                  if(callback) {
                     callback(id);
                  }
               }
            });
         },
         
         /**
          * Pops the current view and restores the previous view. Following are the sequence of actions taken:
          * <ol>
          *    <li>Pop the current view from the stack</li>
          *    <li>Activate the last view on the stack by calling activate method on the view</li>
          *    <li>Transition the popped view out of the view port</li>
          *    <li>Transition the restored view into the view port</li>
          *    <li>After transition completes, deactivate the popped view</li>
          * </ol>
          * 
          * @param {Object} viewResult The data to provide to the restored view. This is passed to the activate() function
          */
         popView: function(viewResult) {
            popView(viewResult);
         },
         
         /**
          * Gets the id of the currently active view
          */
         getCurrentViewId: getCurrentViewId,
         
         /**
          * Starts this application loading the startView specified in the options.
          * The default value of startView is "main"
          */
         initialize: function(opts) {
            var port, body = window.document.body;
            options = $.extend({}, defaults, opts);
            
            // configure viewport
            port = options.viewPort;
            viewPort = port ? $("#" + port) : $(body);
            
            // show the start view
            pushView(options.startView);
         }
      };
      
      return app;
   }