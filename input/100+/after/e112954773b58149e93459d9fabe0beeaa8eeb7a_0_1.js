function (property) {

            var propertyType;

            var nullable = false;

            var propIsArray = false;

            if (property.type == "array") {

                propIsArray = true;

                if (!isDefined(property.items)) {

                    throw new Error("items not specified for array type");

                }

                // only support homogenous arrays, so .items should have 1 element

                if (property.items.length != 1) {

                    throw new Error("only homogenous arrays supported");

                }

                var itemType = this.normalizeKey(property.items[0].$ref);

                if (!itemType) {

                    switch (property.items[0]) {

                        case 'string':

                            itemType = 'String';

                            break;

                        case 'integer':

                            itemType = 'Number';

                            break;

                        default:

                            break;

                    }

                }

                propertyType = "Vector.<" + itemType + "> = new Vector.<" + itemType + ">()";

            }

            else if (isArray(property.type)) {

                // a nullable type will look like this

                // "type": ["null","integer"]

                var errMessage;

                // check for null

                if (property.type.length == 1 || property.type.length == 2) {

                    each(property.type, function (value) {

                        if (value == "null") {

                            nullable = true;

                        } else {

                            propertyType = value;

                        }

                    });

                }

                else {

                    errMessage = "only nullable union types implemented ('null' plus one simple type)";

                }

                if (errMessage) {

                    throw new Error(errMessage);

                }

            } else {

                propertyType = property.type;

            }

            if (propertyType.$ref) {

                propertyType = this.normalizeKey(propertyType.$ref);

            } else {

                propertyType = this.applyFormat(propertyType, property);

            }

            return propertyType;

        }