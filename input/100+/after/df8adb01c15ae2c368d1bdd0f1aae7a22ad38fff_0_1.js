function success_to_get_data(data) {
            var when = data['when'];
            if (when != prev_when) {
                data_x++;
                series['error'].addPoint(
                    [data_x, data['error']], true, true);
                series['warning'].addPoint(
                    [data_x, data['warning']], true, true);
                series['lint'].addPoint(
                    [data_x, data['lint']], true, true);
                prev_when = when;
                if (!data['success']) {
                    $('#border').css('border-color', 'red')
                    .css('background', '#FFAAAA');
                }else {
                    $('#border').css('background', 'white');
                    if (data['warning'] > 0) {
                        $('#border').css('border-color', 'yellow');
                    }else {
                        $('#border').css('border-color', 'green');
                    }
                }
                if(data['detail'] != null){
                    $('#detail').text(data['detail']);
                }
            }
            $("#ajaxerror").remove();
        }