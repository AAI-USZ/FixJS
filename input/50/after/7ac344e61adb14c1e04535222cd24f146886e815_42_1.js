function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.textfield.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }