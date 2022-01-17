function(){
            var content = this.model.toJSON();
            $(this.el).html(this.template(content));
            return this;
        }