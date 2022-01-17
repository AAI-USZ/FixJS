function() {
            var
                pos    = 0,
                events = this._events.length,
                remove = [
                    '_min',
                    '_now',
                    '_max',
                    '_way',
                    'shown',
                    '_hold',
                    '_data',
                    '_nodes',
                    '_events',
                    '_offset',
                    '_params',
                    '_tangled',
                    '_handlers',
                    'hiddenable'
                ],
                event  = null,
                child  = this._nodes.block,
                parent = this._nodes.target;

            // Unbind events
            for (pos = 0; pos < events; pos++) {
                event = this._events[pos];

                this._unbind(event.target, event.alias, event.handler);
            }

            // Remove properties
            for (pos = 0; pos < 7; pos++) {
                delete this[remove[pos]];
            }

            // Remove DOM
            parent.removeChild(child);

            return true;
        }