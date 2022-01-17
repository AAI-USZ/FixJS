function checkAddUser(the_form)
{
    if (the_form.elements['pred_hostname'].value == 'userdefined' && the_form.elements['hostname'].value == '') {
        alert(PMA_messages['strHostEmpty']);
        the_form.elements['hostname'].focus();
        return false;
    }

    if (the_form.elements['pred_username'].value == 'userdefined' && the_form.elements['username'].value == '') {
        alert(PMA_messages['strUserEmpty']);
        the_form.elements['username'].focus();
        return false;
    }

    return PMA_checkPassword($(the_form));
}