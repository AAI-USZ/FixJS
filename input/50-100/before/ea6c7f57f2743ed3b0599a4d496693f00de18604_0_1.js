function() {
            onCompleteSignal.remove();

            if (current)
            {
                domClass.remove(current.domNode, 'is-visible fx-reverse fx-slide-h');
            }

            domClass.add(next.domNode, 'is-visible');
            domClass.remove(next.domNode, 'fx-slide-h');

            deferred.progress(1);
            deferred.resolve(true);
        }