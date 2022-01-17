function () {
                if (this.$element.parents('.collection-item').length !== 0){
                    this.$element.parent('.collection-item').remove();
                }
        }