function(parent){
            if(typeof parent === 'function' && parent.prototype.__className__){

                // Instantiate a base class (but only create the instance,
                // don't run the init constructor)
                parent.prototype.__initializing__ = true;

                var _super = parent.prototype, proto = new parent(), prop = this.prototype;

                for(var name in prop){
                    proto[name] = name !== 'constructor' && typeof prop[name] === "function" && typeof _super[name] === "function" && fnTest.test(prop[name]) ?
                        (function(name,fn){
                            return function() {
                                var tmp = this._super;

                                // Add a new ._super() method that is the same method
                                // but on the super-class
                                this._super = _super[name];

                                // The method only need to be bound temporarily, so we
                                // remove it when we're done executing
                                var ret = fn.apply(this, arguments);
                                this._super = tmp;

                                return ret;
                            };
                        })(name, prop[name]) : prop[name];

                }
                this.prototype = proto;

                for(var t in parent.prototype.constructor){
                    if(!this.prototype.constructor[t]) this.prototype.constructor[t] = parent.prototype.constructor[t];
                }

            }else{
                // TODO:
                throw 'parent class type error!';
            }

            return this;
        }