function (json) {
             $('.correlation-cell .top span').html('');
                for (i = 0; i < json.length; i++) {
                    panel = '#correlation-panel' + json[i].rank;
                    $('.' + type + 's',  panel).html(json[i].correlation);
                }
                callbackFn();
            }