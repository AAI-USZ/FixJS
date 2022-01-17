function(e, data){
                    if (data.direction === 'in') {
                        $(options.themeSelectionSelector).find('a[data-title="' + current + '"]').addClass('active');
                    }
                }