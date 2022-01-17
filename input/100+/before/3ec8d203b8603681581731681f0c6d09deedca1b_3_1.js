function (item) {
        var ctx = item.ctx,
            descr = item.description,
            params = [],
            tags = item.tags || [],
            fTags = filterTags(tags),
            memberOf,
            fname,
            disp,
            txt;
        if (ctx &&
                (ctx.type === 'function' || ctx.type === 'method') &&
                !item.isPrivate &&
                !item.ignore) {
            // determine the memberOf thing
            memberOf = ctx.receiver;
            if (fTags.memberOf) {
                if (fTags.memberOf[0].parent) {
                    memberOf = fTags.memberOf[0].parent;
                }
            }
            // extract all the parameters
            forEach(item.tags, function (t) {
                if (t.type === 'param') {
                    params.push(t);
                }
            });
            // display the function name
            fname = ctx.name;
            if (memberOf && memberOf !== packageName) {
                fname = ctx.receiver + '.' + fname;
            }
            html += '<h1>' + fname + '(';
            if (params.length > 0) {
                forEach(params, function (p, i) {
                    html += p.name;
                    if (i !== params.length - 1) {
                        html += ', ';
                    }
                });
            }
            html += ')</h1>';
            // display the description
            if (descr) {
                txt = descr.full || descr.summary;
                if (txt) {
                    html += '<h2>Description</h2>';
                    html += '<p>' + txt + '</p>';
                }
            }
            // display the parameters
            disp = false;
            forEach(item.tags, function (t) {
                if (t.type === 'param') {
                    if (!disp) {
                        html += '<h2>Parameters</h2>';
                        disp = true;
                    }
                    html += '<b>' +
                        t.name + '</b> (' +
                        t.types[0] + ') : ' +
                        t.description + '</p>';
                }
            });
            // display the return value
            disp = false;
            forEach(item.tags, function (t) {
                if (t.type === 'returns') {
                    if (!disp) {
                        html += '<h2>Returns</h2>';
                        disp = true;
                    }
                    html += '<p>' + t.string + '</p>';
                }
            });
            html += '<hr>';
        }
    }