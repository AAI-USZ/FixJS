function() {
                
                var 
                    // the node's computed styles
                    styles = domStyle.getComputedStyle(this._node),
                    
                    // the calculated CSS property value
                    value;
                
                // store up the initial styles
                this._styles = { };
                
                // calculate begin and end values for all property cases
                switch (this.property) {
                    
                    case "top":
                    case "bottom":
                    case "left":
                    case "right":
                        
                        // the node's position should be not be "static"
                        if (styles["position"] === "static") {
                            
                            this._styles["position"] = styles["position"];
                            domStyle.set(this._node, "position", "relative");
                        }
                        
                        // calculate the begin and end values
                        value = parseInt(styles[this.property]);
                        if (this.begin === null) {
                            this.begin = isNaN(value) ? 0 : value;
                        }
                        if (this.end === null) {
                            this.end = isNaN(value) ? 0 : value;
                        }
                        
                        break;
                    
                    case "rotate":
                        
                        // set begin and end defaults
                        if (this.begin === null) {
                            this.begin = 0;
                        }
                        if (this.end === null) {
                            this.end = 0;
                        }
                        
                        break;
                    
                    case "zoom":
                    case "scale":
                    case "letter-spacing":
                        
                        // set begin and end defaults
                        if (this.begin === null) {
                            this.begin = 1;
                        }
                        if (this.end === null) {
                            this.end = 1;
                        }
                        
                        break;
                    
                    default:
                        
                        // calculate the begin and end values
                        value = parseInt(styles[this.property]);
                        if (this.begin === null) {
                            this.begin = isNaN(value) ? 0 : value;
                        }
                        if (this.end === null) {
                            this.end = isNaN(value) ? 0 : value;
                        }
                        
                        break;
                }
            }