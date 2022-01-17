function(){
        $area.autoResize({minHeight: 150}).addClass('focused');
        $('#read-message .editor-tools').show();
        $('#read-message input[type=submit]').show();
        Marky.createSimpleToolbar('#read-message .editor-tools', '#id_message', {privateMessaging: true});
        new k.AjaxPreview($('#preview-btn'), {
            changeHash: false
        });
    }