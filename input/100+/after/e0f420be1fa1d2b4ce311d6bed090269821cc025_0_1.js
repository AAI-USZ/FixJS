function(elem) {
        var newList = [elem];
        for (var i = 0; i < this.value.length; i++) {
            newList.push(this.value[i]);
        }

        return new List(newList);
    }