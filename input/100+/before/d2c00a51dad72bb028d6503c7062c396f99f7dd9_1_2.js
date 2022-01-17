function() {
        this.loadingEnd();
        try {
            var nico = this.nico();
            postError('[nicoFrameLoaded] ' + nico.window.location.href);
            this.current.location = nico.window.location.href; // for video redirect.
            this.current.videoinfo = cloneObj(this.getWatchInfo());
            var flvplayer = nico.getPlayer();
            
            // transitional period.
            if (nico.document.body.innerHTML.indexOf("Cookie.set('player4'") >= 0) {
                this.current.viewSize.ORG_PLAYER_VIEW_WIDTH     = Consts.ORG_PLAYER3_VIEW_WIDTH;
                this.current.viewSize.ORG_PLAYER_VIEW_HEIGHT    = Consts.ORG_PLAYER3_VIEW_HEIGHT;
                this.current.viewSize.ORG_PLAYER_CONTROL_HEIGHT = Consts.ORG_PLAYER3_CONTROL_HEIGHT;
                this.current.viewSize.ORG_PLAYER_MINIMUM_WIDTH  = Consts.ORG_PLAYER3_MINIMUM_WIDTH;
                this.current.viewSize.ORG_PLAYER_4_3_WIDTH_ADJ  = 0;
            }
            else if (nico.document.body.innerHTML.indexOf("zero_lead") >= 0) {
                this.current.viewSize.ORG_PLAYER_VIEW_WIDTH     = Consts.ORG_PLAYER4_VIEW_WIDTH;
                this.current.viewSize.ORG_PLAYER_VIEW_HEIGHT    = Consts.ORG_PLAYER4_VIEW_HEIGHT;
                this.current.viewSize.ORG_PLAYER_CONTROL_HEIGHT = Consts.ORG_PLAYER4_CONTROL_HEIGHT;
                this.current.viewSize.ORG_PLAYER_MINIMUM_WIDTH  = Consts.ORG_PLAYER4_MINIMUM_WIDTH;
                if (flvplayer.ext_isWide()) {
                    this.current.viewSize.ORG_PLAYER_4_3_WIDTH_ADJ = 0;
                }
                else {
                    this.current.viewSize.ORG_PLAYER_4_3_WIDTH_ADJ = Consts.ORG_PLAYER4_4_3_WIDTH_ADJ;
                }
            }
            else {
                this.current.viewSize.ORG_PLAYER_VIEW_WIDTH     = Consts.ORG_PLAYER_ZERO_VIEW_WIDTH;
                this.current.viewSize.ORG_PLAYER_VIEW_HEIGHT    = Consts.ORG_PLAYER_ZERO_VIEW_HEIGHT;
                this.current.viewSize.ORG_PLAYER_CONTROL_HEIGHT = Consts.ORG_PLAYER_ZERO_CONTROL_HEIGHT;
                this.current.viewSize.ORG_PLAYER_MINIMUM_WIDTH  = Consts.ORG_PLAYER_ZERO_MINIMUM_WIDTH;
                if (flvplayer.ext_isWide()) {
                    this.current.viewSize.ORG_PLAYER_4_3_WIDTH_ADJ = 0;
                }
                else {
                    this.current.viewSize.ORG_PLAYER_4_3_WIDTH_ADJ = Consts.ORG_PLAYER_ZERO_4_3_WIDTH_ADJ;
                }
            }
            
            flvplayer.SetVariable('Overlay.onRelease', ''); // onPress 
            flvplayer.SetVariable('Overlay.hitArea', 0);
            this.setCommentOff(this.current.isCommentOff);
            this.setRepeat(this.current.isRepeat);
            this.setMute(this.current.isMute);
            if (this.current.volume != null) {
                this.volumeTo(this.current.volume);
            }
            // http://orera.g.hatena.ne.jp/miya2000/20090711/p0
            if (browser.opera && nico.window.Element.scrollTo && !/setTimeout/.test(nico.window.Element.scrollTo)) {
                var org_scrollTo = nico.window.Element.scrollTo;
                nico.window.Element.scrollTo = function() { var args = arguments; setTimeout(function() { org_scrollTo.apply(this, args) }, 0.01); };
            }
            // fix header position.
            var header = nico.document.querySelector('div.bg_headmenu, #siteHeader');
            if (header) {
                header.style.position = 'static';
                header.style.width = '984px';
                nico.document.body.style.paddingTop = '0px';
                addStyle('body.mode_2 { padding-top: 0px !important; }', nico.document);
            }
            // force re-layout for chrome.
            if (browser.webkit) flvplayer.ext_setVideoSize('normal');
        }
        catch(e) { postError(e) }
        this.layout();
    }