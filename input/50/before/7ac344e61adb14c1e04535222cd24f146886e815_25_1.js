function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.fieldset.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }