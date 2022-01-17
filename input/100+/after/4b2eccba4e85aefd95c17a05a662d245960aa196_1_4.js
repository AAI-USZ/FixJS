function(args) {

		var form = this._commentForm;



		if (form.isShowing) {

			this._onCommentFormCancel();

		}



		form.reset(); // Ensure that the form is restored

		form.commentId = getNewGuid();

		form.setReplyMode();

		form.replyTo = args.replyTo;

		form.subject.set("value", args.subject);

		var comment = this.commentIndices[args.replyTo];

		form.moveTo(comment.tempForm);

		form.show();



		// Notify the drawing tool to be in edit mode

		dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing", 
				[
				 Runtime.userName,
				 form.commentId,
				 { pageState: this._cached[this._currentPage].pageState,
					 pageStateList: this._cached[this._currentPage].pageStateList,
					 viewScene: this._cached[this._currentPage].viewScene,
					 viewSceneList: this._cached[this._currentPage].viewSceneList }
		]);

	}