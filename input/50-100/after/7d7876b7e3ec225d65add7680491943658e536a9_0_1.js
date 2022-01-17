function Controller() {
                if (instance !== undefined) { //try to simulate Singleton
                    return instance;
                }
                BaseController.apply(this, arguments);

                //'initialize()' method works as explicit constructor, if it is defined,
                // then run it
                if (this.initialize !== undefined) {
                    this.initialize.apply(this, arguments);
                }

                instance = this;
                return instance;
            }