function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.template.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }