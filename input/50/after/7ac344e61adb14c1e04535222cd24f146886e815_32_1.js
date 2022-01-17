function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.numberfield.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }