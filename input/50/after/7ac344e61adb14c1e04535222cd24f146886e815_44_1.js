function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.widgets.tooltip.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }