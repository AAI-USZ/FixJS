function(data) {
                $("#month").empty();
                $("#month").append('<option value="0">Month</option>');
                $.each(data, function(index, month) {
                    $("#month").append('<option value="' + month + '">' + months[month-1] + '</option>')
                });
                clear_days();
                $('form').hideLoading();
            }