function (e) {
            //
            if (!this._popupGradientChipBtn) return;
            //
            var ctx,
                cvs = this._popupGradientChipBtn.getElementsByTagName('canvas')[0],
                rgb = this._popupGradientChipBase.colorManager.rgb,
                hsl = this._popupGradientChipBase.colorManager.hsl,
                alpha = this._popupGradientChipBase.colorManager.alpha.value || this._popupGradientChipBase.colorManager.alpha;
            //
            this._popupGradientChipBase._components.hex.value = this._popupGradientChipBase.colorManager.hex;
            //
            if (cvs) {
                ctx = cvs.getContext('2d');
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#666";
                ctx.moveTo(0, 0);
                ctx.lineTo(cvs.width, 0);
                ctx.lineTo(cvs.width, cvs.height);
                ctx.lineTo(0, cvs.height);
                ctx.lineTo(0, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#333";
                ctx.moveTo(2, 2);
                ctx.lineTo(cvs.width-2, 2);
                ctx.lineTo(cvs.width-2, cvs.height-2);
                ctx.lineTo(2, cvs.height-2);
                ctx.lineTo(2, 1);
                ctx.stroke();
            }
            //
            if (rgb) {
                if (alpha) {
                    this._popupGradientChipBtn.color('rgb', {r: rgb.r, g: rgb.g, b: rgb.b, a: alpha, css: 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+alpha+')'});
                } else {
                    this._popupGradientChipBtn.color('rgb', {r: rgb.r, g: rgb.g, b: rgb.b, a: 1, css: 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 1)'});
                }
            } else {
                if (alpha) {
                    this._popupGradientChipBtn.color('rgb', {r: 255, g: 255, b: 255, a: alpha, css: 'rgba(255, 255, 255, '+alpha+')'});
                } else {
                    this._popupGradientChipBtn.color('rgb', {r: 255, g: 255, b: 255, a: 1, css: 'rgba(255, 255, 255, 1)'});
                }
            }
        }