function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.icon.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }