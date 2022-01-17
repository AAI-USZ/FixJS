function updateSelectOptions() {
            if($.isEmptyObject(selectedFilters)) {
                $('select.filter option').attr('disabled', false);
                $('.cidade-marker').show();
                $('select.filter').chosen().trigger('liszt:updated');
            } else {
                $.each(categories, function(i, category) {
                    $('select.' + category + ' option').attr('disabled', true);
                    if(category == 'cidade')
                        $('.cidade-marker').hide();
                    $.each(currentData[category], function(key, data) {
                        var $option = $('select.' + category + ' option[value="' + data[category] + '"]');
                        $option.attr('disabled', false);
                        if(category == 'cidade')
                            $('.cidade-marker[data-cidade="' + data[category] + '"]').show();
                    });
                    $('select.' + category).chosen().trigger('liszt:updated');
                });
            }
        }