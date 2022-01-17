function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.domInteractions.DomInteractionTemplate"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }