function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.list.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }