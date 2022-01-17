function () {
    "use strict";

    function MyNumber(value) {
        this.value = value;
        this.type = 'number';
    }
    
    
    function Char(value) {
    	this.value = value;
    	this.type = 'char';
    }


    function Symbol(value) {
        this.value = value;
        this.type = 'symbol';
    }


    function List(value) {
        this.value = value;
        this.type = 'list';
    }


    function MyFunction(value) {
        this.value = value;
        this.type = 'function';
    }


    function Nil() {
        this.value = false;
        this.type = 'nil';
    }


    function SpecialForm(value) {
        this.value = value;
        this.type = 'specialform';
    }


    function MyBoolean(value) {
        this.value = value;
        this.type = 'boolean';
    }
    
    
    function UserDefined(usertype, value) {
        this.usertype = usertype;
        this.value = value;
        this.type = 'userdefined';
    }


    return {
        'Number': function (x) {
            return new MyNumber(x)
        },
        'Char': function(x) {
        	return new Char(x);
        },
        'Function': function (x) {
            return new MyFunction(x)
        },
        'List': function (x) {
            return new List(x)
        },
        'Symbol': function (x) {
            return new Symbol(x)
        },
        'Nil': function () {
            return new Nil()
        },
        'SpecialForm': function (x) {
            return new SpecialForm(x);
        },
        'Boolean': function (x) {
            return new MyBoolean(x);
        },
        'UserDefined': function(x, y) {
            return new UserDefined(x, y);
        },
        'String': function(x) {
            var chars = [], c;
            for(c = 0; c < x.length; c++) {
                chars.push(new Char(x[c]));
            }
        	return new List(chars);
        }
    };

}