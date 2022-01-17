function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.utils.dragdrop.Drag"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }