function __set__() {

    arguments.varName = arguments[0];

    arguments.varValue = arguments[1];

    arguments.src = "";

    arguments.checkExistsSrc = function (varName, varValue) {

        return "if (typeof " + varName + " === 'undefined') { throw new ReferenceError('Cannot __set__(" + varName + ", " + varValue + "): " +

            varName + " is not declared within the module.'); } ";

    };



    if (typeof arguments[0] === "object") {

        arguments.env = arguments.varName;

        if (!arguments.env || Array.isArray(arguments.env)) {

            throw new TypeError("__set__ expects an object as env");

        }

        for (arguments.key in arguments.env) {

            if (arguments.env.hasOwnProperty(arguments.key)) {

                arguments.src += arguments.checkExistsSrc(arguments.key) + arguments.key + " = arguments.env." + arguments.key + ";";

            }

        }

    } else if (typeof arguments.varName === "string") {

        if (!arguments.varName) {

            throw new TypeError("__set__ expects a non-empty string as a variable name");

        }

        arguments.src = arguments.checkExistsSrc(arguments.varName, arguments.varValue) + arguments.varName + " = arguments.varValue;";

    } else {

        throw new TypeError("__set__ expects an environment object or a non-empty string as a variable name");

    }



    eval(arguments.src);

}