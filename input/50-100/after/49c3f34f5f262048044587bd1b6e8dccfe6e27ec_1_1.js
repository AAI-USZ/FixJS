function (propertyType, property) {

            switch (propertyType) {

                case "string":

                    // new formats "wcf-date"

                    if (property && property.hasOwnProperty("format") && property.format == "wcf-date") {

                        propertyType = "Date";

                    }

                    else {

                        propertyType = "String";

                    }

                    break;

                case "number":

                    propertyType = "Number";

                    break;

                case "integer":

                    propertyType = "Number";

                    break;

                case "boolean":

                    propertyType = "Boolean";

                    break;

                case "object":

                    propertyType = "Object";

                    break;

                case "null":

                case "any":

                default:

                    break;

            }

            return propertyType;

        }