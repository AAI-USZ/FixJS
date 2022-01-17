function(e) {
            if(e.origin != window.location.origin) return;

            console.log(typeof(e.data), e.data);

            client.login(e.data, function(error, result) {
                console.log(error, result);
                $("body").text(result);
            });

            window.removeEventListener('message', listener);
        }