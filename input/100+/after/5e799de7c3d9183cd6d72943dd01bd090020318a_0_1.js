function(config) {

    config.extraPlugins = 'autogrow,definitionlist,mdn-buttons,mdn-link,mdn-syntaxhighlighter';
    config.removePlugins = 'link';

    config.toolbar_MDN = [
        ['Source','-','mdnSave','mdnNewPage','mdnPreview'],
        ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','DefinitionList','DefinitionTerm','DefinitionDescription','-','Outdent','Indent','Blockquote','CreateDiv'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['BidiLtr', 'BidiRtl' ],
        ['Link','Unlink','Anchor'],
        ['Image','Table','HorizontalRule','SpecialChar','Iframe'],
        ['h1Button', 'h2Button', 'h3Button', 'preButton', 'mdn-syntaxhighlighter', 'codeButton', '-', 'Styles'],
        ['TextColor','BGColor'],
        ['Maximize', 'ShowBlocks','-','About']
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