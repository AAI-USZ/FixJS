function (event) {
        event.preventDefault();
        if ($('#district-autocomplete').val() == "" || $('#district').val() != $('#district-autocomplete').val())
            return;

        var districtId = $("#district-autocomplete").val();
        var providerId = $("#providerId-autocomplete").val();
        var data = {
            "selectedDistrict":districtId,
            "selectedProvider":providerId
        };
        $.post('/whp/patients/search', data, function (response) {
            $('#patients').html(response);
        })
    }