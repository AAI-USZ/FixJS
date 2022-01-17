function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.cssTemplates.MyTemplate"

            }, {

                fn : this.testAsyncLoadTplTwo,

                scope : this

            });

        }