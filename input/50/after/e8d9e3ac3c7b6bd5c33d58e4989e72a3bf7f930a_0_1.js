function(view, transitionOptions) {
            // return this._transition(view, view.options, transitionOptions);

            var deferred = new Deferred();

            /* todo: why does this fix display issue on Android 3.0/4.0 tablet? */
            /* - the nodes are not painted correctly without the timeout
             * - some items are not displayed, normally the main view, but can be interacted with
             * - rotating the tablet causes it to paint correctly.
             * - happens with OpenGL rendering enabled or disabled.
             */
            setTimeout(lang.hitch(this, this._transition, view, view.options, transitionOptions, deferred), 0);

            return deferred;
        }