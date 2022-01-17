function(panel, scriptName, callback)
{
    var uiSourceCodes = panel._workspace.uiSourceCodes();
    for (var i = 0; i < uiSourceCodes.length; ++i) {
        if (uiSourceCodes[i].parsedURL.lastPathComponent === scriptName) {
            panel.showUISourceCode(uiSourceCodes[i]);
            var sourceFrame = panel.visibleView;
            if (sourceFrame.loaded)
                callback(sourceFrame);
            else
                InspectorTest.addSniffer(sourceFrame, "onTextEditorContentLoaded", callback.bind(null, sourceFrame));
            return;
        }
    }
    InspectorTest.addSniffer(panel, "_addUISourceCode", InspectorTest.showScriptSource.bind(InspectorTest, scriptName, callback));
}