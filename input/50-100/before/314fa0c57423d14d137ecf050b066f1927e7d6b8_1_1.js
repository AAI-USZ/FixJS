function (event) {
            event.preventDefault();
            var districtId = $("#district-autocomplete").val();
            var providerId = $("#providerId-autocomplete").val() ? $("#providerId-autocomplete").val() : "";
            var data = {
                "selectedDistrict":districtId,
                "selectedProvider":providerId
            };
            $.post('/whp/patients/search', data, function(response) {
                $('#patients').html(response);
            })
    }