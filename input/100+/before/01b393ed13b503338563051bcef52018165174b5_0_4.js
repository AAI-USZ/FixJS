function(e) {
            e.stop();
            e.preventDefault();
            // TODO: fix bug that triggers when opening list with the enter key
            var oUL = this.list,
                aUL = $$("select[style] + div." + this.options.cssClass + " > ul.root"),
                aParentCheck = [],
                fnHasFixedParent = function() {
                    var aParents = oUL.getParents("*:not(body):not(html)"),
                        aFiltered = aParents.filter(function(oEl) {
                            return oEl.getStyle("position") === "fixed";
                        });
                    return !!aFiltered.length;
                };
            if (oUL.hasClass(this.oCss.e)) {
                aUL.removeClass(this.oCss.e);
                this.list.removeProperty("style");
                document.removeEvent("keydown", this.fnNavigate);
            } else {
                var oLI = oUL.getElement("li." + this.oCss.c)||oUL.getElement("li:first-child"),
                    iWindowHeight = window.getSize().y,
                    iWindowScroll = window.getScrollSize().y,
                    bAnchoredBottom = false;
                this._fnAlterClass(oLI, oUL.getElements("li"), this.oCss.h);
                this._fnAlterClass(oUL, aUL, this.oCss.e);
                var oCoords = oUL.getCoordinates();
                if (oCoords.top + oCoords.height > (fnHasFixedParent()?iWindowHeight:iWindowScroll)) {
                    oUL.addClass(this.oCss.b);
                    bAnchoredBottom = !bAnchoredBottom;
                }
                oUL.setStyle("max-height", iWindowHeight - (iWindowHeight - (bAnchoredBottom?this.container.getCoordinates().top:this.container.getCoordinates().bottom)));
                document.addEvent("keydown", this.fnNavigate);
            }
        }