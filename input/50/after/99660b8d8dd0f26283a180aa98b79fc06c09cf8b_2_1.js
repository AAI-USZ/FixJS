function(view) {
            var deferred = new Deferred();

            /* - add the new view to this domNode
             * - do transition, remove old view from domNode ?
             * - or leave view in the container until it is needed elsewhere?
             * - save on dom movement and better back button support?
             *
             * - or have several configurations of views, one for tablets, and one for mobile?
             *   where views are assigned directly to containers?
             */

            /* todo: why does this fix display issue on Android 3.0 tablet? */
            /* - the nodes are not painted correctly without the timeout
             * - some items are not displayed, normally the main view, but can be interacted with
             * - rotating the tablet causes it to paint correctly.
             * - even happens with OpenGL rendering disabled.
             */
            setTimeout(lang.hitch(this, this._transitionTo, view, view.options, deferred));

            return deferred;
        }