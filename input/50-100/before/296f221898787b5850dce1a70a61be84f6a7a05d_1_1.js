function(block) {
        var scanner = this.scanner;
        this.parsePrefix(block);
        while (scanner.next === 'asterisk' || scanner.next === 'slash' || scanner.next === 'percent') {
            var operation = (scanner.next === 'asterisk') ? 'multiply' : 
                ((scanner.next === 'slash') ? 'divide' : 'remainder');
            scanner.advance();
            this.writeOperation(block, operation, 2);
        }
    }