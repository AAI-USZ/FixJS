function init() {

	chrome.bookmarks.search('$Sexy NewTab$', function(slotsAnchor) {

		if (0 === slotsAnchor.length) {

			chrome.bookmarks.getTree(function(Tree) {

				var tmpOtherBookmarksId = Tree[0].children[1].id;

				chrome.bookmarks.create({

					parentId: tmpOtherBookmarksId,

					title: "$Sexy NewTab$"

				}, function(parentFolder) {

					settingsNodeId = parentFolder.id;

					chrome.bookmarks.create({

						parentId: settingsNodeId,

						title: "$Sexy NewTab$ !do not edit!",

						url: "https://chrome.google.com/webstore/detail/cbmkldolpdkljfjhghoaeehelhbiimbh",

						index: 0

					});

					for (var i = 1; 12 >= i; i++) {

						chrome.bookmarks.create({

							parentId: settingsNodeId,

							title: "null",

							url: 'data:image/png;base64,',

							index: i

						});

						slots[i] = {

							url: null,

							thumb: null

						};

					}

					announce();

					//TODO Add Cols&Rows parameters bookmark.

				});

			});

		} else {

			settingsNodeId = slotsAnchor[0].parentId;

			load();

		}

	});

}