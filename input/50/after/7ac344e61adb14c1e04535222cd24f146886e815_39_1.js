function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.tabpanel.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }