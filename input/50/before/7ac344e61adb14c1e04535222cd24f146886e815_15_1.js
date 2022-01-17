function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.utils.dragdrop.Drag"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }