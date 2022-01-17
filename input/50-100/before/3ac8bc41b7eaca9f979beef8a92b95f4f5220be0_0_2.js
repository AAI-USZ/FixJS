function(data) {
        if (data.length < 1) {
            $.post(endpoint + '/users', {
                facebook_id: facebook_id,
                firstname: firstname,
                surname: surname,
                birthdate: birthdate,
                gender: gender,
                picture_url: picture_url,
                email: email
            });

        } 
        window.localStorage.setItem("pm_facebook_id", facebook_id);
        $(location).attr('href', 'profile.html');

    }