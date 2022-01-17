function(data) {
        // Hide the Add button
        button.hide();
        // Add a DIV to show the iframe in
        button.after('<div></div>');
        // Load the Form into the iframe
        button.next().html(data);
        // Activate the Location Selector
        s3_gis_locationselector_activate();
        // Modify the submission URL
        var url2 = S3.Ap.concat('/pr/contact/create?person=' + personId);
        $('#popup').find('form').attr('action', url2);
        // Hide the spinner
        $('#contact-add_throbber').hide();
    }