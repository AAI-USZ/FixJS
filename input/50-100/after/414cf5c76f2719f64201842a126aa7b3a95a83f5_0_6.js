function (parent) {

        var formatter = this._getFormatter();

        var updateFunc = function () {

            var val = formatter(this.getData(parent.dataContext));

            parent.setStyle(this.style, val);

        } .bind(this);



        updateFunc();

        this.listenForDataContextChanges(parent, updateFunc);

    }