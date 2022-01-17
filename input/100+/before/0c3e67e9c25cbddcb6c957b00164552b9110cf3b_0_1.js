function(){
            if (this.nodeType == Node.COMMENT_NODE) {
                if (this.data.substr(0, 9) == 'start_vde') {
                    currentParentId = this.data.substr(6, this.data.length);
                    parentsIdsStack.push(currentParentId);
                    this.parentNode.removeChild(this);
                } else if (this.data.substr(0, 7) == 'end_vde') {
                    if (this.data.substr(4, this.data.length) !== currentParentId) {
                        throw "Could not find closing element for opened '" + currentParentId + "' element";
                    }
                    parentsIdsStack.pop();
                    currentParentId = parentsIdsStack[parentsIdsStack.length - 1];
                    this.parentNode.removeChild(this);
                }
            } else if (currentParentId) {
                thisObj._storeChild(currentParentId, this);
            }
        }