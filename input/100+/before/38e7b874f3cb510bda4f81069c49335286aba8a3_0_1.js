function (behavior) {
                var b;
                if(_.isFunction(behavior)) {
                    b = new behavior();
                } else {
                    b = new behavior.behavior();
                    _.extend(b, behavior.options);
                }
                b.setGrid(this);
                this.behaviors.push(b);
            }