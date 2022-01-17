function () {
                var features;

                if ($(/^@media/)) {
                    features = $(this.mediaFeatures);

                    if (rules = $(this.block)) {
                        return new(tree.Media)(rules, features);
                    }
                }
            }