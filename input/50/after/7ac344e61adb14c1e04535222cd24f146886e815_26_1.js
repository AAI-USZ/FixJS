function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.gauge.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }