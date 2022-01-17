function() {
        this.list.removeEvents("click");
        this.list.getElements("li").removeEvents("mouseover");
        this.list.getElements("li").removeEvents("click");
    }