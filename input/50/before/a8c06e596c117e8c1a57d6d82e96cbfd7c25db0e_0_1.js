function (response) {
                    $.interaction.logerror('interaction error', error);
                    element.trigger('ajaxform-error', response);
                }