function(up, file, response) {
        var resp = JSON.parse(response.response);
        //add_file(resp);
        $('#id_logo').val(resp.id);
        $('#logo-thumb').html('' +
            '<img src="' + resp.url + '" >'
        );
        setLogoChoice('uploaded');
    }