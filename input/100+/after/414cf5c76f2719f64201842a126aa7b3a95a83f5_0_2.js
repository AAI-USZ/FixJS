function (parent) {

        var keyElementMap = {};

        var lastSourceChangedHandler = null;

        var lastSource = null;



        var bindingSourceChangedHandlerFunc = function () {

            if (lastSource && lastSource.listenChanges && lastSourceChangedHandler) {

                lastSource.ignoreChanges(lastSourceChangedHandler);

            }



            var source = (!parent.dataContext || this.property == '.') ? parent.dataContext : parent.dataContext[this.property];

            keyElementMap = {};

            parent.empty();

            this._createNodes(parent, source, keyElementMap);



            if (source && source.listenChanges) {                

                var self = this;

                lastSourceChangedHandler = function(src, key, val) {

                    self.handleSourceChanged(self, parent, keyElementMap, src, key, val);

                };

                source.listenChanges(lastSourceChangedHandler, false);

            }



            lastSource = source;

        } .bind(this);



        bindingSourceChangedHandlerFunc();

        this.listenForDataContextChanges(parent, bindingSourceChangedHandlerFunc);

    }