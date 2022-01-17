function setupHelpMenu(editor) {
    var helpTool,
        aboutTool,
        readmeTool,
        manualTool,
        sourcesTool,
        wikiTool,
        bugTool,
        overviewTutorialTool,
        menus = editor.menus;
    // run tool
    helpTool = new MenuItem(
        'Documentation...',
        function () {
            window.open('/swallow/make/helpviewer.Help.html', '_blank');
        }
    );
    readmeTool = new MenuItem(
        'Readme...',
        function () {
            window.open('https://github.com/hugowindisch/swallow/blob/master/README.md', '_blank');
        }
    );
    manualTool = new MenuItem(
        'Manual...',
        function () {
            window.open('https://github.com/hugowindisch/swallow/blob/master/MANUAL.md', '_blank');
        }
    );
    sourcesTool = new MenuItem(
        'Sources...',
        function () {
            window.open('https://github.com/hugowindisch/swallow', '_blank');
        }
    );
    wikiTool = new MenuItem(
        'Development Wiki...',
        function () {
            window.open('https://github.com/hugowindisch/swallow/wiki', '_blank');
        }
    );
    bugTool = new MenuItem(
        'Bug Tracking...',
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
        readmeTool,
        manualTool,
        null,
        sourcesTool,
        wikiTool,
        bugTool,
        null,
        aboutTool
    );
}