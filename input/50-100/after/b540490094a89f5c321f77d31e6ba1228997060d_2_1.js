function() {
            var clone = this.data('hjq-spinner');
            var that=this;
            if(!clone) {
                $(".ajax-progress").each(function() {
                    if($(this).data('source')[0]==that[0]) {
                        clone=$(this);
                        return false;
                    }
                });
            }
            if(!clone) return this;
            clone.remove();
            return this;
        }