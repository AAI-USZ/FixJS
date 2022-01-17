function() {
                var that=this;
                this.activeSheet.off("click","a",function(){that.hideSheet()});
                this.activeSheet.remove();
                this.activeSheet=null;
                this.el.style.overflow = "none";
            }