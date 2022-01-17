function(jQuerySelection) {
        if (jQuerySelection != null){
                $(jQuerySelection).draggable({
                        connectToSortable: "#List",
                        helper:'clone',
                        start:function(event, ui){
                                carrying = getHTML($(this));
                              //  console.log(carrying);
                        }

                });
        }
}