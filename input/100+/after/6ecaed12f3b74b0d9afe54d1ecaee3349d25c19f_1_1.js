function () {  // Add items to the selector when 'DONE' button is selected
                     var checked = jQuery(kmapSelector.treeSelector).find('.jstree-checked')
                     if (checked.length > 1 && ! kmapSelector.allowMultipleValues) {
                        jQuery(kmapSelector.treeSelector).siblings('.ui-dialog-buttonpane').children('.ui-dialog-buttonset').before(
                           jQuery('<p class="warning"/>').css('float', 'left').text('Please select just one item and try adding again.')
                           );
                        return;
                     }
                     for (var i = 0; i<checked.length; i++) {
                        var kmap_id = jQuery(checked[i]).children('input').attr('id').split('_')[1];
                        var label = jQuery(checked[i]).children('a').text();
                        item = {
                           id: kmap_id,
                           label: label
                        }
                        kmapSelector.addItem(item)
                     }
                     jQuery(kmapSelector.treeSelector).dialog("close");
                  }