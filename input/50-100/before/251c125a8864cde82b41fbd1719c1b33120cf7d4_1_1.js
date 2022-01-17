function () {

    	this.$TestSuite.constructor.call(this);



        // Dummy classes "used" in snippets.core.Classes snippets

        Aria.classDefinition({$classpath: "snippets.core.classes.Plant"});

        Aria.classDefinition({$classpath: "snippets.core.classes.Gardener"});

        Aria.classDefinition({$classpath: "org.thirdparty.parsers.JavaScript"});

        Aria.classDefinition({$classpath: "org.thirdparty.parsers.PerlScript"});



        this.addTests(

            "tests.snippets.core.Asynchronous",

            "tests.snippets.core.Beans",

            "tests.snippets.core.Classes",

            "tests.snippets.core.Filters",

            "tests.snippets.core.Helpers",

            "tests.snippets.core.Interceptors"

        );

    }