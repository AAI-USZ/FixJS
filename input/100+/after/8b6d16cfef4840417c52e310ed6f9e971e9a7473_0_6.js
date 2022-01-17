function() { select.append($("<option value=" + this.textContent +
                        (cpage == this.textContent ? " selected=true" : "") + ">Page " + this.textContent)); }