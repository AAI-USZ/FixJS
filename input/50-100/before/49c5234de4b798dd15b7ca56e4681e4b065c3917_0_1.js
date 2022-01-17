function () {
        var el, len = this.objectsList.length;

        for (el = 0; el < len; el++) {
            this.objectsList[el].clearTrace();
        }
        this.numTraces = 0;
        return this;
    }