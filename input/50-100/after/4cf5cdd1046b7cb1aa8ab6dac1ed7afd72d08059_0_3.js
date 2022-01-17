function(data) {
                $("#day").empty();
                $("#day").append('<option value="0">Day</option>');
                $.each(data, function(index, day) {
                    $("#day").append('<option value="' + day + '">' + day + '</option>')
                });
                $('form').hideLoading();
            }