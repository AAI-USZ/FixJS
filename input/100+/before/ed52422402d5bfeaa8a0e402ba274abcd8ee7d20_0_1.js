function() {
        // Load display settings
        this.loadSettings();

        // Navigation drop-down menus
        $("ul#navigation").superfish();

        // Add keyboard shortcuts
        var shortcuts = {
            97  : function() { mainDisplay.applyAutoprover(); },         // a
            74  : function() { proofScript.jump('next/smart', null); },  // j
            75  : function() { proofScript.jump('prev/smart', null); },  // k
            106 : function() { proofScript.jump('next/normal', null); }, // J
            107 : function() { proofScript.jump('prev/normal', null); }  // K
        }

        for(i = 1; i < 10; i++) {
            shortcuts[i + 48] = function(key) {
                mainDisplay.applyProofMethod(key - 48);
            };
        }

        this.add_shortcuts(shortcuts);

        // set active link
        path = window.location.pathname.split("/");
        path[3] = "main";
        this.setActiveLink(path.join("/"));
        proofScript.focusActive();


        // Initialize dialog box
        $("div#dialog").dialog({
            autoOpen: false,
            title: 'Message',
            width: '30em',
            buttons: {
                "Ok": function() {
                    $(this).dialog("close");
                 }
            }
        });

        // Enable context menu
        $("#proof a.proof-step").contextMenu(
            { menu: "contextMenu" },
            function(action, el, pos) {
                var theoryPath = theory.extractTheoryPath($(el).attr("href"));
                mainDisplay.loadTarget(
                    theory.absolutePath(action,theoryPath),
                    null
                    );
            });

        // Click handler for save link
        events.installAbsoluteClickHandler("a.save-link", server.handleJson);

        // Click handler for edit link(s)
        events.installAbsoluteClickHandler(
            "a.edit-link",
             function(data, textStatus) {
                 server.handleJson(data, mainDisplay.setContent);
                 events.installFormHandler();
             });

        // Click handler for debug pane toggle
        var debug_toggle = $("a#debug-toggle");
        debug_toggle.click(function(ev) {
            ev.preventDefault();
            layout.toggle("east");
            mainDisplay.toggleOption(debug_toggle);
        });
        
        // Click handler for graph toggle
        var graph_toggle = $('a#graph-toggle');
        graph_toggle.click(function(ev) {
            ev.preventDefault();
            if($.cookie("uncompact-graphs")) {
                $.cookie("uncompact-graphs", null, { path: '/' });
            } else {
                $.cookie("uncompact-graphs", true, { path: '/' });
            }
            $("a.active-link").click();
            mainDisplay.toggleOption(graph_toggle);
        });
    
        // Click handler for sequent compression toggle
        var sequent_toggle = $('a#seqnt-toggle');
        sequent_toggle.click(function(ev) {
            ev.preventDefault();
            if($.cookie("uncompress-sequents")) {
                $.cookie("uncompress-sequents", null, { path: '/' });
            } else {
                $.cookie("uncompress-sequents", true, { path: '/' });
            }
            $("a.active-link").click();
            mainDisplay.toggleOption(sequent_toggle);
        });

        // Install event handlers
        events.installScrollHandler(
            "west",
            "div.ui-layout-west div.scroll-wrapper");
    
        // Install handlers on plain internal links
        events.installRelativeClickHandler(
            "div#proof a.internal-link",
            "main",
            null);

        // Install handlers on delete links
        events.installRelativeClickHandler(
            "div#proof a.internal-link.delete-link",
            "del/path",
            null);
    
        // Install handlers on proof-step links
        events.installRelativeClickHandler(
            "div#proof a.internal-link.proof-step",
            "main",
            null
            );

        // Install click handlers on main
        events.installRelativeClickHandler(
            "div#ui-main-display a.internal-link",
            "main",
            null);

        // Install handlers on removal links
        events.installRelativeClickHandler(
            "div#proof a.internal-link.remove-step",
            "del/path",
            null
            );
    }