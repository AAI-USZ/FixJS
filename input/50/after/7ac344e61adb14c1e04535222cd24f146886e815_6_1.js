function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.domEvents.Main"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }