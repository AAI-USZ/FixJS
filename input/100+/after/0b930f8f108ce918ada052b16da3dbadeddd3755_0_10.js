function sequenceName(name, fieldName) {
            var mangled = name + '_' + fieldName+'_SEQ';
            mangled = mangled.replace(/[Aa][Ee][Ii][Oo][Uu][Yy]/g, '');
            if (mangled.length > 29) {
                mangled = fieldName+'_SEQ';
            }
            mangled = mangled.replace(/[Aa][Ee][Ii][Oo][Uu][Yy]/g, '');
            if (mangled.length > 29) {
                throw new Error('Could not generate a sequence name for ' + name + '.' + fieldName + ' - Oracle field names limited to 30 characters.');
            }
            return '"' + mangled + '"';
        }