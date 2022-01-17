function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.timefield.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }