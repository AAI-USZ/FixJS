function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.errorlist.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }