function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.sortindicator.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }