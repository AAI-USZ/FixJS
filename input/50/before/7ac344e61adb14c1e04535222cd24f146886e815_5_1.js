function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.cssTemplates.MyTemplate"

            }, {

                fn : this.testAsyncLoadTplTwo,

                scope : this

            });

        }