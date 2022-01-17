function() {
                this.appendChild(frag);
                this.addEventListener ('click', pv.SvgScene.dispatch, true);
                this.addEventListener ('mousedown', pv.SvgScene.dispatch, true);
                this.addEventListener ('mouseup', pv.SvgScene.dispatch, true);
                this.addEventListener ('mouseout', pv.SvgScene.dispatch, true);
                this.addEventListener ('mouseover', pv.SvgScene.dispatch, true);
                this.addEventListener ('mousemove', pv.SvgScene.dispatch, true);
                scenes.$g = this;
            }