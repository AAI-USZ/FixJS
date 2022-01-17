f
            var current = this.provider.peek();

            switch (this.provider.stack.length) {

                case 3: // type definition

                    outputString = "";

                    this.writeLine("package uk.co.cityindex.dto");

                    this.writeLine("{");

                    this.writeLine("import uk.co.cityindex.utils.DateUtils;");

                    this.writeLine("");

                    var typeName = "class";

                    if (!current.value["enum"]) {

                        this.writeLine("    [RemoteClass]");

                    }

                    if (current.value.description) {

                        this.writeLine("    /**");

                        this.writeLine("     * " + current.value.description);

                        this.writeLine("     * ");

                        this.writeLine("     * DO NOT EDIT -- code is generated from API metadata. Changes will be overwritten.");

                        this.writeLine("     * ");

                        this.writeLine("     */");

                    }

                    this.writeLine("    public " + typeName + " " + current.key + (current.value["extends"] ? (" extends " + this.normalizeKey(current.value["extends"])) : ""));

                    this.writeLine("    {");

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
