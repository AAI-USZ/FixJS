function () {
                var elements = jQuery('span[data-original-string="' + jQuery("#translation_text").val() + '"]');
                jQuery.each(elements, function (index, element) {
                    if (jQuery(element).text() === jQuery(element).html()) {
                        jQuery(element).text(jQuery("#translation").val());
                    }
                });
                var tr = jQuery('tr[data-original-text="' + jQuery("#originaltext").val() + '"]')
                    .attr("data-original-text", jQuery("#translation_text").val());
                tr.find("td.translation").text(jQuery("#translation").val());
                tr.find("td.origin").text(jQuery("#translation_origin").val());
                jQuery("#edit_window").dialog('close');
            }