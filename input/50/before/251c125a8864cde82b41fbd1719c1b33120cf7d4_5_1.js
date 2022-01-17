function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.macros.MyTemplate"

            }, {

                fn : this.testAsyncLoadTplTwo,

                scope : this

            });

        }