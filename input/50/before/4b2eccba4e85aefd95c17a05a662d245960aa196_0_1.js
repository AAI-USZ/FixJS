function(SceneManager, sceneId) {
							if (!Runtime.currentEditor || Runtime.currentEditor.editorID != "davinci.review.CommentReviewEditor") { 
								return; 
							}
							if (this._commentView) {
								this._commentView.setCurrentScene(SceneManager, sceneId);
							}							
						}