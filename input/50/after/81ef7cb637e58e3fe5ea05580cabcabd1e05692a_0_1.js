function (e) {
                this.init(e);
                var instance = this;
                //FIXME faire appel au smartResize
                $(window).resize(function () {
                        instance.init();
                });
            }