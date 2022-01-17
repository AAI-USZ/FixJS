function(args) {
			var self = this,

				node = this.domNode = this._setFocusNode(dom.create(this.domType || "div", {
					className: "TiUIElement " + css.clean(this.declaredClass),
					"data-widget-id": this.widgetId
				})),

				// Handle click/touch/gestures
				recognizers = this._gestureRecognizers = {
					Pinch: new Pinch,
					Swipe: new Swipe,
					TwoFingerTap: new TwoFingerTap,
					DoubleTap: new DoubleTap,
					LongPress: new LongPress,
					SingleTap: new SingleTap,
					TouchStart: new TouchStart,
					TouchEnd: new TouchEnd,
					TouchMove: new TouchMove,
					TouchCancel: new TouchCancel
				},

				// Each event could require a slightly different precedence of execution, which is why we have these separate lists.
				// For now they are the same, but I suspect they will be different once the android-iphone parity is determined.
				touchRecognizers = {
					Start: recognizers,
					Move: recognizers,
					End: recognizers,
					Cancel: recognizers
				},

				useTouch = "ontouchstart" in window,
				bg = lang.hitch(this, "_doBackground");

			require.has("devmode") && args && args._debug && dom.attr.set(node, "data-debug", args._debug);
			function processTouchEvent(eventType, evt) {
				has("ti-instrumentation") && (this._gestureInstrumentationTest = instrumentation.startTest("Gesture Processing"));
				var i,
					gestureRecognizers = touchRecognizers[eventType],
					touches = evt.changedTouches;
				eventType = "Touch" + eventType + "Event";
				if (this._preventDefaultTouchEvent) {
					this._preventDefaultTouchEvent && evt.preventDefault && evt.preventDefault();
					for (i in touches) {
						touches[i].preventDefault && touches[i].preventDefault();
					}
				}
				useTouch || require.mix(evt, {
					touches: evt.type === "mouseup" ? [] : [evt],
					targetTouches: [],
					changedTouches: [evt]
				});
				for (i in gestureRecognizers) {
					gestureRecognizers[i]["process" + eventType](evt, self);
				}
				for (i in gestureRecognizers) {
					gestureRecognizers[i]["finalize" + eventType]();
				}
				has("ti-instrumentation") && instrumentation.stopTest(this._gestureInstrumentationTest, "Processing widget " + self.widgetId);
			}

			this._touching = false;

			on(this.domNode, useTouch ? "touchstart" : "mousedown", function(evt){
				var handles = [
					on(window, useTouch ? "touchmove" : "mousemove", function(evt){
						(useTouch || self._touching) && processTouchEvent("Move", evt);
					}),
					on(window, useTouch ? "touchend" : "mouseup", function(evt){
						self._touching = false;
						processTouchEvent("End", evt);
						event.off(handles);
					}),
					useTouch && on(window, "touchcancel", function(evt){
						processTouchEvent("Cancel", evt);
						event.off(handles);
					})
				];
				self._touching = true;
				processTouchEvent("Start", evt);
			});

			this.addEventListener("touchstart", bg);
			this.addEventListener("touchend", bg);

			// TODO: mixin JSS rules (http://jira.appcelerator.org/browse/TIMOB-6780)
			var values = this.constants.__values__;
			values.size = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			values.rect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}