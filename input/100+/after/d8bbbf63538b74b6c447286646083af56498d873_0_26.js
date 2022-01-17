function(context) {
            /*
             * draw rect
             */
            context.beginPath();
            var boxWidth = this.getBoxWidth();
            var boxHeight = this.getBoxHeight();

            if(this.attrs.cornerRadius === 0) {
                // simple rect - don't bother doing all that complicated maths stuff.
                context.rect(0, 0, boxWidth, boxHeight);
            }
            else {
                // arcTo would be nicer, but browser support is patchy (Opera)
                context.moveTo(this.attrs.cornerRadius, 0);
                context.lineTo(boxWidth - this.attrs.cornerRadius, 0);
                context.arc(boxWidth - this.attrs.cornerRadius, this.attrs.cornerRadius, this.attrs.cornerRadius, Math.PI * 3 / 2, 0, false);
                context.lineTo(boxWidth, boxHeight - this.attrs.cornerRadius);
                context.arc(boxWidth - this.attrs.cornerRadius, boxHeight - this.attrs.cornerRadius, this.attrs.cornerRadius, 0, Math.PI / 2, false);
                context.lineTo(this.attrs.cornerRadius, boxHeight);
                context.arc(this.attrs.cornerRadius, boxHeight - this.attrs.cornerRadius, this.attrs.cornerRadius, Math.PI / 2, Math.PI, false);
                context.lineTo(0, this.attrs.cornerRadius);
                context.arc(this.attrs.cornerRadius, this.attrs.cornerRadius, this.attrs.cornerRadius, Math.PI, Math.PI * 3 / 2, false);
            }
            context.closePath();

            this.fill(context);
            this.stroke(context);
            /*
             * draw text
             */
            var p = this.attrs.padding;
            var lineHeightPx = this.attrs.lineHeight * this.getTextHeight();
            var textArr = this.textArr;

            context.font = this.attrs.fontStyle + ' ' + this.attrs.fontSize + 'pt ' + this.attrs.fontFamily;
            context.textBaseline = 'middle';
            context.textAlign = 'left';
            context.save();
            context.translate(p, 0);
            context.translate(0, p + this.getTextHeight() / 2);

            // draw text lines
            for(var n = 0; n < textArr.length; n++) {
                var text = textArr[n];

                // horizontal alignment
                context.save();
                if(this.attrs.align === 'right') {
                    context.translate(this.getBoxWidth() - this._getTextSize(text).width - p * 2, 0);
                }
                else if(this.attrs.align === 'center') {
                    context.translate((this.getBoxWidth() - this._getTextSize(text).width - p * 2) / 2, 0);
                }

                this.fillText(context, text);
                this.strokeText(context, text);
                context.restore();

                context.translate(0, lineHeightPx);
            }
            context.restore();
        }