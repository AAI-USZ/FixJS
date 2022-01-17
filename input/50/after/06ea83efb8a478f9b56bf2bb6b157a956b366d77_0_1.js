function (event) {
            return this.$__events[event] ?
                ( this.$__events[event].length === 0 ? false : this.$__events[event].length )
            : false;
        }