function(){
            var content = this.model.toJSON();
            this.id = this.model.get('_id');
            $(this.el).attr('id', this.id).html(this.template(content));
            return this;
        }