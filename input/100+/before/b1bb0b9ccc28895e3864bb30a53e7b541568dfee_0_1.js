function(row) {
        var line = this.doc.getLine(row);
        var state = this.states[row - 1];

        if (line.length > MAX_LINE_LENGTH) {
            var overflow = {value: line.substr(MAX_LINE_LENGTH), type: "text"};
            line = line.slice(0, MAX_LINE_LENGTH);
        }
        var data = this.tokenizer.getLineTokens(line, state);
        if (overflow) {
            data.tokens.push(overflow);
            data.state = null;
        }

        if (data.state == "start" && this.states[row] == null)
            this.states[row] = "start";

        if (this.states[row] !== data.state) {
            this.states[row] = data.state;
            this.lines[row + 1] = null;
            if (this.currentLine > row + 1)
                this.currentLine = row + 1;
        } else if (this.currentLine == row) {
            this.currentLine = row + 1;
        }

        return this.lines[row] = data.tokens;
    }