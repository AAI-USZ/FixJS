function setupHelpMenu(editor) {
    var helpTool,
        aboutTool,
        menus = editor.menus;
    // run tool
    helpTool = new MenuItem(
        'Documentation...',
        function () {
            window.open('/make/helpviewer.Help.html', '_blank');
        }
    );
    // run tool
    aboutTool = new MenuItem(
        'About...',
        function () {
            alert(licenseText);
        }
    );
    menus.help.push(
        helpTool,
        aboutTool
    );
}