function(name, newName) {
                for (var i = 0; i < this.length; i++) {
                    if (name == undefined) {
                        this[i].className = newName;
                        continue;
                    }
                    var classList = this[i].className;
                    name.split(/\s+/g).concat(newName.split(/\s+/g)).forEach(function(cname) {
                        classList = classList.replace(classRE(cname), " ");
                    });
					classList=classList.trim();
                    if (classList.length > 0){
                    	this[i].className = (classList+" "+newName).trim();
                    } else
                        this[i].className = newName;
                }
                return this;
            }