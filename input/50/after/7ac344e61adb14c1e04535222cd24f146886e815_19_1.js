function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.checkbox.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }