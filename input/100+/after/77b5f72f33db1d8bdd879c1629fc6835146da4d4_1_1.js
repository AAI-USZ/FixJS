function(obj, columns)
    {
        if (obj == null) return null;
        if (typeof obj == "object") {
            var item = "";
            // Show class name as the first column for mutli object lists
            if (columns && columns.indexOf("__class__") >= 0) {
                item = className(obj)
            }
            if (!columns && obj.hasOwnProperty('toString')) {
                item = obj.toString()
            } else {
                for (p in obj) {
                    if (typeof obj[p] == "function") {
                        if (p != "toString") continue;
                        item += (item != "" ? fieldSeparator : "") + obj.toString();
                    } else
                    if (!columns || columns.indexOf(p) >= 0) {
                        item += (item != "" ? fieldSeparator : "") + this.modelValue(p, obj[p]);
                    }
                }
            }
            return item
        }
        return obj;
    }