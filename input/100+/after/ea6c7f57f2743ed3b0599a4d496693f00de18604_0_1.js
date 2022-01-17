function(container, next, current, options, deferred) {
        deferred = deferred || new Deferred();

        domClass.remove(next.domNode, 'is-visible');

        next.placeAt(container);

        deferred.progress(0);

        var onCompleteSignal = on(next.domNode, animationEnd, function() {
            onCompleteSignal.remove();

            if (current)
            {
                domClass.remove(current.domNode, 'is-visible fx-slide-h-out');
            }

            domClass.add(next.domNode, 'is-visible');
            domClass.remove(next.domNode, 'fx-slide-h-in');

            deferred.progress(1);
            deferred.resolve(true);
        });

        if (current)
        {
            domClass.add(current.domNode, 'fx-slide-h-out');
        }

        domClass.add(next.domNode, 'fx-slide-h-in');

        return deferred;
    }