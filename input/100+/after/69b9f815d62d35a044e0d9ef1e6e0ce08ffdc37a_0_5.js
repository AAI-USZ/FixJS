f            
            if (this.hasLaunched == false || this.launchCompleted) {
                this.hasLaunched = true;
                return;
            }
			
			var that = this;

            this.isAppMobi = (window.AppMobi && typeof (AppMobi) == "object" && AppMobi.app !== undefined) ? true : false;
            this.viewportContainer = jq("#jQUi");
            this.navbar = $am("navbar");
            this.content = $am("content");
            this.header = $am("header");
            this.menu = $am("menu");
            if (this.viewportContainer.length == 0) {
                var container = document.createElement("div");
                container.id = "jQUi";
                var body = document.body;
                while (body.firstChild) {
                    container.appendChild(body.firstChild);
                }
                jq(document.body).prepend(container);
                this.viewportContainer = jq("#jQUi");
            }
			//set anchor click handler for UI
			this.viewportContainer[0].addEventListener('click', function(e){
				var theTarget = e.target;
				checkAnchorClick(e, theTarget);
			}, false);
			
			var enterEditEl = null;
			//on enter-edit keep a reference of the actioned element
			$.bind($.touchLayer, 'enter-edit', function(el){ enterEditEl = el; });
			//enter-edit-reshape panel padding and scroll adjust
			$.bind($.touchLayer, 'enter-edit-reshape', function(){
				//onReshape UI fixes
				//check if focused element is within active panel
				var jQel = $(enterEditEl);
				var elCheck = jQel.closest(that.activeDiv);
				if(elCheck && elCheck.size()>0){
					if($.os.ios || $.os.chrome){
						//TODO: calculate necessary scroll to add as padding-bottom and top
					} else if($.os.android || $.os.blackberry){
						//TODO: scroll the panel in a way the focused element stays in view
					}
				}
			});
			
			
			
            if (!this.navbar) {
                this.navbar = document.createElement("div");
                this.navbar.id = "navbar";
                this.navbar.style.cssText = "display:none";
                this.viewportContainer.append(this.navbar);
            }
            if (!this.header) {
                this.header = document.createElement("div");
                this.header.id = "header";
                this.viewportContainer.prepend(this.header);
            }
            if (!this.menu) {
                this.menu = document.createElement("div");
                this.menu.id = "menu";
                this.menu.style.overflow = "hidden";
                this.menu.innerHTML = '<div id="menu_scroller"></div>';
                this.viewportContainer.append(this.menu);
                this.scrollingDivs["menu_scroller"] = jq("#menu_scroller").scroller({
                    scrollBars: false,
                    verticalScroll: true,
                    vScrollCSS: "jqmScrollbar"
                });
            }
            
            
            if (!this.content) {
                this.content = document.createElement("div");
                this.content.id = "content";
                this.viewportContainer.append(this.content);
            }
			
            this.header.innerHTML = '<a id="backButton"  href="javascript:;"></a> <h1 id="pageTitle"></h1>' + header.innerHTML;
            this.backButton = $am("backButton");
            this.backButton.className = "button";
            
            this.backButton.onclick = function() {
				that.goBack();
            };
            this.backButton.style.visibility = "hidden";
            this.titleBar = $am("pageTitle");
            this.addContentDiv("jQui_ajax", "");
            var maskDiv = document.createElement("div");
            maskDiv.id = "jQui_mask";
            maskDiv.className = "ui-loader";
            maskDiv.innerHTML = "<span class='ui-icon ui-icon-loading spin'></span><h1>Loading Content</h1>";
            maskDiv.style.zIndex = 20000;
            maskDiv.style.display = "none";
            document.body.appendChild(maskDiv);
            var modalDiv = document.createElement("div");
            modalDiv.id = "jQui_modal";
            
            this.viewportContainer.append(modalDiv);
            modalDiv.appendChild(jq("<div id='modalContainer'></div>").get());
            this.scrollingDivs['modal_container'] = jq("#modalContainer").scroller({
                scrollBars: true,
                vertical: true,
                vScrollCSS: "jqmScrollbar"
            });
            
            this.modalWindow = modalDiv;
            this.updateNavbar();
            var defer = {};
            var contentDivs = this.viewportContainer.get().querySelectorAll(".panel");
            for (var i = 0; i < contentDivs.length; i++) {
                var el = contentDivs[i];
                var tmp = el;
                var id;
                if (el.parentNode && el.parentNode.id != "content") {
                    el.parentNode.removeChild(el);
                    var id = el.id;
                    this.addDivAndScroll(tmp);
                    if (tmp.getAttribute("selected"))
                        this.firstDiv = $am(id);
                } else if (!el.parsedContent) {
                    el.parsedContent = 1;
                    el.parentNode.removeChild(el);
                    var id = el.id;
                    this.addDivAndScroll(tmp);
                    if (tmp.getAttribute("selected"))
                        this.firstDiv = $am(id);
                }
                if (el.getAttribute("data-defer"))
                    defer[id] = el.getAttribute("data-defer");
                el = null;
            }
            contentDivs = null;
            var loadingDefer=false;
            var toLoad=Object.keys(defer).length;
            if(toLoad>0){
                loadingDefer=true;
                var loaded=0;
                for (var j in defer) {
                    (function(j) {
                        jq.ajax({url:AppMobi.webRoot + defer[j], success:function(data) {
                            if (data.length == 0)
                                return;
                            $.ui.updateContentDiv(j, data);
                            that.parseScriptTags(jq(j).get());
                            loaded++;
                            if(loaded>=toLoad){
                               $(document).trigger("defer:loaded");
                               loadingDefer=false;
                               
                            }
                        },error:function(msg){
                            //still trigger the file as being loaded to not block jq.ui.ready
                            console.log("Error with deferred load "+AppMobi.webRoot+defer[j])
                            loaded++;
                            if(loaded>=toLoad){
                               $(document).trigger("defer:loaded");
                               loadingDefer=false;
                            }
                        }});
                    })(j);
                }
            }
            if (this.firstDiv) {
                
                var that = this;
                // Fix a bug in iOS where translate3d makes the content blurry
                this.activeDiv = this.firstDiv;
                if (this.scrollingDivs[this.activeDiv.id]) {
                    this.scrollingDivs[this.activeDiv.id].enable();
                }
                
                //window.setTimeout(function() {
                var loadFirstDiv=function(){
                    //activeDiv = firstDiv;
                    that.firstDiv.style.display = "block";
                    that.css3animate(that.firstDiv, {
                        x: "0%",
						success:function(){
							that.clearAnimations(that.firstDiv);
						}
                    });
                    if (that.activeDiv.title)
                        that.titleBar.innerHTML = that.activeDiv.title;
                    that.parsePanelFunctions(that.activeDiv);
                    //Load the default hash
                    if (defaultHash.length > 0 && that.loadDefaultHash) 
                    {
                        that.loadContent(defaultHash);
                    }
                    modalDiv = null;
                    maskDiv = null;
                    that.launchCompleted = true;
                    jq(document).trigger("jq.ui.ready");
                    $.asap(function() {
                        // Run after the first div animation has been triggered
                        jq("#splashscreen").remove();
                    });

                    that.defaultFooter = jq("#navbar").children();
                    var firstMenu = jq("nav").get();
                    that.defaultMenu = jq(firstMenu).children();

                    that.updateSideMenu(that.defaultMenu);
                };
                if(loadingDefer){
                    $(document).one("defer:loaded",loadFirstDiv);
                }
                else
                    window.setTimeout(loadFirstDiv,100);	//could this be $.asap?
            }
           
        },
