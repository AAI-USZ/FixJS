function(node) {
                
                this._node = node;
                
                // sanity check
                if (this._node === null || this._node === undefined) {
                    
                    throw new Error("You must pass a DOM node to the Block constructor.");
                }
                
                var 
                    styles = domStyle.getComputedStyle(this._node),
                    style;
                
                
                // set up the animations array
                this._animations = [];
                
                
                // store the original styles that we may modify, parsing 
                // numerical values as needed
                this._styles = { };
                
                this._styles["display"] = styles["display"];
                this._styles["position"] = styles["position"];
                
                style = styles["margin-top"];
                style = parseInt(style);
                this._styles["margin-top"] = isNaN(style) ? 0 : style;
                
                style = styles["margin-bottom"];
                style = parseInt(style);
                this._styles["margin-bottom"] = isNaN(style) ? 0 : style;
                
                // the node's display should be "inline-block"
                // so that margin collapsing is turned off
                if (this._styles["display"] !== "inline-block") {
                    
                    domStyle.set(this._node, "display", "inline-block");
                }
                
                // the node's position should not be "static"
                if (this._styles["position"] === "static") {
                    
                    domStyle.set(this._node, "position", "relative");
                }
            }