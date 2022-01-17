function(doclet, tag) {
            var [target, source] = parseBorrows(doclet, tag);
            doclet.borrow(target, source);
        }