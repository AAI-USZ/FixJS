function(config) {

    config.extraPlugins = 'autogrow,definitionlist,mdn-buttons,mdn-link,mdn-syntaxhighlighter,mdn-keystrokes,mdn-enterkey,mdn-wrapstyle';
    config.removePlugins = 'link,tab,enterkey';
    config.entities = false;
    
    config.toolbar_MDN = [
        ['Source', 'mdnSaveExit', 'mdnSave', '-', 'PasteText', 'PasteFromWord', '-', 'SpellChecker', 'Scayt', '-', 'Find', 'Replace', '-', 'ShowBlocks'],
        ['BulletedList', 'NumberedList', 'DefinitionList', 'DefinitionTerm', 'DefinitionDescription', '-', 'Outdent', 'Indent', 'Blockquote', '-', 'Image', 'Table', '-', 'TextColor', 'BGColor', '-', 'BidiLtr', 'BidiRtl'],
        ['Maximize'],
        '/',
        ['h1Button', 'h2Button', 'h3Button', 'h4Button', 'h5Button', 'h6Button', '-', 'preButton', 'mdn-syntaxhighlighter', 'Styles'],
        ['Link', 'Unlink', 'Anchor', '-', 'Bold', 'Italic', 'Underline', 'codeButton', 'Strike', 'Superscript', 'RemoveFormat', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight']
    ];
    
    config.skin = 'kuma';
    config.startupFocus = true;
    config.toolbar = 'MDN';

    config.autoGrow_minHeight = 600;
    config.contentsCss = ['/media/css/wiki-edcontent.css', '/en-US/docs/Template:CustomCSS'];
    config.toolbarCanCollapse = false;
    config.resize_enabled = false;
    config.dialog_backgroundCoverColor = 'black';
    config.dialog_backgroundCoverOpacity = 0.3;
    config.docType = '<!DOCTYPE html>';
    
    CKEDITOR.stylesSet.add('default',[
        { name: "None", element: 'p' },
        { name: "Note box", element: 'div', attributes: { 'class': 'note' }, wrap: true },
        { name: "Warning box", element: 'div', attributes: { 'class': 'warning' }, wrap: true },
        { name: "Callout box", element: 'div', attributes: { 'class': 'geckoVersionNote' }, wrap: true },
        { name: "Plaintext (nowiki)", element: 'span', attributes: { 'class': 'plain' }},
        { name: "Two columns", element: 'div', attributes: { 'class': 'twocolumns' }, wrap: true },
        { name: "Three columns", element: 'div', attributes: { 'class': 'threecolumns' }, wrap: true}
    ]);

    {{ editor_config|safe }}    
}