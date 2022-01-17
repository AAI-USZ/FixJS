function (name, value, domain) {
        if (typeof domain === 'undefined') return;
        var isNotEmptyRules = (value.replace(/\s/g,'').length !== 0),
            vpos = value.indexOf('##'),
            tmp = getValue(name).split('\n');
        
        if (isNotEmptyRules) {
            // check rule correctness
            if (vpos === -1) {
                try {
                    // if we have `selectors` format
                    document.querySelectorAll(value);
                    value = domain + '##' + value;
                } catch (bug) {
                    window.alert(lng.pInvalidSelector);
                    return;
                }
            } else {
                try {
                    // if we have `domain.tld##selectors` format
                    var vsel =  value.slice(vpos+2, value.length);
                    document.querySelectorAll(vsel);
                    if (!(vsel.replace(/\s/g,'').length)) isNotEmpty = false;
                } catch (bug) {
                    window.alert(lng.pInvalidSelector);
                    return;
                }
            }
        }

        for (var rpos, rule, i = tmp.length; i--; ) {
            rule = tmp[i];
            rpos = rule.indexOf('##');
            if (rpos !== -1 && options.isCorrectDomain(domain, rule.slice(0, rpos))) {
                tmp.splice(i, 1);
                break;
            }
        }

        if (isNotEmptyRules) tmp.unshift(value);
        setValue(name, tmp.join('\n'));
    }