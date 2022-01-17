function argumentNames() {
            var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
                .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
                .replace(/\s+/g, '').split(',');
            return names.length == 1 && !names[0] ? [] : names;
        }