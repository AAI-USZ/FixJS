function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.domInteractions.DomInteractionTemplate"

            }, {

                fn : this.testAsyncLoadTplTwo,

                scope : this

            });

        }