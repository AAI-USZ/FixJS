function () {

            if (lastSource && lastSource.listenChanges && lastSourceChangedHandler) {

                lastSource.ignoreChanges(lastSourceChangedHandler);

            }



            var source = (!parent.dataContext || this.property == '.') ? parent.dataContext : parent.dataContext[this.property];

            keyElementMap = {};

            parent.empty();

            this._createNodes(parent, source, keyElementMap);



            if (source && source.listenChanges) {

                lastSourceChangedHandler = this.handleSourceChanged.bind(this, parent, keyElementMap);

                source.listenChanges(lastSourceChangedHandler, false);

            }



            lastSource = source;

        }