function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.select.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }