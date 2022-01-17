f
            var current = this.provider.peek();

            switch (this.provider.stack.length) {

                case 3: // type definition

                    console.log("ActionScriptVisitor processing type: " + current.key);

                    outputString = "";

                    this.writeLine("package uk.co.cityindex.dto");

                    this.writeLine("{");

                    this.writeLine("");

                    var typeName = "class";

                    if (current.value["enum"]) {

                        typeName = "enum";

                    }

                    if (current.value.description) {

                        this.writeLine("    /**");

                        this.writeLine("     * " + current.value.description);

                        this.writeLine("     */");

                    }

                    this.writeLine("    public " + typeName + " " + current.key + (current.value["extends"] ? (" : " + this.normalizeKey(current.value["extends"])) : ""));

                    this.writeLine("    {");

                    if (typeName == "enum") {

                        console.log("enum not yet handled");

                    }

                    break;

                case 5: // type property

                    var propertyType = this.resolveType(current.value);

                    if (current.value.description) {

                        this.writeLine("        /**");

                        this.writeLine("         * " + current.value.description);

                        this.writeLine("         */");

                    }

                    this.writeLine("        public var " + nameLowerCaseLead(current.key) + ":" + propertyType + ";");

                    break;

            }

        },
