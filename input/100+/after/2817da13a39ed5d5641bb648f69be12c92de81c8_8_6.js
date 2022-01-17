function(args) {

		var form = this._commentForm,

		comment = this.commentIndices[args.commentId];


		if (comment.ownerId != Runtime.userName) { 
			return;
		}


		if (form.isShowing) {

			// The form is open, we need to do some cleaning.

			this._onCommentFormCancel();

		}



		form.reset();

		form.commentId = args.commentId;

		form.subject.set("value", comment.subject);

		form.content.set("value", comment.content.replace(/<br\/>/g,"\n"));

		if(comment.content) form.hidePlaceHolder();

		form.setTypeButtonLabel(comment.type);

		form.setSeverityButtonLabel(comment.severity);

		form.setEditMode();

		if(comment.isReply()){

			form.setReplyMode();

		}

		form.replyTo = comment.replyTo;

		comment.hide();

		form.moveTo(comment.tempForm);

		form.editFrom = args.commentId;

		form.show();



		// Notify the drawing tool to be in edit mode

		dojo.publish(this._currentPage+"/davinci/review/drawing/enableEditing", 
				[
				 Runtime.userName,
				 form.commentId,
				 { pageState: comment.pageState,
					 pageStateList: comment.pageStateList,
					 viewScene: comment.viewScene,
					 viewSceneList: comment.viewSceneList }
		]);

	}