function(e){
            var index = Array.prototype.indexOf.call(base.options.pager.children(), e.target.parentNode);
            base.showSlideNr(index);
            return false;
        }