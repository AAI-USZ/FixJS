function detectUA($, userAgent) {
            $.os = {};
            $.os.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false;
            $.os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
			$.os.androidICS = $.os.android && userAgent.match(/(Android)\s4/) ? true : false;
            $.os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
            $.os.iphone = !$.os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
            $.os.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
            $.os.touchpad = $.os.webos && userAgent.match(/TouchPad/) ? true : false;
            $.os.ios = $.os.ipad || $.os.iphone;
            $.os.ios6 = $.os.ios &&  userAgent.match(/(OS)\s([6])/) ? true : false;
			$.os.playbook = userAgent.match(/PlayBook/) ? true : false;
            $.os.blackberry = $.os.playbook || userAgent.match(/BlackBerry/) ? true : false;
			$.os.blackberry10 = $.os.blackberry && userAgent.match(/Safari\/536/) ? true : false;
            $.os.chrome = userAgent.match(/Chrome/) ? true : false;
			$.os.opera = userAgent.match(/Opera Mobi/) ? true : false;
            $.os.fennec = userAgent.match(/fennec/i) ? true : false;
			$.os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
            $.os.desktop = !($.os.ios || $.os.android || $.os.blackberry || $.os.opera || $.os.fennec || $.os.supportsTouch);
			//features
			$.feat = {};
			$.feat.nativeTouchScroll = ($.os.ios ? !userAgent.match(/OS\s[1-4]/) : false);
        }