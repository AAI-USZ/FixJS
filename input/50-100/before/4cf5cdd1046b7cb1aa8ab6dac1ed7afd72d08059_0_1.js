function(data) {
            $("#year").empty();
            $("#year").append('<option value="">Year</option>');
            $.each(data, function(index, year) {
                $("#year").append('<option value="' + year + '">' + year + '</option>')
            });
            clear_months();
            clear_days();
            $('form').hideLoading();
        }