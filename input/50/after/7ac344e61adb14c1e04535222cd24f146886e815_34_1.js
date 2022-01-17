function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.radiobutton.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }