function ( views ){

	views.ItemView = Backbone.View.extend({
    tagName:"tr",
		template: _.template($('#tpl-feeding-details').html()),

		initialize: function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render : function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
    
    events:{
        "change input":"change",
        "click .save":"saveFeeding",
        "click .delete":"deleteFeeding",
        "click .close":"closeFeeding"
    },
 
    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        // You could change your model on the spot, like this:
        // var change = {};
        // change[target.name] = target.value;
        // this.model.set(change);
    },
 
    saveFeeding:function () {
        this.model.set({
            date:$('#date').val(),
            side:$('#side').val(),
            time:$('#time').val(),
            excrement:$('#excrement').val(),
            remarks:$('#remarks').val()
        });
        if (this.model.isNew()) {
          console.log('new model with id: ' + this.model.id);
          var self = this;
          app.feedingList.create(this.model, {
            success: function() {
              app.navigate('feedings/'+self.model.id, false);
            }
          });
        } else {
          console.log('existing model with id: ' + this.model.id);
          this.model.save();
        }
        return false;
    },
 
    deleteFeeding:function () {
        this.model.destroy({
            success:function () {
                alert('Feeding deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    closeFeeding:function () {
      this.close();
      app.feedingView.close();
      app.navigate('#');
    },
 
    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }

	});

}