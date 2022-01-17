function () {
            var result = (this instanceof AttrList)?new AttrList(name):new Attr(name),
                i;


            for (i = 0; i < validatorFunctions.length; ++i) {
                result.validatesWith(validatorFunctions[i].validator);
            }

            result.errorsWith(errorMessage).defaultsTo(defaultValueOrFunction);
            if (immutable) {
                result.isImmutable();
            }

            return result;
        }