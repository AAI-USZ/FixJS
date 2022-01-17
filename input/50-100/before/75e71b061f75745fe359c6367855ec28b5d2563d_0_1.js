function(){
        this.$el.append( this.template(model.toJSON()) );
        console.log(this.el);
        //loading widget1
        view.render();
        view.render();
        view.render();
        view.render();
        view.render();
        view.render();

      // a convention to enable chained calls
      return this;
    }