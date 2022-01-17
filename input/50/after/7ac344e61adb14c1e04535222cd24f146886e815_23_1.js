function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.div.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }