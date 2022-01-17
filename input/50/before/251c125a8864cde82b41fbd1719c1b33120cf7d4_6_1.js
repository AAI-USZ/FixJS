function () {

            window.alert = function(m){console.log(m)};

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.templateScripts.MyTemplate"

            }, {

                fn : this.testAsyncLoadTplTwo,

                scope : this

            });

        }