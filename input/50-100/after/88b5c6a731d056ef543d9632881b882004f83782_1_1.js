function(event) {
                    // highlight the polygon and show the street name label
                    // for the segment we're entering
                    //if(this.poly != null) this.poly.animate({fill: "rgb(80, 200, 120)"}, 300);
                    this.animate({'fill-opacity': .25}, 300);
                    this.labelBG.animate({opacity: 1}, 300);
                    this.labelFG.animate({opacity: 1}, 300);
                    this_.currentMouseRect = this;
                }