function(){
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
                }