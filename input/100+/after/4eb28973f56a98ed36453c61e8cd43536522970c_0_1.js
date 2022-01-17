function(config) {

    config.extraPlugins = 'autogrow,definitionlist,mdn-buttons,mdn-link,mdn-syntaxhighlighter';
    config.removePlugins = 'link';
    
    config.toolbar_MDN = [
        ['Source', 'mdnPreview', '-', 'PasteText', 'PasteFromWord', '-', 'SpellChecker', 'Scayt', '-', 'Find', 'Replace', '-', 'ShowBlocks'],
        ['BulletedList', 'NumberedList', 'DefinitionList', 'DefinitionTerm', '-', 'Outdent', 'Indent', 'Blockquote', '-', 'Image', 'Table', '-', 'TextColor', 'BGColor', '-', 'BidiLtr', 'BidiRtl'],
        '/',
        ['h1Button', 'h2Button', 'h3Button', 'h4Button', 'h5Button', 'h6Button', '-', 'preButton', 'mdn-syntaxhighlighter', 'Styles'],
        ['Link', 'Unlink', 'Anchor', '-', 'Bold', 'Italic', 'Underline', 'codeButton', 'Strike', 'Superscript', 'RemoveFormat', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyLeft']
    ];
    
    config.skin = 'kuma';
    config.startupFocus = true;
    config.toolbar = 'MDN';

    config.autoGrow_minHeight = 600;
    config.contentsCss = '/media/css/wiki-edcontent.css'; 
    config.toolbarCanCollapse = false;
    config.resize_enabled = false;
    config.dialog_backgroundCoverColor = 'black';
    config.dialog_backgroundCoverOpacity = 0.3;
    config.docType = '<!DOCTYPE html>';

    {{ editor_config|safe }}    
}