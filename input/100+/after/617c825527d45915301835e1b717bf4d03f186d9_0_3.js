fif(!Object.keys) {
    /** @ignore */
    Object.keys = function(o){
        /* Object function not being used as a constructor */
        /*jshint newcap:false */
        if (o !== Object(o)){
            throw new TypeError('Object.keys called on non-object');
        }

        var ret = [];
        for(var p in o){
            if(Object.prototype.hasOwnProperty.call(o,p)){
                ret.push(p);
            }
        }

        return ret;
    };
}

if (!Array.prototype.filter){
    /** @ignore */
    Array.prototype.filter = function(fun, ctx){
        var len = this.length >>> 0;
        if (typeof fun !== 'function'){
            throw new TypeError();
        }

        var res = [];
        for (var i = 0; i < len; i++){
            if (i in this){
                var val = this[i]; // in case fun mutates this
                if (fun.call(ctx, val, i, this)){
                    res.push(val);
                }
            }
        }

        return res;
    };
}

if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun, ctx){
        for(var i = 0, len = this.length; i < len; ++i) {  
            fun.call(ctx, this[i], i, this);
        }
    };
}

if(!Object.create){
    /** @ignore */
    Object.create = (function(){

        var Klass = function(){},
            proto = Klass.prototype;
        
        /** @private */
        function create(baseProto){
            Klass.prototype = baseProto || {};
            var instance = new Klass();
            Klass.prototype = proto;
            
            return instance;
        }

        return create;
    }());
}

if (!Function.prototype.bind) {  
    Function.prototype.bind = function (oThis) {  
        if (typeof this !== "function") {  
            // closest thing possible to the ECMAScript 5 internal IsCallable function  
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");  
        }  
    
        var aArgs = Array.prototype.slice.call(arguments, 1),   
            fToBind = this,   
            NOP = function () {},  
            fBound = function () {  
              return fToBind.apply(this instanceof NOP ? 
                                   this : 
                                   oThis || window,  
                                   aArgs.concat(Array.prototype.slice.call(arguments)));  
            };  
    
        NOP.prototype = this.prototype;  
        fBound.prototype = new NOP();  
    
        return fBound;
    };
}

// Basic JSON shim
if(!this.JSON){
    /** @ignore */
    this.JSON = {};
}
if(!this.JSON.stringify){
    /** @ignore */
    this.JSON.stringify = function(t){
        return '' + t;
    };
}

// ------------------------

/** @private */
var objectHasOwn = Object.prototype.hasOwnProperty;
/** @private */
var arraySlice = Array.prototype.slice;

/**
 * @name def
 * @namespace The 'definition' library root namespace.
 */
var def = /** @lends def */{
    /**
     * The JavaScript global object.
     * @type {object}
     */
    global: this,
    
    /**
     * Gets the value of an existing, own or inherited, and not "nully", property of an object,
     * or if unsatisfied, a specified default value.
     * 
     * @param {object} [o] The object whose property value is desired.
     * @param {string} p The desired property name.
     * If the value is not a string, 
     * it is converted to one, as if String(p) were used.
     * @param [dv=undefined] The default value.
     * 
     * @returns {any} The satisfying property value or the specified default value.
     * 
     * @see def.getOwn
     * @see def.nully
     */
    get: function(o, p, dv){
        var v;
        return o && (v = o[p]) != null ? v : dv;
    },
    
    getPath: function(o, path, create, dv){
        if(o && path != null){
            var parts = def.array.is(path) ? path : path.split('.');
            var L = parts.length;
            if(L){
                var i = 0;
                while(i < L){
                    var part = parts[i++];
                    var value = o[part];
                    if(value == null){
                        if(!create){ return dv; }
                        
                        value = o[part] = {};
                    }
                    o = value;
                }
            }
        }
        
        return o;
    },
        
    /** 
     * Creates a property getter function,
     * for a specified property name.
     * 
     * @param {string} name The name of the property.
     * @param [dv=undefined] 
     * The default value to return 
     * if the property would be accessed on null or undefined.
     * @type function
     */
    propGet: function(p, dv){
        p = '' + p;
        
        /**
         * Gets the value of a prespecified property 
         * of a given thing.
         * 
         * @param [o] The <i>thing</i> whose prespecified property is to be read.
         * <p>
         * If {@link o} is not "nully", 
         * but is not of type 'object', 
         * the function behaves equivalently to:
         * </p>
         * <pre>
         * return Object(o)[propName];
         * </pre>
         * 
         * @returns {any}
         * If the specified {@link o} is not "nully", 
         * returns the value of the prespecified property on it; 
         * otherwise, returns the prespecified default value.
         * 
         * @private
         */
        return function(o){ 
            return o != null ? o[p] : dv;
        };
    },
    
    // TODO: propSet ?
    
    /**
     * Gets the value of an existing, own, and not "nully", property of an object,
     * or if unsatisfied, a specified default value.
     * 
     * @param {object} [o] The object whose property value is desired.
     * @param {string} p The desired property name.
     * If the value is not a string, 
     * it is converted to one, as if String(p) were used.
     * @param dv The default value.
     * 
     * @returns {any} The satisfying property value or the specified default value.
     * 
     * @see def.get
     * @see def.hasOwn
     * @see def.nully
     */
    getOwn: function(o, p, dv){
        var v;
        return o && objectHasOwn.call(o, p) && (v = o[p]) != null ? v : dv;
    },
    
    hasOwn: function(o, p){
        return !!o && objectHasOwn.call(o, p);
    },
    
    set: function(o){
        if(!o) {
            o = {};
        }
        
        var a = arguments;
        for(var i = 1, A = a.length - 1 ; i < A ; i += 2) {
            o[a[i]] = a[i+1];
        }
        
        return o;
    },

    setDefaults: function(o){
        if(!o) {
            o = {};
        }

        var a = arguments;
        for(var i = 1, A = a.length - 1 ; i < A ; i += 2) {
            var p = a[i];
            if(o[p] == null){
                o[p] = a[i+1];
            }
        }

        return o;
    },

    setUDefaults: function(o){
        if(!o) {
            o = {};
        }

        var a = arguments;
        for(var i = 1, A = a.length - 1 ; i < A ; i += 2) {
            var p = a[i];
            if(o[p] === undefined){
                o[p] = a[i+1];
            }
        }

        return o;
    },
    
    /**
     * Calls a function 
     * for every <i>own</i> property of a specified object.
     * 
     * @param {object} [o] The object whose own properties are traversed.
     * @param {function} [fun] The function to be called once per own property of <i>o</i>. 
     * The signature of the function is:
     * <pre>
     * function(value, property : string, o : object) : any
     * </pre>
     * 
     * @param {object} [ctx=null] The context object on which to call <i>fun</i>.
     * 
     * @type undefined
     */
    eachOwn: function(o, fun, ctx){
        if(o){
            for(var p in o){
                if(objectHasOwn.call(o, p)){
                    fun.call(ctx, o[p], p, o);
                }
            }
        }
    },
    
    /**
     * Calls a function 
     * for every property of a specified object, own or inherited.
     * 
     * @param {object} [o] The object whose own properties are traversed.
     * @param {function} [fun] The function to be called once per own property of <i>o</i>. 
     * The signature of the function is:
     * <pre>
     * function(value, property : string, o : object) : any
     * </pre>
     * 
     * @param {object} [ctx=null] The context object on which to call <i>fun</i>.
     * 
     * @type undefined
     */
    each: function(o, fun, ctx){
        if(o){
            for(var p in o){
                fun.call(ctx, o[p], p, o);
            }
        }
    },
    
    copyOwn: function(a, b){
        var to, from;
        if(arguments.length >= 2) {
            to = a || {};
            from = b;
        } else {
            to   = {};
            from = a;
        }
        
        if(from){
            for(var p in from){
                if(objectHasOwn.call(from, p)){
                    to[p] = from[p];
                }
            }
        }

        return to;
    },
    
    copy: function(a, b){
        var to, from;
        if(arguments.length >= 2) {
            to = a || {};
            from = b;
        } else {
            to   = {};
            from = a;
        }
        
        if(from) {
            for(var p in from) { 
                to[p] = from[p];
            }
        }
        
        return to;
    },
    
    ownKeys: Object.keys,
    
    keys: function(o){
        var keys = [];
        for(var p in o) {
            keys.push(p);
        }
        
        return keys;
    },
    
    own: function(o){
        return Object.keys(o)
                     .map(function(key){ return o[key]; });
    },
    
    scope: function(scopeFun, ctx){
        return scopeFun.call(ctx);
    },
    
    // Special functions ----------------
    
    /**
     * The natural order comparator function.
     * @field
     * @type function
     */
    compare: function(a, b){
        /* Identity is favored because, otherwise,
         * comparisons like: compare(NaN, 0) would return 0...
         * This isn't perfect either, because:
         * compare(NaN, 0) === compare(0, NaN) === -1
         * so sorting may end in an end or the other...
         */
        return (a === b) ? 0 : ((a > b) ? 1 : -1);
        //return (a < b) ? -1 : ((a > b) ? 1 : 0);
    },
    
    methodCaller: function(p, context){
        if(context){
            return function(){
                return context[p].apply(context, arguments); 
            };
        }
        
        /* floating method */
        return function(){
            return this[p].apply(this, arguments); 
        };
    },
    
    /**
     * The identity function.
     * @field
     * @type function
     */
    identity: function(x){ return x; },
    
    add: function(a, b){ return a + b; },

    // negate?
    
    // Constant functions ----------------
    
    /**
     * The NO OPeration function.
     * @field
     * @type function
     */
    noop: function noop(){ /* NOOP */ },
    
    retTrue:  function(){ return true;  },
    retFalse: function(){ return false; },
    
    // Type namespaces ----------------
    
    number: {
        as: function(d, dv){
            var v = parseFloat(d);
            return isNaN(v) ? (dv || 0) : v;
        }
    },
    
    array: {

        is: function(v){
            return (v instanceof Array);
        },
        
        isLike: function(v){
            return v && (v.length != null) && (typeof v !== 'string');
        },
        
        /**
         * Converts something to an array if it is not one already,
         * and if it is not nully.
         * 
         * @param thing A thing to convert to an array.
         * @returns {Array} 
         */
        as: function(thing){
            return (thing instanceof Array) ? thing : ((thing != null) ? [thing] : null);
        }
    },
    
    object: {
        as: function(v){
            return v && typeof(v) === 'object' ? v : null;
        },
        
        asNative: function(v){
            return v && typeof(v) === 'object' && v.constructor === Object ?
                    v :
                    null;
        }
    },
    
    string: {
        is: function(v){
            return typeof v === 'string';
        },
        
        join: function(sep){
            var args = [],
                a = arguments;
            for(var i = 1, L = a.length ; i < L ; i++){
                var v = a[i];
                if(v != null && v !== ""){
                    args.push("" + v);
                }
            }
        
            return args.join(sep);
        }
    },
    
    fun: {
        is: function(v){
            return typeof v === 'function';
        },
        
        as: function(v){
            return typeof v === 'function' ? v : def.fun.constant(v);
        },
        
        constant: function(v){
            return function(){ return v; };
        }
    },
    
    // nully to 'dv'
    nullyTo: function(v, dv){
        return v != null ? v : dv;
    },
    
    within: function(v, min, max){
        return Math.max(min, Math.min(v, max));
    },
    
    // Predicates ----------------
    
    // === null || === undefined
    nully: function(v){
        return v == null;
    },
    
    // !== null && !== undefined
    notNully: function(v){
        return v != null;
    },
    
    empty: function(v){
        return v == null || v === '';
    },
    
    notEmpty: function(v){
        return v != null && v !== '';
    },
    
    /**
     * The truthy function.
     * @field
     * @type function
     */
    truthy: function(x){ return !!x; },
    
    /**
     * The falsy function.
     * @field
     * @type function
     */
    falsy: function(x){ return !x; },
    
    // -----------------
    
    /* Ensures the first letter is upper case */
    firstUpperCase: function(s){
        if(s) {
            var c  = s.charAt(0),
                cU = c.toUpperCase();
            if(c !== cU) {
                s = cU + s.substr(1);
            }
        }
        return s;
    },
    
    /**
     * Formats a string by replacing 
     * place-holder markers, of the form "{foo}",
     * with the value of corresponding properties
     * of the specified scope argument.
     * 
     * @param {string} mask The string to format.
     * @param {object} [scope] The scope object.
     * 
     * @example
     * <pre>
     * def.format("The name '{0}' is undefined.", ['foo']);
     * // == "The name 'foo' is undefined."
     * 
     * def.format("The name '{foo}' is undefined, and so is '{what}'.", {foo: 'bar'});
     * // == "The name 'bar' is undefined, and so is ''."
     * 
     * def.format("The name '{{foo}}' is undefined.", {foo: 'bar'});
     * // == "The name '{{foo}}' is undefined."
     * </pre>
     * 
     * @returns {string} The formatted string.
     */
    format: function(mask, scope){
        if(mask == null || mask === '') {
            return "";
        }
        return mask.replace(/(^|[^{])\{([^{}]+)\}/g, function($0, before, prop){
            var value = scope ? scope[prop] : null;
            return before + (value == null ? "" : value); 
        });
    },
    
    // --------------
    
    error: function(error){
        return (error instanceof Error) ? error : new Error(error);
    },
    
    fail: function(error){
        throw def.error(error);
    },
    
    assert: function(msg, scope){
        throw def.error.assertionFailed(msg, scope);
    }
};

// Adapted from
// http://www.codeproject.com/Articles/133118/Safe-Factory-Pattern-Private-instance-state-in-Jav/
def.shared = function(){
    var _channel = null;

    /** @private */
    function create(value){

        /** @private */
        function safe(){
            _channel = value;
        }

        return safe;
    }

    /** @private */
    function opener(safe){
        if(_channel != null){ throw new Error("Access denied."); }

        safe();

        var value;
        value = _channel;
        _channel = null;
        return value;
    }
    
    opener.safe = create;

    return opener;
};

var errors = {
    operationInvalid: function(msg, scope){
        return def.error(def.string.join(" ", "Invalid operation.", def.format(msg, scope)));
    },

    notImplemented: function(){
        return def.error("Not implemented.");
    },

    argumentRequired: function(name){
        return def.error(def.format("Required argument '{0}'.", [name]));
    },

    argumentInvalid: function(name, msg, scope){
        return def.error(
                   def.string.join(" ",
                       def.format("Invalid argument '{0}'.", [name]), 
                       def.format(msg, scope)));
    },

    assertionFailed: function(msg, scope){
        return def.error(
                   def.string.join(" ", 
                       "Assertion failed.", 
                       def.format(msg, scope)));
    }
};

def.copyOwn(def.error, errors);

/* Create direct fail versions of errors */
def.eachOwn(errors, function(errorFun, name){
    def.fail[name] = function(){
        throw errorFun.apply(null, arguments);
    };
});

// -----------------------

/** @private */
var currentNamespace = def, // at the end of the file it is set to def.global
    globalNamespaces = {}, // registered global namespaces by name: globalName -> object
    namespaceStack   = [];

/** @private */
function globalSpace(name, space){
    return globalNamespaces[name] = space;
}

/** @private */
function getNamespace(name, base){
    var current = base || currentNamespace;
    if(name){
        var parts = name.split('.');
        var L = parts.length;
        if(L){
            var i = 0;
            var part;
            if(current === def.global){
                part = parts[0];
                var globalNamespace = def.getOwn(globalNamespaces, part);
                if(globalNamespace){
                    current = globalNamespace;
                    i++;
                }
            }
            
            while(i < L){
                part = parts[i++];
                current = current[part] || (current[part] = {});
            }
        }
    }

    return current;
}

/** 
 * Ensures a namespace exists given its name and, optionally, its base namespace.
 * If a definition function is specified,
 * it is executed having the namespace as current namespace.
 *  
 * @param {string} name The namespace name.
 * @param {object} [base] The base namespace object.
 * @param {function} [definition] The namespace definition function.
 * @type object
 * 
 * @private 
 */
function createSpace(name, base, definition){
    if(def.fun.is(base)){
        definition = base;
        base = null;
    }
    
    var namespace = getNamespace(name, base);
    
    if(definition){
        namespaceStack.push(currentNamespace);
        try{
            definition(namespace);
        } finally {
            currentNamespace = namespaceStack.pop();
        }
    }

    return namespace;
}

/** @private */
function defineName(namespace, name, value){
    /*jshint expr:true */
    !def.hasOwn(namespace, name) ||
        def.fail.operationInvalid("Name '{0}' is already defined in namespace.", [name]);

    return namespace[name] = value;
}

/**
 * Defines a relative namespace with 
 * name <i>name</i> on the current namespace.
 * 
 * <p>
 * Namespace declarations may be nested.
 * </p>
 * <p>
 * The current namespace can be obtained by 
 * calling {@link def.space} with no arguments.
 * The current namespace affects other nested declarations, such as {@link def.type}.
 * </p>
 * <p>
 * A composite namespace name contains dots, ".", separating its elements.
 * </p>
 * @example
 * <pre>
 * def.space('foo.bar', function(space){
 *     space.hello = 1;
 * });
 * </pre>
 *
 * @function
 *
 * @param {String} name The name of the namespace to obtain.
 * If nully, the current namespace is implied.
 * 
 * @param {Function} definition
 * A function that is called whith the desired namespace
 * as first argument and while it is current.
 * 
 * @returns {object} The namespace.
 */
def.space = createSpace;

/**
 * Registers a name and an object as a global namespace.
 * @param {string} name The name of the global namespace component to register.
 * @param {object} space The object that represents the namespace.
 * @returns {object} the registered namespace object.
 */
def.globalSpace = globalSpace;

// -----------------------

/** @private */
function mixinRecursive(instance, mixin){
    for(var p in mixin){
        var vMixin = mixin[p];
        if(vMixin !== undefined){
            var oMixin,
                oTo = def.object.asNative(instance[p]);

            if(oTo){
                oMixin = def.object.as(vMixin);
                if(oMixin){
                    mixinRecursive(oTo, oMixin);
                } else {
                    // Overwrite oTo
                    instance[p] = vMixin;
                }
            } else {
                oMixin = def.object.asNative(vMixin);
                if(oMixin){
                    vMixin = Object.create(oMixin);
                }

                instance[p] = vMixin;
            }
        }
    }
}

def.mixin = function(instance/*mixin1, mixin2, ...*/){
    for(var i = 1, L = arguments.length ; i < L ; i++){
        var mixin = arguments[i];
        if(mixin){
            mixin = def.object.as(mixin.prototype || mixin);
            if(mixin){
                mixinRecursive(instance, mixin);
            }
        }
    }

    return instance;
};

// -----------------------

/** @private */
function createRecursive(instance){
    for(var p in instance){
        var vObj = def.object.asNative(instance[p]);
        if(vObj){
            createRecursive( (instance[p] = Object.create(vObj)) );
        }
    }
}
    
// Creates an object whose prototype is the specified object.
def.create = function(/* [deep, ] baseProto, mixin1, mixin2, ...*/){
    var mixins = arraySlice.call(arguments),
        deep = true,
        baseProto = mixins.shift();

    if(typeof(baseProto) === 'boolean'){
        deep = baseProto;
        baseProto = mixins.shift();
    }

    var instance = baseProto ? Object.create(baseProto) : {};
    if(deep){
        createRecursive(instance);
    }

    // NOTE:
    if(mixins.length > 0){
        mixins.unshift(instance);
        def.mixin.apply(def, mixins);
    }

    return instance;
};

// -----------------------

def.scope(function(){
    var shared = def.shared();

    /** @private */
    function typeLocked(){
        return def.error.operationInvalid("Type is locked.");
    }

    /** @ignore */
    var typeProto = /** lends def.type# */{
        init: function(init){
            /*jshint expr:true */
            
            init || def.fail.argumentRequired('init');
            
            var state = shared(this.safe);
            
            !state.locked || def.fail(typeLocked());
            
            // NOTE: access to init inherits baseState's init! 
            // Before calling init or postInit, baseState.initOrPost is inherited as well. 
            var baseInit = state.init;
            if(baseInit){
                init = override(init, baseInit);
            }
            
            state.init = init;
            state.initOrPost = true;
            
            return this;
        },

        postInit: function(postInit){
            /*jshint expr:true */
            
            postInit || def.fail.argumentRequired('postInit');
            
            var state = shared(this.safe);
            
            !state.locked || def.fail(typeLocked());
            
            // NOTE: access to post inherits baseState's post! 
            // Before calling init or postInit, baseState.initOrPost is inherited as well.
            var basePostInit = state.post;
            if(basePostInit){
                postInit = override(postInit, basePostInit);
            }
            
            state.post = postInit;
            state.initOrPost = true;
            
            return this;
        },
        
        add: function(mixin){
            var state = shared(this.safe);
            
            /*jshint expr:true */
            !state.locked || def.fail(typeLocked());

            var proto = this.prototype;
            var baseState = state.base;

            def.eachOwn(mixin.prototype || mixin, function(value, p){
                if(value){
                    // Try to convert to method
                    var method = asMethod(value);
                    if(method) {
                        state.methods[p] = method;
                        
                        // Check if it is an override
                        var baseMethod;
                        if(baseState && (baseMethod = baseState.methods[p]) &&
                           // Exclude inherited stuff from Object.prototype
                           (baseMethod instanceof Method)){
                            
                            // Replace value with an override function 
                            // that intercepts the call and sets the correct
                            // 'base' property before calling the original value function
                            value = baseMethod.override(method);
                        }
                    }
                }
                
                proto[p] = value;
            });

            return this;
        }
    };

    // TODO: improve this code with indexOf
    function TypeName(full){
        var parts;
        if(full){
            if(full instanceof Array){
                parts = full;
                full  = parts.join('.');
            } else {
                parts = full.split('.');
            }
        }
        
        if(parts && parts.length > 1){
            this.name           = parts.pop();
            this.namespace      = parts.join('.');
            this.namespaceParts = parts;
        } else {
            this.name = full || null;
            this.namespace = null;
            this.namespaceParts = [];
        }
    }
    
    TypeName.prototype.toString = function(){
        return this.namespace + '.' + this.name; 
    };
    
    function Method(spec) {
        this.fun = spec.as;
        if(spec) {
            if(spec.isAbstract) {
                this.isAbstract = true;
            }
        }
    }
    
    def.copyOwn(Method.prototype, {
        isAbstract: false,
        override: function(method){
            // *this* is the base method
            if(this.isAbstract) {
                // Abstract base methods do not maintain 'base' property.
                // Interception is not needed.
                return method.fun;
            }
            
            var fun2 = override(method.fun, this.fun);
            // replacing the original function with the wrapper function
            // makes sure that multiple (> 1) overrides work
            method.fun = fun2;
            
            return fun2;
        }
    });
    
    /** @private */
    function asMethod(fun) {
        if(fun) {
            if(def.fun.is(fun)) {
                return new Method({as: fun});
            }
            
            if(fun instanceof Method) {
                return fun;
            }
            
            if(def.fun.is(fun.as)) {
                return new Method(fun);
            }
            
            if(fun.isAbstract) {
                return new Method({isAbstract: true, as: def.fail.notImplemented });
            }
        }
        
        return null;
    }
    
    /** @private */
    function method(fun) {
        return asMethod(fun) || def.fail.argumentInvalid('fun');
    }
    
    // -----------------
    
    function rootType(){
    }
    
    var rootProto = rootType.prototype;
    // Unfortunately, creates an enumerable property in every instance
    rootProto.base = undefined;
    
    var rootState = {
        locked:      true,
        init:        undefined,
        postInit:    undefined,
        initOrPost:  false,
        methods:     {},
        constructor: rootType
    };
    
    rootType.safe = shared.safe(rootState);
    
    // -----------------
    
    /** @private */
    function override(method, base){
        
        return function(){
            var prevBase = rootProto.base;
            rootProto.base = base;
            try{
                return method.apply(this, arguments);
            } finally {
                rootProto.base = prevBase;
            }
        };
    }
    
    function overrideMethod(mname, method){
        this[mname] = override(method, this[mname]);
        return this;
    }
    
    // -----------------
    
    /** @private */
    function inherits(type, base){
     // Inherit
        var proto = type.prototype = Object.create(base.prototype);
        // Unfortunately, creates an enumerable property in every instance
        proto.constructor = type;
        
        return proto;
    }
    
    // -----------------
    
    /** @private */
    function createConstructor(state){
         
        function constructor(){
            /*jshint expr:true */
            var method;
            if(state.initOrPost){
                (method = state.init) && method.apply(this, arguments);
                (method = state.post) && method.apply(this, arguments);
            }
        }
        
        return constructor;
    }
    
    /**
     * Constructs a type with the specified name in the current namespace.
     * 
     * @param {string} [name] The new type name, relative to the base argument.
     * When unspecified, an anonymous type is created.
     * The type is not published in any namespace.
     *  
     * @param {object} [baseType] The base type.
     * @param {object} [space] The namespace where to define a named type.
     * The default namespace is the current namespace.
     */
    function type(name, baseType, space){
        
        var typeName = new TypeName(name);
        
        // ---------------
        
        var baseState;
        if(baseType){
            baseState = (baseType.safe && shared(baseType.safe)) ||
                         def.fail.operationInvalid("Invalid \"foreign\" base type.");
            baseState.locked = true;
        } else {
            baseType  = rootType;
            baseState = rootState;
        }
        
        // ---------------
        
        var state = Object.create(baseState);
        state.locked  = false;
        state.base    = baseState;
        state.methods = Object.create(baseState.methods);
        
        // ---------------
        
        var constructor = createConstructor(state);
        
        def.copyOwn(constructor, typeProto);
        
        constructor.name     = typeName.name;
        constructor.typeName = typeName;
        constructor.safe     = shared.safe(state);
        
        var proto = inherits(constructor, baseType);
        
        state.constructor = constructor;
        
        // ---------------
        // Default methods (can be overwritten with Type#add)
        
        proto.override = overrideMethod;
        
        proto.toString = function(){
            return "[" + typeName + "]";
        };
        
        // ---------------
        
        if(typeName.name){
            defineName(def.space(typeName.namespace, space), 
                       typeName.name, 
                       constructor);
        }
        
        return constructor;
    }
    
    def.type   = type;
    def.method = method;
});

// ----------------------

def.copyOwn(def.array, /** @lends def.array */{
    /**
     * Creates an array of the specified length,
     * and, optionally, initializes it with the specified default value.
     */
    create: function(len, dv){
        var a = len >= 0 ? new Array(len) : [];
        if(dv !== undefined){
            for(var i = 0 ; i < len ; i++){
                a[i] = dv;
            }
        }
        
        return a;
    },

    append: function(target, source, start){
        if(start == null){
            start = 0;
        }

        for(var i = 0, L = source.length, T = target.length ; i < L ; i++){
            target[T + i] = source[start + i];
        }

        return target;
    },
    
    removeAt: function(array, index){
        return array.splice(index, 1)[0];
    },
    
    insertAt: function(array, index, elem){
        array.splice(index, 0, elem);
        return array;
    },
    
    binarySearch: function(array, item, comparer, key){
        if(!comparer) { comparer = def.compare; }
        
        var low  = 0, high = array.length - 1;
        while(low <= high) {
            var mid = (low + high) >> 1; // <=>  Math.floor((l+h) / 2)
            
            var result = comparer(item, key ? key(array[mid]) : array[mid]);
            if (result < 0) {
                high = mid - 1;
            } else if (result > 0) {
                low = mid + 1;
            } else {
                return mid;
            }
        }
        
        /* Item was not found but would be inserted at ~low */
        return ~low; // two's complement <=> -low - 1
        
        /*
        case low == high (== mid)
          if result > 0
               [low <- mid + 1]  => (low > high)
            insert at (new) low
          
          if result < 0
               [high <- mid - 1] => (low > high)
            insert at low
       */
    },

    /**
     * Inserts an item in an array, 
     * previously sorted with a specified comparer,
     * if the item is not already contained in it.
     *
     * @param {Array} array A sorted array.
     * @param item An item to insert in the array.
     * @param {Function} [comparer] A comparer function.
     * 
     * @returns {Number}
     * If the item is already contained in the array returns its index.
     * If the item was not contained in the array returns the two's complement
     * of the index where the item was inserted.
     */
    insert: function(array, item, comparer){
        
        var index = def.array.binarySearch(array, item, comparer);
        if(index < 0){
            // Insert at the two's complement of index
            array.splice(~index, 0, item);
        }
        
        return index;
    },
    
    remove: function(array, item, comparer){
        var index = def.array.binarySearch(array, item, comparer);
        if(index >= 0) {
            return array.splice(index, 1)[0];
        }
        // return undefined;
    }
});

// -----------------

var nextGlobalId  = 1,
    nextIdByScope = {};
def.nextId = function(scope){
    if(scope) {
        var nextId = def.getOwn(nextIdByScope, scope) || 1;
        nextIdByScope[scope] = nextId + 1;
        return nextId;
    }
    
    return nextGlobalId++;
};

// --------------------

def.type('Map')
.init(function(source){
    this.source = source || {};
    this.count  = source ? def.ownKeys(source).length : 0;
})
.add({
    has: function(p){
        return objectHasOwn.call(this.source, p);
    },
    
    get: function(p){
        return objectHasOwn.call(this.source, p) ? 
               this.source[p] : 
               undefined;
    },
    
    set: function(p, v){
        var source = this.source;
        if(!objectHasOwn.call(source, p)) {
            this.count++;
        }
        
        source[p] = v;
        return this;
    },
    
    rem: function(p){
        if(objectHasOwn.call(this.source, p)) {
            delete this.source[p];
            this.count--;
        }
        
        return this;
    },
    
    clear: function(){
        if(this.count) {
            this.source = {}; 
            this.count  = 0;
        }
        return this;
    },
    
    values: function(){
        return def.own(this.source);
    },
    
    keys: function(){
        return def.ownKeys(this.source);
    }
});

// --------------------

def.html = {
    // TODO: lousy multipass implementation!
    escape: function(str){
        return str.replace(/&/gm, "&amp;")
                  .replace(/</gm, "&lt;")
                  .replace(/>/gm, "&gt;")
                  .replace(/"/gm, "&quot;");    
    }
};

// --------------------

def.type('Query')
.init(function(){
    this.index = -1;
    this.item = undefined;
})
.add({
    next: function(){
        // already was finished
        if(this.index === -2){
            return false;
        }
        
        var nextIndex = this.index + 1;
        if(!this._next(nextIndex)){
            this.index = -2;
            this.item = undefined;
            return false;
        }
        
        this.index = nextIndex;
        return true;
    },
    
    /**
     * @name _next
     * @function
     * @param {number} nextIndex The index of the next item, if one exists.
     * @member def.Query#
     * @returns {boolean} truthy if there is a next item, falsy otherwise.
     */
    _next: def.method({isAbstract: true}),
    
    _finish: function(){
        this.index = -2;
        this.item  = undefined;
    },
    
    // ------------
    
    each: function(fun, ctx){
        while(this.next()){
            if(fun.call(ctx, this.item, this.index) === false) {
                return true;
            }
        }
        
        return false;
    },
    
    array: function(){
        var array = [];
        while(this.next()){
            array.push(this.item);
        }
        return array;
    },
    
    /**
     * Consumes the query and fills an object
     * with its items.
     * <p>
     * A property is created per item in the query.
     * The default name of each property is the string value of the item.
     * The default value of the property is the item itself.
     * </p>
     * <p>
     * In the case where two items have the same key, 
     * the last one overwrites the first. 
     * </p>
     * 
     * @param {object}   [keyArgs] Keyword arguments.
     * @param {function} [keyArgs.value] A function that computes the value of each property.
     * @param {function} [keyArgs.name]  A function that computes the name of each property.
     * @param {object}   [keyArgs.context] The context object on which <tt>keyArgs.name</tt> and <tt>keyArgs.value</tt>
     * are called.
     * @param {object}   [keyArgs.target] The object that is to receive the properties, 
     * instead of a new one being creating.
     * 
     * @returns {object} A newly created object, or the specified <tt>keyArgs.target</tt> object,
     * filled with properties. 
     */
    object: function(keyArgs){
        var target   = def.get(keyArgs, 'target') || {},
            nameFun  = def.get(keyArgs, 'name' ),    
            valueFun = def.get(keyArgs, 'value'),
            ctx      = def.get(keyArgs, 'context');
        
        while(this.next()){
            var name = '' + (nameFun ? nameFun.call(ctx, this.item, this.index) : this.item);
            target[name] = valueFun ? valueFun.call(ctx, this.item, this.index) : this.item;
        }
        
        return target;
    },
    
    reduce: function(accumulator/*, [initialValue]*/){
        var i = 0, 
            result;
      
        if(arguments.length < 2) {
            if(!this.next()) {
                throw new TypeError("Length is 0 and no second argument");
            }
            
            result = this.item;
        } else {  
            result = arguments[1];
        }
        
        while(this.next()) {
            result = accumulator(result, this.item, this.index);
          
            ++i;
        }
      
        return result;
    },
    
    /**
     * Consumes the query and obtains the number of items.
     * 
     * @type number
     */
    count: function(){
        var count = 0;
        
        while(this.next()){ count++; }
        
        return count;
    },
    
    /**
     * Returns the first item that satisfies a specified predicate.
     * <p>
     * If no predicate is specified, the first item is returned. 
     * </p>
     *  
     * @param {function} [pred] A predicate to apply to every item.
     * @param {any} [ctx] The context object on which to call <tt>pred</tt>.
     * @param {any} [dv=undefined] The value returned in case no item exists or satisfies the predicate.
     * 
     * @type any
     */
    first: function(pred, ctx, dv){
        while(this.next()){
            if(!pred || pred.call(ctx, this.item, this.index)) {
                var item = this.item;
                this._finish();
                return item;
            }
        }
        
        return dv;
    },
    
    /**
     * Returns <tt>true</tt> if there is at least one item satisfying a specified predicate.
     * <p>
     * If no predicate is specified, returns <tt>true</tt> if there is at least one item. 
     * </p>
     *  
     * @param {function} [pred] A predicate to apply to every item.
     * @param {any} [ctx] The context object on which to call <tt>pred</tt>.
     * 
     * @type boolean
     */
    any: function(pred, ctx){
        while(this.next()){
            if(!pred || pred.call(ctx, this.item, this.index)) {
                this._finish();
                return true; 
            }
        }
        
        return false;
    },
    
    /**
     * Returns <tt>true</tt> if all the query items satisfy the specified predicate.
     * @param {function} pred A predicate to apply to every item.
     * @param {any} [ctx] The context object on which to call <tt>pred</tt>.
     * 
     * @type boolean
     */
    all: function(pred, ctx){
        while(this.next()){
            if(!pred.call(ctx, this.item, this.index)) {
                this._finish();
                return false; 
            }
        }
        
        return true;
    },
    
    min: function(){
        var min = null;
        while(this.next()){
            if(min === null || this.item < min) {
                min = this.item;
            }
        }
        
        return min;
    },
    
    max: function(){
        var max = null;
        while(this.next()){
            if(max === null || this.item > max) {
                max = this.item;
            }
        }
        
        return max;
    },
    
    range: function(){
        var min = null,
            max = null;
        
        while(this.next()){
            var item = this.item;
            if(min === null) {
                min = max = item;
            } else {
                if(item < min) {
                    min = item;
                }
                if(item > max) {
                    max = item;
                }
            }
        }
        
        return min != null ? {min: min, max: max} : null;
    },
    
    index: function(keyFun, ctx){
        var keyIndex = {};
        
        this.each(function(item){
            var key = keyFun ? keyFun.call(ctx, item) : item;
            if(key != null) {
                var sameKeyItems = def.getOwn(keyIndex, key) || (keyIndex[key] = []);
            
                sameKeyItems.push(item);
            }
        });
        
        return keyIndex;
    },
    
    uniqueIndex: function(keyFun, ctx){
        var keyIndex = {};
        
        this.each(function(item){
            var key = keyFun ? keyFun.call(ctx, item) : item;
            if(key != null && !def.hasOwn(keyIndex, key)) {
                keyIndex[key] = item;
            }
        });
        
        return keyIndex;
    },
    
    // ---------------
    // Query -> Query
    
    // deferred map
    select: function(fun, ctx){
        return new def.SelectQuery(this, fun, ctx);
    },

    selectMany: function(fun, ctx){
        return new def.SelectManyQuery(this, fun, ctx);
    },

    // deferred filter
    where: function(fun, ctx){
        return new def.WhereQuery(this, fun, ctx);
    },

    distinct: function(fun, ctx){
        return new def.DistinctQuery(this, fun, ctx);
    },

    skip: function(n){
        return new def.SkipQuery(this, n);
    },
    
    take: function(n){
        return new def.TakeQuery(this, n);
    },
    
    wahyl: function(pred, ctx){
        return new def.WhileQuery(this, pred, ctx);
    },
    
    reverse: function(){
        return new def.ReverseQuery(this);
    }
});

def.type('NullQuery', def.Query)
.add({
    _next: function(nextIndex){}
});

def.type('AdhocQuery', def.Query)
.init(function(next){
    this.base();
    this._next = next;
});

def.type('ArrayLikeQuery', def.Query)
.init(function(list){
    this.base();
    this._list  = def.array.isLike(list) ? list : [list];
    this._count = this._list.length;
})
.add({
    _next: function(nextIndex){
        if(nextIndex < this._count){
            this.item = this._list[nextIndex];
            return 1;
        }
    },
    
    /**
     * Obtains the number of items of a query.
     * 
     * This is a more efficient implementation for the array-like class.
     * @type number
     */
    count: function(){
        // Count counts remaining items
        var remaining = this._count;
        if(this.index >= 0){
            remaining -= (this.index + 1);
        }
        
        // Count consumes all remaining items
        this._finish();
        
        return remaining;
    }
});

def.type('RangeQuery', def.Query)
.init(function(start, count, step){
    this.base();
    this._index = start;
    this._count = count;
    this._step  = step == null ? 1 : step;
})
.add({
    _next: function(nextIndex){
        if(nextIndex < this._count){
            this.item = this._index;
            this._index += this._step;
            return 1;
        }
    },
    
    /**
     * Obtains the number of items of a query.
     * This is a more efficient implementation.
     * @type number
     */
    count: function(){
        // Count counts remaining items
        var remaining = this._count;
        if(this.index >= 0){
            remaining -= (this.index + 1);
        }
        
        // Count consumes all remaining items
        this._finish();
        
        return remaining;
    }
});

def.type('WhereQuery', def.Query)
.init(function(source, where, ctx){
    this.base();
    this._where  = where;
    this._ctx    = ctx;
    this._source = source;
})
.add({
    _next: function(nextIndex){
        while(this._source.next()){
            var nextItem = this._source.item;
            if(this._where.call(this._ctx, nextItem, this._source.index)){
                this.item = nextItem;
                return 1;
            }
        }
    }
});

def.type('WhileQuery', def.Query)
.init(function(source, pred, ctx){
    this.base();
    this._pred  = pred;
    this._ctx    = ctx;
    this._source = source;
})
.add({
    _next: function(nextIndex){
        while(this._source.next()){
            var nextItem = this._source.item;
            if(this._pred.call(this._ctx, nextItem, this._source.index)){
                this.item = nextItem;
                return 1;
            }
            return 0;
        }
    }
});

def.type('SelectQuery', def.Query)
.init(function(source, select, ctx){
    this.base();
    this._select = select;
    this._ctx    = ctx;
    this._source = source;
})
.add({
    _next: function(nextIndex){
        if(this._source.next()){
            this.item = this._select.call(this._ctx, this._source.item, this._source.index);
            return 1;
        }
    }
});

def.type('SelectManyQuery', def.Query)
.init(function(source, selectMany, ctx){
    this.base();
    this._selectMany = selectMany;
    this._ctx    = ctx;
    this._source = source;
    this._manySource = null;
})
.add({
    _next: function(nextIndex){
        while(true){
            // Consume all of existing manySource
            if(this._manySource){
                if(this._manySource.next()){
                    this.item = this._manySource.item;
                    return 1;
                }
                
                this._manySource = null;
            }

            if(!query_nextMany.call(this)){
                break;
            }
        }
    }
});

function query_nextMany(){
    while(this._source.next()){
        var manySource = this._selectMany.call(this._ctx, this._source.item, this._source.index);
        if(manySource != null){
            this._manySource = def.query(manySource);
            return 1;
        }
    }
}

def.type('DistinctQuery', def.Query)
.init(function(source, key, ctx){
    this.base();
    this._key    = key;
    this._ctx    = ctx;
    this._source = source;
    this._keys   = {};
})
.add({
    _next: function(nextIndex){
        while(this._source.next()){
            var nextItem = this._source.item,
                keyValue = this._key ?
                           this._key.call(this._ctx, nextItem, this._source.index) :
                           nextItem;

            // items with null keys are ignored!
            if(keyValue != null && !def.hasOwn(this._keys, keyValue)){
                this._keys[keyValue] = true;
                this.item = nextItem;
                return 1;
            }
        }
    }
});

def.type('SkipQuery', def.Query)
.init(function(source, skip){
    this.base();
    this._source = source;
    this._skip = skip;
})
.add({
    _next: function(nextIndex){
        while(this._source.next()){
            if(this._skip > 0){
                this._skip--;
            } else {
                this.item = this._source.item;
                return 1;
            }
        }
    }
});

def.type('TakeQuery', def.Query)
.init(function(source, take){
    this.base();
    this._source = source;
    this._take = take;
})
.add({
    _next: function(nextIndex){
        while(this._source.next()){
            if(this._take > 0){
                this._take--;
                this.item = this._source.item;
                return 1;
            }
        }
    }
});

def.type('ReverseQuery', def.Query)
.init(function(source){
    this.base();
    this._source = source;
})
.add({
    _next: function(nextIndex){
        if(!nextIndex) {
            if(this._source instanceof def.Query) {
                if(this._source instanceof def.ArrayLikeQuery){
                    this._source = this._source._list;
                } else {
                    this._source = this._source.array();
                }
            } // else assume array-like
            
            this._count  = this._source.length;
        }
        
        if(nextIndex < this._count){
            this.item = this._source[this._count - nextIndex - 1];
            return 1;
        }
    }
});


// -------------------

def.query = function(q){
    if(q === undefined) {
        return new def.NullQuery();
    }
    
    if(q instanceof def.Query){
        return q;
    }
    
    if(def.fun.is(q)){
        return new def.AdhocQuery(q);
    }

    return new def.ArrayLikeQuery(q);
};

def.range = function(start, count, step){
    return new def.RangeQuery(start, count, step);
};

// Reset namespace to global, instead of 'def'
currentNamespace = def.global;    
    return def;
});
