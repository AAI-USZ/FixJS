function(view, options, deferred) {
            if (this.active === view)
            {
                /* todo: fully reset tools here? could update? only issue would be if new tools were passed for same active view. */
                this._beforeTransition(view, options, view);

                /* todo: is `reload` an appropriate name for this? */
                view.reload();

                this._afterTransition(view, options, view);

                deferred.resolve(true);

                return deferred;
            }

            var previous = this.active;

            domClass.remove(view.domNode, 'is-visible');

            view.placeAt(this.viewContainerNode || this.domNode);

            this._beforeTransition(view, options, previous);

            if (previous)
            {
                domClass.remove(previous.domNode, 'is-visible');
            }

            domClass.add(view.domNode, 'is-visible');

            if (previous)
            {
                previous.transitionAway();
            }

            view.transitionTo();

            this.active = view;

            domAttr.set(this.domNode, 'data-active-view', view.id);
            domAttr.set(this.domNode, 'data-active-view-kind', view.customizationSet);

            this._afterTransition(view, options, previous);

            this.resize();

            deferred.resolve(true);
        }