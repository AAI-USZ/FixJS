function (parent) {

        var formatter = this._getFormatter();

        var data = this.getData(parent.dataContext);

        var formattedData = formatter(data);



        var node = formattedData;

        if (!this.engine.adoptable(formattedData)) {

            node = getDocument().newTextNode(formattedData);

        }



        return node;

    }