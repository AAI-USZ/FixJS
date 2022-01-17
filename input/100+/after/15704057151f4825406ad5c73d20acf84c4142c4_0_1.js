function(e) {
                console.log(e.origin, window.location.origin, e);
                if(e.origin != window.location.origin) return;

                console.log(typeof(e.data), e.data);

                client.login(e.data, "http://localhost:8000/auth.html", function(error, result) {
                    console.log(error, result);

                    if(error) {
                        $("body").text("Authentication failed, see log.");
                    } else {
                        $("body").text("Authenticated!");
                    }
                });

                window.removeEventListener('message', listener);
            }