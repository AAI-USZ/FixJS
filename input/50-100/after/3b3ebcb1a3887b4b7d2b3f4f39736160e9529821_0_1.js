function (pars, divPrecarga, divCarga, callback) {
    "use strict";
    $.ajax({
        url: 'estadisticas.php',
        type: 'POST',
        dataType: 'html',
        data: pars,
        beforeSend: function() {
            $('#' + divPrecarga).html(imgCarga)
        },
        success: function(data) {
            $('#' + divCarga).html(data);
            if (callback) {
                callback();
            }
        }
    });
}