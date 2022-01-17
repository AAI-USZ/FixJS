f    var type = '',
        text = '',
        count = 0;

    // type expressions start with '{'
    if (tagValue[0] === '{') {
        count++;

        // find matching closer '}'
        for (var i = 1, leni = tagValue.length; i < leni; i++) {
            if (tagValue[i] === '\\') { i++; continue; } // backslash escapes the next character

            if (tagValue[i] === '{') { count++; }
            else if (tagValue[i] === '}') { count--; }

            if (count === 0) {
                type = trim(tagValue.slice(1, i))
                       .replace(/\\\{/g, '{') // unescape escaped curly braces
                       .replace(/\\\}/g, '}');
                text = trim(tagValue.slice(i+1));
                break;
            }
        }
    }
    return [type, text];
}
