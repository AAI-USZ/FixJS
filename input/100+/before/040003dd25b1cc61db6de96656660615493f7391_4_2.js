function (i, item) {
        var $item = $(item);
        var type = $item.attr("data-object-type");
        var overlayType = $item.attr("data-overlay-type");
        if (overlayType) {
            // console.log(type, overlayType);
        }
        if ($item.hasClass("sublist")) {
            var subitems = $(".add", $item);
            $.each(subitems, function (i, subitem) {
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
            });
        }
    }