function(list)
    {
        if (this.searchElement) {
            var nlist = new Array();
            var rx = new RegExp($(this.searchElement).value, "i");
            for (var i in list) {
                for (var j in list[i]) {
                    if (String(list[i][j]).match(rx)) {
                        nlist.push(list[i]);
                        break;
                    }
                }
            }
            list = nlist;
        }
        // Must be list of lists, each item is object with name: value: properties
        if (this.filterList) {
            var nlist = new Array();
            for (var i in list) {
                for (var j in this.filterList) {
                    if (this.filterList[j].value) {
                        if (list[i][this.filterList[j].name] == this.filterList[j].value) {
                            nlist.push(list[i])
                        }
                    } else
                    if (this.filterList[j].hasOwnProperty('empty')) {
                        if ((this.filterList[j].empty && !list[i][this.filterList[j].name]) ||
                            (!this.filterList[j].empty && list[i][this.filterList[j].name])) {
                            nlist.push(list[i])
                        }
                    }
                }
            }
            list = nlist;
        }
        return list;
    }