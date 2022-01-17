function(header, chunk_text, returnContextLines) {
            var chunk = {header: header,
                         text: chunk_text,
                         lines: []}

            var h = header.match(/@@ \-(\d+),?(\d+)? \+(\d+),?(\d+)? @@/);
            var position_old = parseInt(h[1]);
            var position_new = parseInt(h[3]);

            var lines = chunk_text.split("\n");
            for(var i=0; i<lines.length; i++) {
                var current_line = lines[i];
                if(current_line == "") {
                    continue;
                }
                var line = {content: current_line.slice(1,current_line.length)};
                
                if(current_line[0] == ' ') {
                    if(returnContextLines) {
                        line.status = 'context';
                        line.number_new = position_new;
                        line.number_old = position_old;
                        position_old++; position_new++;
                    } else {
                        position_old++; position_new++;
                        continue;
                    }
                } else if(current_line[0] == '+') {
                    line.status = 'added';
                    line.number_new = position_new;
                    position_new++;
                } else if(current_line[0] == '-') {
                    line.status = 'deleted';
                    line.number_new = position_new;
                    line.number_old = position_old;
                    position_old++;
                }

                chunk.lines.push(line);

            }
            return chunk;
        }