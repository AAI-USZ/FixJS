function (body, type) {
        if (body.childNodes.length > 0) {
            var console = jQuery('#console').get(0);
            var at_bottom = console.scrollTop >= console.scrollHeight - console.clientHeight;

            jQuery.each(body.childNodes, function () {
                jQuery('#console').append("<div class='" + type + "'>" + 
                                     Client.pretty_xml(this) +
                                     "</div>");
            });

            if (at_bottom) {
                console.scrollTop = console.scrollHeight;
            }
        }
    }