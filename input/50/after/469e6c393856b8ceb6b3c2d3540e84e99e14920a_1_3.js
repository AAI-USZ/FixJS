function() {
                parent.call(this,
                    cloner.clone(protoProperties),
                    cloner.clone(staticProperties)
                );
            }