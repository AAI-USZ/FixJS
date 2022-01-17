function () {
        jQuery.ajax({
            'url': STUDIP.ABSOLUTE_URI_STUDIP + "plugins.php/easytranslator/save_text",
            'data': {
                'originaltext': jQuery("#originaltext").val(),
                'text': jQuery("#text").val(),
                'translation': jQuery("#translation").val(),
                'origin': jQuery("#origin").val(),
                'language_id': jQuery('#language_id').val()
            },
            'type': "post",
            'success': function () {
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
        });
    }