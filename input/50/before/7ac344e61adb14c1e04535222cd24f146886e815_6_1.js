function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.domEvents.Main"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }