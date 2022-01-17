function (name, value, domain) {
        if (value.indexOf('##') === -1 || typeof domain === 'undefined') return;
        var rule, pos, tmp = getValue(name).split('\n');

        for (var i = tmp.length; i--; ) {
            rule = tmp[i];
            pos = rule.indexOf('##');
            if (pos !== -1 && options.isCorrectDomain(domain, rule.slice(0, pos))) {
                tmp.splice(i, 1);
                tmp.unshift(value);
                break;
            }
        }
        setValue(name, tmp.join('\n'));
    }