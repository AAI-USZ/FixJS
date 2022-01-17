function() {
                var that=this;
                this.activeSheet.off("click","a",function(){that.hideSheet()});
                $(this.el).find("#jq_action_mask").remove();
                this.activeSheet.get().style.webkitTransition="all 0ms";
                var markup = this.activeSheet;
                var theEl = this.el;
                setTimeout(function(){
                    
                	markup.get().style.webkitTransition="all 500ms";
                	markup.css("-webkit-transform", "translate3d(0,"+(window.innerHeight*2) + "px,0)");
                	setTimeout(function(){
		                markup.remove();
		                markup=null;
		                theEl.style.overflow = "none";
	                },500);
                },10);            
            }