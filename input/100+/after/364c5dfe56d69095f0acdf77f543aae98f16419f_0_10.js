function (areaData, mode,options) {

            // render includeKeys first - because they could be masks

            var me = this,

                list, name, canvas,

                map_data = this.map_data,

                opts = areaData.effectiveRenderOptions(mode);



            if (options) {

                 $.extend(opts,options);

            }



            if (mode === 'select') {

                name = "static_" + areaData.areaId.toString();

                canvas = map_data.base_canvas;

            } else {

                canvas = map_data.overlay_canvas;

            }



            me.begin(canvas, name);



            if (opts.includeKeys) {

                list = u.split(opts.includeKeys);

                $.each(list, function (i,e) {

                    var areaData = map_data.getDataForKey(e.toString());

                    addShapeGroupImpl(me,areaData, areaData.effectiveRenderOptions(mode));

                });

            }



            addShapeGroupImpl(me,areaData, opts);

            me.render();

            if (opts.fade) {

                

                // fading requires special handling for IE. We must access the fill elements directly. The fader also has to deal with 

                // the "opacity" attribute (not css)



                u.fader(m.hasCanvas ? 

                    canvas : 

                    $(canvas).find('._fill').not('.mapster_mask'),

                0,

                m.hasCanvas ? 

                    1 : 

                    opts.fillOpacity,

                opts.fadeDuration); 

               

            }



        }