function () {
    "use strict";
    var pars;
    pars = "opcion=1" + "&" + $('#consulta').serialize();
    procesaAjax(pars, 'resultados', 'resultados', false);
}