function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.sortindicator.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }