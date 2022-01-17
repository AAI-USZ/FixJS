function (pars, divPrecarga, divCarga, callback) {
    "use strict";
    new Ajax.Request(url,
        {
            method: 'post',
            parameters: pars,
            onCreate: $(divPrecarga).innerHTML = imgCarga,
            onComplete: function gen(respuesta) {
                $(divCarga).innerHTML = respuesta.responseText;
                if (callback) {
                    callback();
                }
            }
        });
}