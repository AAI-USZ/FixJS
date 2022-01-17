function () {
                    var product = this.product;
                    product = packaging.makeInterface.call(product);
                    this.product = null;
                    return product;
                }