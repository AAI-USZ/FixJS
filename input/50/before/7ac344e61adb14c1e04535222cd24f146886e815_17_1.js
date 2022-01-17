function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.button.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }