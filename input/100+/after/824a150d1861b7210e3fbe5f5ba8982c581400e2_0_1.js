function change_state(elem, op, callback, keep, block) {
    var form = $(elem).parents("form");
    /* look to see if the form has an id specified */
    var id = form.find('input[name="id"]');
    if (id.length) 
        id = id.val();
    else /* fallback on the parent thing */
        id = $(elem).thing_id();

    simple_post_form(form, op, {id: id}, block);
    /* call the callback first before we mangle anything */
    if (callback) {
        callback(form.length ? form : elem, op);
    }
    if(!$.defined(keep)) {
        form.html(form.find('[name="executed"]').val());
    }
    return false;
}