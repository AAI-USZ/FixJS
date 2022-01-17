function getImportGlobalsSrc() {

    var key,

        value,

        src = "";



    for (key in global) {

        if (global.hasOwnProperty(key) && key !== "global") {

            value = global[key];

            src += "var " + key + " = global." + key + "; ";

        }

    }





    return src;

}