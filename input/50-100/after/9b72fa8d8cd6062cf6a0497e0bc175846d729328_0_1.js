function () {
                var path, features, index = i;
                var dir = $(/^@import(?:-(once))?\s+/);

                if (dir && (path = $(this.entities.quoted) || $(this.entities.url))) {
                    features = $(this.mediaFeatures);
                    if ($(';')) {
                        return new(tree.Import)(path, imports, features, (dir[1] === 'once'), index, env);
                    }
                }
            }