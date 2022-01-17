function outputHelp(){
        api.print([
            "\nUsage: csslint-rhino.js [options]* [file|dir]*",
            " ",
            "Global Options",
            "  --help                    Displays this information.",
            "  --format=<format>         Indicate which format to use for output.",
            "  --list-rules              Outputs all of the rules available.",
            "  --quiet                   Only output when errors are present.",
            "  --errors=<rule[,rule]+>   Indicate which rules to include as errors.",
            "  --warnings=<rule[,rule]+> Indicate which rules to include as warnings.",
            "  --ignore=<rule,[,rule]+>  Indicate which rules to ignore completely.",
            "  --version                 Outputs the current version number."
        ].join("\n") + "\n");
    }