function (parent, source, keyElementMap) {

        if (!source) {

            parent.adopt(getDocument().newTextNode(''));

        } else if (source.each) {

            source.each(function (item, key) {

                this._createNode(parent, keyElementMap, item, key);

            } .bind(this));

        } else if (typeOf(source) == 'object') {

            Object.each(source, function (item, key) {

                this._createNode(parent, keyElementMap, item, key);

            }, this);

        }

    }