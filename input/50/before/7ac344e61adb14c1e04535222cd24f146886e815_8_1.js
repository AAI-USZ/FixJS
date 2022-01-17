function () {

            document.getElementById("TESTAREA").style.display="none";

            Aria.loadTemplate({

                div : "TESTAREA",

                classpath : "snippets.templates.fibo.Fibonacci"

            }, {

                fn : this.notifyTestEnd,

                scope : this

            });

        }