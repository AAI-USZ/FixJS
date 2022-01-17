function(popup, defaultPosition) {
            var content = popup.content.element,
                contentHt = parseFloat(content.style.height) || content.offsetHeight || 0,
                contentWd = parseFloat(content.style.width) || content.offsetWidth || 0,
                pt = webkitConvertPointFromNodeToPage(this.selectedMaterialNode, new WebKitPoint(0, 0));
            if(!pt) {
                return defaultPosition;
            } else {
                return {top: pt.y - contentHt + 10, left: pt.x - contentWd + 10};
            }
        }