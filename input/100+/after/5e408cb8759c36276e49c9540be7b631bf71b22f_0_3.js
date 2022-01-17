function getH5TrackBindObj(controller, selector, eventName, func) {

		// タッチイベントがあるかどうか

		var hasTouchEvent = typeof document.ontouchstart !== TYPE_OF_UNDEFINED;

		if (eventName !== EVENT_NAME_H5_TRACKSTART) {

			if (hasTouchEvent) {

				return getNormalBindObj(controller, selector, eventName, func);

			}

			// イベントオブジェクトの正規化

			return getNormalBindObj(controller, selector, eventName, function(context) {

				var event = context.event;

				var offset = $(event.currentTarget).offset() || {

					left: 0,

					top: 0

				};

				event.offsetX = event.pageX - offset.left;

				event.offsetY = event.pageY - offset.top;

				func.apply(this, arguments);

			});

		}

		var getEventType = function(en) {

			switch (en) {

			case 'touchstart':

			case 'mousedown':

				return EVENT_NAME_H5_TRACKSTART;

			case 'touchmove':

			case 'mousemove':

				return EVENT_NAME_H5_TRACKMOVE;

			case 'touchend':

			case 'mouseup':

				return EVENT_NAME_H5_TRACKEND;

			}

		};



		// jQuery.Eventオブジェクトのプロパティをコピーする。

		// 1.6.xの場合, "liveFired"というプロパティがあるがこれをコピーしてしまうとtriggerしてもイベントが発火しない。

		var copyEventObject = function(src, dest) {

			for ( var prop in src) {

				if (src.hasOwnProperty(prop) && !dest[prop] && prop !== 'target'

						&& prop !== 'currentTarget' && prop !== 'originalEvent'

						&& prop !== 'liveFired') {

					dest[prop] = src[prop];

				}

			}

			dest.h5DelegatingEvent = src;

		};

		var start = hasTouchEvent ? 'touchstart' : 'mousedown';

		var move = hasTouchEvent ? 'touchmove' : 'mousemove';

		var end = hasTouchEvent ? 'touchend' : 'mouseup';

		var $document = $(document);

		var getBindObjects = function() {

			// h5trackendイベントの最後でハンドラの除去を行う関数を格納するための変数

			var removeHandlers = null;

			var execute = false;

			var getHandler = function(en, eventTarget, setup) {

				return function(var_args) {

					var type = getEventType(en);

					var isStart = type === EVENT_NAME_H5_TRACKSTART;

					if (isStart && execute) {

						return;

					}

					var eventContext = createEventContext(controller, arguments);

					var event = eventContext.event;

					if (hasTouchEvent) {

						// タッチイベントの場合、イベントオブジェクトに座標系のプロパティを付加

						initTouchEventObject(event, en);

					}

					var newEvent = new $.Event(type);

					copyEventObject(event, newEvent);

					var target = event.target;

					if (eventTarget) {

						target = eventTarget;

					}

					if (setup) {

						setup(newEvent);

					}

					if (!hasTouchEvent || (execute || isStart)) {

						$(target).trigger(newEvent, eventContext.evArg);

						execute = true;

					}

					if (isStart && execute) {

						newEvent.h5DelegatingEvent.preventDefault();

						var nt = newEvent.target;



						// 直前のh5track系イベントとの位置の差分を格納

						var ox = newEvent.clientX;

						var oy = newEvent.clientY;

						var setupDPos = function(ev) {

							var cx = ev.clientX;

							var cy = ev.clientY;

							ev.dx = cx - ox;

							ev.dy = cy - oy;

							ox = cx;

							oy = cy;

						};

						var moveHandler = getHandler(move, nt, setupDPos);

						var upHandler = getHandler(end, nt);



						var $bindTarget = hasTouchEvent ? $(nt) : $document;

						removeHandlers = function() {

							$bindTarget.unbind(move, moveHandler);

							$bindTarget.unbind(end, upHandler);

						};

						$bindTarget.bind(move, moveHandler);

						$bindTarget.bind(end, upHandler);

					}

					if (type === EVENT_NAME_H5_TRACKEND) {

						removeHandlers();

						execute = false;

					}

				};

			};

			var createBindObj = function(en) {

				return {

					controller: controller,

					selector: selector,

					eventName: en,

					handler: getHandler(en)

				};

			};

			var bindObjects = [getNormalBindObj(controller, selector, eventName, func)];

			bindObjects.push(createBindObj(start));

			return bindObjects;

		};

		return getBindObjects();

	}