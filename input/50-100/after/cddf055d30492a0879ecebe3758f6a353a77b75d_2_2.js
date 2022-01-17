function () {
            var result = (this instanceof AttrList)?new AttrList(name):new Attr(name),
                i;

            for (i = 0; i < validators.length; ++i) {
                result.validatesWith(validators[i]);
            }

            //result.errorsWith(errorMessage).defaultsTo(defaultValueOrFunction);
            result.defaultsTo(defaultValueOrFunction);
            if (immutable) {
                result.isImmutable();
            }

            return result;
        }