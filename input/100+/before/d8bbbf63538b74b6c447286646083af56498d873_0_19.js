function() {
            var context = this.getContext();
            context.beginPath();
            if(this.attrs.cornerRadius === 0) {
                // simple rect - don't bother doing all that complicated maths stuff.
                context.rect(0, 0, this.attrs.width, this.attrs.height);
            }
            else {
                // arcTo would be nicer, but browser support is patchy (Opera)
                context.moveTo(this.attrs.cornerRadius, 0);
                context.lineTo(this.attrs.width - this.attrs.cornerRadius, 0);
                context.arc(this.attrs.width - this.attrs.cornerRadius, this.attrs.cornerRadius, this.attrs.cornerRadius, Math.PI * 3 / 2, 0, false);
                context.lineTo(this.attrs.width, this.attrs.height - this.attrs.cornerRadius);
                context.arc(this.attrs.width - this.attrs.cornerRadius, this.attrs.height - this.attrs.cornerRadius, this.attrs.cornerRadius, 0, Math.PI / 2, false);
                context.lineTo(this.attrs.cornerRadius, this.attrs.height);
                context.arc(this.attrs.cornerRadius, this.attrs.height - this.attrs.cornerRadius, this.attrs.cornerRadius, Math.PI / 2, Math.PI, false);
                context.lineTo(0, this.attrs.cornerRadius);
                context.arc(this.attrs.cornerRadius, this.attrs.cornerRadius, this.attrs.cornerRadius, Math.PI, Math.PI * 3 / 2, false);
            }
            context.closePath();

            this.fill();
            this.stroke();
        }