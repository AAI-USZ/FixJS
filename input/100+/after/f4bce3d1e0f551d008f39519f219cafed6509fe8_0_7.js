function login($url, $form) {

            $.ajax({
                type: 'POST',
                url: $url,
                data: $form.serialize(),
                dataType: 'xml',
                cache: false,
                beforeSend: function() {
                    $('#login-message').text('Kirjaudutaan galaksiin...').removeClass("error success").addClass("text");
                },
                success: function(data) {
                    // xml data var
                    var $xml = $(data);

                    if ($xml.text() === '0') {
                        // 0 as xml value means that auth went wrong
                        $('#login-message').text('Käyttäjätunnus tai salasana oli virheellinen!').removeClass("text success").addClass("error");
                        $('#login-message').bind('tap', function(event) {
                            $(this).text('').removeClass("error");
                            $('input[type="text"], input[type="password"]').removeClass('error');
                        });

                    } else if ($xml.text() == 1) {

                        $('#login-message').text('Kirjautuminen onnistui!').addClass("success").addClass("error text");

                        // 1 as xml value means that auth ok
                        // user information from xml var
                        var $user = $xml.find('user');
                        // set user info to User obj
                        User.username = $user.attr('username');
                        User.nickname = $user.attr('nickname');
                        User.user_id = $user.attr('id');

                        // set username in localStorage for the next time
                        window.localStorage.setItem('username', User.username);

                        $('#login-message').text('').removeClass("text success error");

                        $('#app-message').text('').removeClass("text success error");
                        $('#app-message').text('Heippa ' + User.nickname + "!").removeClass("error text").addClass("success");

                        $.mobile.changePage('#app-page');

                    } else {
                        // xml is not readable so probably something wrong with sportti server or there is some connection problem
                        $('#login-message').text('Verkkovirhe kirjauduttaessa peliin!').addClass("error").removeClass("text success");
                        $('#login-message').bind('tap', function(event) {
                            $(this).text('').removeClass("error");
                            $('input[type="text"], input[type="password"]').removeClass('error');
                        });

                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#login-message').text('Verkkovirhe kirjauduttaessa peliin').addClass("error").removeClass("success text");
                    $('#login-message').bind('tap', function(event) {
                        $(this).text('').removeClass("error");
                        $('input[type="text"], input[type="password"]').removeClass('error');
                    });
                }
            });

            return false;
        }