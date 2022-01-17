function () {
        var pc = this.get_page_content();
        var content = pc[0]; var id = pc[1];
        try {
            var line_limit = parseInt(Ruhoh.DB.site['config']['posts']['summary_lines']);
        } catch (e) {
            line_limit = false;
        }
        line_limit = line_limit || 20;
        
        var line_count = 0;
        var lines = content.split("\n");
        var line_breakpoint = lines.count;
        
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
        
        content = lines.slice(0, line_breakpoint).join("\n");
        content = Ruhoh.Templaters.RMustache.render(content,this.context);
        
        return Ruhoh.Converter.convert(content, id);
    }