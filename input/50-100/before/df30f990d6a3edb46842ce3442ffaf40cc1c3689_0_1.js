function (child, parent) {
            if (!child) {
                return false;
            }
            var document = child.ownerDocument;
            var body = document.body;
            var element = child;
            while (element && element != body) {
                if (element == parent) {
                    return true;
                }
                element = element.parentNode;
            }
            return (element == parent); // can be true if parent == body and element is present in DOM
        }