function() {
         console.log("[FeedsPresent.DOM] Init feeds present DOM");

         //Subscriptions
         var subscriptions = [];
         var subscribe = function(eventName, callback) {
             subscriptions[eventName] = subscriptions[eventName] || [];
             subscriptions[eventName].push(callback);
         };

         //DOM elements
         var elts = new (function() {
             this.$feeds = $('.feeds.present');
             this.$waitingFeeds = this.$feeds.find('.waiting-feeds');
         })();

         var template = _.template($("#feed_tmpl").html());

         this.viewFeeds = Action(function(evt, next) {
             elts.$feeds.show();
             next(evt);
         });

         this.hideFeeds = Action(function(evt, next) {
             elts.$feeds.hide();
             next(evt);
         });
     }