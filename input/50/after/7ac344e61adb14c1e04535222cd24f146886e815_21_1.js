function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.datepicker.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }