function(){
        this.$el.append( this.template(model.toJSON()) );
        console.log(this.el);
        //loading widget1
        viewWidget1.render();
        viewWidget2.render();

      // a convention to enable chained calls
      return this;
    }