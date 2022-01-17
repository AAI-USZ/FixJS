function(context) {

		this.inherited(arguments);

		var commentPalette = dijit.byId("davinci.ui.comment");

		if (!commentPalette._commentForm.isShowing) { 

			return;

		}

		var surface = this.doc.annotationSurface, 

		createTool = surface.createTool;



		createTool.deactivate();

		createTool.setShape("Rectangle", {

			colorAlias: surface.currentReviewer,

			a2c: dojo.hitch(Review, Review.getColor),

			commentId: surface.commentId,

			state: "",

			scene: ""

		});

		createTool.activate();

	}