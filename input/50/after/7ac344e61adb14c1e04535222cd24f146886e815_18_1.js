function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.calendar.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }