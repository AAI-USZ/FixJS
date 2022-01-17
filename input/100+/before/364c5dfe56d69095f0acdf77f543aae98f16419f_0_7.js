function (useCanvas) {

            var style, shapes;





            // check for excanvas explicitly - don't be fooled

            m.hasCanvas = (document.namespaces && document.namespaces.g_vml_) ? false :

                $('<canvas></canvas>')[0].getContext ? true : false;



            m.isTouch = 'ontouchstart' in document.documentElement;



            if (!(m.hasCanvas || document.namespaces)) {

                $.fn.mapster = function () {

                    return this;

                };

                return;

            }

            if (!u.isBool($.mapster.defaults.highlight)) {

                m.render_defaults.highlight = !m.isTouch;

            }



            $.extend(m.defaults, m.render_defaults,m.shared_defaults);

            $.extend(m.area_defaults, m.render_defaults,m.shared_defaults);



            // for testing/debugging, use of canvas can be forced by initializing manually with "true" or "false"

            if (u.isBool(useCanvas)) {

                m.hasCanvas = useCanvas;

            }

            if ($.browser.msie && !m.hasCanvas && !document.namespaces.v) {

                document.namespaces.add("v", "urn:schemas-microsoft-com:vml");

                style = document.createStyleSheet();

                shapes = ['shape', 'rect', 'oval', 'circ', 'fill', 'stroke', 'imagedata', 'group', 'textbox'];

                $.each(shapes,

                function (i, el) {

                    style.addRule('v\\:' + el, "behavior: url(#default#VML); antialias:true");

                });

            }



            // for safe load option

            $(window).bind('load', function () {

                m.windowLoaded = true;

                $(m.map_cache).each(function (i,e) {

                    if (!e.complete && e.isReadyToBind()) {

                        e.initialize();

                    }

                });

            });





        }