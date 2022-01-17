function($, window, undefined) {
	var levelNames = {
		"easy": "Easy",
		"medium": "Medium",
		"hard": "Hard",
		"harder": "Harder",
		"insane": "Insane"
	};
	
	var levels = {
		easy: {
					id: "easy",
					name: "Easy",
					nextLevel: "medium",
					getNext: function() { return levels.medium; },
					goodEnoughForNextLevel: function(time, counter) {
						return time.getMinutes() == 0 && counter <= 20;
					},
					isAvailable: function() { return true; }
				},
		medium: {
					id: "medium",
					name: "Medium",
					nextLevel: "hard",
					getNext: function() { return levels.hard; },
					goodEnoughForNextLevel: function(time, counter) {
						return time.getMinutes() == 0 && counter <= 20;
					},
					isAvailable: function() { return true; }
				},
		hard: {
					id: "hard",
					name: "Hard",
					nextLevel: "harder",
					getNext: function() { return levels.harder; },
					goodEnoughForNextLevel: function(time, counter) {
						return time.getMinutes() <= 1 && counter <= 25;
					},
					isAvailable: function() { return true; }
				},
		harder: {
					id: "harder",
					name: "Harder",
					nextLevel: "insane",
					getNext: function() { return levels.insane; },
					goodEnoughForNextLevel: function(time, counter) {
						return time.getMinutes() <= 2;
					},
					isAvailable: function(premium) { return premium; }
				},
		insane: {
					id: "insane",
					name: "Insane",
					nextLevel: null,
					getNext: function() { return null; },
					goodEnoughForNextLevel: function(time, counter) {
						return false;
					},
					isAvailable: function(premium) { return premium; }
				}
	}
	
	function PushPopUI(version) {
	  this.game = null;
	  this.sound = false;
	  this.shapes = null;
	  this.difficulty = null;
	  this.demo = false;
	  this.size = 4;
	  this.premium = version == "premium";
	  this.levelsEnabled = ["easy"];
	}

	$.extend(PushPopUI.prototype, {
		
	  init: function() {
		if (window.localStorage) {
			this.setSound(window.localStorage.getItem("pushpop.sound") != "off");
			var levels = window.localStorage.getItem("pushpop.levelsEnabled");
			this.setLevelsEnabled( $.parseJSON(levels) || ["easy"]);
			this.setDifficulty(this.difficulty = window.localStorage.getItem("pushpop.difficulty"));
			this.setShapes(window.localStorage.getItem("pushpop.shapes"));
		} else {
			this.setSound(true);
			this.setLevelsEnabled(["easy"]);
			this.setDifficulty("easy");
			this.setShapes("shapes");
		}
	  },
	  newPuzzle: function() {
		$("#gameMenu").hide(100);
	  	if (this.game.counter > 0 && !this.game.puzzleFinished()) {
	  		$.mobile.changePage($("#newGameConfirm"), {transition: "slideup", changeHash: false});
	  	} else {
	  		this.reallyNewPuzzle();
	  	}
	  },
	  resetPuzzle: function(puzzleId) {
  		this.inDemo(false);
	  	if (puzzleId == "demo") {
	  		puzzleId = null;
	  		this.inDemo(true);
	  	} else if (!puzzleId || puzzleId == "new") { 
	  		puzzleId = null;
	  	}
	  	if (this.game != null) {
		  	this.game.shutdown();
	  	}
		$("#game-stack").empty();
		$("#game-board").empty();
		$("#solution").empty();
	
		this.game = new PushPop().init(this.size, this.size, this.difficulty, puzzleId);
// this is turned off so that changing the difficulty of a puzzle doesn't close the settings page
//	  	window.location.hash = "puzzle?game="+this.game.id;
	  	this.render();
	  	this.game.start(this.updateTimer);
	  	if (!$("#puzzle").hasClass("ui-page-active")) {
	  		this.pauseTimer();
	  	}
	  	if (this.inDemo()) {
	  		var that = this;
	  		setTimeout( function() { that.getAHint(); }, 1000);
	  	}
	  },
	  reallyNewPuzzle: function() {
	  	// TODO: i think we can do better than this
	  	// it probably makes more sense to generate a game ID
	  	// independently and then redirect to it
	  	this.resetPuzzle(null);
	  },
	  pauseTimer: function() {
	  	if (this.game && this.game.timer) {
		  	this.game.timer.pause();
	  	}
	  },
	  resumeTimer: function() {
	  	if (this.game && this.game.timer) {
		  	this.game.timer.start(this.updateTimer);
	  	}
	  },
	  updateTimer: function(timer) {
		$("#timer").text(timer.toString());
	  },
	  showMenu: function() { 
	  	$("#gameMenu").toggle(100);
             setTimeout( function() { $("#workarea").bind("click", hidePushPopMenu ); }, 500);
	  },
	  hideMenu: function() {
	  	$("#workarea").unbind("click", hidePushPopMenu);
	  	$("#gameMenu").hide();
	  },
	  setSound: function(soundOn) {
	  	this.sound = soundOn === true;
	  	if (window.localStorage) {
	  		window.localStorage.setItem("pushpop.sound", this.sound ? "on" : "off");
	  	}
	  },
	  setShapes: function(shapes) {
	  	this.shapes = shapes == "numbers" ? "numbers" : "shapes";
	  	$("#game").removeClass("shapes numbers").addClass(this.shapes);
	  	if (window.localStorage) {
	  		window.localStorage.setItem("pushpop.shapes", this.shapes);
	  	}
	  },
	  setLevelsEnabled: function(levels) {
	  	this.levelsEnabled = [];
	  	for(var i = 0; i < levels.length; i++) {
	  		if (PushPop.DIFFICULTIES.indexOf(levels[i]) > -1) {
	  			this.levelsEnabled.push(levels[i]);
	  		}
	  	}
	  	if (window.localStorage) {
	  		window.localStorage.setItem("pushpop.levelsEnabled", JSON.stringify(this.levelsEnabled));
	  	}
	  },
	  setDifficulty: function(level) {
		if (this.levelsEnabled.indexOf(level) == -1) {
			level = "easy";
		}
		this.difficulty = level;
	  	if (window.localStorage) {
	  		window.localStorage.setItem("pushpop.difficulty", this.difficulty);
	  	}
	  },
	  showSettings: function() {
  		$("#shapes").val(this.shapes).slider("refresh");
		$("#sound").val(this.sound ? "on":"off").slider("refresh");
		$("#difficulty").val(this.difficulty).selectmenu("refresh");
	  },
	  pieceMarkup: function(piece, depth, extraClass) {
	  	return '<div id="'+piece.id+'" style="z-index:'+(depth+1)+'" data-stack="'+piece.stack+'" class="piece color_'+piece.color+(extraClass?" "+extraClass:"")+'"><div class="shape shape_'+piece.shape+'"></div></div>';
	  },
	  startOver: function() {
		$("#gameMenu").hide(100);
		this.game.startOver();
		$("#game-stack").empty();
		this.render();	
	  },
	  dismissStartup: function(newPuzzle) {
	  	this.inDemo(false);
	  	if (window.localStorage) {
	  		window.localStorage.setItem("pushpop.startup", "dismiss");
	  	}
	  	if (newPuzzle) {
		  	$.mobile.changePage("#puzzle?game=new");
	  	} else {
		  	$.mobile.changePage($("#puzzle"), { changeHash: false });
	  	}
	  },
	  getAHint: function() {
		var hint = this.game.getHint();
		if (hint >= 0 && hint < this.game.stacks.length) {
			this.renderPopStack(hint);
		} else {
			this.renderPopGuessStack();
		}
	  },
	  showPremiumDLPage: function() {
	  	$.mobile.changePage($("#getPremium"), {changeHash: false, transition: "slideup" });
	  },
	  showLockedLevelPage: function() {
	  	$.mobile.changePage($("#showLocked"), {changeHash: false, transition: "slideup" });
	  },
	  downloadPremium: function() {
	  	window.open("http://www.pushpoppuzzle.com/");
	  },
	  tryNextLevel: function() {
	  	var nextLevel = levels[this.difficulty].nextLevel;
	  	if (nextLevel != null) {
	  		this.setDifficulty(nextLevel);
	  	}
	  	$.mobile.changePage("#puzzle");
	  },
	  inDemo: function(demo) {
	  	if (demo !== undefined) {
	  		this.demo = demo == true;
	  		if (this.demo) {
	  			$("#puzzle").addClass("in-demo");
	  			$("#toolbar h1").text("PushPop Demo");
	  		} else {
				clearInterval(this.demoPlay);
				$("#puzzle").removeClass("in-demo");
	  			$("#toolbar h1").text("PushPop");
	  		}
	  	}
	  	return this.demo;
	  },
	  demoRun: function() {
	  	this.inDemo(true);
	  	$("#game-board div.stack").unbind("click");
	  	$("#game-stack div.piece").unbind("click");
	  	var stop  = 100;
	  	this.demoPlay = null;
	  	var that = this;
	  	this.demoPlay = setInterval(function() {
	  		if (stop-- <= 0 || that.game.puzzleFinished() || !that.inDemo()) {
		  		clearInterval(that.demoPlay);
	  		} else {
		  		that.getAHint();
	  		}
	  	}, 1000);
	  },
			render: function() {
					var gb = $('#game-board');
					gb.empty();
					var index = 0;
					var gbHtml = "";
					for(var i=0; i < this.game.stacks.length; i++) {
						gbHtml += '<div class="stack" id="stack'+i+'" data-stack="'+i+'">';
						var max = this.game.stacks[i].length-1;
						for(var j=max; j >= 0; j--) {
							var piece = this.game.stacks[i][j];
							gbHtml += this.pieceMarkup(piece, j);
							index++;
						}
						gbHtml += '</div>';
					}
					gb.append(gbHtml);
					if (!this.inDemo()) {
						var that = this;
						gb.find("div.stack").bind("click", function (event) { that.renderPopStack(event); } );
					}
					gb.find("div.piece").jrumble({x:3, y:3, rotation:5});
			},
			getSize: function() {
				var body = $("#pushpop");
				return body.hasClass("large") ? "large" : (body.hasClass("medium") ? "medium" : "small");
			},
	        playSound: function(soundName) {
	            if (this.sound) {
					$("#"+soundName+"_sound").trigger('pause').trigger('play');
	            }
	        },
			renderPopStack: function(event) {
				var stack = isNaN(event) ? $(event.currentTarget).data("stack") : event;
				var piece = this.game.popStack(stack);
				if (piece) {
					this.renderPushToGuessStack(piece);
	                this.playSound("pop");
					$("#"+piece.id).addClass("popped");
					setTimeout(function() { $("#"+piece.id).remove() }, 600);
					if (this.game.puzzleFinished()) {
						this.onPuzzleFinished();
					}
				} else {
					var stx = this.game.stacks[stack];
					if (stx.length > 0) {
						var wouldBePiece = $("#"+stx[stx.length-1].id);
						wouldBePiece.trigger("startRumble");
		                this.playSound("error");
						setTimeout(function() { wouldBePiece.trigger("stopRumble"); }, 300);
					}
				}
			},
			currentOrientation: function() {
				return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
			},
			renderPushToGuessStack: function(piece) {
				$("#game-stack").prepend('<div id="stack-'+piece.id+'" style="z-index:'+this.game.guess.length+';" class="piece color_'+piece.color+' popped"><div class="shape shape_'+piece.shape+'"></div></div>');
				if (!this.inDemo()) {
                    var that = this;
                    $("#stack-"+piece.id).bind("click", function() { that.renderPopGuessStack(); } );
				}
				setTimeout(function() { $("#stack-"+piece.id).removeClass("popped"); }, 10);
			},
			renderPopGuessStack: function(event) {
				var piece = this.game.popGuessStack();
				if (piece) {
					this.renderPushToGameStack(piece);
		            this.playSound("push");
		            $("#stack-"+piece.id).addClass("popped");
		            setTimeout(function() { $("#stack-"+piece.id).remove(); }, 600);
				}
			},
			renderPushToGameStack: function(piece) {
				var depth = this.game.stacks[piece.stack].length;
				var markup = this.pieceMarkup(piece, depth, "popped");
				var row = $('#stack'+piece.stack);
	
				row.prepend(markup);
				var pieceDiv = $("#"+piece.id);
				setTimeout(function() { pieceDiv.removeClass("popped"); }, 10);
			},
			enableLevel: function(nextLevel) {
				if (nextLevel != null && this.levelsEnabled.indexOf(nextLevel.id) == -1 && nextLevel.isAvailable(this.premium)) {
					var newLevels = this.levelsEnabled.slice();
					newLevels.push(nextLevel.id);
					var nextLevelNum = PushPop.DIFFICULTIES.indexOf(nextLevel.id);
					$("#difficulty-menu li[data-option-index="+(nextLevelNum)+"]").removeClass("disabled");
					this.setLevelsEnabled(newLevels);
					return true;
				}
				return false;
			},
			goodEnoughToMoveUp: function(level, endTime, counter) {
				if (level == "easy" || level == "medium") {
					return endTime.getMinutes() == 0 && counter <= 20;
				} else {
					return endTime.getMinutes() >= 1; // less than 2 minutes
				}
			},
			onPuzzleFinished: function() {
				if (this.inDemo()) {
		  			this.inDemo(false);
					$.mobile.changePage($("#demoOver"), {transition: "slideup", changeHash: false});
				} else {
					var endTime = this.game.timer;
					endTime.pause();
					var leveledUp = false;
					var currentLevel = levels[this.difficulty];
					var goodEnough = currentLevel.goodEnoughForNextLevel(endTime, this.game.counter);
					if (goodEnough) {
						leveledUp = this.enableLevel(currentLevel.getNext());
					}
					$("#stats").text("You completed this puzzle in "+endTime.toString()+" with "+this.game.counter+" moves.");
					this.game.shutdown();
					var nextLevel = currentLevel.getNext();
					if (nextLevel) {
						$("#gameOver .level").text(nextLevel.name);
					}
					$("#gameOver .buttons").toggleClass("upLevel", goodEnough && nextLevel != null && nextLevel.isAvailable(this.premium));
					$("#gameOver .buttons").toggleClass("upgrade", goodEnough && nextLevel != null && !nextLevel.isAvailable(this.premium));
					if (leveledUp) {
						$("#quip").text("Congratulations, you've unlocked the "+currentLevel.getNext().name+" level!");
					} else if (goodEnough && nextLevel != null && !nextLevel.isAvailable(this.premium)) {
						$("#quip").text("Well done!  You've mastered the free version of PushPop.  Upgrade and try the 'Harder' and 'Insane' levels.");
					} else {
						var hasNext = nextLevel && this.levelsEnabled.indexOf(nextLevel.id) != -1;
						$("#quip").text("\""+this.getComment(currentLevel, endTime, this.game.counter, goodEnough, hasNext)+"\"");
					}
					$.mobile.changePage($("#gameOver"), {transition: "slideup", changeHash: false});
				}
			},
			getComment: function(level, time, counter, goodEnough, hasNext) {
				var appropriate_quips;
				if (time.getHours() > 1) {
					appropriate_quips = this.quips.really_long;
				} else if (time.getMinutes() > 15) {
					appropriate_quips = this.quips["long"];
				} else if (time.getMinutes() > 5) {
					appropriate_quips = this.quips.difficult;
				} else if (time.getMinutes() > 1) {
					appropriate_quips = this.quips.medium.concat(this.quips.general);
				} else if (time.getSeconds() > 10) {
					appropriate_quips = this.quips.fast.concat(this.quips.general);
					if (hasNext) {
						appropriate_quips.push("This is getting boring.  Try one from the next level.");
						appropriate_quips.push("Awesome!  Now, let's take this up a notch.");
					}
				} else {
					appropriate_quips = this.quips.cheat;
				}
				var choice = Math.floor(Math.random() * appropriate_quips.length);
				return appropriate_quips[choice];
			},
			quips: {
				"really_long": ["Fall asleep at the wheel again?",
								"Think hard before clicking that button.",
								"Thanks, I feel a lot better about myself now.",
								"Next time you go away, hit the Pause button first.",
								"Wow... just think how many books you could have read in that time.",
								"Perhaps we should start counting your time in days?"],
	 			"long": 	   ["Ok, great, but this time try it with your eyes open.",
								"You probably shouldn't drive in this condition.  Let's try another puzzle instead.",
								"I think you should try again.  Really, you can only do better next time.",
								"Just think how much Angry Birds you could played instead.",
								"Ah, you've left room for improvement.  Good strategy.",
								"Hey, not bad (this WAS your first game, right?)",
								"Well, on the bright side at least that was time well spent."],
				"difficult":   ["That was a tough one, but I think you'll do better on the next one.",
								"That was just practice.  Let's try one for real now.",
								"You just need some more practice.",
								"Well, maybe you just got a hard one -- try again!"],
				"medium": 	   ["That's a pretty good time -- Keep trying until you cut it in half.",
								"Not bad -- with some practice I bet you could get into the Push Pop hall of fame!"],
				"fast": 	   ["Even I couldn't have done it that quickly!",
						 		"I would shake your hand, but I don't want to burn myself on those hot fingers.",
						 		"Whoa, you're like a mental Bruce Lee.", 
								"Chuck Norris would like your autograph.", 
								"Sorry, I blinked and missed that. Can you do that again, please?",
								"Slow down, you're making the computer tired."],
				"cheat": 	   ["I won't even dignify that with a response.",
								"That was so fast I almost wonder if you're cheating.",
								"I'd like to see you try that again."],
				"general":     ["That's what I'm talking about!",
								"You probably can't tell, but I'm clapping for you.",
								"Boom goes the dynamite!",
								"Keep it up!",
								"I can see your brain getting bigger from here."]
				},
	});

	function setSize() {
		var sWidth = window.innerWidth;
		var sHeight = window.innerHeight;
		if ((sWidth > 900 && sHeight >= 600) 
			|| (sWidth > 600 && sHeight > 900)) {
			$("body").addClass("large").removeClass("medium").removeClass("small");
		} else if ((sWidth >= 640 && sHeight >= 480) 
			|| (sWidth >= 480 && sHeight >= 640)) {
			$("body").removeClass("large").addClass("medium").removeClass("small");
		} else {
			$("body").removeClass("large").removeClass("medium").addClass("small");
		}	
	}
	
	var pushPopUi = new PushPopUI("premium");  // "ad-supported" or "premium"
	
	$(document).bind("mobileinit", function(){
	  $.mobile.defaultDialogTransition = 'none';
	  $.mobile.defaultPageTransition = 'none';
	});

	$("#settings").live('pageinit', function() {
		$("#sound").bind("change", function() { pushPopUi.setSound($(this).val() != "off"); } );
		$("#shapes").bind("change", function() { pushPopUi.setShapes($(this).val()); } );
		$("#difficulty").bind("change", function() {
			var difficulty = $(this).val();
			if (!pushPopUi.premium && (difficulty == "harder" || difficulty == "insane")) {
				pushPopUi.showPremiumDLPage();
			} else if (pushPopUi.levelsEnabled.indexOf(difficulty) > -1) {
				pushPopUi.setDifficulty(difficulty);
				setTimeout( function() { pushPopUi.resetPuzzle(); }, 250); 
			} else {
				pushPopUi.showLockedLevelPage();
			}
		} );
        for (var i=0; i < PushPop.DIFFICULTIES.length; i++) {
            if (pushPopUi.levelsEnabled.indexOf(PushPop.DIFFICULTIES[i]) == -1) {
                $("#difficulty-menu li[data-option-index="+(i)+"]").addClass("disabled");
            }
        }
		if (!pushPopUi.premium) {
			$("#difficulty-menu li[data-option-index=3]").removeClass("ui-btn-up-b").addClass("ui-btn-up-c");
			$("#difficulty-menu li[data-option-index=4]").removeClass("ui-btn-up-b").addClass("ui-btn-up-c");
		}
	});

	$("#startup").live('pageinit', function() {
        $("#gotIt").bind("click", function() { pushPopUi.dismissStartup(); } );
	});
	
	$("#demoOver").live('pageinit', function() {
        $("#letsGo").bind("click", function() { pushPopUi.dismissStartup(true); } );
	});
	
	$("#gameOver").live('pageinit', function() {
        $("#nextLevel").bind("click", function() { pushPopUi.tryNextLevel(); } );
		$(".getPremiumBtn").bind("click", function() { pushPopUi.downloadPremium() });
	});
	
	$("#getPremium").live('pageinit', function() {
        $(".getPremiumBtn").bind("click", function() { pushPopUi.downloadPremium(); } );
	});
	
    $("#settings").live('pagebeforeshow', function() { pushPopUi.showSettings(); } );

    function hidePushPopMenu() {
        pushPopUi.hideMenu();
    }
 
    $("#puzzle").live('pageinit', function() {
        pushPopUi.init();

        $("#puzzle").bind('pagebeforehide', function() { pushPopUi.pauseTimer(); } );
        $("#puzzle").bind('pageshow', function() { pushPopUi.resumeTimer(); } );
        $("#gameOver").bind('pageshow', function() { pushPopUi.playSound("applause"); } );
        $("#gameOver").bind('pagehide', function() { pushPopUi.resetPuzzle(null); } );
                      
        $("#menuBtn").bind("click", function() { pushPopUi.showMenu(); } );
        $("#newBtn").bind("click", function() { pushPopUi.newPuzzle(); } );
        $("#startOverBtn").bind("click", function() { pushPopUi.startOver(); } );
        $("#settingsBtn").bind("click", function() { $.mobile.changePage("#settings", {transition: "slideup"}); } );
        $("#helpBtn").bind("click", function() { $.mobile.changePage("help.html"); } );
        
        $("#stepDemoBtn").bind("click", function() { pushPopUi.getAHint(); } );
        $("#playDemoBtn").bind("click", function() { pushPopUi.demoRun(); } );
        $("#iGetItBtn").bind("click", function() { clearInterval(pushPopUi.demoPlay); setTimeout(function() { pushPopUi.dismissStartup(true); }, 600); } );
        
        if (pushPopUi.premium) {
            $("#hintBtn").bind("click", function() { pushPopUi.getAHint(); } );
        } else {
            $("#hintBtn").removeClass("ui-btn-up-b").addClass("ui-btn-up-c").data("theme", "c");
            $("#hintBtn").bind("click", function() { pushPopUi.showPremiumDLPage(); } );
        }
        $("audio").trigger('load');
        setSize();
        window.addEventListener("resize", setSize);
    });
	
	$(document).bind('pagebeforechange', function(e, data) {
		if (data.toPage[0].id == "puzzle") {
			if (!data.options.fromPage) {
				// first page load
				if (!window.localStorage || window.localStorage.getItem("pushpop.startup") != "dismiss") {
					setTimeout( function() { $.mobile.changePage($("#startup"), { transition: "slideup", changeHash: false }); }, 250);
				}
			}
			var id = data.options.pageData ? data.options.pageData.game : null;
			if (!pushPopUi.game || (id && id != pushPopUi.game.id)) {
				pushPopUi.resetPuzzle(id);
			}
		}
	});

	document.addEventListener("deviceready", onCordovaReady, false);
	
	function onCordovaReady() {
		document.addEventListener("pause", function() { pushPopUi.pauseTimer(); } );
		document.addEventListener("resume", function() { pushPopUi.resumeTimer(); } );
		document.addEventListener("backbutton", function() { pushPopUi.renderPopGuessStack(); } );
		document.addEventListener("menubutton", function() { pushPopUi.showMenu(); } );
	}

    window.PushPopUI = PushPopUI;
    window.pushPopUi = pushPopUi;
}