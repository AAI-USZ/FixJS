function readName() {
                        var col = stream.col, ch = stream.get(),
                        name = ch;
                        while (!stream.eol()) {
                                ch = stream.peek();
                                if (!isConstituent(ch))
                                        break;
                                name += ch;
                                stream.nextCol();
                        }
                        return ch && { line: stream.line, c1: col, c2: stream.col, id: name.toLowerCase() };
                }