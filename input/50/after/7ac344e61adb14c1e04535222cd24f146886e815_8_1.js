function () {

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.fibo.Fibonacci"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }