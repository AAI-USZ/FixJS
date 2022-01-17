function () {
        var pc = this.get_page_content();
        var content = pc[0]; var id = pc[1];
        try {
            var line_limit = parseInt(self.context['site']['config']['posts']['summary_lines']);
        } catch (e) {
            line_limit = false;
        }
        line_limit = line_limit || 20;
        
        var line_count = 0;
        var line_breakpoint = content.lines.count;
        
        var lines = content.lines();
        for (var i=0;i<lines.length;i++) {
            var line = lines[i];
            if (/^\s*$/.test(line)) { // line with only whitespace
                if (line_count >= line_limit) {
                    line_breakpoint = i;
                    break;
                }
            } else {
                line_count += 1;
            }
        }
        
        content = hashToArray(content.lines).slice(0, line_breakpoint).join("");
        content = this.render(content);
        
        return Ruhoh.Converter.convert(content, id);
    }