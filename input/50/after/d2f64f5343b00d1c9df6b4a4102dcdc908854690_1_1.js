function() {
                var ch = this.peek();
                this.nextCol();
                if (this.col >= this.buffer.code[this.line].length)
                        this.nextLine();
                return ch;
        }