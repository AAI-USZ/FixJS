function(input) {
            if (!input) return [null, null];
            var numberValue = parseFloat(input);

            // Ignore all whitespace, digits, negative sign and "." when looking for units label
            // The units must come after one or more digits
            var objRegExp = /(\-*\d+\.*\d*)(\s*)(\w*\%*)/;
            var unitsString = input.replace(objRegExp, "$3");
            if(unitsString) {
                var noSpaces = /(\s*)(\S*)(\s*)/;
                // strip out spaces and convert to lower case
                var match = (unitsString.replace(noSpaces, "$2")).toLowerCase();
            }

            return [numberValue, match];
        }