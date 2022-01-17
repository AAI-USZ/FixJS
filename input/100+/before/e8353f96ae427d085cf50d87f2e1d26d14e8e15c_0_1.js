function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }

                data.info = {};
                data.info.name = ac.intl.lang( "TITLE" );

                var content = "";
                content += "<h4>app.context</h4>";
                Object.keys(ac.app.config.custom).forEach(function(key) {
                    content += key + ":" + ac.app.config.custom[key];
                    content += "<br />";
                });

                content += "<h4>mojit.context</h4>";
                Object.keys(ac.config._config).forEach(function(key) {
                    content += key + ":" + ac.config._config[key];
                    content += "<br />";
                });
                data.content = content;

                Y.log(ac.app.config.custom, "DEBUG");
                Y.log(ac.config._config, "DEBUG");

                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            }