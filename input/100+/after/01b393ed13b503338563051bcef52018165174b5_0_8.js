function() {
        this.list.removeEvents("click");
        this.list.removeEvents("focus");
        this.list.removeEvents("blur");
        this.list.getElements("li").removeEvents("click");
    }