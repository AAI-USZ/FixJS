function () {
                        $(this).find('.bar').css('width', '0%').parent().attr('aria-valuenow', '0').attr('aria-valuetext', '0%');
                        $(this).find('.progress-extended').html('&nbsp;');
                        that._trigger('stopped', e);
                    }