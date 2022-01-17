function(el, idx) {
            if (el.childNodes.length) {
                this.insertBefore(el, this.childNodes[idx]);
            } else {
                this.appendChild(el);
            }
        }