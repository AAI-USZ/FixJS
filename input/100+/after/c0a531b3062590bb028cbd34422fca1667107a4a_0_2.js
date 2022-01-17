function(method, startEvent, completeEvent){
            var _this = this,
                _complete = function () {
                    if (startEvent == 'show') { _this.reset(); }
                    _this.transitioning = 0;
                    on.emit(_this.domNode, completeEvent, {bubbles: false, cancelable: false});
                };

            on.emit(this.domNode, startEvent, {bubbles: false, cancelable: false});

            this.transitioning = 1;

            domClass[method](this.domNode, 'in');

            trans && domClass.contains(this.domNode, 'collapse') ?
                on.once(_this.domNode, trans.end, _complete) : _complete();
        }