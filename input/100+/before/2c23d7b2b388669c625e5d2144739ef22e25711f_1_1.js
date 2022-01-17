function inspectElement(aPath) {
        try {
            let domWindow = this.dock.getCurrentTabWindow();
            let node = domWindow.document.querySelector(aPath);
            if (node === null) {
                return;
            }

            if (domWindow._FirebugCommandLine !== undefined) {
                // Use Firebug first
                domWindow._FirebugCommandLine.inspect(node);
            } else {
                // Fallback on webdev tools
                if (this.dock.chromeWindow.InspectorUI.isTreePanelOpen) {
                    this.dock.chromeWindow.InspectorUI.inspectNode(node);
                    this.dock.chromeWindow.InspectorUI.stopInspecting();
                } else {
                    this.dock.chromeWindow.InspectorUI.openInspectorUI(node);
                }
            }
        } catch(e) { console.exception(e);}
    }