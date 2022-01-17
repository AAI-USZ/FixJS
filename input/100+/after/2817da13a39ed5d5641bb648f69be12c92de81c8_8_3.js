f
		this.inherited(arguments);

		// A cache that stores all the loaded comments attached to each page

		this._cached = { /*pageName: _comments [state: attr]*/ };

		this._cached.indices = {/*id: _comment*/};

		// Current comment widgets on this view

		this.comments = [];

		this.commentIndices = {

				"0": this

		};

		this._commentConns = [];



		this.container = new dijit.layout.ContentPane();

		this.commentReplies = this.container.domNode;

		dojo.attr(this.commentReplies, "tabindex", "0");

		this.setContent(this.container);

		this._initCommentForm();



		this.connect(this.commentReplies, "keydown", function(evt) {
			var that = this;

			var loopBody = function(comment) {
//FIXME
/*

				if (comment.pageState == pageState) {

*/
//FIXME: THIS IS WRONG. SHOULD CHECK focusedComments, not current status.
				if(that.commentIsActive(comment)){
					comment.enable();

				} else {

					comment.disable();

				}
				var replies = comment.getReplies();

				if (replies.length > 0) {

					dojo.forEach(replies, loopBody);

				}

			};

			if (!this._currentPage) {
				return; //No page is opened
			}

			if (evt.keyCode == dojo.keys.CTRL || evt.keyCode == dojo.keys.META) {

				var focusedComments = this._cached[this._currentPage].focusedComments;

				if (focusedComments.length > 0) {
//FIXME

					var pageState = this.commentIndices[focusedComments[0]].pageState;

					dojo.forEach(this.comments, loopBody);

				}

			}

		});



		this.connect(this.commentReplies, "keyup", function(evt) {

			if (evt.keyCode == dojo.keys.CTRL || evt.keyCode == dojo.keys.META) {

				var loopBody = function(comment) {

					comment.enable();

					var replies = comment.getReplies();

					if (replies.length > 0) {

						dojo.forEach(replies, loopBody);

					}

				};

				dojo.forEach(this.comments, loopBody);

			}

		});

		this.connect(this.commentReplies, "click", function(evt) {
			// Blur all the selected comments
			if (evt.target !== this.commentReplies) {
				return;
			}
			this._blurAllComments();
		});
		
		dojo.subscribe("/davinci/review/view/canvasFocused", this, function() {
			this._blurAllComments();
		});


		dojo.subscribe("/davinci/review/resourceChanged", this, function(arg1,arg2,arg3) {

			if (arg2 != "open" && arg2 != "closed" || !this._currentPage) {
				return;
			}

			if (this._currentPage.split("/")[2] == arg3.timeStamp) {

				this._versionClosed = arg2=="closed";

			}

			dijit.byId("davinciReviewToolbar.Add").set("disabled", this._versionClosed);

			dijit.byId("davinciReviewToolbar.Reviewers").set("disabled", false);

			dojo.publish(this._currentPage+"/davinci/review/drawing/addShape", ["[]", true]);

			this._destroyCommentWidgets();

			this._render();
//FIXME: THIS IS ALL BROKEN WITH NEW STATES/SCENES REGIME

//FIXME: getCurrentScene now takes a container node as a required param

//FIXME: Each saved state/scene needs to be a pair: containerNode + scene/state

//FIXME: Not sure how we are going to identify containers if they don't have IDs. XPath?

			var state = this._cached[this._currentPage].pageState,
				stateList = this._cached[this._currentPage].pageStateList,
				scene = this._cached[this._currentPage].viewScene || this._getCurrentScene().s,
				sceneList = this._cached[this._currentPage].viewSceneList || this._context.getCurrentScenes();

			dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
					[{pageState: state, pageStateList:stateList, viewScene: scene, viewSceneList:sceneList}, []]);



		});



		dojo.subscribe("/davinci/review/context/loaded", this, function(context, pageName){
			context._commentView = this;
			this._context = context;
			

			// summary:

			//		Load the comments when the page is loaded

			//		Collapse all the comments

			//		Enable the action icon on the toolbar

			var global = dojo.window.get(context.containerNode.ownerDocument);


			var designerId = context.resourceFile.parent.designerId;

			this._loadCommentData(designerId, pageName);

			if (Workbench.getOpenEditor() === context.containerEditor) {

				// Only need rendering when it is the current editor

				// No need to render when the editor is opened in the background

				this._currentPage = pageName;
				this._cached[this._currentPage].context = context;

				this._destroyCommentWidgets();
				//FIXME: Hack
				//Postpone updating shapes with setTimeout. Something happened
				//with Preview 4 code where page loading has altered timing.
				setTimeout(function() {
					this._render();
					this._updateToolbar({editor:context});
					// Show annotations
					this._reviewFilterChanged(); // Set reviewer list to be shown
					var rootNode = this._context.rootNode;
					var stateFocus = States.getFocus(rootNode);
					var stateList = this._context.getCurrentStates();
					var scene = this._getCurrentScene().s;
					var sceneList = this._context.getCurrentScenes();
					dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
							[{pageState: stateFocus.state, 
								pageStateList: stateList, 
								viewScene: scene,
								viewSceneList: sceneList}, 
							[]]);
					}.bind(this), 100);

			}

			// Response to the state change event in the review editor

			if (global && global.require) {
				var userConnect = global.require("dojo/_base/connect");

				userConnect.subscribe("/maqetta/appstates/state/changed", this, function(args) {

					if (!Runtime.currentEditor || Runtime.currentEditor.editorID != "davinci.review.CommentReviewEditor") { 
						return; 
					}
					if(!this._cached || !this._currentPage || !this._cached[this._currentPage]){
						return;
					}
					var state = args.newState || "Normal";
//FIXME: Maybe should convert to JSON until just before sending to server

					this._cached[this._currentPage].pageState = state;
					var stateList = this._cached[this._currentPage].pageStateList = this._context.getCurrentStates();
					var scene = this._cached[this._currentPage].viewScene = this._getCurrentScene().s;
					var sceneList = this._cached[this._currentPage].viewSceneList = this._context.getCurrentScenes();
					dojo.publish(this._currentPage+"/davinci/review/drawing/filter", 
							[{pageState: state, pageStateList:stateList, viewScene: scene, viewSceneList:sceneList}, []]);

				});

			}
			
			var sceneObj = this._getCurrentScene();
			if (sceneObj.s) { // if there is a sceneId in the scene object
				this.setCurrentScene(sceneObj.sm, sceneObj.s);
			}
		});



		dojo.subscribe("/davinci/ui/editorSelected", this, function(args) {

			// summary:

			//		Remove the comment nodes of the previous page

			
			var editor = this._editor = args.editor;



			//save the editing comment form

			if (args.oldEditor && args.oldEditor.basePath) {

				if (this._commentForm.isShowing) {

					var editingComment = {

							commentId : this._commentForm.commentId,

							replyTo: this._commentForm.replyTo,

							subject: this._commentForm.subject.get("value"),

							content: this._commentForm.content.get("value").replace(/\n/g, "<br/>"),

							severity: this._commentForm.severity.containerNode.innerHTML,

							type: dojo.byId(this._commentForm.type.id + "_label" ).innerHTML,

							editFrom: this._commentForm.editFrom

					};

					this._setPendingEditComment(args.oldEditor, editingComment);

				} else {

					//Clear out editing comment
					this._setPendingEditComment(args.oldEditor, null);

				}

			}

			if (editor && editor.basePath) {
				this._currentPage = editor.basePath.path;

				this._commentForm.hide();

				this._destroyCommentWidgets();

				this._updateToolbar(args);

				this._render();



				var focusedComments = this._cached[this._currentPage] && this._cached[this._currentPage].focusedComments;

				if (focusedComments) {

					dojo.forEach(focusedComments,dojo.hitch(this,function(commentId) {

						this.commentIndices[commentId].focusComment({ctrlKey:true, metaKey:true, silent: true});

					}));
				}



				//restore the commentForm

				if (this._cached[this._currentPage] && this._cached[this._currentPage].editComment) {

					var form = this._commentForm,

					editComment = this._cached[this._currentPage].editComment;


					form.reset();

					form.commentId = editComment.commentId;

					form.subject.set("value", editComment.subject);

					form.content.set("value", editComment.content.replace(/<br\/>/g,"\n"));

					if(editComment.content) form.hidePlaceHolder();

					form.setTypeButtonLabel(editComment.type);

					form.setSeverityButtonLabel(editComment.severity);

					var comment;

					if (editComment.replyTo !== 0) {

						form.setReplyMode();

						form.replyTo = editComment.replyTo;

						comment = this.commentIndices[editComment.replyTo];

						form.moveTo(comment.tempForm);

						var parent = comment;

						while (parent && parent.expand) {

							// Expand the comment if the parent of the comment is collapsed

							parent.expand();

							parent = this.commentIndices[parent.replyTo];

						}

						dojo.window.scrollIntoView(comment.domNode);



					}

					if (editComment.editFrom) {

						form.setEditMode();

						comment = this.commentIndices[editComment.editFrom];

						comment.hide();

						form.moveTo(comment.tempForm);

						dojo.window.scrollIntoView(comment.domNode);

					}



					form.show();
				}

			} 
			
			if (!editor || editor.editorID != "davinci.review.CommentReviewEditor") {
				// If there's no new editor (indicating all editors have been closed and 
				// user accepted the close tab warning if applicable) OR if the new editor 
				// isn't a review editor, let's clear out the comment view
				this._resetCommentView();
				this._currentPage = null;
			} else {
				this._versionClosed = editor.resourceFile.parent.closed;
			}

		});



		dojo.subscribe("/davinci/review/drawing/annotationSelected", this, function(commentId, selected) {

			var comment = this.commentIndices[commentId];

			var focusedComments = this._cached[this._currentPage].focusedComments;

			if (comment && !comment.isFocused || focusedComments.length > 1) {

				var parent = this.commentIndices[comment.replyTo];

				while (parent && parent.expand) {

					// Expand the comment if the parent of the comment is collapsed

					parent.expand();

					parent = this.commentIndices[parent.replyTo];

				}

				dojo.window.scrollIntoView(comment.domNode);

				comment.focusComment();

				this._flash(comment.getBody());

			} else if(comment) {

				comment.blurComment();

			}

		});



		dojo.subscribe("/davinci/review/commentStatusChanged", this, function(comment, status) {

			var focusedComments = this._cached[this._currentPage].focusedComments;
			var designerId = this._getDesignerId();

			this._loadCommentData(designerId, this._currentPage);

			var loopBody = function(comment){

				comment.status = status;

				var replies = comment.getReplies();

				comment.refresh();

				if(replies&&replies.length > 0){

					dojo.forEach(replies, loopBody);

				}

			};

			loopBody(comment);

			// Recover the value with the old array

			this._cached[this._currentPage].focusedComments = focusedComments;

		});



		dojo.subscribe("/davinci/review/commentAddedError",this,this._onErrorCreateNewComment);

	},
