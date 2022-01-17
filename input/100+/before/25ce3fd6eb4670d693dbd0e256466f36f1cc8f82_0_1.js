function() {
    var element,
        app_label,
        model_name,
        title,
        object_id = $('#id_inline-'+this.textarea.id).val(),
        val = $('#id_element_content_type-'+this.textarea.id).val();
    
    if (val) {
        bits = val.split('/');
        app_label = bits[0];
        model_name = bits[1].split(':')[0];
        title = bits[1].split(':')[1];
        type = val.replace('/', '.');
    }
    
    if (app_label && model_name && object_id) {
        element = "[[El('"+title+"', id='"+object_id+"')]]";
        this.insert(element);
    }
}