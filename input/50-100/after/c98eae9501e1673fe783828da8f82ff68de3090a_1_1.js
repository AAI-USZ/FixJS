function(list, id, field)
    {
        if (typeof id == "object") id = id[field || "id"];
        for (var i in list) {
            if (field && list[i][field] == id) return i;
            if (list[i].id && list[i].id == id) return i;
            if (list[i].name && list[i].name == id) return i;
        }
        return -1;
    }