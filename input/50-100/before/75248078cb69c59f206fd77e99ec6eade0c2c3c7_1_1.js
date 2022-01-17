function (attributes) {
            if (attributes && attributes.article) {
                var self = this;
                attributes.article.product(function (err, product) {
                    self.set('product', product);
                });
            }

            this.callBase();
        }