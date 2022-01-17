function (word, pos) {
            var tagProp;
            if (Object.prototype.toString.call(pos) !== '[object Array]') {
                throw new TypeError("Argument must be array");
            }
            if (!this.roots) { this.roots = {}; }
            if (!this.roots[word]) {           // set (if unset)
                this.roots[word] = pos;
            } else {                           // add to existing values
                tagProp = this.roots[word];
                pos.forEach(function (pos) {
                    if (tagProp.indexOf(pos) === -1) { tagProp.push(pos); }
                });
            }
        }