function(line) {
        var match;
        if (line.trim() == "") {
            result.push({text:"", source:null});
            return;
        }
        if (match = line.match(sourceTag)) {
            source = null;
            var file = files[parseInt(match[1])];
            if (file && file.match(stdInLooking)) {
                source = parseInt(match[2]);
            }
        }
        if (line.match(endBlock)) {
            source = null;
            prevLabel = null;
        }

        if (filters.commentOnly && line.match(commentOnly)) return;

        match = line.match(labelDefinition);
        if (match) {
            // It's a label definition.
            if (labelsUsed[match[1]] == undefined) {
                // It's an unused label.
                if (filters.labels) return;
            } else {
                // A used label.
                prevLabel = match;
            }
        }
        if (!match && filters.directives) {
            // Check for directives only if it wasn't a label; the regexp would
            // otherwise misinterpret labels as directives.
            if (line.match(dataDefn) && prevLabel) {
                // We're defining data that's being used somewhere.
            } else {
                if (line.match(directive)) return;
            }
        }

        var hasOpcodeMatch = line.match(hasOpcode);
        result.push({text: line, source: hasOpcodeMatch ? source : null});
    }