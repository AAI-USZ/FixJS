function () {
    "use strict";
    var pars;
    pars = "opcion=1&" + Form.serialize($('consulta'));
    procesaAjax(pars, 'resultados', 'resultados', false);
}