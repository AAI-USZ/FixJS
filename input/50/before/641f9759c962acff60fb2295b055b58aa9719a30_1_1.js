function(ul,item) {
                return $("<li></li>")
                    .data( "item.autocomplete", item )
                    .append( "<a>" + item.label + " (" + item.value + ")")
                    .appendTo(ul);
            }