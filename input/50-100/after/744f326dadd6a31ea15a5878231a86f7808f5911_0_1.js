function(value, element) {
        var unique = false;
        $.ajax({
            type: 'POST',
            async: false,
            url: 'uniqueuser/',
            data: $("#registrationform").serializeArray(),
            success: function(data, status, jq) {
                unique = (status == "success");
            }
        });
        return unique;
    }