function() { 
            if (null === this.domTree) { // First client, so construct dom tree here.
                this.newDiv.innerHTML = "";
                this.newDiv.innerHTML = this._textarea.innerHTML;
                this.domTree = EditorTree.createTreeFromElement(this.newDiv);
                this.generateDomTreeMap();
            }
	        this.iterateSend();
	        this.iterateRecv();
	    }