function () {
                var _self = this,
                    events = _self.get('events');
                S.each(events, function (event) {
                    _self.publish(event, {
                        bubbles:1
                    });
                });
            }