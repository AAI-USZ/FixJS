function(e) {
				var a		=	next_tag_up('a', e.target);
				var button	=	typeof(e.button) != 'undefined' ? e.button : e.event.button;

				// don't trap links that are meant to open new windows, and don't
				// trap middle mouse clicks (or anything more than left click)
				if(a.target == '_blank' || button > 0) return;

				var curhost		=	new String(global.location).replace(/[a-z]+:\/\/(.*?)\/.*/i, '$1');
				var linkhost	=	a.href.match(/^[a-z]+:\/\//) ? a.href.replace(/[a-z]+:\/\/(.*?)\/.*/i, '$1') : curhost;
				if(
					curhost != linkhost ||
					(typeof(options.do_state_change) == 'function' && !options.do_state_change(a))
				)
				{
					return;
				}

				if(e) e.stop();

				if(History.enabled)
				{
					var href	=	a.href.replace(/^[a-z]+:\/\/.*?\//, '').replace(/^[#!\/]+/, '');
					if(options.filter_trailing_slash) href = href.replace(/\/$/, '');
					href	=	'/'+href;

					History.pushState(options.global_state, '', href);
					return false;
				}
				else
				{
					var href	=	a.href.replace(/^[a-z]+:\/\/.*?\//, '');
					if(options.filter_trailing_slash) href = href.replace(/\/$/, '');
					href	=	'/#!/'+href;

					global.location	=	href;
				}
			}