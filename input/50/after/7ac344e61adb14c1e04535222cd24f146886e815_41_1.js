function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.text.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }