function clearAllErrors(cm) {
            var line;
            while (errorLines.length > 0) {
                line = errorLines.pop();
                cm.setLineClass(line, null);
                cm.clearMarker(line);
            }
        }