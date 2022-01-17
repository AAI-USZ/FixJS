function () {
    "use strict";
    var pars;
    pars = {opcion: 2, tipo: $('#tipoComparativa').val()};
    procesaAjax(pars, 'comparativas', 'comparativas', datePicker);
}