function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.datefield.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }