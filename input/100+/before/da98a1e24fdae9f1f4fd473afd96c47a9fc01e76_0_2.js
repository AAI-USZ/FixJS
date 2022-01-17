function(_, line) {
        var match;
        if (line.trim() == "") return;
        if (match = line.match(sourceTag)) {
            source = null;
            var file = files[parseInt(match[1])];
            if (file && file.match(stdInLooking)) {
                source = parseInt(match[2]);
            }
        }

        if (filters.commentOnly && line.match(commentOnly)) return;
        match = line.match(labelDefinition);
        if (!match && line.match(lcString) && prevLabel) {
	    result.push({text: line, source: null});
            prevLabel = "";
            return;
        }
        if (match && labelsUsed[match[1]] == undefined) {
            if (filters.labels) return;
        }
        if (match && line.match(literalConstant)) {
            prevLabel = line;
        }
        if (!match && filters.directives) {
            // Check for directives only if it wasn't a label; the regexp would
            // otherwise misinterpret labels as directives.
            match = line.match(directive);
            if (match) return;
        }

        var hasOpcodeMatch = line.match(hasOpcode);
        result.push({text: line, source: hasOpcodeMatch ? source : null});
    }