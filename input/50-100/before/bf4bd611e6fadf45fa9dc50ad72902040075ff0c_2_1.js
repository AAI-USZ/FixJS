function() {
            var transitionStopRule;
//            this.stage.hideCanvas(this.appModel.livePreview);

            if(this.appModel.livePreview) {
                transitionStopRule = "nj-css-garbage-selector";
                this.stage.bindingView.hide = true;
            } else {
                transitionStopRule = "*"
                this.stage.bindingView.hide = false;
            }

            this.application.ninja.stylesController._stageStylesheet.rules[0].selectorText = transitionStopRule;

            this._toggleWebGlAnimation(this.appModel.livePreview);
        }