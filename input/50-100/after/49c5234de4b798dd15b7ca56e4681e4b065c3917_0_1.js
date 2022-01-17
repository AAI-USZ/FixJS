function () {
        var el, len;

		if (this.objectsList)
			len = this.objectsList.length;
		else
			len = 0;

        for (el = 0; el < len; el++)
            this.objectsList[el].clearTrace();

        this.numTraces = 0;
        return this;
    }