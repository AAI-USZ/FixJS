function () {
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
              app.feedingView.close();
              app.navigate('#', true);
            },
            error: function() {
              alert('Error during the creation of a new feeding');
            }
          });
        } else {
          console.log('existing model with id: ' + this.model.id);
          this.model.save(this.model, {
            success: function(){ 
              app.feedingView.close();
              app.navigate('#', true);
            },
            error: function(){ alert('Error during the saving of the feeding');
            }
          });
        }
        return false;
    }