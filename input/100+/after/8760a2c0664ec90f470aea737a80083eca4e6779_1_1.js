function findParent(item, f) {
            if (item.tagName.toLowerCase() == 'body') {
                return null;
            }
            if (f(item) == true) {
                return item;
            } else {
                return findParent(item.parentNode, f);
            }
        }