function(/*Map*/ contextInfo) {
                // console.debug("Repeat.handleDelete contextInfo:",contextInfo);
                var position = parseInt(contextInfo.position,"10");
                var itemToRemove = this._getRepeatItems()[position - 1];
                var repeatNode = this.srcNodeRef;
                if (this.appearance == "compact") {
                    dojo.query("> tbody", repeatNode)[0].removeChild(itemToRemove);
                } else {
                    repeatNode.removeChild(itemToRemove);
                }
            }