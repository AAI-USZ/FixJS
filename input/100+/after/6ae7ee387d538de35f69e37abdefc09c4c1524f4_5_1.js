function() {
            // Vars for media and goodies
            var media = {
                'items': []
            };
            var goodies = {
                'items': []
            };

            // Fill in media and goodies
            for (var i in sakai.widgets) {
                if (sakai.widgets.hasOwnProperty(i) && i) {
                    var widget = sakai.widgets[i];
                    if (widget['sakaidocs'] && widget.showinmedia) {
                        media.items.push(widget);
                    }
                    if (widget['sakaidocs'] && widget.showinsakaigoodies) {
                        goodies.items.push(widget);
                    }
                }
            }

            sakai.api.Util.TemplateRenderer(inserterbarDynamicWidgetListTemplate, {
                'sakai': sakai,
                'media': media,
                'goodies': goodies
            }, $inserterbarDynamicWidgetList);

            if (goodies.items.length > 8){
                setupCarousel();
            } else {
                $('#inserterbar_more_widgets_container', $rootel).hide();
                $('#inserterbar_carousel_left', $rootel).addClass('disabled');
                $('#inserterbar_carousel_right', $rootel).addClass('disabled');
            }

            setupSortables();
            resetPosition();
        }