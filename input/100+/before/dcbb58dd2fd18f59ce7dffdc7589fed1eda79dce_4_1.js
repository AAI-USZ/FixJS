function setupHelpMenu(editor) {
    var helpTool,
        aboutTool,
        wikiTool,
        bugTool,
        overviewTutorialTool,
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

    // tutorials
    overviewTutorialTool = new MenuItem(
        'Tutorial: Overview...',
        function () {
            var Tutorial = require('./tutorial').Tutorial,
                nt = new Tutorial({
                    code: "m0os24I4PUc"
                });
            nt.runFullScreen();
        }
    );
    menus.help.push(
        helpTool,
        null,
        overviewTutorialTool,
        null,
        wikiTool,
        bugTool,
        null,
        aboutTool
    );
}