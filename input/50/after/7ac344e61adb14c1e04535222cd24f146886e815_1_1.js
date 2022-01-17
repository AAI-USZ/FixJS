function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.features.prefill.Snippet"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }