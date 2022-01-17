function _onReady() {
        // Add the platform (mac or win) to the body tag so we can have platform-specific CSS rules
        $("body").addClass("platform-" + brackets.platform);
        
        EditorManager.setEditorHolder($('#editor-holder'));

        // Let the user know Brackets doesn't run in a web browser yet
        if (brackets.inBrowser) {
            Dialogs.showModalDialog(
                Dialogs.DIALOG_ID_ERROR,
                Strings.ERROR_BRACKETS_IN_BROWSER_TITLE,
                Strings.ERROR_BRACKETS_IN_BROWSER
            );
        }

        _initDragAndDropListeners();
        _initCommandHandlers();
        KeyBindingManager.init();
        Menus.init(); // key bindings should be initialized first
        _initWindowListeners();
        
        // Read "build number" SHAs off disk at the time the matching Brackets JS code is being loaded, instead
        // of later, when they may have been updated to a different version
        BuildInfoUtils.init();

        // Use quiet scrollbars if we aren't on Lion. If we're on Lion, only
        // use native scroll bars when the mouse is not plugged in or when
        // using the "Always" scroll bar setting. 
        var osxMatch = /Mac OS X 10\D([\d+])\D/.exec(navigator.userAgent);
        if (osxMatch && osxMatch[1] && Number(osxMatch[1]) >= 7) {
            // test a scrolling div for scrollbars
            var $testDiv = $("<div style='position:fixed;left:-50px;width:50px;height:50px;overflow:auto;'><div style='width:100px;height:100px;'/></div>").appendTo(window.document.body);
            
            if ($testDiv.outerWidth() === $testDiv.get(0).clientWidth) {
                $(".sidebar").removeClass("quiet-scrollbars");
            }
            
            $testDiv.remove();
        }
        
        PerfUtils.addMeasurement("Application Startup");
        
        // finish UI initialization before loading extensions
        ProjectManager.loadProject().done(function () {
            _initTest();
            _initExtensions().always(_onBracketsReady);
        });
    }