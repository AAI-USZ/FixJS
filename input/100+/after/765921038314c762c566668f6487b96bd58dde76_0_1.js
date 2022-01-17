function(self, token, index, full) {
        var result = '';

        if (!token) {
            return result;
        }

        if (/^'/.test(token)) {
            return token;
        }

        if (/^(?:-|%|\d+)$/.test(token)) {
            return token;
        }

        if (/^(?:\/|\.|\.\.)$/.test(token)) {
            return token;
        }

        token = token.replace(/@/g, '');

        var char0 = token.charAt(0);

        if (char0 === '/') {
            result += '/';
            token = token.substr(1);
        }

        token = token.replace(/\.\.\//g, '.');

        result += token.split('/').map(function(s, i) {
            var result = '';
            if (i === 0 && char0 === '$') {
                return s.substr(1);
            } else {
                return /^[\.]+$/.test(s) ? s : '.' + s;
            }
        }).join('');

        return result;
    }