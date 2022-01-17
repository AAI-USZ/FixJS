function () {
    "use strict";
    var fields, buttons, i;
    fields = ['fecha_inicio_a', 'fecha_fin_a', 'fecha_inicio_b', 'fecha_fin_b'];
    buttons = ['boton_fecnicio_a', 'boton_fecha_fin_a', 'boton_fecha_inicio_b', 'boton_fecha_fin_b'];
    for (i = 0; i < fields.length; i++) {
        Calendar.setup({
            inputField  :    fields[i],  // id of the input field
            ifFormat    :    '%d-%m-%Y', // format of the input field
            showsTime   :    true,       // will display a time selector
            buttons     :    buttons[i], // trigger for the calendar (button ID)
            singleClick :    false,// double-click mode
            step        :    1   // show all years in drop-down boxes (instead of every other year as default)
        });
    }
}