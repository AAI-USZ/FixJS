function getImportGlobalsSrc(ignore) {

    var key,

        value,

        src = "",

        globalObj = typeof global === "undefined"? window: global;



    ignore = ignore || [];



    for (key in globalObj) {

        if (globalObj.hasOwnProperty === undefined || globalObj.hasOwnProperty(key)) {  // in IE8 window.hasOwnProperty is undefined

            if (key !== "global" && ignore.indexOf(key) === -1) {

                value = globalObj[key];

                src += "var " + key + " = global." + key + "; ";

            }

        }

    }





    return src;

}