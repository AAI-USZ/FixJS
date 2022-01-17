function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.writingTemplates.TemplateStatements"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }