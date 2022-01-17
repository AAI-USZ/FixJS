function (i, subitem) {
                var $subitem = $(subitem);
                var overlayType = $subitem.attr("data-overlay-type");
                $subitem.click(function (e) {
                    if (editor.addPanel.is(":visible")){
                        return;
                    }
                    editor.setDrawingMode(type, overlayType);
                    $("#map-panel-add .selected").removeClass("selected");
                    $subitem.addClass("selected");

                });
            }