function() {
                if (this.active === view)
                {
                    /* todo: is `reload` an appropriate name for this? */
                    view.reload();

                    deferred.resolve(true);

                    return deferred;
                }

                // domStyle.set(view.domNode, 'display', 'none');

                domClass.remove(view.domNode, 'is-visible');

                view.placeAt(this.domNode);

                var previous = this.active;
                if (previous) previous.beforeTransitionAway();

                view.beforeTransitionTo();

                //if (previous) domStyle.set(previous.domNode, 'display', 'none');

                if (previous) domClass.remove(previous.domNode, 'is-visible');

                // domStyle.set(view.domNode, 'display', 'block');

                domClass.add(view.domNode, 'is-visible');

                view.transitionTo();

                if (previous) previous.transitionAway();

                this.active = view;

                if (view.resize) view.resize();

                deferred.resolve(true);
            }