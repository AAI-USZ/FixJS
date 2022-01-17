function setupHelpMenu(editor) {
    var helpTool,
        aboutTool,
        wikiTool,
        bugTool,
        menus = editor.menus;
    // run tool
    helpTool = new MenuItem(
        'Documentation...',
        function () {
            window.open('/make/helpviewer.Help.html', '_blank');
        }
    );
    wikiTool = new MenuItem(
        'Wiki...',
        function () {
            window.open('https://github.com/hugowindisch/swallow/wiki', '_blank');
        }
    );
    bugTool = new MenuItem(
        'Bugs...',
        function () {
            window.open('https://github.com/hugowindisch/swallow/issues', '_blank');
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
        null,
        wikiTool,
        bugTool,
        null,
        aboutTool
    );
}