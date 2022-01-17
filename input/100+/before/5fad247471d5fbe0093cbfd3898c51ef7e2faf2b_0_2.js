function () {
                var elements = jQuery('span[data-original-string="' + jQuery("#text").val() + '"]');
                jQuery.each(elements, function (index, element) {
                    if (jQuery(element).text() === jQuery(element).html()) {
                        jQuery(element).text(jQuery("#translation").val());
                    }
                });
                var tr = jQuery('tr[data-original-text="' + jQuery("#originaltext").val() + '"]')
                    .attr("data-original-text", jQuery("#text").val());
                tr.find("td:nth-child(2)").text(jQuery("#translation").val());
                jQuery("#edit_window").dialog('close');
            }