function(meData) {
            // I know this is hideous
            (function () {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "/dev/lib/MathJax/MathJax.js";

                var config =
                    'MathJax.Hub.Config({' +
                        'messageStyle: "none",' +
                        'config: "default.js",' +
                        'styles: {"#MathJax_Message": {display: "none !important"}}' +
                    '}); ' +
                    'MathJax.Hub.Startup.onload();';

                if (window.opera) {script.innerHTML = config;}
                else {script.text = config;}

                $("head")[0].appendChild(script);
              })();

            // Start polling to keep session alive when logged in
            if (meData.user.userid) {
                setInterval(function() {
                    $.ajax({
                        url: "/system/me",
                        cache: false,
                        success: function(data) {
                            if (!data.user.userid) {
                                document.location = "/";
                            }
                        }
                    });
                }, 60000);
            }
        }