function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.localization.statics.LocalizedTemplate"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }