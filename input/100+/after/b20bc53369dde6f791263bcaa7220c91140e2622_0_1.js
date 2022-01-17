function makeProblem( id, seed ) {
		if ( typeof Badges !== "undefined" ) {
			Badges.hide();
		}

		// Enable scratchpad (unless the exercise explicitly disables it later)
		Khan.scratchpad.enable();

		// Allow passing in a random seed
		if ( typeof seed !== "undefined" ) {
			problemSeed = seed;

		// In either of these testing situations,
		} else if ( (testMode && Khan.query.test != null) || user == null ) {
			problemSeed = randomSeed;
		}

		// Set randomSeed to what problemSeed is (save problemSeed for recall later)
		randomSeed = problemSeed;

		// Check to see if we want to test a specific problem
		if ( testMode ) {
			id = typeof id !== "undefined" ? id : Khan.query.problem;
		}

		if ( typeof id !== "undefined" ) {
			var problems = exercises.children( ".problems" ).children();

			problem = /^\d+$/.test( id ) ?
				// Access a problem by number
				problems.eq( parseFloat( id ) ) :

				// Or by its ID
				problems.filter( "#" + id );

		// Otherwise we grab a problem at random from the bag of problems
		// we made earlier to ensure that every problem gets shown the
		// appropriate number of times
		} else if ( problemBag.length > 0 ) {
			problem = problemBag[ problemBagIndex ];
			id = problem.data( "id" );

		// No valid problem was found, bail out
		} else {
			return;
		}

		problemID = id;

		// Find which exercise this problem is from
		exercise = problem.parents( ".exercise" ).eq( 0 );

		// Work with a clone to avoid modifying the original
		problem = problem.clone();

		// problem has to be child of visible #workarea for MathJax metrics to all work right
		var workAreaWasVisible = jQuery( "#workarea" ).is( ":visible" );
		jQuery( "#workarea" ).append( problem ).show();

		// If there's an original problem, add inherited elements
		var parentType = problem.data( "type" );

		while ( parentType ) {
			// Copy over the parent element to the child
			var original = exercise.find( ".problems #" + parentType ).clone();
			problem.prepend( original.children().data( "inherited", true ) );

			// Keep copying over the parent elements (allowing for deep inheritance)
			parentType = original.data( "type" );
		}

		// Add any global exercise defined elements
		problem.prepend( exercise.children( ':not(.problems)' ).clone().data( "inherited", true ) );

		// Apply templating
		var children = problem
			// var blocks append their contents to the parent
			.find( ".vars" ).tmplApply( { attribute: "class", defaultApply: "appendVars" } ).end()

			// Individual variables override other variables with the same name
			.find( ".vars [id]" ).tmplApply().end()

			// We also look at the main blocks within the problem itself to override,
			// ignoring graphie and spin blocks
			.children( "[class][class!='graphie'][class!='spin']" ).tmplApply( { attribute: "class" } );

		// Finally we do any inheritance to the individual child blocks (such as problem, question, etc.)
		children.each(function () {
			// Apply while adding problem.children() to include
			// template definitions within problem scope
			jQuery( this ).find( "[id]" ).add( children ).tmplApply();
		});

		// Remove and store hints to delay running modules on it
		hints = problem.children( ".hints" ).remove();

		// Remove the hint box if there are no hints in the problem
		if ( hints.length === 0 ) {
			jQuery( ".hint-box" ).remove();
		}

		// Evaluate any inline script tags in this exercise's source
		jQuery.each( exercise.data("script") || [], function( i, scriptContents ) {
			jQuery.globalEval( scriptContents );
		});

		// ...and inline style tags.
		if ( exercise.data( "style" ) ) {
			var exerciseStyleElem = jQuery( "head #exercise-inline-style" );

			// Clear old exercise style definitions
			if ( exerciseStyleElem.length && exerciseStyleElem[0].styleSheet ) {
				// IE refuses to modify the contents of <style> the normal way
				exerciseStyleElem[0].styleSheet.cssText = "";
			} else {
				exerciseStyleElem.empty();
			}

			// Then add rules specific to this exercise.
			jQuery.each( exercise.data("style"), function( i, styleContents ) {
				if ( exerciseStyleElem.length && exerciseStyleElem[0].styleSheet ) {
					// IE refuses to modify the contents of <style> the normal way
					exerciseStyleElem[0].styleSheet.cssText = exerciseStyleElem[0].styleSheet.cssText + styleContents;
				} else {
					exerciseStyleElem.append( styleContents );
				}
			});
		}

		// Run the main method of any modules
		problem.runModules( problem, "Load" );
		problem.runModules( problem );

		// Store the solution to the problem
		var solution = problem.find(".solution"),

			// Get the multiple choice problems
			choices = problem.find(".choices"),

			// Get the area into which solutions will be inserted,
			// Removing any previous answer
			solutionarea = jQuery("#solutionarea").empty(),

			// See if we're looking for a specific style of answer
			answerType = solution.data("type");

		// Make sure that the answer type exists
		if ( answerType ) {
			if ( Khan.answerTypes && !Khan.answerTypes[ answerType ] ) {
				Khan.error( "Unknown answer type specified: " + answerType );
				return;
			}
		}

		if ( !answerType ) {
			// If a multiple choice block exists
			if ( choices.length ) {
				answerType = "radio";

			// Otherwise we assume the smart number type
			} else {
				answerType = "number";
			}
		}

		// Generate a type of problem
		// (this includes possibly generating the multiple choice problems,
		// if this fails then we will need to try generating another one.)
		guessLog = [];
		userActivityLog = [];
		validator = Khan.answerTypes[answerType]( solutionarea, solution );

		// A working solution was generated
		if ( validator ) {
			// Focus the first input
			// Use .select() and on a delay to make IE happy
			var firstInput = solutionarea.find( ":input" ).first();
			setTimeout( function() {
				if (!firstInput.is(":disabled")) {
					firstInput.focus();
					if (firstInput.is("input:text")) {
						firstInput.select();
					}
				}
			}, 1 );

			lastFocusedSolutionInput = firstInput;
			solutionarea.find( ":input" ).focus( function() {
				// Save which input is focused so we can refocus it after the user hits Check Answer
				lastFocusedSolutionInput = this;
			} );
		} else {
			// Making the problem failed, let's try again
			problem.remove();
			makeProblem( id, randomSeed );
			return;
		}

		// Remove the solution and choices elements from the display
		solution.remove();
		choices.remove();

		// Add the problem into the page
		jQuery( "#workarea" ).toggle( workAreaWasVisible ).fadeIn();
		Khan.scratchpad.resize();

		// Enable the all answer input elements except the check answer button.
		jQuery( "#answercontent input" ).not( '#check-answer-button' )
			.removeAttr( "disabled" );

		if ( validator.examples && validator.examples.length > 0 ) {
			jQuery( "#examples-show" ).show();
			jQuery( "#examples" ).empty();

			jQuery.each( validator.examples, function( i, example ) {
				jQuery( "#examples" ).append( '<li>' + example + '</li>' );
			});

			jQuery( "#examples" ).children().tmpl();
		} else {
			jQuery( "#examples-show" ).hide();
		}
		// save a normal JS array of hints so we can shift() through them later
		hints = hints.tmpl().children().get();

		if ( hints.length === 0 ) {
			// Disable the get hint button
			jQuery( "#hint" ).attr( "disabled", true );
		}

		// Hook out for exercise test runner
		if ( testMode && parent !== window && typeof parent.jQuery !== "undefined" ) {
			parent.jQuery( parent.document ).trigger( "problemLoaded", [ makeProblem, validator.solution ] );
		}

		// Save problem info in dump data for testers
		if ( testMode && Khan.query.test != null ) {
			var testerInfo = jQuery( "#tester-info" );

			// Deep clone the elements to avoid some straaaange bugs
			var lastProblem = jQuery.extend( true, {}, {
				seed: problemSeed,
				type: problemID,
				VARS: jQuery.tmpl.VARS,
				solution: validator.solution
			} );

			dataDump.problems.push( lastProblem );

			jQuery( testerInfo ).find( ".problem-no" )
				.text( dataDump.problems.length + dataDump.issues + " of " + problemCount );

			var answer = jQuery( testerInfo ).find( ".answer" ).empty();

			var displayedSolution = validator.solution;
			if ( !jQuery.isArray( displayedSolution ) ) {
				displayedSolution = [ displayedSolution ];
			}

			jQuery.each( displayedSolution, function( i, el ) {
				if (jQuery.isArray( el )) {
					// group nested arrays of answers, for sets of multiples or multiples of sets.
					// no reason answers can't be nested arbitrarily deep, but here we assume no
					// more than one sub-level.
					var subAnswer = jQuery( "<span>" ).addClass( "group-box" ).appendTo(answer);
					jQuery.each( el, function( i, el ) {
						jQuery( "<span>" ).text( el ).addClass( "box" ).appendTo(subAnswer);
					} );
				} else {
					jQuery( "<span>" ).text( el ).addClass( "box" ).appendTo( answer );
				}
			} );
		}

		if (typeof userExercise !== "undefined" && userExercise.read_only) {
			if (!userExercise.current) {
				warn("This exercise may have changed since it was completed", true);
			}

			var timelineEvents, timeline;

			var timelinecontainer = jQuery( "<div id='timelinecontainer'>" )
				.append( "<div>\
							<div id='previous-problem' class='simple-button action-gradient'>Previous Problem</div>\
							<div id='previous-step' class='simple-button action-gradient'><span>Previous Step</span></div>\
							</div>" )
				.insertBefore( "#extras" );

			jQuery.fn.disable = function() {
				this.addClass( 'disabled' )
					.css( {
					cursor: 'default !important'
					} )
					.data( 'disabled', true );
				return this;
			}

			jQuery.fn.enable = function() {
				this.removeClass( 'disabled' )
					.css( {
					cursor: 'pointer'
					} )
					.data( 'disabled', false );
				return this;
			}

			if (getData().total_done === 0) {
				jQuery( '#previous-problem' ).disable();
			}

			timeline = jQuery( "<div id='timeline'>" ).appendTo( timelinecontainer );
			timelineEvents = jQuery( "<div id='timeline-events'>" ).appendTo( timeline );

			timelinecontainer
				.append( "<div>\
							<div id='next-problem' class='simple-button action-gradient'>Next Problem</div>\
							<div id='next-step' class='simple-button action-gradient'><span>Next Step</span></div>\
							</div>" );

			jQuery( "<div class='user-activity correct-activity'>Started</div>" )
				.data( 'hint', false )
				.appendTo( timelineEvents );

			var hintNumber = 0,
				answerNumber = 1;

			/* value[0]: css class
			 * value[1]: guess
			 * value[2]: time taken since last guess
			 */
			jQuery.each(userExercise.user_activity, function(index, value) {
				var guess = value[1] === "Activity Unavailable" ? value[1] : JSON.parse( value[1] ),
					thissolutionarea;

				timelineEvents
					.append( "<div class='timeline-time'>" + value[2] + "s</div>" );

				thissolutionarea = jQuery( "<div>" )
					.addClass( "user-activity " + value[0] )
					.appendTo( timelineEvents );

				if (value[0] === "hint-activity") {
					thissolutionarea.attr( 'title', 'Hint used' );
					thissolutionarea
						.data( 'hint', hintNumber )
						.prepend( "Hint #" + (hintNumber+1) );
					hintNumber += 1;
				} else { // This panel is a solution (or the first panel)
					thissolutionarea.data( 'hint', false );
					if (guess === "Activity Unavailable") {
						thissolutionarea.text( guess );
					} else {
						if (answerType === 'radio') {
							// radio is the only answer type that can't display its own guesses
							thissolutionarea.append( jQuery(
								"<p class='solution'>" + guess + "</p>" ).tmpl()
							);

							if (index === userExercise.user_activity.length - 1) {
								thissolutionarea
									.removeClass( 'incorrect-activity' )
									.addClass( 'correct-activity' );

								thissolutionarea.attr( 'title', 'Correct Answer' );
							} else {
								thissolutionarea.attr( 'title', 'Incorrect Answer' );
							}
						} else {
							var thisValidator = Khan.answerTypes[answerType]( thissolutionarea, solution );

							thisValidator.showGuess( guess );

							if (thisValidator() === true) {
								// If the user didn't get the problem right on the first try, all
								// answers are labelled incorrect by default
								thissolutionarea
									.removeClass( 'incorrect-activity' )
									.addClass( 'correct-activity' );

								thissolutionarea.attr( 'title', 'Correct Answer' );
							} else {
								thissolutionarea
									.removeClass( 'correct-activity' )
									.addClass( 'incorrect-activity' );
								thissolutionarea.attr( 'title', 'Incorrect Answer' );
							}
						}

						thissolutionarea
							.data( 'guess', guess )
								.find( 'input' )
								.attr( 'disabled', true )
							.end()
								.find( 'select' )
								.attr( 'disabled', true );
					}
				}
			});

			if (timelinecontainer.height() > timeline.height()) {
				timeline.height( timelinecontainer.height() );
			}

			var states = timelineEvents.children( ".user-activity" ),
				currentSlide = states.length - 1,
				numSlides = states.length,
				firstHintIndex = timeline.find( '.hint-activity:first' )
					.index( '.user-activity' ),
				lastHintIndex	= timeline.find( '.hint-activity:last' )
					.index( '.user-activity' ),
				totalHints = timeline.find( '.hint-activity:last' )
					.index( '.hint-activity' ),
				hintButton = jQuery( '#hint' ),
				hintRemainder = jQuery( '#hint-remainder' ),
				timelineMiddle = timeline.width() / 2,
				realHintsArea = jQuery( '#hintsarea' ),
				realWorkArea = jQuery( '#workarea' ),
				statelist = [],
				previousHintNum = 100000;

			// So highlighting doesn't fade to white
			jQuery( '#solutionarea' ).css( 'background-color', jQuery( '#answercontent' ).css( 'background-color' ) );

			jQuery.fn.scrubber = function() {
				// create triangular scrubbers above and below current selection
				var timeline = jQuery( '#timeline' ),
					scrubber1 = jQuery( '#scrubber1' ),
					scrubber2 = jQuery( '#scrubber2' ),
					scrubberCss = {
					display: 'block',
					width: '0',
					height: '0',
					'border-left': '6px solid transparent',
					'border-right': '6px solid transparent',
					position: 'absolute',
					left: (timeline.scrollLeft() + this.position().left + this.outerWidth()/2 + 2) + 'px'
					};

				scrubber1 = scrubber1.length ? scrubber1 : jQuery("<div id='scrubber1'>").appendTo( timeline );
				scrubber2 = scrubber2.length ? scrubber2 : jQuery("<div id='scrubber2'>").appendTo( timeline );

				scrubber1.css( jQuery.extend( {}, scrubberCss, {
					'border-bottom': '6px solid #888',
					bottom: '0'
				}) );

				scrubber2.css( jQuery.extend( {}, scrubberCss, {
					'border-top': '6px solid #888',
					top: '0'
				}) );

				return this;
			};

			// Set the width of the timeline (starts as 10000px) after MathJax loads
			MathJax.Hub.Queue( function() {
				var maxHeight = 0;
				timelineEvents.children().each( function() {
					maxHeight = Math.max( maxHeight, jQuery( this ).outerHeight(true) );
				});

				if (maxHeight > timelinecontainer.height()) {
					timelinecontainer.height( maxHeight );
					timeline.height( maxHeight );
				}
			} );

			var create = function( i ) {
				var thisSlide = states.eq( i );

				var thisHintArea, thisProblem,
					hintNum = jQuery( '#timeline-events .user-activity:lt('+(i+1)+')' )
							.filter('.hint-activity').length - 1,
					// Bring the currently focused panel as close to the middle as possible
					itemOffset = thisSlide.position().left,
					itemMiddle = itemOffset + thisSlide.width() / 2,
					offset = timelineMiddle - itemMiddle,
					currentScroll = timeline.scrollLeft(),
					timelineMax = states.eq( -1 ).position().left + states.eq( -1 ).width(),
					scroll = Math.min( currentScroll - offset, currentScroll + timelineMax - timeline.width() + 25 );

				if (hintNum >= 0) {
					jQuery( hints[hintNum] ).appendTo( realHintsArea ).runModules( problem );
				}

				MathJax.Hub.Queue( function() {
					var recordState = function() {
						jQuery( "#problemarea input" ).attr({ disabled: "disabled" });
						thisHintArea = realHintsArea.clone();
						thisProblem = realWorkArea.clone();

						var thisState = {
							slide: thisSlide,
							hintNum: hintNum,
							hintArea: thisHintArea,
							problem: thisProblem,
							scroll: scroll
						};

						statelist[i] = thisState;

						if (i+1 < states.length) {
							MathJax.Hub.Queue( function() {
								create( i+1 );
							} );
						} else {
							activate( i );
						}
					};

					if ( thisSlide.data( "guess" ) !== undefined && jQuery.isFunction( validator.showCustomGuess ) ) {
						KhanUtil.currentGraph = jQuery( realWorkArea ).find( ".graphie" ).data( "graphie" );
						validator.showCustomGuess( thisSlide.data( "guess" ) );
						MathJax.Hub.Queue( recordState );
					} else {
						recordState();
					}

				});
			};

			MathJax.Hub.Queue( function() {create(0);} );

			var activate = function( slideNum ) {
				var hint, thisState,
					thisSlide = states.eq( slideNum ),
					fadeTime = 150;

				// All content for this state has been built before
				if (statelist[slideNum]) {
					thisState = statelist[slideNum];

					timeline.animate({
						scrollLeft: thisState.scroll
					}, fadeTime, function() {
						thisState.slide.scrubber();
					});

					if (slideNum < firstHintIndex) {
						hintRemainder.fadeOut( fadeTime );
						hintButton.val( "I'd like a hint" );
					} else if (slideNum >= lastHintIndex) {
						if (states.eq( lastHintIndex ).data( 'hint' ) < hints.length) {
							hintRemainder.fadeOut( fadeTime );
						}
					} else {
						hintButton.val( "I'd like another hint" );

						hintRemainder
							.text( (totalHints - thisState.hintNum) + " remaining" )
							.fadeIn( fadeTime );
					}

					jQuery( '#workarea' ).remove();
					jQuery( '#hintsarea' ).remove();
					jQuery( '#problemarea' ).append( thisState.problem ).append( thisState.hintArea );

					if (thisSlide.data( 'guess' )) {
						solutionarea.effect( 'highlight', {}, fadeTime );

						// If there is a guess we show it as if it was filled in by the user
						validator.showGuess( thisSlide.data( 'guess' ) );
					} else {
						validator.showGuess();
					}

					// TODO: still highlight even if hint modifies problem (and highlight following hints)
					if (slideNum > 0 && (thisState.hintNum > statelist[slideNum-1].hintNum)) {
						jQuery( '#hintsarea' ).children().each( function( index, elem ) {
							if (index > previousHintNum) {
								jQuery( elem ).effect( 'highlight', {}, fadeTime );
							}
						} );

						previousHintNum = thisState.hintNum;
					}

					jQuery( '#previous-step, #next-step' ).enable();
					if (slideNum === 0) {
						previousHintNum = -1;
						jQuery( '#previous-step' ).disable();
					} else if (slideNum === numSlides - 1) {
						jQuery( '#next-step' ).disable();
					}
				}
			};

			// Allow users to use arrow keys to move up and down the timeline
			jQuery( document ).keydown(function(event) {
				if (event.keyCode !== 37 && event.keyCode !== 39) {
					return;
				}

				if (event.keyCode === 37) { // left
					currentSlide -= 1;
				} else { // right
					currentSlide += 1;
				}

				currentSlide = Math.min(currentSlide, numSlides-1);
				currentSlide = Math.max(currentSlide, 0);

				activate( currentSlide );

				return false;
			});

			// Allow users to click on points of the timeline
			jQuery( states ).click(function(event) {
				var index = jQuery( this ).index( "#timeline .user-activity" );

				currentSlide = index;
				activate( currentSlide );

				return false;
			});

			jQuery( '#previous-step' ).click(function(event) {
				if (currentSlide > 0) {
					currentSlide -= 1;
					activate( currentSlide );
				}

				return false;
			});

			jQuery( '#next-step' ).click(function(event) {
				if (currentSlide < numSlides-1) {
					currentSlide += 1;
					activate( currentSlide );
				}

				return false;
			});

			jQuery( '#next-problem' ).click(function(event) {
				window.location.href = userExercise.next_problem_url;
			});

			jQuery( '#previous-problem' ).click(function(event) {
				if (!jQuery( this ).data( 'disabled' )) {
					window.location.href = userExercise.previous_problem_url;
				}
			});

			// Some exercises use custom css
			jQuery( "#timeline input[type='text']" ).css( "width",
				jQuery( "#answer_area input[type='text']" ).css('width')
			);

			jQuery( '#hint' ).attr( 'disabled', true );
			jQuery( '#answercontent input' ).attr( 'disabled', true );
			jQuery( '#answercontent select' ).attr( 'disabled', true );
		}


		// Show the debug info
		if ( testMode && Khan.query.debug != null ) {
			jQuery( document ).keypress( function( e ) {
				if ( e.charCode === 104 ) {
					jQuery("#hint").click();
				}
			});
			var debugWrap = jQuery( "#debug" ).empty();
			var debugURL = window.location.protocol + "//" + window.location.host + window.location.pathname
				+ "?debug&problem=" + problemID;

			jQuery( "<h3>Debug Info</h3>" ).appendTo( debugWrap );

			var src = exercise.data("src");
			if ( src != null ) {
				var srcInfo = jQuery( "<p>" ).appendTo( debugWrap );
				srcInfo.append( "From " );

				jQuery( "<a>" )
					.text( src )
					.attr( "href", src + "?debug" )
					.appendTo( srcInfo );
			}

			var links = jQuery( "<p>" ).appendTo( debugWrap );
			jQuery( "<a>Problem permalink</a>" )
				.attr( "href", debugURL + "&seed=" + problemSeed )
				.appendTo( links );


			if ( !Khan.query.activity ) {
				links.append("<br>");
				var historyURL = debugURL + "&seed=" + problemSeed + "&activity=";
				jQuery( "<a>Problem history</a>" ).attr( "href", "javascript:" ).click(function( event ) {
					window.location.href = historyURL + encodeURIComponent( JSON.stringify( userActivityLog ) );
				}).appendTo( links );
			} else {
				links.append("<br>");
				jQuery( "<a>Random problem</a>" )
					.attr( "href", debugURL )
					.appendTo( links );
			}

			links.append("<br>");
			links.append("Problem type: ");

			jQuery( "<a>" )
				.text( problemID )
				.attr( "href", debugURL )
				.appendTo( links );

			if ( exercise.data( "name" ) != null ) {
				links.append("<br>");
				links.append("Original exercise: " + exercise.data( "name" ));
			}

			if ( jQuery.tmpl.DATA_ENSURE_LOOPS > 0 ) {
				var dataEnsureInfo = jQuery( "<p>" );
				dataEnsureInfo.append("Data-ensure loops: " + jQuery.tmpl.DATA_ENSURE_LOOPS);
				if ( jQuery.tmpl.DATA_ENSURE_LOOPS > 15 ) {
					dataEnsureInfo.css( "background-color", "yellow" );
				}
				if ( jQuery.tmpl.DATA_ENSURE_LOOPS > 30 ) {
					dataEnsureInfo.css( "background-color", "orange" );
				}
				if ( jQuery.tmpl.DATA_ENSURE_LOOPS > 50 ) {
					dataEnsureInfo.css( "background-color", "red" );
				}
				dataEnsureInfo.appendTo( debugWrap );
			}

			if ( typeof jQuery.tmpl.VARS !== "undefined" ) {
				var varInfo = jQuery( "<p>" );

				jQuery.each( jQuery.tmpl.VARS, function( name, value ) {
					var str;

					if ( typeof value === "function") {
						str = value.toString();
					} else {
						// JSON is prettier (when it works)
						try {
							str = JSON.stringify( value );
						} catch ( e ) {
							str = value.toString();
						}
					}

					varInfo.append( jQuery( "<b>" ).text( name ) );
					varInfo.append( ": " );
					varInfo.append( jQuery( "<var>" ).text( str ) );
					varInfo.append( "<br>" );
				});

				varInfo.appendTo( debugWrap );
			}

			// for special style rules

			jQuery( "body" ).addClass("debug");
		}

		hintsUsed = 0;
		attempts = 0;
		lastAction = (new Date).getTime();

		jQuery( "#hint" ).val( "I'd like a hint" );
		jQuery( "#hint-remainder" ).hide();

		if ( once || reviewMode ) {
			updateData( /* data */ null, /* isFirstUpdate */ once );
			once = false;
		}

		// Update dimensions for sticky box
		jQuery( "#answer_area" ).adhere();

		jQuery(Khan).trigger( "newProblem" );

		return answerType;
	}