function (e) {
                    if (editor.addPanel.is(":visible")){
                        return;
                    }
                    editor.setDrawingMode(type, overlayType);
                    $("#map-panel-add .selected").removeClass("selected");
                    $subitem.addClass("selected");

                }