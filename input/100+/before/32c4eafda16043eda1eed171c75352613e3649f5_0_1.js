function($) {

function debug(text) {
	console.log("[+] RSS Share - "+text);
}

if (window==top) {
	//CONSTANTS
	var TICK=10000;
	var TICK_REFERENCES=1;
	var TICK_UNREAD=30;
	var TICK_TOKEN=60;
	//reference classes
	var ITEM_REFERENCE_ALL = '?';
	var CLASS_REFERENCE_ENTRY = "entry";
	var CLASS_REFERENCE_ENTRY_SELECTED = "selected";
	var CLASS_REFERENCE_ENTRY_TITLE = "title";
	var CLASS_REFERENCE_SUMMARY = "summary";
	var CLASS_REFERENCE_SHARE_BUTTON = "share";
	var CLASS_REFERENCE_MARK_UNREAD_BUTTON = "markunread";
	var CLASS_REFERENCE_MARKED_UNREAD = "markedunread";
	var CLASS_REFERENCE_UNREAD = "unread";
	var CLASS_REFERENCE_MENU_READER = "googleReaderMenu";
	var CLASS_REFERENCE_BUTTON = "menuButton";
	var CLASS_REFERENCE_BUTTON_TAG = "menuButtonTag";
	var CLASS_REFERENCE_OPEN_BUTTON = "open";
	var CLASS_REFERENCE_SETTINGS_ICON = "setIcon";
	var CLASS_REFERENCE_SETTINGS = "settings";
	var CLASS_REFERENCE_SUBTREE = "subtag";
	var CLASS_REFERENCE_TAGNAME = "tagname";
	var CLASS_REFERENCE_TITLE = "feedtitle";
	var CLASS_REFERENCE_FEEDS = "feedsContent";
	var CLASS_REFERENCE_ENTRY_FEED_TITLE = "entryFeedTitle";
	var CLASS_REFERENCE_ENTRY_FEED_DATE = "entryFeedDate";
	var CLASS_REFERENCE_ENTRY_FEED_META = "entryFeedMeta";
	var CLASS_REFERENCE_MENU_ICON = "listIcon";
	var CLASS_REFERENCE_BUTTON_SELECTED = "selected";
	var CLASS_REFERENCE_TAGS_NO_ITEM = "emptyTag";
	var ID_REFERENCE_RIGHT_ELEMENT_LIST = "rightElementList";
	var ID_REFERENCE_READER_ICON = "readerIcon";
	var SELECTOR_CLASS_REFERENCE_PARENT = "div#content div[role|='listbox'] > div:eq(3)";
	var SELECTOR_CLASS_REFERENCE_ENTRY = 'div.'+CLASS_REFERENCE_ENTRY;
	var SELECTOR_CLASS_REFERENCE_UNREAD = 'div.'+CLASS_REFERENCE_UNREAD;
	var SELECTOR_CLASS_REFERENCE_SHARE_BUTTON = 'a.'+CLASS_REFERENCE_SHARE_BUTTON;
	var SELECTOR_CLASS_REFERENCE_MARK_UNREAD_BUTTON = 'a.'+CLASS_REFERENCE_MARK_UNREAD_BUTTON;
	var ID_ELEMENT_LIST = "elementList";

	//all elements
	var all = {};

	//reference to our new menu
	var googleReaderMenu;
	//reference to the parent of our menu
	var googleReaderIconParent;
	//reference to the "Show Read" button
	var showButtonTags;
	//reference to the "Show Read Items" button
	var showButton;
	//reference to the "Mark All Read" button
	var markAllReadButton;
	//reference to the "List View" button
	var listViewButton;
	//reference to the feeds part
	var referenceMiddle;

	//current tag being shown
	var currentTag;
	//selected rss item
	var currentEntry=0;
	//amount of items being shown
	var currentMax=0;
	//continuation key for google reader requests
	var continuation;
	//token key for google reader api
	var token;
	//settings button 
	var settings;


	//references to google+ objects
	var referenceRoot;
	var referenceBreak;
	var referenceMenu;
	var referenceContent;
	var referenceContentParent;

	//save unread count before modifying it
	var currentUnreadCount;
	//variable to see if we are fetching new items
	//so we dont ask again
	var fetching=false;
	//should we show read items?
	var showRead=false;
	var showReadTags=false;

	//empty tag rule
	var ruleEmptyTag;


	var tick=0;

	function updateReferences() {
		referenceRoot = $("#content a[href*='/stream']").first();
		googleReaderIconParent = $(SELECTOR_CLASS_REFERENCE_PARENT);
		referenceMenu = $('#content a[href$="/notifications/all"]');
		referenceContent = $("#contentPane");
		referenceContentParent = $("#content");
	}

	function update() {
		if (googleReaderMenu!=undefined && googleReaderIconParent.find("."+CLASS_REFERENCE_MENU_READER).length==0) {
			googleReaderIconParent.unbind('DOMSubtreeModified',update);
			updateReferences();
			googleReaderMenu.insertAfter(referenceMenu);
			googleReaderIconParent.bind("DOMSubtreeModified",update);
		}
	};
	function updateToken() {
		chrome.extension.sendRequest({
			method:"GET",
			dataType:'text',
			url:"http://www.google.com/reader/api/0/token?ck="+Math.round(Date.now()/1000)+"&client=googleplusereader"},
			function(data) {
				token=data;
			}
		);
	}
	function updateUnreadCount() {
		chrome.extension.sendRequest({
			method:"GET",
			dataType:'json',
			url:"http://www.google.com/reader/api/0/unread-count?all=true&output=json"},
			function(data) {
				var rcvdunread = data.unreadcounts;
				var count = rcvdunread.length;
				for (var i=0; i<count; i++) {
					if (all[rcvdunread[i].id]!=undefined) {
						all[rcvdunread[i].id].updateCount(rcvdunread[i].count);
					} else if (rcvdunread[i].id.indexOf("reading-list")>0) {
						all[ITEM_REFERENCE_ALL].updateCount(rcvdunread[i].count);
					}
				}
				update();
				if (!showReadTags)
					googleReaderMenu.find("."+CLASS_REFERENCE_TAGS_NO_ITEM).hide();
			}
		);
	}

	function updater() {
		tick++;
		if (tick%TICK_REFERENCES==0) {
			update();
		}
		if (tick%TICK_UNREAD==0) {
			updateUnreadCount();
		}
		if (tick%TICK_TOKEN==0) {
			updateToken();
			tick=0;
		}
		setTimeout(updater,TICK);
	}



	//ask background to give me options and start add google reader if set
	chrome.extension.sendRequest({
		method:"status"},
		function(data) {
			showRead=data.showRead;
			showReadTags=data.showReadTags;
			listView=data.listView;
			addGoogleReader();
		});

	function addGoogleReader() {
		/** OBJECTS **/
		//Feed element
		function Feed(data,url) {

			this.id = data.id;
			this.url = url;
			this.name = data.title;
			this.unreadCount = 0;
			this.tags = [];
			this.DOMtext="";
			this.DOM;
			this.DOMtagname;

			//keep reference
			var that = this;

			var list = data.categories;
			var count = list.length
				for (var i=0; i<count; i++) {
					if (all[list[i].id]!=undefined) {
						all[list[i].id].addFeed(that);
						that.tags.push(all[list[i].id]);
					}
				}

			this.init = function() {
				var DOM = '<div title="'+that.id+'" class="'+CLASS_REFERENCE_BUTTON+" "+CLASS_REFERENCE_BUTTON_TAG+'">';
				var txt;
				txt = that.name.length<15?that.name:that.name.substring(0,15)+'…';
				var DOMtagname = '<div class="'+CLASS_REFERENCE_TAGNAME+'"';
				if (that.unreadCount>0) {
					if (that.unreadCount>=1000) {
						txt += " (1000+)";
					} else {
						txt += " ("+that.unreadCount+")";
					}
					DOMtagname+= ' style="font-weight:bold"';
				}
				DOMtagname+='>';
				DOMtagname+=txt;
				DOMtagname+='</div>';
				DOM+=DOMtagname;
				DOM+='</div>';
				that.DOMtext=DOM;
			}

			this.setObjects = function() {
				that.DOM=$("div[title|='"+that.id+"']");
				that.DOMtagname=that.DOM.find("div."+CLASS_REFERENCE_TAGNAME);
				if (that.unreadCount<=0) {
					that.DOM.addClass(CLASS_REFERENCE_TAGS_NO_ITEM);
					if (!showReadTags)
						that.DOM.hide();
				} else {
					that.DOM.removeClass(CLASS_REFERENCE_TAGS_NO_ITEM);
					if (!showReadTags)
						that.DOM.show();
				}
			}

			this.updateCount = function(unread) {
				if (unread!=that.unreadCount) {
					that.unreadCount=unread;
					var txt;
					txt = that.name.length<15?that.name:that.name.substring(0,15)+'…';
					that.DOMtagname.css('font-weight','');
					if (that.unreadCount>0) {
						if (that.unreadCount>=1000) {
							txt += " (1000+)";
						} else {
							txt += " ("+that.unreadCount+")";
						}
						that.DOMtagname.css('font-weight','bold');
					}
					that.DOMtagname.text(txt);
					if (that.unreadCount<=0) {
						that.DOM.addClass(CLASS_REFERENCE_TAGS_NO_ITEM);
						if (!showReadTags)
							that.DOM.hide();
					} else {
						that.DOM.removeClass(CLASS_REFERENCE_TAGS_NO_ITEM);
						if (!showReadTags)
							that.DOM.show();
					}
				}
			}

			this.isRoot = function() {
				return that.tags.length==0;
			}
			this.hasElements = function() {
				return true;
			}
			this.select = function(){
				that.DOM.addClass(CLASS_REFERENCE_BUTTON_SELECTED);
			}
			this.unselect = function(){
				that.DOM.removeClass(CLASS_REFERENCE_BUTTON_SELECTED);
			}
			this.decreaseCount = function() {
				that.updateCount(that.unreadCount-1);
				var count = that.tags.length;
				for (var i=0; i<count; i++) {
					that.tags[i].decreaseCount();
				}
			}
			this.increaseCount = function() {
				that.updateCount(that.unreadCount+1);
				var count = that.tags.length;
				for (var i=0; i<count; i++) {
					that.tags[i].increaseCount();
				}
			}
		}
		//Tag element, contains Feed elements
		function Tag(rcvdid,rcvdname,url) {
			//feeds in this tag
			this.feeds = [];
			this.id = rcvdid;
			this.url = url;
			this.name = rcvdname;
			this.unreadCount = 0;
			this.DOMtext="";
			this.DOM;
			this.DOMmain;
			this.DOMopen;
			this.DOMtagname;
			this.DOMfeeds;

			var that = this;

			this.addFeed = function(feed) {
				that.feeds.push(feed);
			}
			this.isRoot = function() {
				return true;
			}
			this.hasElements = function() {
				return that.feeds.length!=0;
			}


			this.init = function() {
				var DOM = '<div title="'+that.id+'" class="'+CLASS_REFERENCE_BUTTON+" "+CLASS_REFERENCE_BUTTON_TAG+'">';
				var DOMmain = '<div>';
				var DOMtagname = '<div class="'+CLASS_REFERENCE_TAGNAME+'"';
				var txt;
				txt = that.name.length<15?that.name:that.name.substring(0,15)+'…';
				if (that.unreadCount>0) {
					if (that.unreadCount>=1000) {
						txt += " (1000+)";
					} else {
						txt += " ("+that.unreadCount+")";
					}
					DOMtagname+= ' style="font-weight:bold"';
				}
				DOMtagname+='>';
				DOMtagname+= txt;
				DOMtagname+= '</div>';
				DOMmain+= DOMtagname;

				//add button to open tag
				var DOMopen = '<div class="'+CLASS_REFERENCE_OPEN_BUTTON+'"></div>';
				DOMmain+= DOMopen;

				DOMmain+= '</div>';
				DOM+= DOMmain;

				var DOMfeeds = '<div class="'+CLASS_REFERENCE_SUBTREE+'" style="display:none">';
				for (var h in that.feeds) {
					if (that.feeds[h].DOMtext=="")
						that.feeds[h].init();
					DOMfeeds+=that.feeds[h].DOMtext;
				}
				DOMfeeds+='</div>';
				DOM+=DOMfeeds;
				DOM+='</div>';
				that.DOMtext = DOM;
			}

			this.setObjects = function() {
				that.DOM=$("div[title|='"+that.id+"']");
				that.DOMmain=that.DOM.children().eq(0);
				that.DOMtagname=that.DOMmain.find("div."+CLASS_REFERENCE_TAGNAME);
				that.DOMopen=that.DOMmain.find('div.'+CLASS_REFERENCE_OPEN_BUTTON);
				that.DOMopen.click(function() {
					that.DOMfeeds.toggle();
				});
				that.DOMopen.css('background-image','url('+chrome.extension.getURL("images/downArrow.png")+')');
				that.DOMfeeds=that.DOM.find('div.'+CLASS_REFERENCE_SUBTREE);
				if (that.unreadCount<=0) {
					that.DOM.addClass(CLASS_REFERENCE_TAGS_NO_ITEM);
					if (!showReadTags)
						that.DOM.hide();
				} else {
					that.DOM.removeClass(CLASS_REFERENCE_TAGS_NO_ITEM);
					if (!showReadTags)
						that.DOM.show();
				}
			}

			this.updateCount = function(unread) {
				if (unread!=that.unreadCount) {
					that.unreadCount=unread;
					var txt;
					txt = that.name.length<15?that.name:that.name.substring(0,15)+'…';
					that.DOMtagname.css('font-weight','');
					if (that.unreadCount>0) {
						if (that.unreadCount>=1000) {
							txt += " (1000+)";
						} else {
							txt += " ("+that.unreadCount+")";
						}
						that.DOMtagname.css('font-weight','bold');
					}
					that.DOMtagname.text(txt);
					if (that.unreadCount<=0) {
						that.DOM.addClass(CLASS_REFERENCE_TAGS_NO_ITEM);
						if (!showReadTags) {
							that.DOM.hide();
						}
					} else {
						that.DOM.removeClass(CLASS_REFERENCE_TAGS_NO_ITEM);
						if (!showReadTags) {
							that.DOM.show();
						}
					}
				}
			}

			this.select = function(){
				that.DOM.addClass(CLASS_REFERENCE_BUTTON_SELECTED);
			}
			this.unselect = function(){
				that.DOM.removeClass(CLASS_REFERENCE_BUTTON_SELECTED);
			}
			this.decreaseCount = function() {
				that.updateCount(that.unreadCount-1);
			}
			this.increaseCount = function() {
				that.updateCount(that.unreadCount+1);
			}
		}

		function start() {
			updateReferences();
			if ((referenceRoot.length==0) || (googleReaderIconParent.length==0)) {
				setTimeout(start,1000);
				return;
			}
			debug("Starting...");
			addLiveFunctions();
			getAllTagsAndFeeds();
			updateToken();
			updater();
		};

		function addLiveFunctions() {
			//click on tagname opens tag
			$("."+CLASS_REFERENCE_BUTTON_TAG).live('click',function(evt) {
				if ($(this).find("."+CLASS_REFERENCE_TAGNAME).length>0) {
					showItems($(this).attr('title'));
				}
				return false;
			});
			$('#'+ID_REFERENCE_READER_ICON).live('click',function() {
				showItems(ITEM_REFERENCE_ALL);
			});
			//add markRead
			$(SELECTOR_CLASS_REFERENCE_UNREAD).live('click',function() {
				var tmp = this.title.split('-');
				markRead(tmp[0],$(this),all[tmp[1]]);
			});
			//add mark unread
			$(SELECTOR_CLASS_REFERENCE_MARK_UNREAD_BUTTON).live('click',function() {
				var tmp = this.parentNode.title.split('-');
				markUnread(tmp[0],$(this.parentNode),all[tmp[1]]);
			});
			//add share
			$("#contentPane").delegate(SELECTOR_CLASS_REFERENCE_SHARE_BUTTON,'click',function(evt) {
				share(evt,$(this).parent().find("."+CLASS_REFERENCE_ENTRY_TITLE).attr('href'));
				evt.stopImmediatePropagation();
				evt.stopPropagation();
				evt.preventDefault();
				return false;
			});
			$(window).keydown(cancelOtherMove);
			$(window).keyup(cancelOtherMove);
			$(document).click(function(event) {
				var el =$(event.target).parents("."+CLASS_REFERENCE_BUTTON).eq(0).find("."+CLASS_REFERENCE_SUBTREE).eq(0)[0];
				$("."+CLASS_REFERENCE_SUBTREE).each(function() {
					if (this!= el) {
						$(this).hide();
					}
				});
			});
		}


		function getAllTagsAndFeeds() {
			debug("Getting tags...");
			chrome.extension.sendRequest({
				method:"GET",
				dataType:'json',
				url:"http://www.google.com/reader/api/0/tag/list?output=json"},
				function(data) {
					var rcvdtags = data.tags;
					var count = rcvdtags.length;
					// add the all tag. ? is not allowed as a name in google rader
					all['?'] = new Feed({id:ITEM_REFERENCE_ALL,title:"All",categories:[]},"http://www.google.com/reader/atom/user/-/state/com.google/reading-list");
					for (var i=0;i<count;i++) {
						var matches = /user\/.*\/label\/(.*)/.exec(rcvdtags[i].id);
						if (matches!==null) {
							var tag = new Tag(matches[0],matches[1],"http://www.google.com/reader/atom/"+escape(rcvdtags[i].id));
							all[rcvdtags[i].id]=tag;
						} else {
							//add exception for following bloggers and other exceptions
							//as I see fit
							matches = /state\/com.blogger\/blogger-following/.exec(rcvdtags[i].id);
							if (matches!==null) {
								var tag = new Tag(rcvdtags[i].id,"Blogs I'm following");
								all[rcvdtags[i].id]=tag;
							}
						}
					}
					debug("Tags Done. Getting feeds...");
					//get feeds
					chrome.extension.sendRequest({
						method:"GET",
						dataType:'json',
						url:"http://www.google.com/reader/api/0/subscription/list?output=json"},
						function(data) {
							var rcvdfeeds = data.subscriptions;
							var count = rcvdfeeds.length;
							for (var i=0;i<count;i++) {
								var feed = new Feed(rcvdfeeds[i],"http://www.google.com/reader/atom/"+escape(rcvdfeeds[i].id));
								all[rcvdfeeds[i].id]=feed;
							}
							debug("Feeds Done");
							createAll();
						}
					);
				}
			);
		};


		function createAll() {
			for (var el in all) {
				if (all[el].DOMtext=="")
					all[el].init();
			}
			debug("Writing Menu");
			var elementList = '<div id="'+ID_ELEMENT_LIST+'">';
			//store tags to hide when DOM is finished
			for (var el in all) {
				if (all[el].isRoot() && all[el].hasElements()) {
					elementList+=all[el].DOMtext;
				} else if (!all[el].hasElements()) {
					delete all[el];
				}
			}
			elementList+='</div>';

			//create our content
			googleReaderMenu = $("<div>").addClass(CLASS_REFERENCE_MENU_READER);

			//separator used for nice touch
			//var separator = '<div class="'+referenceBreak.attr('class')+'"></div>';

			//append ALL the things!
			googleReaderMenu.append(elementList);

			//little button for changin preference
			showButton = $("<div class=\""+CLASS_REFERENCE_BUTTON+"\">");
			showButtonTags = $("<div class=\""+CLASS_REFERENCE_BUTTON+"\">");
			markAllReadButton = $('<div class="'+CLASS_REFERENCE_BUTTON+'">').text('Mark All Read');
			listViewButton = $("<div class=\""+CLASS_REFERENCE_BUTTON+"\">");
			settings = $("<div class=\""+CLASS_REFERENCE_BUTTON+" "+CLASS_REFERENCE_SETTINGS+"\">");
			var settingsSubtag = $("<div class=\""+CLASS_REFERENCE_SUBTREE+"\" style=\"display:none\">");
			settingsSubtag.append(showButton);
			settingsSubtag.append(showButtonTags);
			settingsSubtag.append(listViewButton);
			settingsSubtag.append(markAllReadButton);
			var arrowOpen = $("<div class=\""+CLASS_REFERENCE_OPEN_BUTTON+"\">")
				.css('background-image','url('+chrome.extension.getURL("images/downArrow.png")+')');
			var settingsIcon = $("<div class=\""+CLASS_REFERENCE_SETTINGS_ICON+"\">")
				.css('background-image','url("'+chrome.extension.getURL("images/settings.png")+'")');
			settings.append(settingsIcon);
			settings.append(arrowOpen);
			settings.append(settingsSubtag);

			rightElementList = $("<div id=\""+ID_REFERENCE_RIGHT_ELEMENT_LIST+"\">");
			rightElementList.append(settings);
			googleReaderMenu.append(rightElementList);
			googleReaderMenu.append("<br>");
			debug("Created");
			//insert in menu
			//add div before second list element
			var secondInList = googleReaderIconParent.children().eq(1);
			//copy first element
			var readerIcon = googleReaderIconParent.children().eq(0).clone();
			readerIcon.attr('id',ID_REFERENCE_READER_ICON)
				.attr('navid','20');
			var aInIcon = readerIcon.find("a")
				.attr('href','');
			var divsInReader = aInIcon.children().eq(0).children();
			//set our own icon
			//image is first div inside first div in a
			divsInReader.eq(0)
				//remove classes because they contain background-clip
				//which I cannot unset
				.removeClass()
				//add our new class with the same css as the old classes
				.addClass(CLASS_REFERENCE_MENU_ICON)
				//add image as background
				.css('background-image','url('+chrome.extension.getURL("images/icon32transp.png")+')')
			readerIcon.hover(function() {
					divsInReader.eq(0).css('background-image','url('+chrome.extension.getURL("images/icon32.png")+')');
				},function() {
					if ($("."+CLASS_REFERENCE_MENU_READER).length==0) {
						divsInReader.eq(0).css('background-image','url('+chrome.extension.getURL("images/icon32transp.png")+')');
					}
				});
			//set our own text
			//text is second div inside first div in a
			divsInReader.eq(1).text('Reader');
			//add our icon
			secondInList.before(readerIcon);

			//bind click on sibling elements of readerIcon to remove active
			readerIcon.parent().children().click(function() {
				divsInReader.eq(0).css('background-image','url('+chrome.extension.getURL("images/icon32transp.png")+')');
				referenceMiddle.remove();
				element.unselect();
				referenceContent.unbind("DOMNodeInserted",this);
			});

			readerIcon.unbind('click');
			readerIcon.click(function(){
				divsInReader.eq(0).css('background-image','url('+chrome.extension.getURL("images/icon32.png")+')');
				showItems(ITEM_REFERENCE_ALL)
			});

			//bind update if anything changes
			//google+ has a thing for refreshing everything and removing
			//my things...
			googleReaderIconParent.bind("DOMSubtreeModified",update);
			debug("Written");
		}

		function showItems(id) {
			debug("Showing items");
			var element = all[id];
			if (currentTag)
				currentTag.unselect();
			currentTag = element; //set current tag
			currentUnreadCount = element.unreadCount;

			currentMax=0;

			//get top before modifying
			var titleTop = referenceContent.offset().top;

			referenceContent.unbind("DOMNodeInserted");
			referenceContent.empty();

			var title = $("<div>").addClass(CLASS_REFERENCE_TITLE).text("Google Reader - " + currentTag.name);
			referenceMiddle = $("<div>").addClass(CLASS_REFERENCE_FEEDS);
			referenceMiddle.append(googleReaderMenu);
			referenceMiddle.append(title);
			referenceMiddle.css('width',referenceContent.css('width'));
			referenceMiddle.css('height',referenceContent.css('height'));
			referenceContent.append(referenceMiddle);
			referenceContent.parent().parent().css('overflow','visible');

			//set objects for feeds and tags
			//after setting the menu
			for (var el in all) {
				all[el].setObjects();
			}
			updateUnreadCount();
			if (!showRead) {
				showButton.text("Show Read Items");
				showButton.click(function(){
					showAll()}
				);
			} else {
				showButton.text("Hide Read Items");
				showButton.click(function(){
					hideRead()
				});
			}
			if (!showReadTags) {
				showButtonTags.text("Show Read");
				googleReaderMenu.find("."+CLASS_REFERENCE_TAGS_NO_ITEM).hide();
				showButtonTags.click(function(){
					showAllTags()
				});
			} else {
				showButtonTags.text("Hide Read");
				googleReaderMenu.find("."+CLASS_REFERENCE_TAGS_NO_ITEM).show();
				showButtonTags.click(function(){
					hideReadTags()
				});
			}
			markAllReadButton.click(function(){
				markAllAsRead()
			});
			if (!listView) {
				listViewButton.text("List View");
				listViewButton.click(function() {
					listViewItems();
				});
				$("."+CLASS_REFERENCE_SUMMARY).show();
			} else {
				listViewButton.text("Expanded View");
				listViewButton.click(function() {
					expandedViewItems();
				});
				$("."+CLASS_REFERENCE_SUMMARY).hide();
			}
			settings.click(function() {
				settings.find("."+CLASS_REFERENCE_SUBTREE).toggle();
			});

			element.select();

			debug("Requesting...");

			//add loading text and request feeds
			referenceMiddle.append('<div class="noitems">Loading...</div>');
			//if not showing read, not requestin read
			var xt="";
			if (!showRead) {
				xt="?xt=user/-/state/com.google/read";
			}
			chrome.extension.sendRequest({
				method:"GET",
				dataType:'xml',
				url:currentTag.url+xt},
				function(data) {
					debug("Data received");
					//remove loading
					referenceMiddle.find(".noitems").remove();
					referenceContentParent.css('overflow','visible');
					//lets add our new found data!
					var list = show(data);
					if (list=="") {
						referenceMiddle.append('<div class="noitems">No new items</div>');
					} else {
						referenceMiddle.append(list);
						currentEntry=0;
						$(SELECTOR_CLASS_REFERENCE_ENTRY).eq(0).addClass(CLASS_REFERENCE_ENTRY_SELECTED);
						if (!listView) {
							$("."+CLASS_REFERENCE_SUMMARY).show();
						} else {
							$("."+CLASS_REFERENCE_SUMMARY).hide();
						}
					}
					debug("Data added");
				}
			);
			//scroll to the top <==> we are not at the top already!
			if (titleTop<$("body").scrollTop())
				$("body").scrollTop(titleTop-110);
		}

		function show(data) {
			debug("Parsing items");
			var returnList = "";
			//save our precious continuation key for updating content
			if (data.feed["gr:continuation"]!=undefined)
				continuation = data.feed["gr:continuation"]["#text"];
			else
				continuation = undefined;
			var maxElements=20;
			var entries = data.feed.entry;
			if (entries==undefined)
				return [];
			var count = entries.length;
			//when its only one entry, greader gives us the gift of changing everything
			if (count==undefined) {
				entries=[entries];
				count=1;
			}
			if (!showRead && currentTag.unreadCount>maxElements)
				maxElements=currentTag.unreadCount;

			debug("Iterating entries");
			//ok, iterate on entries
			//not saving them because they change too much, not worth it
			for (var i=0; i<count; i++) {
				var count2 = entries[i].category.length;
				var read=false;
				debug("Iterating Categories");
				for (var j=0;j<count2 && !read;j++) {
					if (entries[i].category[j]["@attributes"].label==="read")
						read=true;
				}

				//only show if entry is not read or read items should be shown
				if (!read || showRead) {
					debug("Creating entry");
					//get attributes
					var text_title=entries[i].title["#text"];
					var text_url="";
					if (entries[i].link!=undefined && entries[i].link.length!=undefined) {
						text_link=entries[i].link[0]["@attributes"].href;
					} else if (entries[i].link===undefined) {
						var text;
						if (entries[i].summary!=undefined) {
							text =$(entries[i].summary['#text']);
						} else {
							text =$(entries[i].content['#text']);
						}
						var link = text.attr('href');
						if (link === undefined) link = text.attr('src');
						if (link === undefined) link = text.find("a").attr('href');
						if (link === undefined) link = text.find("img").attr('src');
						text_link=link;
					} else {
						text_link=entries[i].link["@attributes"].href;
					}
					var text_meta = "";
					if (entries[i].source !== undefined && entries[i].source.title !== undefined) {
						text_meta = "<div class=\""+CLASS_REFERENCE_ENTRY_FEED_TITLE+"\">"+entries[i].source.title["#text"]+" </div>";
					}
					if (entries[i].published !== undefined) {
						text_meta += "<div class=\""+CLASS_REFERENCE_ENTRY_FEED_DATE+"\">"+entries[i].published["#text"].replace("T"," ").replace("Z","")+"</div>";
					}
					text_meta = "<div class=\""+CLASS_REFERENCE_ENTRY_FEED_META+"\">"+text_meta+"</div>";
					var text_summary="";
					if (entries[i].summary!=undefined) {
						text_summary=entries[i].summary["#text"];
					} else if (entries[i].content!=undefined) {
						text_summary=entries[i].content["#text"];
					}

					var entry = '<div class="'+CLASS_REFERENCE_ENTRY;
					if (!read) {
						entry+= ' '+CLASS_REFERENCE_UNREAD;
					}
					entry+='" title="'+entries[i].id["#text"]+'-'+currentTag.id+'">';

					var title = '<a target="_blank" class="'+CLASS_REFERENCE_ENTRY_TITLE+'"';
					title+=' href="'+text_link+'">';
					title+=text_title+"</a>";
					entry+=title;
					entry+=text_meta;

					var summary = '<div class="'+CLASS_REFERENCE_SUMMARY+'" style="overflow:auto">';
					summary+=text_summary+'</div>';
					entry+=summary;

					var shareButton = '<a class="'+CLASS_REFERENCE_SHARE_BUTTON+'" role="button" tabindex="0">';
					shareButton+="Share</a>";
					entry+=shareButton;

					var markButton = '<a class="'+CLASS_REFERENCE_MARK_UNREAD_BUTTON+'" role="button" tabindex="0">';
					markButton+="Mark Unread</a>";
					entry+=markButton;

					entry+='</div>';

					returnList+=entry;
					currentMax++;
				}
			}
			debug("Finished parsing");
			//WARNING: Do not return notReturnList!!!!
			return returnList;
		}

		//change preference in reading
		//simple requests
		function showAll() {
			chrome.extension.sendRequest({
				method:"changeShowRead"},
				function() {
					//change button
					showRead=true;
					showButton.unbind('click');
					showButton.text("Hide Read Items");
					showButton.click(function(){hideRead()});
					//refresh view
					if ($("#contentPane").find("*:contains('Google Reader -')").length>0) {
						currentTag.DOMtagname.click();
					}
				}
			);
		}

		function hideRead() {
			chrome.extension.sendRequest({
				method:"changeShowRead"},
				function() {
					showRead=false;
					showButton.unbind('click');
					showButton.text("Show Read Items");
					showButton.click(function(){showAll()});
					//refresh view
					if ($("#contentPane").find("*:contains('Google Reader -')").length>0) {
						currentTag.DOMtagname.click();
					}
				}
			);
		}

		function showAllTags() {
			chrome.extension.sendRequest({
				method:"changeShowReadTags"},
				function() {
					//change button
					showReadTags=true;
					showButtonTags.unbind('click');
					showButtonTags.text("Hide Read");
					showButtonTags.click(function(){hideReadTags()});
					googleReaderMenu.find("."+CLASS_REFERENCE_TAGS_NO_ITEM).show();
				}
			);
		}

		function hideReadTags() {
			chrome.extension.sendRequest({
				method:"changeShowReadTags"},
				function() {
					showReadTags=false;
					showButtonTags.unbind('click');
					showButtonTags.text("Show Read");
					showButtonTags.click(function(){showAllTags()});
					googleReaderMenu.find("."+CLASS_REFERENCE_TAGS_NO_ITEM).hide();
				}
			);
		}

		function listViewItems() {
			chrome.extension.sendRequest({
				method:"changeListView"},
				function() {
					listView=true;
					$("."+CLASS_REFERENCE_SUMMARY).hide();
					listViewButton.unbind('click');
					listViewButton.text("Expanded View");
					listViewButton.click(function(){expandedViewItems()});
				}
			);
		}

		function expandedViewItems() {
			chrome.extension.sendRequest({
				method:"changeListView"},
				function() {
					listView=false;
					$("."+CLASS_REFERENCE_SUMMARY).show();
					listViewButton.unbind('click');
					listViewButton.text("List View");
					listViewButton.click(function(){listViewItems()});
				}
			);
		}

		//mark entry read... blah!
		//should add a way of removing keep unread if it has it
		function markRead(id,entry,tag) {
			entry.removeClass(CLASS_REFERENCE_UNREAD);
			chrome.extension.sendRequest({
				method:"POST",
				url:"http://www.google.com/reader/api/0/edit-tag?client=googleplusreader",
				data:{"i":id,"a":"user/-/state/com.google/read","ac":"edit","T":token}},
				function(data) {
					if (data=="ERROR") {
						entry.addClass(CLASS_REFERENCE_UNREAD);
					} else {
						tag.decreaseCount();
						if (tag!=all[ITEM_REFERENCE_ALL])
							all[ITEM_REFERENCE_ALL].decreaseCount();
						update();
					}
				}
			);
		}
		//guess for yourself
		function markUnread(id,entry,tag) {
			if (!entry.hasClass(CLASS_REFERENCE_UNREAD)) {
				entry.addClass(CLASS_REFERENCE_UNREAD);
				chrome.extension.sendRequest({
					method:"POST",
					url:"http://www.google.com/reader/api/0/edit-tag?client=googleplusreader",
					data:{"i":id,"r":"user/-/state/com.google/read","ac":"edit","T":token}},
					function(data) {
						if (data=="ERROR") {
							entry.removeClass(CLASS_REFERENCE_UNREAD);
						} else {
							entry.addClass(CLASS_REFERENCE_MARKED_UNREAD);
							tag.increaseCount();
							if (tag!=all[ITEM_REFERENCE_ALL])
								all[ITEM_REFERENCE_ALL].increaseCount();
							update();
						}
					}
				);
			}
		}

		//when someone scrolls, mark everything to the top as read
		//unless is marked unread
		$(window).scroll(function(evt){
			if ($(SELECTOR_CLASS_REFERENCE_ENTRY).length>0) {
				var scroll = $(this).scrollTop();
				currentEntry=0;
				var entries = $(SELECTOR_CLASS_REFERENCE_ENTRY);
				entries.filter(function(){
					return scroll>$(this).offset().top;
				}).each(function() {
					markReadAndFetch($(this));
				});
				$('.'+CLASS_REFERENCE_ENTRY_SELECTED).removeClass(CLASS_REFERENCE_ENTRY_SELECTED);
				evt.stopImmediatePropagation();
				evt.stopPropagation();
				evt.preventDefault();
				var lastEntry = entries.eq(currentEntry-1);
				if (currentEntry>0 && lastEntry.offset().top+lastEntry.height()>scroll+$(window).height()) {
					currentEntry--;
				} else {
					lastEntry = entries.eq(currentEntry);
				}
				if (!lastEntry.hasClass(CLASS_REFERENCE_MARKED_UNREAD)) {
					lastEntry.click();
				}
				lastEntry.addClass(CLASS_REFERENCE_ENTRY_SELECTED);
			}
		});

		

		//mark element as read if its not marked unread and fetch next batch
		//of items if at referenceMiddle of content
		function markReadAndFetch(el) {
			currentEntry++;
			if (!fetching && currentMax-currentEntry<10 && (showRead || currentMax<currentUnreadCount)) {
				fetching=true;
				chrome.extension.sendRequest({
					method:"GET",
					dataType:'xml',
					url:"http://www.google.com/reader/atom/"+currentTag.id+"?c="+continuation},
					function(data) {
						referenceMiddle.append(show(data));
						if (!listView) {
							$("."+CLASS_REFERENCE_SUMMARY).show();
						} else {
							$("."+CLASS_REFERENCE_SUMMARY).hide();
						}
						fetching=false;
					}
				);
			}
			//click to mark read... if its read, click unbinded
			if (!el.hasClass(CLASS_REFERENCE_MARKED_UNREAD))
				el.click();
		}

		function markAllAsRead() {
			var tag = currentTag;
			chrome.extension.sendRequest({
				method:"POST",
				url:"http://www.google.com/reader/api/0/mark-all-as-read?client=googleplusreader",
				data:{"s":tag.id,"t":tag.name,"T":token}},
				function () {
					updateUnreadCount();
					tag.updateCount(0);
					tag.DOMtagname.click();
				}
			);
		}

		//cancel j k movements in google+ if they are directed to us
		function cancelOtherMove(evt) {
			if ($(SELECTOR_CLASS_REFERENCE_ENTRY).length>0
					&& evt.target==$("body")[0]
					&& (evt.which==74 || evt.which==75 || evt.which==83)) {
				if (evt.type=="keydown") {
					var toppix = 90;
					if (evt.which==74) {
						var lastEntry = $(SELECTOR_CLASS_REFERENCE_ENTRY).eq(currentEntry+1);
						$("body").scrollTop(lastEntry.offset().top-toppix);
						if (lastEntry.offset().top-toppix>$("body").scrollTop()) {
							$('.'+CLASS_REFERENCE_ENTRY).removeClass(CLASS_REFERENCE_ENTRY_SELECTED);
							lastEntry.addClass(CLASS_REFERENCE_ENTRY_SELECTED);
							currentEntry++;
							if (!lastEntry.hasClass(CLASS_REFERENCE_MARKED_UNREAD)) {
								lastEntry.click();
							}
						}
					} else if (evt.which==75 && currentEntry>=1) {
						var lastEntry = $(SELECTOR_CLASS_REFERENCE_ENTRY).eq(currentEntry-1);
						$("body").scrollTop(lastEntry.offset().top-toppix);
						if (lastEntry.offset().top-toppix>$("body").scrollTop()) {
							$('.'+CLASS_REFERENCE_ENTRY).removeClass(CLASS_REFERENCE_ENTRY_SELECTED);
							lastEntry.addClass(CLASS_REFERENCE_ENTRY_SELECTED);
							currentEntry--;
						}
					} else if (evt.which==83) {
						$(SELECTOR_CLASS_REFERENCE_ENTRY).eq(currentEntry).find(SELECTOR_CLASS_REFERENCE_SHARE_BUTTON).click();
					}
				}
				evt.stopImmediatePropagation();
				evt.stopPropagation();
				evt.preventDefault();
			}
		}

		//start the engine!
		start();



		//sharing functions
		var firstTime=true;
		var referenceShareBox = $("#gbg3");
		var referenceIframe = $("#gbsf");
		//same as reader mostly
		function share(evt,url) {
			referenceIframe = $("#gbsf");
			if (firstTime || !referenceIframe.is(':visible')) {
				var topScroll = $("body").scrollTop()
					firstTime=false;
				var evt2 = document.createEvent("MouseEvents");
				evt2.initMouseEvent("click","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
				referenceShareBox[0].dispatchEvent(evt2);
				//absoluting box so it doesnt scroll to top
				referenceIframe.parent().css('top',referenceIframe.parent().offset().top);
				referenceIframe.parent().css('left',referenceIframe.parent().offset().left);
				referenceIframe.parent().css('position','fixed');
				referenceIframe.parent().css('background-color','white');
				referenceIframe.parent().css('border','1px solid #BEBEBE');
				$("body").scrollTop(topScroll);
			}
			chrome.extension.sendRequest({reader:true,href:url});
		}
	}

	/**
	 * SHARE BOX OPENING FOR IFRAME
	 **/
} else if (location.href.indexOf("apps-static")==-1) {

	//reference Selectors... may change when google+ changes
	var referenceAddLinkSelector ='#summary-view span[id$=".l"]';
	var referenceLinkSelector = "#summary-view input:eq(0)";
	var referenceAddSelector = "#summary-view table div[role|='button']:eq(0)";
	var referenceCloseLink = "#summary-view div[tabindex|='0']";

	//listen on request to use share box
	chrome.extension.onRequest.addListener(
			function (request,sender,sendResponse) {
				//let bacground know we received the request
				sendResponse();
				loopAddLink(request.href,0);
			});

	//loop that checks continously checks if the page is loaded
	//and add the link if it is
	function loopAddLink(url,count) {
		if (count>10)
			return;
		try {
			var evt;
			//if close link exist, first close the last link added
			//to start anew
			var closeLink = $(referenceCloseLink);
			if (closeLink.length>1) {
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
				closeLink[0].dispatchEvent(evt);
				evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
				closeLink[1].dispatchEvent(evt);
			}

			//if add link exist, click it to add the new link
			//if it doesnt, throw exception to keep it in loop
			//until loaded
			evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
			var addlink = $(referenceAddLinkSelector)[0];
			addlink.dispatchEvent(evt);
			var link = $(referenceLinkSelector);
			if (link.length==0)
				throw "not loaded";

			//Do a keypress event so it enables the add button
			//next to the textbox and copy url
			evt = document.createEvent("HTMLEvents");
			evt.initEvent("keypress","true","true");
			link[0].dispatchEvent(evt);
			link.val(url);

			//find add button and create a mousedown, mouseup and click event
			//only a click event wont work...
			var add = $(referenceAddSelector);
			evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mousedown","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
			add[0].dispatchEvent(evt);
			evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mouseup","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
			add[0].dispatchEvent(evt);
			evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click","true","true",window,0,0,0,0,0,false,false,false,false,0,document.body.parentNode);
			add[0].dispatchEvent(evt);

		} catch (error) {
			//if there was an error, try to run this function again
			setTimeout(function(){loopAddLink(url,count+1)},500);
		}
	}
}
}