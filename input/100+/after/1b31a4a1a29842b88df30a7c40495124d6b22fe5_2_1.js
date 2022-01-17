function toggleform(checkbox) {
    var state = true;
    var form  = checkbox.form;

    if (checkbox.checked) {
        state = '';
    }

    for(var i=0; i<form.length;i+=1) {
        element = form.elements[i];
        if ((element.type != "hidden") && (element.type != "fieldset")
         && (element.name != "active")
         && (element.id != "id_submitbutton") && (element.id != "id_cancel")) {
            element.disabled = state;
        }
    }
}