function(window) {
"use strict";
window.subv = {
	currentPage: -1,
	init: function() {
		doT.templateSettings.strip = false;
		subv.bindEvents();
		subv.items.reset();
		subv.items.loadNext();
		subv.settings.load();
		subv.settings.effect();
	},
	log: function(context) {
		if ( !window.console || !window.console.log ) {
			return false;
		}
		if (context && typeof context === "object") {
			console.log(context);
		} else {
			console.log("LOG: " + context);
		}
	},
	settings: {
		expandMode: undefined,
		margin: undefined,
		splitter: undefined,
		notFirstRun: undefined,
		/** load settings from the storage into app
		 */
		load: function() {
			subv.settings.splitter = amplify.store("subv.settings.splitter");
			subv.settings.margin = amplify.store("subv.settings.margin");
			subv.settings.expandMode = amplify.store("subv.settings.expandMode");
			subv.settings.notFirstRun = amplify.store("subv.settings.notFirstRun");
		},
		/** save settings into the storage
		 */
		save: function() {
			amplify.store("subv.settings.margin", subv.settings.margin);
			amplify.store("subv.settings.splitter", subv.settings.splitter);
			amplify.store("subv.settings.expandMode", subv.settings.expandMode);
			amplify.store("subv.settings.notFirstRun", subv.settings.notFirstRun);
		},
		/** make the UI reflects the settings, and effective these settings.
		 */
		effect: function() {
			if (subv.settings.notFirstRun) {
				;
			} else {
				subv.util.isIPhone ? subv.setting.presetIPhone : subv.settings.presetDesltop;
			}
			
			var val, vleft, vright;
	
			// MARGIN
			// TODO: move the magic number "2", etc
			val = subv.settings.margin;
			if (subv.settings.margin !== 0 && !subv.settings.margin) {
				val = 2;
			}
			//subv.log("margin is 0 " + val + "%");
			(function(marginVal) {
				setTimeout(function() {
					$("#wrapper").css({
						"margin-left": marginVal + "%",
						"margin-right": marginVal + "%"
					});
				}, 1000);
			})(val);
			$("#width-margin").val(val);
	
			// SPLITTER
			vleft = subv.settings.splitter || 42;
			vright = 100 - vleft;
			if (vright === 0) {
				vright = 100;
			}
			$("#items").css({ "width": vleft + "%" });
			$("#item").css({ "width": vright + "%" });
			$("#width-splitter").val(vleft);
	
			// EXPAND
			val = subv.settings.expandMode || "inline";
			$(".js-expand-mode").removeClass("active");
			$("#js-expand-mode-" + val).addClass("active");
		},
		presetIPhone: function() {
			subv.settings.margin = 0;
			subv.settings.splitter = 100;
			subv.settings.expandMode = "inline";
			subv.settings.notFirstRun = true;
			subv.settings.save();
		},
		presetDesktop: function() {
			subv.settings.margin = 2;
			subv.settings.splitter = 42;
			subv.settings.expandMode = "outline";
			subv.settings.notFirstRun = true;
			subv.settings.save();
		}
	},
	item: {
		markRead: function(id, comments) {
				amplify.store("read-"+id+"-"+comments, "true");
		},
		markUnRead: function(id, comments) {
				amplify.store("read-"+id+"-"+comments, "false");
		},
		isRead: function(id, comments) {
				if (amplify.store("read-"+id+"-"+comments) === "true") {
						return true;
				}
				return false;
		},
		markBan: function(id) {
				amplify.store("ban-"+id, "true");
		},
		markUnban: function(id) {
				amplify.store("ban-"+id, "false");
		},
		isBanned: function(id) {
				if (amplify.store("ban-"+id) === "true") {
						return true;
				}
				return false;
		},
		// TODO: rewrite
		expand: function(id) {
			subv.log("subv.item.expand(" + id + ")");

			var $item = $("[id^=item-" + id + "-]");
			var $itemx;
			if (subv.settings.expandMode === "inline" &&
					$item.hasClass("cached")) {
				$item.addClass("inline expanded");
				return;
			}
			if (subv.settings.expandMode === "inline") {
				$itemx = $item;
			} else if (subv.settings.expandMode === "outline" ||
					subv.settings.expandMode === "stacked") {
				$itemx = $("<div/>").addClass("item");
				$itemx.append($item.find(".item-heading").clone());
			}
			if (subv.settings.expandMode !== "inline") {
				if (subv.settings.expandMode === "outline") {
					$("#item").empty().append($itemx);
				} else if (subv.settings.expandMode === "stacked") {
					$("#item").append($itemx);
				}
			}
			if (subv.settings.expandMode === "outline") {
				$("html, body").animate({
					"scrollTop": $itemx.offset().top
				});
			}

			$(".item.outline.expanded").removeClass("outline expanded");
			$(".item.outline.expanded").removeClass(".stacked.expanded");
			$item.addClass("expanding cached").addClass(subv.settings.expandMode);
			$itemx.addClass("expanding");

			var template = doT.template( $("#item-comments-template").html() );
			var $comments = $( template({ "id": id}) );
			$itemx.append($comments);

			subv.api.v2ex.getItem(id, null, function(item) {
				var template, i;
				subv.log(item);
				// op
				var $op = $comments.find(".op");
				template = doT.template( $("#comment-item-template").html() );
				$op.append( template(item.comments[0]) );
				// comments
				for (i = 1; i <= item.pages; i++) {
					$comments.addClass("haspage-" + i);
				}
				var $page = $comments.find(".page-" + item.current_page).empty();
				for (i = 1; i < item.comments.length; i++) {
					template = doT.template( $("#comment-item-template").html() );
					$page.append( template(item.comments[i]) );
				}
				$item.removeClass("expanding").addClass("expanded");
				$itemx.removeClass("expanding").addClass("expanded");
				subv.item.markRead(id, item.comments_count);
			});
		},
		collapse: function(id) {
		}
	},
	items: {
		markAllAsRead: function() {
			$("#latest .item").each(function() {
				var id = $(this).attr("id").split("-")[1];
				var comments = $(this).attr("id").split("-")[2];
				subv.item.markRead(id, comments);
			});
			subv.items.reset();
		},
		markAllAsBanned: function() {
			$("#latest .item").each(function() {
				var id = $(this).attr("id").split("-")[1];
				var comments = $(this).attr("id").split("-")[2];
				if (!subv.item.isRead(id, comments)) {
					subv.log("Banning " + id);
					subv.item.markBan(id);
				}
			});
			subv.items.reset();
		},
		// callback after completed
		loadNext: function(callback) {
			subv.currentPage++;
			subv.api.v2ex.getItems(subv.currentPage, function(items) {
				for (var i = 0; i < items.length; i++) {
					// duplicate check
					var id = "#item-" + items[i].id + "-" + items[i].comments_count;
					if ($(id).length !== 0) {
						subv.log("skipped duplicated item: " + id);
						continue;
					}

					// safe to add
					var templateText = $("#item-template").html();
					var t = (doT.template(templateText))(items[i]);
					if (subv.item.isBanned(items[i].id)) {
						$("#banned").append(t);
					} else if (subv.item.isRead(items[i].id, items[i].comments_count)) {
						$("#read").append(t);
					} else {
						$("#latest").append(t);
					}
				}
				// update the #read/#banned counter
				$("#read-items-counter").text($("#read > .item").length);
				$("#banned-items-counter").text($("#banned > .item").length);
				if (typeof callback === "function") {
					callback();
				}
			});
		},
		_clear: function() {
			$("#latest").html("");
			$("#read").hide().html("");
			$("#read-items-counter").text("0");
			$("#banned").hide().html("");
			$("#banned-items-counter").text("0");
			$("#item").html("");
		},
		reset: function() {
			subv.items._clear();
			subv.currentPage = -1;
			subv.items.loadNext();
			// TODO: is auto collapse settings area really good?
			$("#prefs").slideUp();
			// scroll to top
			$("html, body").animate({
				"scrollTop": 0
			});
		}
	},
	// TODO: rewrite
	bindEvents: function() {
		$(document).on("click", "a", function(e) {
			e.preventDefault();
		});

		$("#prefs-toggle").on("click", function() {
			$("#prefs").toggle();
		});

		/*
		$("#btn-update").on("click", function() {
			applicationCache.update();
		});
		*/

		$("#btn-read-all").on("click", function() {
			subv.items.markAllAsRead();
		});

		$("#btn-ban-all").on("click", function() {
			subv.items.markAllAsBanned();
		});

		$("#logo, #btn-reload").on("click", function() {
			subv.items.reset();
		});

		// TODO: too messy
		$("#more"/* <button/> */).on("click", function() {
		var
			$this = $(this),
			moreString = "more",
			loadingString = "fetching more...";

			if ($this.hasClass("disabled")) {
				return;
			}

			$this.addClass("disabled").text(loadingString);
			subv.items.loadNext(function() {
				$this.removeClass("disabled").text(moreString);
			});
		});

		$("#read-items-toggle").on("click", function() {
			$("#read").slideToggle();
		});

		$("#banned-items-toggle").on("click", function() {
			$("#banned").slideToggle();
		});

		/* unused
		$("#search-form").on("submit", function(e) {
			e.preventDefault();
			var url = "https://www.google.com/search?q=site%3Av2ex.com%2Ft+";
			var keywords = $(this).find("input").val();
			window.open(url + keywords)
		});
		*/

		$(document).on("click", ".item-heading .title a, .item a.comments-count", function(e) {
			var id = $(this).closest(".item").attr("id").split("-")[1];
			subv.log("clicked item id: " + id);
			subv.item.expand(id);
		});

		$(document).on("submit", ".comment-form", function(e) {
			e.preventDefault();
			var id = $(this).attr("action").split("/").pop();
			subv.log("COMMENT FUNCTION DISABLED");
			//$.ajax({
			//	"url": $(this).attr("action"),
			//	"type": "POST",
			//	"data": $(this).serialize(),
			//	"success": function() {
			//		subv.log("POST to " + id + " success!");
			//	}
			//});
		});

		$("#js-preset-iphone").on("click", function() {
			subv.settings.presetIPhone();
			subv.settings.effect();
			subv.items.reset();
		});

		$("#js-preset-desktop").on("click", function() {
			subv.settings.presetDesktop();
			subv.settings.effect();
			subv.items.reset();
		});

		$("#js-expand-mode-inline").on("click", function() {
			subv.settings.expandMode = "inline";
			subv.settings.effect();
		});

		$("#js-expand-mode-outline").on("click", function() {
			subv.settings.expandMode = "outline";
			subv.settings.effect();
		});

		$("#js-expand-mode-stacked").on("click", function() {
			subv.settings.expandMode = "stacked";
			subv.settings.effect();
		});

		$("#width-splitter").on("change", function() {
			subv.settings.splitter = $(this).val();
			subv.settings.save();
			subv.settings.effect();
		});

		$("#width-margin").on("change", function() {
			subv.settings.margin = $(this).val();
			subv.settings.save();
			subv.settings.effect();
		});

		$(document).on("click", ".js-show-comment-box", function() {
			$(this).next().show();
			$(this).remove();
		});

		$(document).on("click", ".js-load-page", function() {
			var page = $(this).attr("id").split("-")[2];
			var id = $(this).attr("id").split("-")[1];
			var $container = $(this).parent();
			// TODO: move strings into the html & css?
			$(this).text("Loading page " + page + "...");
			subv.api.v2ex.getItem(id, page, function(item) {
				var i;
				var template = doT.template( $("#comment-item-template").html() );
				$container.html("");
				for (i = 1; i < item.comments.length; i++) {
					$container.append( template(item.comments[i]) );
				}
			});
		});

		$(document).on("click", ".goto-item", function() {
			subv.log("goto clicked");
			var id = $(this).attr("id").split("-").pop();
			var $item = $("[id^=item-" + id + "]");
			$("html, body").animate({
				"scrollTop": $item.offset().top
			});
		});

		$(document).on("click", ".goto-top", function() {
			$("html, body").animate({
				"scrollTop": 0
			});
		});

		$("#viewport-width-selector").on("change", function() {
			$("#viewport-width").attr("content", $(this).find("option:selected").val());
			subv.log("viewport settings changed to " + $("#viewport-width").attr("content"));
		});

		subv.awful.reloadButtonHotFix();
	},
	// some hacks.
	awful: {
		reloadButtonHotFix: function() {
			// fix the width for various (8) times,
			// I can't fix it through CSS yet
			(function widthFix(times, isFirst) {
				if (!isFirst) {
					var width = 0;
					var $btnsParent = $("#btn-reload").parent();
					var $btns = $btnsParent.find(".btn");
	
					$btns.each(function() { width += $(this).outerWidth(); });
					$btnsParent.width(width);
					//subv.log("calculated #reload-btn width is " + width);
				}

				if (times === 0) {
					return;
				}

				setTimeout(function() {
					widthFix(--times, false);
				}, 3000);
			})(4, true);
		}
	},
	util: {
		// detect iPhone && iPod touch
		isIPhone: function() {
			return !!(navigator.userAgent.match(/iPhone/i) ||
					navigator.userAgent.match(/iPod/i));
		}
	}
};
}