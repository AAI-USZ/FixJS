function(){
                    //activeDiv = firstDiv;
                    //activeDiv = firstDiv;
                    if (defaultHash.length > 0 && that.loadDefaultHash&&defaultHash!=("#"+that.firstDiv.id)&&$(defaultHash).length>0)
                    {
                        that.activeDiv=$(defaultHash).get();
                        jq("#header #backButton").css("visibility","visible");
                        that.setBackButtonText(that.activeDiv.title)
                        that.history=[{target:"#"+that.firstDiv.id}]; //Reset the history to the first div
                    }
                    else
                        previousTarget="#"+that.activeDiv.id;
                    
                    that.activeDiv.style.display = "block";
                    
                   
                    if (that.activeDiv.title)
                        that.setTitle(that.activeDiv.title);
                    that.parsePanelFunctions(that.activeDiv);
                    //Load the default hash
                    
                    that.history=[{target:"#"+that.firstDiv.id}]; //Reset the history to the first div
                    modalDiv = null;
                    maskDiv = null;
                    that.launchCompleted = true;
                    
                   if(jq("#navbar a").length>0){
                        jq("#navbar a").data("ignore-pressed", "true").data("resetHistory", "true");
                        that.defaultFooter = jq("#navbar").children();
                        that.updateNavbarElements(that.defaultFooter);
                    }
                    var firstMenu = jq("nav").get();
                    if(firstMenu){
                        that.defaultMenu = jq(firstMenu).children();
                        that.updateSideMenu(that.defaultMenu);
                    }
                    that.defaultHeader = jq("#header").children();
                    jq(document).trigger("jq.ui.ready");
                    jq("#splashscreen").remove();
                    jq("#navbar").on("click", "a", function(e) {
                        jq("#navbar a").not(this).removeClass("selected");
                        setTimeout(function() {
                            $(e.target).addClass("selected");
                        }, 10);
                    });
                }