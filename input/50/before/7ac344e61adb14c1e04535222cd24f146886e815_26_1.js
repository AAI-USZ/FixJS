function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.gauge.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }