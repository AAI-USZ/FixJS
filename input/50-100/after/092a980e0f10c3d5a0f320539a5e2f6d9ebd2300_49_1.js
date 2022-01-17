function includeCommentInNextRule() {
            if (ruleStartChar !== -1) {
                return false;       // already included
            }
            if (stream.start > 0 && lines[line].substr(0, stream.start).indexOf("}") !== -1) {
                return false;       // on same line as '}            }
            return true;
        }
