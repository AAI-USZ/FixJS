function prepareSite() {
		// Set exercise title
		jQuery("#current-exercise").text( typeof userExercise !== "undefined" && userExercise.exercise_model ?
			userExercise.exercise_model.display_name : document.title );

		// TODO(david): Don't add homepage elements with "exercise" class
		exercises = exercises.add( jQuery( ".exercise" ).detach() );

		// Setup appropriate img URLs
		jQuery( "#sad" ).attr( "src", urlBase + "css/images/face-sad.gif" );
		jQuery( "#happy" ).attr( "src", urlBase + "css/images/face-smiley.gif" );
		jQuery( "#throbber, #issue-throbber" )
			.attr( "src", urlBase + "css/images/throbber.gif" );

		if (typeof userExercise !== "undefined" && userExercise.read_only) {
			jQuery( "#extras" ).css("visibility", "hidden");
		}

		if ( reviewMode ) {
			enterReviewMode();
		} else {
			jQuery( "#streak-bar-container" ).show();
		}

		jQuery( "#answer_area" ).adhere( {
			container: jQuery( "#answer_area_wrap" ).parent(),
			topMargin: 10,
			bottomMargin: 10
		} );

		// Change form target to the current page so errors do not kick us
		// to the dashboard
		jQuery( "#answerform" ).attr( "action", window.location.href );

		// Watch for a solution submission
		jQuery("#check-answer-button").click( handleSubmit );
		jQuery("#answerform").submit( handleSubmit );

		// Build the data to pass to the server
		function buildAttemptData(pass, attemptNum, attemptContent, curTime) {
			var timeTaken = Math.round((curTime - lastAction) / 1000);

			if ( attemptContent !== "hint" ) {
				userActivityLog.push([ pass ? "correct-activity" : "incorrect-activity", attemptContent, timeTaken ]);
			} else {
				userActivityLog.push([ "hint-activity", "0", timeTaken ]);
			}

			return {
				// The user answered correctly
				complete: pass === true ? 1 : 0,

				// The user used a hint
				count_hints: hintsUsed,

				// How long it took them to complete the problem
				time_taken: timeTaken,

				// How many times the problem was attempted
				attempt_number: attemptNum,

				// The answer the user gave
				// TODO: Get the real provided answer
				attempt_content: attemptContent,

				// A hash representing the exercise
				// TODO: Populate this from somewhere
				sha1: typeof userExercise !== "undefined" ? userExercise.exercise_model.sha1 : exerciseName,

				// The seed that was used for generating the problem
				seed: problemSeed,

				// The seed that was used for generating the problem
				problem_type: problemID,

				// The non-summative exercise that the current problem belongs to
				non_summative: exercise.data( "name" ),

				// Whether we are currently in review mode
				review_mode: reviewMode ? 1 : 0
			};
		}

		function handleSubmit() {
			var pass = validator();

			// Stop if the user didn't enter a response
			// If multiple-answer, join all responses and check if that's empty
			// Remove commas left by joining nested arrays in case multiple-answer is nested
			if ( jQuery.trim( validator.guess ) === "" ||
				 ( validator.guess instanceof Array && jQuery.trim( validator.guess.join( "" ).replace(/,/g, '') ) === "" ) ) {
				return false;
			} else {
				guessLog.push( validator.guess );
			}

			// Stop if the form is already disabled and we're waiting for a response.
			if ( jQuery( "#answercontent input" ).not( "#hint" ).is( ":disabled" ) ) {
				return false;
			}

			jQuery( "#throbber" ).show();
			disableCheckAnswer();
			jQuery( "#answercontent input" ).not("#check-answer-button, #hint")
				.attr( "disabled", "disabled" );
			jQuery( "#check-answer-results p" ).hide();

			// Figure out if the response was correct
			if ( pass === true ) {
				jQuery("#happy").show();
				jQuery("#sad").hide();
			} else {
				jQuery("#happy").hide();
				jQuery("#sad").show();

				// Is this a message to be shown?
				if ( typeof pass === "string" ) {
					jQuery( "#check-answer-results .check-answer-message" ).html( pass ).tmpl().show();
				}

				// Show the examples (acceptable answer formats) if available -- we get
				// a lot of issues due to incorrect formats (eg. "3.14159" instead of
				// "3pi", "log(2^5)" instead of "log(32)").
				var examples = jQuery( "#examples" ),
					examplesLink = jQuery( "#examples-show" );
				if ( examplesLink.is( ":visible" ) ) {
					if ( !examples.is( ":visible" ) ) {
						examplesLink.click();
					}
					examples.effect( "pulsate", { times: 1 }, "slow" );
				}

				// Refocus text field so user can type a new answer
				if ( lastFocusedSolutionInput != null ) {
					setTimeout( function() {
						var focusInput = jQuery( lastFocusedSolutionInput );

						if (!focusInput.is(":disabled")) {
							// focus should always work; hopefully select will work for text fields
							focusInput.focus();
							if (focusInput.is("input:text")) {
								focusInput.select();
							}
						}
					}, 1 );
				}
			}

			// The user checked to see if an answer was valid

			// Save the problem results to the server
			var curTime = new Date().getTime();
			var data = buildAttemptData(pass, ++attempts, JSON.stringify(validator.guess), curTime);
			request( "problems/" + problemNum + "/attempt", data, function() {

				// TODO: Save locally if offline
				jQuery(Khan).trigger( "answerSaved" );

				jQuery( "#throbber" ).hide();
				enableCheckAnswer();

				// If in review mode, the server may decide the user needs to practice
				// this exercise again -- provide quick feedback if so.
				maybeEnqueueReviewProblems();
			}, function() {
				// Error during submit. Cheat, for now, and reload the page in
				// an attempt to get updated data.

				if ( typeof userExercise === "undefined" || !userExercise.tablet ) {
					if ( user != null && exerciseName != null ) {
						// Before we reload, clear out sessionStorage's UserExercise.
						// If there' a discrepancy between server and sessionStorage such that
						// problem numbers are out of order or anything else, we want
						// to restart with whatever the server sends back on reload.
						delete window.sessionStorage[ "exercise:" + user + ":" + exerciseName ];
					}

					window.location.reload();
				} else {
					// TODO: Implement alternative error handling
				}
			}, "attempt_hint_queue" );

			if ( pass === true ) {
				// Correct answer, so show the next question button.
				jQuery( "#check-answer-button" ).hide();
				if ( !testMode || Khan.query.test == null ) {
					jQuery( "#next-question-button" )
						.removeAttr( "disabled" )
						.removeClass( "buttonDisabled" )
						.show()
						.focus();
				}
				nextProblem( 1 );
			} else {
				// Wrong answer. Enable all the input elements, but wait until
				// until server acknowledges before enabling the check answer
				// button.
				jQuery( "#answercontent input" ).not( "#check-answer-button, #hint" )
					.removeAttr( "disabled" );
			}

			// Remember when the last action was
			lastAction = curTime;

			jQuery(Khan).trigger( "checkAnswer", pass );

			return false;
		}

		function transitionExerciseTitle() {
			var currentExercise = jQuery( "#current-exercise" ),
					nextExercises = jQuery( "#next-exercises" ),
					clearQueue = true,
					jumpToEnd = true,
					animationOptions = {
						duration: 400,
						easing: "easeInOutCubic"
					};

			// Fade the current title away to the right, then replace it with the
			// new exercise"s title and revert the animation.
			currentExercise.stop( clearQueue, jumpToEnd ).animate({
				left: 400,
				opacity: 0,
				fontSize: "-=4"
			}, animationOptions ).queue(function() {
				jQuery( this )
					.text( getDisplayNameFromId(exerciseName) )
					.removeAttr( "style" );
			});

			// Slide up the next set of exercises, then revert the animation.
			nextExercises.stop( clearQueue, jumpToEnd ).animate({
				top: 0,
				height: nextExercises.height() + nextExercises.position().top
			}, animationOptions ).queue(function() {
				jQuery( this ).removeAttr( "style" );
			});

			// Make the next exercise title transition to match the appearance of the
			// current exercise title, then remove it from the set of next exercises.
			jQuery( "#next-exercises > p:first-child" )
				.stop( clearQueue, jumpToEnd ).animate({
					color: currentExercise.css( "color" ),
					fontSize: currentExercise.css( "fontSize" ),
					reviewGlow: 1
				}, animationOptions ).queue(function() {
					jQuery( this ).remove();
				});
		}

		// Watch for when the next button is clicked
		jQuery("#next-question-button").click(function(ev) {

			if ($(Khan).triggerHandler("problemDone") !== false) {

				// If nobody returns false from problemDone indicating
				// that they'll take care of triggering nextProblem,
				// automatically trigger nextProblem.
				$(Khan).trigger("renderNextProblem");

			}

		});

		jQuery(Khan).bind("renderNextProblem", function(ev) {
			jQuery("#happy").hide();
			if( !jQuery( "#examples-show" ).data( "show" ) ){ jQuery( "#examples-show" ).click(); }

			// Toggle the navigation buttons
			jQuery("#check-answer-button").show();
			jQuery("#next-question-button").blur().hide();

			// Wipe out any previous problem
			jQuery("#workarea").hide();
			jQuery("#workarea, #hintsarea").runModules( problem, "Cleanup" ).empty();
			jQuery("#hint").attr( "disabled", false );

			Khan.scratchpad.clear();

			// Change the title of the exercise, if necessary
			if ( reviewMode && reviewQueue.length ) {
				transitionExerciseTitle();
			}

			if ( testMode && Khan.query.test != null && dataDump.problems.length + dataDump.issues >= problemCount ) {
				// Show the dump data
				jQuery( "#problemarea" ).append(
					"<p>Thanks! You're all done testing this exercise.</p>" +
					"<p>Please copy the text below and send it to us.</p>"
				);

				jQuery( "<textarea>" )
					.val( "Khan.testExercise(" + JSON.stringify( dataDump ) + ");" )
					.css({ width: "60%", height: "200px" })
					.prop( "readonly", true )
					.click( function() {
						this.focus();
						this.select();
					} )
					.appendTo( "#problemarea" );

				jQuery( "#sidebar" ).hide();

			} else {

				// Switch exercises if there's a different queued up exercise in review mode
				if ( reviewMode ) {
					var nextExerciseName = reviewQueue.shift();
					if ( nextExerciseName && nextExerciseName !== exerciseName ) {
						switchToExercise( nextExerciseName );
					}
				}

				// Generate a new problem
				makeProblem();

				// Kick off a request to queue up more exercises if we're running low.
				// This needs to run after makeProblem to get the updated problem state.
				maybeEnqueueReviewProblems();
			}
		});

		// Watch for when the "Get a Hint" button is clicked
		jQuery( "#hint" ).click(function() {

			if ( user && attempts === 0 ) {
				var hintApproved = window.localStorage[ "hintApproved:" + user ];

				if ( !(typeof hintApproved !== "undefined" && JSON.parse(hintApproved)) ) {
					if ( !(typeof userExercise !== "undefined" && userExercise.read_only) ) {
						if ( confirm("One-time warning: Using a hint will set back your progress.\nAre you sure you want to continue?"))  {
							// Hint consequences approved
							window.localStorage[ "hintApproved:" + user ] = true;

						} else {
							// User doesn't want to have progress set back
							return;
						}
					}
				}
			}

			var hint = hints.shift();
			jQuery( "#hint-remainder" ).text( hints.length + " remaining" )
				.fadeIn( 500 );

			// Update dimensions for sticky box
			jQuery( "#answer_area" ).adhere();

			if ( hint ) {

				hintsUsed += 1;

				jQuery( this )
					.val( jQuery( this ).data( "buttonText" ) || "I'd like another hint" );

				var problem = jQuery( hint ).parent();

				// Append first so MathJax can sense the surrounding CSS context properly
				jQuery( hint ).appendTo( "#hintsarea" ).runModules( problem );

				// Grow the scratchpad to cover the new hint
				Khan.scratchpad.resize();

				// Disable the get hint button
				if ( hints.length === 0 ) {
					jQuery( this ).attr( "disabled", true );
					jQuery( "#hint-remainder" ).fadeOut( 500 );
				}
			}

			var fProdReadOnly = !testMode && userExercise.read_only;
			var fAnsweredCorrectly = jQuery( "#next-question-button" ).is( ":visible" );
			if ( !fProdReadOnly && !fAnsweredCorrectly ) {
				// Resets the streak and logs history for exercise viewer
				request(
					"problems/" + problemNum + "/hint",
					buildAttemptData(false, attempts, "hint", new Date().getTime()),
					// Don't do anything on success or failure, silently failing is ok here
					function() {},
					function() {},
					"attempt_hint_queue"
				);
			}

			// The first hint is free iff the user has already attempted the question
			if ( hintsUsed === 1 && attempts > 0 ) {
				gae_bingo.bingo( "hints_free_hint" );
				gae_bingo.bingo( "hints_free_hint_binary" );
			}
		});

		// On an exercise page, replace the "Report a Problem" link with a button
		// to be more clear that it won't replace the current page.
		jQuery( "<a>Report a Problem</a>" )
			.attr( "id", "report" ).addClass( "simple-button action-gradient green" )
			.replaceAll( jQuery( ".footer-links #report" ) );

		jQuery( "#report" ).click( function( e ) {

			e.preventDefault();

			var report = jQuery( "#issue" ).css( "display" ) !== "none",
				form = jQuery( "#issue form" ).css( "display" ) !== "none";

			if ( report && form ) {
				jQuery( "#issue" ).hide();
			} else if ( !report || !form ) {
				jQuery( "#issue-status" ).removeClass( "error" ).html( issueIntro );
				jQuery( "#issue, #issue form" ).show();
				jQuery( "html, body" ).animate({
					scrollTop: jQuery( "#issue" ).offset().top
				}, 500, function() {
					jQuery( "#issue-title" ).focus();
				} );
			}
		});


		// Hide issue form.
		jQuery( "#issue-cancel" ).click( function( e ) {

			e.preventDefault();

			jQuery( "#issue" ).hide( 500 );
			jQuery( "#issue-title, #issue-email, #issue-body" ).val( "" );

		});

		// Submit an issue.
		jQuery( "#issue form input:submit" ).click( function( e ) {

			e.preventDefault();

			// don't do anything if the user clicked a second time quickly
			if ( jQuery( "#issue form" ).css( "display" ) === "none" ) return;

			var pretitle = jQuery( "#current-exercise" ).text() || jQuery( "title" ).text().replace(/ \|.*/, ''),
				type = jQuery( "input[name=issue-type]:checked" ).prop( "id" ),
				title = jQuery( "#issue-title" ).val(),
				email = jQuery( "#issue-email" ).val(),
				path = exerciseName + ".html"
					+ "?seed=" + problemSeed
					+ "&problem=" + problemID,
				pathlink = "[" + path + ( exercise.data( "name" ) != null && exercise.data( "name" ) !== exerciseName ? " (" + exercise.data( "name" ) + ")" : "" ) + "](http://sandcastle.khanacademy.org/media/castles/Khan:master/exercises/" + path + "&debug)",
				historyLink = "[Answer timeline](" + "http://sandcastle.khanacademy.org/media/castles/Khan:master/exercises/" + path + "&debug&activity=" + encodeURIComponent( JSON.stringify( userActivityLog ) ).replace( /\)/g, "\\)" ) + ")",
				agent = navigator.userAgent,
				mathjaxInfo = "MathJax is " + ( typeof MathJax === "undefined" ? "NOT loaded" :
					( "loaded, " + ( MathJax.isReady ? "" : "NOT ") + "ready, queue length: " + MathJax.Hub.queue.queue.length ) ),
				sessionStorageInfo = ( typeof sessionStorage === "undefined" || typeof sessionStorage.getItem === "undefined" ? "sessionStorage NOT enabled" : null ),
				warningInfo = jQuery( "#warning-bar-content" ).text(),
				parts = [ email ? "Reporter: " + email : null, jQuery( "#issue-body" ).val() || null, pathlink, historyLink, "    " + JSON.stringify( guessLog ), agent, sessionStorageInfo, mathjaxInfo, warningInfo ],
				body = jQuery.grep( parts, function( e ) { return e != null; } ).join( "\n\n" );

			var mathjaxLoadFailures = jQuery.map( MathJax.Ajax.loading, function( info, script ) {
				if ( info.status === -1 ) {
					return [ script + ": error" ];
				} else {
					return [];
				}
			} ).join( "\n" );
			if ( mathjaxLoadFailures.length > 0 ) {
				body += "\n\n" + mathjaxLoadFailures;
			}

			// flagging of browsers/os for issue labels. very primitive, but
			// hopefully sufficient.
			var agent_contains = function( sub ) { return agent.indexOf( sub ) !== -1; },
				flags = {
					ie8: agent_contains( "MSIE 8.0" ),
					ie9: agent_contains( "Trident/5.0" ),
					chrome: agent_contains( "Chrome/" ),
					safari: !agent_contains( "Chrome/" ) && agent_contains( "Safari/" ),
					firefox: agent_contains( "Firefox/" ),
					win7: agent_contains( "Windows NT 6.1" ),
					vista: agent_contains( "Windows NT 6.0" ),
					xp: agent_contains( "Windows NT 5.1" ),
					leopard: agent_contains( "OS X 10_5" ) || agent_contains( "OS X 10.5" ),
					snowleo: agent_contains( "OS X 10_6" ) || agent_contains( "OS X 10.6" ),
					lion: agent_contains( "OS X 10_7" ) || agent_contains( "OS X 10.7" ),
					scratchpad: ( /scratch\s*pad/i ).test( body ),
					ipad: agent_contains( "iPad" )
				},
				labels = [];
			jQuery.each( flags, function( k, v ) {
				if ( v ) labels.push( k );
			});

			if ( !type ) {
				jQuery( "#issue-status" ).addClass( "error" )
					.html( "Please specify the issue type." ).show();
				return;
			} else {
				labels.push( type.slice( "issue-".length ) );

				var hintOrVideoMsg = "Please click the hint button above to see our solution, or watch a video for additional help.";
				var refreshOrBrowserMsg = "Please try a hard refresh (press Ctrl + Shift + R)" +
						" or use Khan Academy from a different browser (such as Chrome or Firefox).";
				var suggestion = {
					"issue-wrong-or-unclear": hintOrVideoMsg,
					"issue-hard": hintOrVideoMsg,
					"issue-not-showing": refreshOrBrowserMsg,
					"issue-other": ""
				}[ type ];
			}

			if ( title === "" ) {
				jQuery( "#issue-status" ).addClass( "error" )
					.html( "Please provide a valid title for the issue." ).show();
				return;
			}

			var formElements = jQuery( "#issue input" ).add( "#issue textarea" );

			// disable the form elements while waiting for a server response
			formElements.attr( "disabled", true );

			jQuery( "#issue-cancel" ).hide();
			jQuery( "#issue-throbber" ).show();

			var dataObj = {
				title: pretitle + " - " + title,
				body: body,
				labels: labels
			};

			// we try to post ot github without a cross-domain request, but if we're
			// just running the exercises locally, then we can't help it and need
			// to fall back to jsonp.
			jQuery.ajax({

				url: ( testMode ? "http://www.khanacademy.org/" : "/" ) + "githubpost",
				type: testMode ? "GET" : "POST",
				data: testMode
					? { json: JSON.stringify( dataObj ) }
					: JSON.stringify( dataObj ),
				contentType: testMode ? "application/x-www-form-urlencoded" : "application/json",
				dataType: testMode ? "jsonp" : "json",
				success: function( json ) {

					data = json.data || json;

					// hide the form
					jQuery( "#issue form" ).hide();

					// show status message
					jQuery( "#issue-status" ).removeClass( "error" )
						.html( issueSuccess( data.html_url, data.title, suggestion ) )
						.show();

					// reset the form elements
					formElements.attr( "disabled", false )
						.not( "input:submit" ).val( "" );

					// replace throbber with the cancel button
					jQuery( "#issue-cancel" ).show();
					jQuery( "#issue-throbber" ).hide();

				},
				// note this won't actually work in local jsonp-mode
				error: function( json ) {

					// show status message
					jQuery( "#issue-status" ).addClass( "error" )
						.html( issueError ).show();

					// enable the inputs
					formElements.attr( "disabled", false );

					// replace throbber with the cancel button
					jQuery( "#issue-cancel" ).show();
					jQuery( "#issue-throbber" ).hide();

				}
			});
		});

		jQuery( "#print-ten" ).data( "show", true )
			.click( function( e ) {
				e.preventDefault();

				var link = jQuery( this ),
					show = link.data( "show" );

				// Reset answer fields, etc. and clear work and hints area
				jQuery("#next-question-button").click();

				if ( show ) {
					link.text( "Try current problem" );
					jQuery( "#answerform" ).hide();

					for ( var i = 0; i < 9; i++ ) {
						jQuery( "#workarea" ).append( "<hr>" );
						nextProblem( 1 );
						makeProblem();
					}

					// Rewind so next time we make a problem we'll be back at the beginning
					prevProblem( 9 );
				} else {
					link.text( "Show next 10 problems" );
					jQuery( "#answerform" ).show();
				}

				jQuery( "#answerform input[type='button']" ).attr( "disabled", show );

				link.data( "show", !show );
			});

		jQuery( "#examples-show" ).data( "show", true )
			.click(function(evt){
				if ( evt ) { evt.preventDefault(); }

				var exampleLink = jQuery(this);
				var examples = jQuery( "#examples" );
				var show = exampleLink.data( "show" );

				if ( exampleLink.data( "show" ) ){
					exampleLink.text( "Hide acceptable answer formats" );
				} else {
					exampleLink.text( "Show acceptable answer formats" );
				}

				examples.slideToggle( 190, function() {
					// Update dimensions for sticky box
					jQuery( "#answer_area" ).adhere();
				} );
				exampleLink.data( "show", !show );
			}).trigger( "click" );

		jQuery( "#warning-bar-close a").click( function( e ) {
			e.preventDefault();
			jQuery( "#warning-bar" ).fadeOut( "slow" );
		});

		jQuery( "#scratchpad-show" )
			.click( function( e ) {
				e.preventDefault();
				Khan.scratchpad.toggle();

				if ( user ) {
					window.localStorage[ "scratchpad:" + user ] = Khan.scratchpad.isVisible();
				}
			});

		jQuery( "#answer_area" ).delegate( "input.button, select", "keydown", function( e ) {
			// Don't want to go back to exercise dashboard; just do nothing on backspace
			if ( e.keyCode === 8 ) {
				return false;
			}
		} );

		// Prepare for the tester info if requested
		if ( testMode && Khan.query.test != null ) {
			jQuery( "#answer_area" ).prepend(
				'<div id="tester-info" class="info-box">' +
					'<span class="info-box-header">Testing Mode</span>' +
					'<p><strong>Problem No.</strong> <span class="problem-no"></span></p>' +
					'<p><strong>Answer:</strong> <span class="answer"></span></p>' +
					'<p>' +
						'<input type="button" class="pass button green" value="This problem was generated correctly.">' +
						'<input type="button" class="fail button orange" value="There is an error in this problem.">' +
					'</p>' +
				'</div>'
			);

			jQuery( "#tester-info .pass" ).click( function() {
				dataDump.problems[ dataDump.problems.length - 1 ].pass = true;
				nextProblem( 1 );
				jQuery( "#next-question-button" ).trigger( "click" );
			} );

			jQuery( "#tester-info .fail" ).click( function() {
				var description = prompt( "Please provide a short description of the error" );

				// Don't do anything on clicking Cancel
				if ( description == null ) return;

				// we discard the info recorded and record an issue on github instead
				// of testing against the faulty problem's data dump.
				var dump = dataDump.problems.pop(),
					prettyDump = "```js\n" + JSON.stringify( dump ) + "\n```",
					fileName = window.location.pathname.replace(/^.+\//, ""),
					path = fileName + "?problem=" + problemID
						+ "&seed=" + problemSeed;

				var title = encodeURIComponent( "Issue Found in Testing - " + jQuery("title").html() ),
					body = encodeURIComponent( [ description, path, prettyDump, navigator.userAgent ].join("\n\n") ),
					label = encodeURIComponent( "tester bugs" );

				var err = function( problems, dump, desc ) {
					problems.push( dump );
					problems[ problems.length - 1 ].pass = desc;
				};

				var comment = function( id ) {
					// If communication fails with the Sinatra app or Github and a
					// comment isn't created, then we create a test that will always
					// fail.
					jQuery.ajax({
						url: "http://66.220.0.98:2563/file_exercise_tester_bug_comment?id=" + id + "&body=" + body,
						dataType: "jsonp",
						success: function( json ) {
							if ( json.meta.status !== 201 ) {
								err( dataDump.problems, dump, description );
							} else {
								dataDump.issues += 1;
							}
						},
						error: function( json ) {
							err( dataDump.problems, dump, description );
						}
					});
				};

				var newIssue = function() {
					// if communication fails with the Sinatra app or Github and an
					// issue isn't created, then we create a test that will always
					// fail.
					jQuery.ajax({
						url: "http://66.220.0.98:2563/file_exercise_tester_bug?title=" + title + "&body=" + body + "&label=" + label,
						dataType: "jsonp",
						success: function( json ) {
							if ( json.meta.status !== 201 ) {
								err( dataDump.problems, dump, description );
							} else {
								dataDump.issues += 1;
							}
						},
						error: function( json ) {
							err( dataDump.problems, dump, description );
						}
					});
				};

				jQuery.ajax({
					url: "https://api.github.com/repos/Khan/khan-exercises/issues?labels=tester%20bugs",
					dataType: "jsonp",
					error: function( json ) {
						err( dataDump.problems, dump, description );
					},
					success: function( json ) {
						var copy = false;

						// see if an automatically generated issue for this file
						// already exists
						jQuery.each( json.data, function( i, issue ) {
							if ( encodeURIComponent( issue.title ) === title ) {
								copy = issue.number;
							}
						});

						if ( copy ) {
							comment( copy );
						} else {
							newIssue();
						}
					}
				});

				jQuery( "#next-question-button" ).trigger( "click" );
			} );

			jQuery( document ).keyup( function( e ) {
				if ( e.keyCode === "H".charCodeAt( 0 ) ) {
					jQuery( "#hint" ).click();
				}
				if ( e.keyCode === "Y".charCodeAt( 0 ) ) {
					jQuery( "#tester-info .pass" ).click();
				}
				if ( e.keyCode === "N".charCodeAt( 0 ) ) {
					jQuery( "#tester-info .fail" ).click();
				}
			});
		}

		// Prepare for the debug info if requested
		if ( testMode && Khan.query.debug != null ) {
			jQuery( '<div id="debug"></div>' ).appendTo( "#answer_area" );
		}

		// Register API ajax callbacks for updating UI
		if ( typeof APIActionResults !== "undefined" ) {
			// Display Messages like "You're Proficient" or "You Seem To Be Struggling"
			APIActionResults.register("exercise_state",
				function(userState) {
					var jel = jQuery("#exercise-message-container");
					if (userState.template !== null) {
						jel.empty().append(userState.template);
						setTimeout(function(){ jel.slideDown(); }, 50);
					}
					else {
						jel.slideUp();
					}
				}
			);
		}

		// Make scratchpad persistent per-user
		if (user) {
			var lastScratchpad = window.localStorage[ "scratchpad:" + user ];
			if ( typeof lastScratchpad !== "undefined" && JSON.parse( lastScratchpad ) ) {
				Khan.scratchpad.show();
			}
		}

		Khan.relatedVideos.hookup();
		if (userExercise) {
			Khan.relatedVideos.setVideos(userExercise.exercise_model.related_videos);
		}

		if (window.ModalVideo) {
			ModalVideo.hookup();
		}
	}