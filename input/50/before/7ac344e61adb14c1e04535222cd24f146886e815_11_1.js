function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.refresh.Refresh"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }