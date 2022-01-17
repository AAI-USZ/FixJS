function(doclet, tag) {
            var borrows = parseBorrows(doclet, tag);
            doclet.borrow(borrows.target, borrows.source);
        }