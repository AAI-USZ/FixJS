function (i, item) {
        var $item = $(item);
        var type = $item.attr("data-object-type");
        var geometryType = $item.attr("data-geometry-type");
        if (geometryType) {
            // console.log(type, geometryType);
        }
        if ($item.hasClass("sublist")) {
            var subitems = $(".add", $item);
            $.each(subitems, function (i, subitem) {
                var $subitem = $(subitem);
                var geometryType = $subitem.attr("data-geometry-type");
                $subitem.click(function (e) {
                    if (editor.addPanel.is(":visible")){
                        return;
                    }
                    editor.setDrawingMode(type, geometryType);
                    $("#map-panel-add .selected").removeClass("selected");
                    $subitem.addClass("selected");

                });
            });
        }
    }