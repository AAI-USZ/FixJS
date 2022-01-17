function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.tooltip.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }