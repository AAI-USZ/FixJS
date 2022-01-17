function(e){
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
					var outAnimFn = $.isFunction(options.out) ? options.out : scope.transitions[settings.position].out;
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
				}