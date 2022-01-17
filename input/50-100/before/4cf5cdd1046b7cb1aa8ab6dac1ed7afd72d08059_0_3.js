function(data) {
                $("#day").empty();
                $("#day").append('<option value="">Day</option>');
                $.each(data, function(index, day) {
                    $("#day").append('<option value="' + day + '">' + day + '</option>')
                });
                $('form').hideLoading();
            }