function(tok) {
                    var href = null, isRelMe = false, i, attr;
                    switch (tok.type) {
                        case 'StartTag':
                        if (tok.name === 'a') {
                            for (i = 0; i < tok.data.length; i++) {
                                attr = tok.data[i];
                                if (attr.nodeName === 'href') {
                                    href = attr.nodeValue;
                                } else if (attr.nodeName === 'rel' && attr.nodeValue === 'me') {
                                    isRelMe = true;
                                }
                            }
                            if (isRelMe && href) {
                                links.append(href);
                            }
                        }
                        break;
                        case 'EOF':
                        cb(null, links);
                        return;
                    }
                }