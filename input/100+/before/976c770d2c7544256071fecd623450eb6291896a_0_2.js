function get() {

                    var method = this[cacheKeyword].methods[name],
                        currCaller;

                    if (!this.$underStrict && !this.$constructor[$class].$underStrict) {
                        currCaller = get.caller || arguments.callee.caller || arguments.caller || caller;  // Ignore JSLint error regarding .caller and .callee
                    } else {
                        currCaller = caller;
                    }

                    if (this.$initializing || (currCaller && currCaller['$name_' + random] && (meta.allowed === callerClassId || meta.allowed === callerClassBaseId || (isArray(meta.allowed) && (contains(meta.allowed, callerClassId) || contains(meta.allowed, callerClassBaseId)))))) {
                        return method;
                    }

                    console.log(currCaller, currCaller['$name_' + random], callerClassId, callerClassBaseId, meta.allowed);
                    console.trace();
                    throw new Error('Cannot access protected method "' + name + '" of class "' + this.$name + '".');
                }