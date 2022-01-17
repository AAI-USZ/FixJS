function(context) {

		this.inherited(arguments);

		var commentPalette = dijit.byId("davinci.ui.comment");

		if (!commentPalette._commentForm.isShowing) { 

			return;

		}

		var e = davinci.Workbench.getOpenEditor(); 

		var ctx = (e && e.getContext) ? e.getContext() : null;

		var surface = ctx ? ctx.surface : null;

		var createTool = surface ? surface.createTool : null;

		if(createTool){

			createTool.deactivate();

			createTool.setShape("Rectangle", {

				colorAlias: surface.currentReviewer,

				a2c: dojo.hitch(Review, Review.getColor),

				commentId: surface.commentId,

				state: "",

				stateList: "",

				scene: "",

				sceneList: ""

			});

			createTool.activate();

		}

	}