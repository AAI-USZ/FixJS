function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.features.autoselect.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }