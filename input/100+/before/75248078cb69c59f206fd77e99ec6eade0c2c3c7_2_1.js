function () {

            var url = "";

            if (this.$.product) {
                var product = this.$.product;

                if (this.$.type != COMPOSITION) {
                    // use product
                    url = "http://image.spreadshirt.net/image-server/v1/products/" + product.$.id;
                } else {
                    url = "http://image.spreadshirt.net/image-server/v1/compositions/" + product.$.id;
                }
                url += '/views/' +  (this.$.view ? this.$.view.$.id : "1");

                url = this.extendUrlWithSizes(url);

                if(this.$.appearance) {
                    url += ",appearanceId=" + this.$.appearance.id;
                }
            }

            return url;

        }