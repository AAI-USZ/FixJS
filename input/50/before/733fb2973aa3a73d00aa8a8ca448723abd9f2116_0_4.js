function () {
    "use strict";
    var pars;
    pars = {opcion:2,tipo:$('tipo_comparativa').val()};
    procesaAjax(pars, 'comparativas', 'comparativas', datePicker);
}