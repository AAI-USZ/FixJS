function(method, options) {
        var result = null;
        options = options || {};

        if (this._parent != null) {
            var currentParent = this._parent;
            // we need to chante the parent of "this", because
            // since we are going to call the super method
            // in the context of "this", if the super method has
            // another call to super, we need to provide a way of
            // redirecting to the grandparent
            this._parent = currentParent._parent;

            // if this is the first iteration of the parentMethod recursion
            // it only has to call the method if the original call is part of the
            // own original object. If not, that first call has been already executed
            // at this point (because the prototype tree has resolved this first call as
            // member of the original object and now when we go up the tree we find
            // the same method again).
            // example:
            // X = Seed.extend({"say": function(){console.log('a')}})
            // Y = a.extend("say": function(){console.log('b');this.super('say');})
            // Z = b.extend()
            // if we create a instance of Z and call .say(), it will be resolved to the
            // .say method of X, but it will be called inside Z context. So the first time
            // .super is invoqued, 'this' will point to the instance of Z and ._parent would be
            // the same B. So in this kind of case, if we directly do ._parent.say(), we would
            // execute the same method we just have execute again. We need to skip it and let
            // the bubbling follow to X.say()
            if (!options.executeNextCall && this.isOwnProperty(method)) {
                options.executeNextCall = true;
            }

            // if the currently evaluated prototype owns this method and the executeNextCall
            // has been marked, we run the method of this prototype
            if (currentParent.isOwnProperty(method) && options.executeNextCall) {
                result = currentParent[method].call(this, options);
            }
            // if not, we evaluate the parent of the currently evaluated prototype
            else {

                // for all the next recursive calls, executeNextCall will always
                // be true, because they are not the first call.
                options.executeNextCall = true;
                result = currentParent.parent.call(this, method, options);
            }
            this._parent = currentParent;
        }
        return result;
    }