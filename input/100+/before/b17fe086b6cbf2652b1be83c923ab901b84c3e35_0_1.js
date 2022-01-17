function() {
            var opts = this.data("options");

            // Update li with selected data
            var v = (this.attr("multiple")) ? this.val() : [this.val()];
            $("li", this.data("dialog")).each(function() {
                var $li = $(this);
                var isSelected = ($.inArray($li.data("value"), v) != -1);
                $li.toggleClass("selected", isSelected);
            });

            // Update label
            var label = getSelectedAsText(this.find(":selected"), opts);
            this.data("label").text(label);
            
            updateState(this, opts);
            return this;
        }