function (chunks) {
                var j = 0,
                    skip = /[^"'`\{\}\/\(\)\\]+/g,
                    comment = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,
                    string = /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`\\\r\n]|\\.)*)`/g,
                    level = 0,
                    match,
                    chunk = chunks[0],
                    inParam;

                for (var i = 0, c, cc; i < input.length; i++) {
                    skip.lastIndex = i;
                    if (match = skip.exec(input)) {
                        if (match.index === i) {
                            i += match[0].length;
                            chunk.push(match[0]);
                        }
                    }
                    c = input.charAt(i);
                    comment.lastIndex = string.lastIndex = i;

                    if (match = string.exec(input)) {
                        if (match.index === i) {
                            i += match[0].length;
                            chunk.push(match[0]);
                            c = input.charAt(i);
                        }
                    }

                    if (!inParam && c === '/') {
                        cc = input.charAt(i + 1);
                        if (cc === '/' || cc === '*') {
                            if (match = comment.exec(input)) {
                                if (match.index === i) {
                                    i += match[0].length;
                                    chunk.push(match[0]);
                                    c = input.charAt(i);
                                }
                            }
                        }
                    }

                    switch (c) {
                        case '{': if (! inParam) { level ++;        chunk.push(c);                           break }
                        case '}': if (! inParam) { level --;        chunk.push(c); chunks[++j] = chunk = []; break }
                        case '(': if (! inParam) { inParam = true;  chunk.push(c);                           break }
                        case ')': if (  inParam) { inParam = false; chunk.push(c);                           break }
                        default:                                    chunk.push(c);
                    }
                }
                if (level != 0) {
                    error = new(LessError)({
                        index: i,
                        type: 'Parse',
                        message: (level > 0) ? "missing closing `}`" : "missing opening `{`",
                        filename: env.filename
                    }, env);
                }

                return chunks.map(function (c) { return c.join('') });;
            }