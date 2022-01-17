function(jQuerySelection) {
        if (jQuerySelection !== null){
                $(jQuerySelection).draggable({
                        connectToSortable: "#List",
                        helper:'clone',
                        start:function(event, ui){
                                if ($(this) === undefined){
                                        throw new Error ("addDraggingFeature start: $(this) is undefined");
                                } else {
                                        carrying = getHTML($(this));
                                        //  console.log(carrying);
                                }
                        }

                });
        }
}