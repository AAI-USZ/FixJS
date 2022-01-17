function () {

            document.getElementById("TESTAREA").style.display="none";

            window.alert = console.log;

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.templateScripts.MyTemplate"

            }, {

                fn : this.testAsyncLoadTplTwo,

                scope : this

            });

        }