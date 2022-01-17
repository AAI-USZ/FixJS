function(e){
            var index = $.inArray(e.target.parentNode, base.options.pager.children());
            base.showSlideNr(index);
            return false;
        }