function () {
        var el;

        for (el = 0; el < this.objectsList.length; el++)
            this.objectsList[el].clearTrace();

        this.numTraces = 0;
        return this;
    }