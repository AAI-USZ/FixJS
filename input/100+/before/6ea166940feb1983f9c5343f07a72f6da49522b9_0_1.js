function(sourceDirectory, outputDirectory, incremental) {
    this.sourceDirectory = path.join(path.dirname(sourceDirectory), '/', path.basename(sourceDirectory));
    this.outputDirectory = path.join(path.dirname(outputDirectory), '/', path.basename(outputDirectory));
    this.incremental = (incremental == true);

    this.compileCount = 0;

    this.compileHistory = {};
    //if incremental load up the .jlchistory
    try {
        var history = fs.readFileSync(path.join(this.sourceDirectory, '/.jlchistory'), 'utf8');
        var historyLines = history.split("\n");
        for (var i = historyLines.length - 1; i >= 0; i--) {
            var line = historyLines[i];
            var lineParts = line.split('|');

            if (lineParts[1] == 'undefined') continue;
            
            this.compileHistory[lineParts[0]] = lineParts[1];
        };
    } catch(err) {
        //assume no history file.
    }
}