function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.tab.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }