function(options){
				options = options || {};
				var scope = this,
					settings = this.getSettings(options);
				if (_.isObject(settings.destroy)){
					if (settings.destroy instanceof scope.NotificationView){
						settings.destroy.destroy();
					} else {
						scope.destroyAll.apply(scope, _.isArray(settings.destroy) ? settings.destroy : [settings.destroy]);
					}
				} else if (settings.destroy === true) {
					scope.destroyAll();
				}
				var zIndex = options.zIndex || scope.calcZIndex.call(scope);

				settings.wrapperCls = scope.getWrapperCls(settings);
				settings.innerCls = settings.baseCls + '-inner';

				var msgEl = $(scope.template(settings)),
					msgInner = msgEl.find('.' + settings.innerCls);
				settings.width && msgInner.css({width: settings.width});
				Notifier._modulesBinder.trigger('beforeAppendMsgEl', scope, settings, msgEl, msgInner);
				msgEl.css({display: 'none', opacity: 0, position: scope._cssPos, zIndex: settings.modal ? ++zIndex : zIndex}).prependTo(scope.$el);
				var msgView = new scope.NotificationView({
					el: msgEl
				});
				msgView.settings = settings;

				if (settings.buttons || msgInner.find('button').length) {
					msgInner.on('click', 'button[data-handler]', function(){
						var handler = $(this).data('handler'),
							fn = _.isFunction(handler) ? handler : msgView[handler];
						fn.apply(msgView, arguments);
					});
					msgInner.on('button click', function(e){
						msgView.trigger('click:' + $(e.target).data('role'));
					});
				}

				var removeFn = msgView.destroy = function(e){
					if (_.isObject(e) && e.preventDefault) {
						e.preventDefault();
						e.stopPropagation();
					}
					msgView.trigger('beforeHide', msgView, msgEl);
					settings.modal && msgView.screenEl.fadeOut(300, function(){
						msgView.trigger('screenHide', msgView, msgEl);
						msgView.screenEl.remove();
					});

					Notifier._modulesBinder.trigger('beforeHideMsgEl', scope, settings, msgEl, msgInner, msgView);
					var outAnimFn = $.isFunction(settings.out) ? settings.out : scope.transitions[settings.position].out;
					outAnimFn.call(scope, msgEl, msgInner, settings, settings.fadeOutMs, function(){
						msgView.remove();
						msgView.trigger('destroy', msgView, msgEl);
						Notifier._modulesBinder.trigger('afterDestroyMsgEl', scope, settings, msgEl, msgInner, msgView);
						_.isFunction(e) && e.call(msgView, msgView, msgEl);
					});
					if (msgView.timeoutId) {
						clearTimeout(msgView.timeoutId);
					}
					delete msgView.timeoutId;
					delete scope.current[msgView.cid];
				};

				var preventDefaultFn = function(e){
					if (e) {
						e.preventDefault();
						e.stopPropagation();
					}
				};

				if (settings.modal) {
					msgView.screenEl =  $('<div/>', {
						'class': settings.baseCls + '-screen ' + settings.baseCls + '-theme-' + settings.theme,
						css: { position: scope._cssPos, top: 0, left: 0, width: '100%', height: '100%', opacity: 0, zIndex: zIndex-1  }
					}).prependTo(scope.$el)
						.click(function(e){
							e.preventDefault();
							e.stopPropagation();
							return false;
						}).fadeTo(300, settings.screenOpacity);

				}

				if (settings.ms > 0  || settings.ms === 0){
					msgView.timeoutId = setTimeout(function(){
						msgView.trigger('timeout', msgView, msgEl);
						removeFn();
					}, settings.ms);
				}

				msgInner.click(settings.hideOnClick ? removeFn : preventDefaultFn);

				settings.css && msgInner.css(settings.css);
				var animateFn = $.isFunction(settings['in']) ? settings['in'] : scope.transitions[settings.position]['in'];
				scope.current[msgView.cid] = msgView;
				msgView.zIndex = zIndex;

				Notifier._modulesBinder.trigger('beforeAnimateInMsgEl', scope, settings, msgEl, msgInner, msgView);
				animateFn.call(scope, msgEl, msgInner, settings, settings.fadeInMs, function(){
					Notifier._modulesBinder.trigger('afterAnimateInMsgEl', scope, settings, msgEl, msgInner, msgView);
				});
				return msgView;
			}