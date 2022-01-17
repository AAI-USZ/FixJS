function(event) {

        // retrieves the current element

        var element = jQuery(this);



        // retrieves the text currently in used for the context

        // of the console (current command)

        var value = jQuery(".console").data("text") || "";



        // retrieves the key value

        var keyValue = event.keyCode ? event.keyCode : event.charCode

                ? event.charCode

                : event.which;



        // sets the default value for the canceling operation

        // (no default behavior) as true (most of the times)

        var cancel = true;



        if (event.ctrlKey) {

            switch (keyValue) {

                case 32 :

                    autocomplete(true);

                    break;



                default :

                    break;

            }

        }



        switch (keyValue) {

            case 8 :

                var cursor = jQuery(".console").data("cursor");

                if (cursor == value.length - 1) {

                    break;

                }



                var first = value.slice(0, value.length - cursor - 2);

                var second = value.slice(value.length - cursor - 1,

                        value.length);

                var value = first + second;

                jQuery(".console").data("text", value)



                refresh();

                break;



            case 27 :

                jQuery(".console .autocomplete").hide();

                break;



            case 35 :

                jQuery(".console").data("cursor", -1);

                refresh();

                break;



            case 36 :

                jQuery(".console").data("cursor", value.length - 1);

                refresh();

                break;



            case 37 :

                var cursor = jQuery(".console").data("cursor");

                if (cursor == value.length - 1) {

                    break;

                }

                cursor++;

                jQuery(".console").data("cursor", cursor);



                refresh();



                break;



            case 38 :

                var isVisible = jQuery(".console .autocomplete").is(":visible");



                if (isVisible) {

                    var selected = jQuery(".console .autocomplete ul > li.selected");

                    var selectedIndex = selected.index();

                    jQuery(".console .autocomplete ul > li.selected").removeClass("selected");

                    jQuery(".console .autocomplete ul > li:nth-child("

                            + (selectedIndex) + ")").addClass("selected");



                    break;

                }



                var history = jQuery(".console").data("history") || [];

                var historyIndex = jQuery(".console").data("history_index")

                        || 0;



                var value = history[history.length - historyIndex - 1];

                if (historyIndex != history.length - 1) {

                    historyIndex++;

                }



                jQuery(".console").data("text", value)

                jQuery(".console").data("history_index", historyIndex)



                refresh();

                break;



            case 39 :

                var cursor = jQuery(".console").data("cursor");

                if (cursor == -1) {

                    break;

                }

                cursor--;

                jQuery(".console").data("cursor", cursor);



                refresh();

                break;



            case 40 :

                var isVisible = jQuery(".console .autocomplete").is(":visible");



                if (isVisible) {

                    var selected = jQuery(".console .autocomplete ul > li.selected");

                    var selectedIndex = selected.index();

                    jQuery(".console .autocomplete ul > li.selected").removeClass("selected");

                    var target = jQuery(".console .autocomplete ul > li:nth-child("

                            + (selectedIndex + 2) + ")");

                    target.addClass("selected");



                    break;

                }



                var history = jQuery(".console").data("history") || [];

                var historyIndex = jQuery(".console").data("history_index")

                        || 0;



                var value = history[history.length - historyIndex - 1];

                if (historyIndex != 0) {

                    historyIndex--;

                }



                jQuery(".console").data("text", value)

                jQuery(".console").data("history_index", historyIndex)



                refresh();

                break;



            case 46 :

                var cursor = jQuery(".console").data("cursor");

                if (cursor == -1) {

                    break;

                }



                var first = value.slice(0, value.length - cursor - 1);

                var second = value.slice(value.length - cursor, value.length);

                var value = first + second;



                jQuery(".console").data("text", value)

                jQuery(".console").data("cursor", cursor - 1)



                refresh();

                break;



            default :

                cancel = false;

                break;

        }



        // updates the cancel data attribute in the

        // console to provide information to the hadling

        // of the key pressing in the next event

        jQuery(".console").data("cancel", cancel)



        // stops the event propagation this should be able

        // to avoid possible problems with double handling

        event.stopPropagation();

        event.stopImmediatePropagation();

    }