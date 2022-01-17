function () {
            var self = this;
            self.get("el").on("mousedown mouseup mouseover mouseout dblclick",
                handleChildMouseEvents, self);
        }