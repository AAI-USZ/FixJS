function() {
    	$(this.el).html(template.newnessView.newness(this.model.toJSON()));
    	this.commentInput = $(this.el).find("#comment");
    	
    	//Like buttons
    	this.likeForm = $(this.el).find("#likeForm");
    	this.likeit = $(this.el).find("#likeit");
    	this.dlikeit = $(this.el).find("#dlikeit");
    	this.totalLikes = $(this.el).find("#totalLikes");
    	this.totalDlikes = $(this.el).find("#totalDlikes");
    	/////////////
    	
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