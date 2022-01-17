function(args) {

		var form = this._commentForm,

		_comments = this._cached[this._currentPage] || [];

		var bodyNode = this._cached[this._currentPage].context.rootNode;
		var statesFocus = States.getFocus(bodyNode);



		// Get drawing JSON string

		dojo.publish(this._currentPage+"/davinci/review/drawing/getShapesInEditing", 
				[this, 
				 {state: this._cached[this._currentPage].pageState, 
					stateList: this._cached[this._currentPage].pageStateList, 
					scene: (this._cached[this._currentPage].viewScene || this._getCurrentScene().s),
					sceneList: (this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes()) }]);


		var comment = new Comment({

			commentId: form.commentId,

			subject: args.subject,

			content: args.content,
			designerId: this._getDesignerId(),

			pageName: this._currentPage,

			pageState: this._cached[this._currentPage].pageState,
			pageStateList: this._cached[this._currentPage].pageStateList,
			viewScene: this._cached[this._currentPage].viewScene || this._getCurrentScene().s,
			viewSceneList: this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes(),
			ownerId: Runtime.userName,

			//email: Runtime.getDesignerEmail(),

			replyTo: form.replyTo,

			drawingJson: this.drawingJson,

			type: args.type,

			severity: args.severity,

			status: "Open", // By default, the status of a new comment is open.

			closed: this._versionClosed

		});

		this._commentConns.push(

				dojo.connect(comment, "onNewReply", this, "_onNewReply"),

				dojo.connect(comment, "onEditComment", this, "_onEditComment"),

				dojo.connect(comment, "onCommentFocus", this, "_onCommentFocus"),

				dojo.connect(comment, "onCommentBlur", this, "_onCommentBlur")

		);



		this.commentIndices[comment.commentId] = comment;

		form.hide();

		var parent = this.commentIndices[comment.replyTo];

		parent.appendReply(comment);

		if (parent.expand) {
			parent.expand();
		}

		// Make sure the focus is at the bottom of review panel after adding a new comment. 

		dojo.window.scrollIntoView(comment.domNode);

		comment.focusComment();

		this._flash(comment.getBody());



		// Update the cache finally

		var _comment = {

				id: comment.commentId,

				subject: comment.subject,

				content: comment.content,

				pageName: comment.pageName,

				pageState: comment.pageState,
				pageStateList: comment.pageStateList,
				viewScene: comment.viewScene,

				viewSceneList: comment.viewSceneList,
				ownerId: comment.ownerId,

				email: comment.email,

				depth: comment.depth,

				replyTo: comment.replyTo,

				drawingJson: comment.drawingJson,

				type: comment.type,

				severity: comment.severity,

				status: comment.status

		};

		_comments.push(_comment);

		this._cached.indices[_comment.id] = _comment;

	}