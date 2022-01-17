function(value) {
        if (!this.tail) {
            console.logGroup('warn', 'Unfilled values', this.warnings);
            console.logGroup('warn', 'Missing -> Wrappers', this.forgotten || []);
            console.logGroup('log', 'Overwrites', this.overwrites);
            console.logGroup('log', 'Choices', this.choices || []);

            console.group('All extracted data');
            console.log(value);
            console.groupEnd();  
        }
    }