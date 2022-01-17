function() {
            onCompleteSignal.remove();

            if (current)
            {
                domClass.remove(current.domNode, 'is-visible fx-slide-h-out');
            }

            domClass.add(next.domNode, 'is-visible');
            domClass.remove(next.domNode, 'fx-slide-h-in');

            deferred.progress(1);
            deferred.resolve(true);
        }