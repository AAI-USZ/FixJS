function () {

            var opts, me = this;



            $.each(this.shapes, function (i,e) {

                me.renderShape(e.mapArea, e.options);

            });



            if (this.masks.length) {

                $.each(this.masks, function (i,e) {

                    opts = u.updateProps({},

                        e.options, {

                            fillOpacity: 1,

                            fillColor: e.options.fillColorMask

                        });

                    me.renderShape(e.mapArea, opts, 'mapster_mask');

                });

            }



            this.active = false;

            return this.canvas;

        }