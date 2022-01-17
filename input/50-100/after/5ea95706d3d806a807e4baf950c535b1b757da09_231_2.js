function () {
                var _self = this,
                    parent = _self.get('parent'),
                    events = _self.get('events');
                if (!parent) {
                    return;
                }
                S.each(events, function (event) {
                    _self.publish(event, {
                        bubbles:1
                    });
                });
            }