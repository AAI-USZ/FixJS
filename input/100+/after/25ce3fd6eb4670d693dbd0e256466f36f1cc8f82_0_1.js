f    var element,
        app_label,
        model_name,
        title,
        object_id = $('#id_inline-'+this.textarea.id).val(),
        val = $('#id_element_content_type-'+this.textarea.id).val();
    
    if (val && object_id) {
        element = this.elementTypes[val];
        if (element) {
            /*
            bits = val.split('/');
            app_label = bits[0];
            model_name = bits[1].split(':')[0];
            */
            title = element.title;
        }
    }
    
    //if (app_label && model_name && object_id) {
    if (title && object_id) {
        element = "[[El('"+title+"', id='"+object_id+"')]]";
        this.insert(element);
    }
}
