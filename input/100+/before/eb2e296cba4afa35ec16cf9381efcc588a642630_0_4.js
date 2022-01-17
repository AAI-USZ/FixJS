function(output, parser) {
            var changes = parser.parseDiff(output.data, output.stream);
            var filename = output.args[output.args.length-1];
            if (!this.all_changes[filename]) {
                this.all_changes[filename] = {};
            }
            this.all_changes[filename].unstaged = changes;
            
            if (changes.length == 0) {
                return;
            }
            
            //create annotations for unstaged changes
            for (var i = 0; i < changes.length; i++) {
    			var change = changes[i];
				this.annotateChunks(change.chunks, "unstaged", filename);
			}
            this.decorate(filename);
        }