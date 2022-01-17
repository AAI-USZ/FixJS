function () {

            window.alert = function(m){};

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.templateScripts.MyTemplate"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }