function inspectElement(aPath) {
        try {
            let domWindow = this.dock.getCurrentTabWindow(false);
            let node = domWindow.document.querySelector(aPath);
            if (node === null) {
                return;
            }

            let ui = this.dock.chromeWindow.InspectorUI;

            if (ui.isTreePanelOpen) {
                ui.inspectNode(node);
                ui.stopInspecting();
            } else {
                ui.openInspectorUI(node);
            }
        } catch(e) { console.exception(e);}
    }