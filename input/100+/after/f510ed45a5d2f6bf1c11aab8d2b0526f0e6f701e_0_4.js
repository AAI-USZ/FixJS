function(){



            this.boolScrollLock=false;

            this.currentScrollingObject=null;

			this.elementInfo = null;

            this.verticalScroll=true;

            this.horizontalScroll=false;

            this.scrollBars=true;

            this.vscrollBar=null;

            this.hscrollBar=null;

            this.hScrollCSS="scrollBar";

            this.vScrollCSS="scrollBar";

			this.firstEventInfo=null;

			this.moved=false;

			this.preventPullToRefresh = true;

			this.doScrollInterval = null;

			this.refreshRate = 25;

			this.isScrolling=false;

			this.androidFormsMode = false;

			this.refreshSafeKeep = false;



            this.lastScrollbar="";

            this.finishScrollingObject=null;

            this.container=null;

            this.scrollingFinishCB=null;

			this.loggedPcentY=0;

			this.loggedPcentX=0;

			

		}