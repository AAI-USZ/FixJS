function(where, el, html){
            var hash = {},
                hashVal,
                setStart,
                range,
                frag,
                rangeEl,
                rs;

            where = where.toLowerCase();
            
            hash[beforebegin] = ['BeforeBegin', 'previousSibling'];
            hash[afterend] = ['AfterEnd', 'nextSibling'];

            if (el.insertAdjacentHTML) {
                if(tableRe.test(el.tagName) && (rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html))){
                    return rs;
                }
                
                hash[afterbegin] = ['AfterBegin', 'firstChild'];
                hash[beforeend] = ['BeforeEnd', 'lastChild'];
                if ((hashVal = hash[where])) {
                    el.insertAdjacentHTML(hashVal[0], html);
                    return el[hashVal[1]];
                }
            } else {
                range = el.ownerDocument.createRange();
                setStart = 'setStart' + (endRe.test(where) ? 'After' : 'Before');
                if (hash[where]) {
                    range[setStart](el);

                    // Workaround for IE9, because it does not have this method anymore
                    // When we have moved to jQuery we won't need this anymore
                    if (typeof range.createContextualFragment === 'function') {
                    	frag = range.createContextualFragment(html);
                    }
                    else {
                    	frag = document.createDocumentFragment(), 
                        div = document.createElement("div");
                        frag.appendChild(div);
                        div.outerHTML = html;
                    }

                    el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                    return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
                } else {
                    rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                    if (el.firstChild) {
                        range[setStart](el[rangeEl]);

                        // Workaround for IE9, because it does not have this method anymore
                        // When we have moved to jQuery we won't need this anymore
                        if (typeof range.createContextualFragment === 'function') {
                        	frag = range.createContextualFragment(html);
                        }
                        else {
                        	frag = document.createDocumentFragment(), 
                            div = document.createElement("div");
                            frag.appendChild(div);
                            div.outerHTML = html;
                        }

                        if(where == afterbegin){
                            el.insertBefore(frag, el.firstChild);
                        }else{
                            el.appendChild(frag);
                        }
                    } else {
                        el.innerHTML = html;
                    }
                    return el[rangeEl];
                }
            }
            throw 'Illegal insertion point -> "' + where + '"';
        }