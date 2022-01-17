function() {
    	//TODO hacer que esto cambie
    	$(this.el).html(template.newnessView.newness(this.model.toJSON()));
    	this.commentInput = $(this.el).find("#comment");
    	
    	//this.commentList.fetch({data:{id: this.model.get('id') }});
    	this.commentListContainer = $(this.el).find("#comments");
    	this.commentList.reset( this.model.get("comments") );
    	/*var cont = commentListContainer = $(this.el).find("#comments");
    	this.commentList.each(function(comment){
    		var view = new NewnessCommentView({model: comment});
            cont.append(view.render().el);
    	});*/
    	
      return this;
    }