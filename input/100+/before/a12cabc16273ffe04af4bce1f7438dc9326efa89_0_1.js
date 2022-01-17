function() {
			// Which tweener should we show?
			// First, get the appropriate editor type from the data structure.
			var tweenable = {},
				i = 0;

			tweenable.tweener = "input";

			for (i = 0; i < this._myTweenables.length; i++) {
				if (this._myTweenables[i].property === this.editorProperty) {
					tweenable = this._myTweenables[i];
				}
			}

			if (tweenable.tweener === "hottext" ) {
				this.editorInputContainer.classList.add("hidden");
				this.editorColorContainer.classList.add("hidden");
				this.editorHottextContainer.classList.remove("hidden");
				this.valueEditorHottext.acceptableUnits = [tweenable.units];
				this.valueEditorHottext.units = tweenable.units;
				this.valueEditorHottext.minValue = tweenable.min;
				this.valueEditorHottext.maxValue = tweenable.max;
                this.valueEditorHottext.identifier="hottext";
                el = this._parentLayerComponent.layerData.stageElement;
                this.editorValue = parseFloat(ElementsMediator.getProperty(el, this.editorProperty));
                this.valueEditorHottext.value = this.editorValue
                this.valueEditorHottext.addEventListener("change",this,false);
                this.valueEditorHottext.addEventListener("changing",this,false);
				this.valueEditorHottext.needsDraw = true;
			} else if (tweenable.tweener === "color" ) {
				this.editorInputContainer.classList.add("hidden");
				this.editorColorContainer.classList.remove("hidden");
				this.editorHottextContainer.classList.add("hidden");

                if(tweenable.colorType === "fill"){
                    this._isFill = true;
                }else{
                    if(tweenable.colorType === "stroke"){
                        this._isFill = false;
                        this._borderSide = tweenable.strokePosition
                    }
                }
                if (this.addedColorChips === false && this.application.ninja.colorController.colorPanelDrawn) {
                    // setup fill color
                    this._fillColorCtrl.props = { side: 'top', align: 'center', wheel: true, palette: true, gradient: false, image: false, nocolor: true, offset: -80 };
                    this.application.ninja.colorController.addButton("chip", this._fillColorCtrl);
                    this.colorelement = this._fillColorCtrl;
                    var currentValue = ElementsMediator.getColor(this._parentLayerComponent.layerData.stageElement,this._isFill,this._borderSide)
                    this.application.ninja.timeline.selectedStyle = this.editorProperty;
                    this._fillColorCtrl.addEventListener("change", this.handleFillColorChange.bind(this), false);
                    if(currentValue){
                        this._fillColorCtrl.color(currentValue.colorMode, currentValue.color);
                        this.addedColorChips = true;
                    }
                }
				// TODO: set up color chip here.
			} else if (tweenable.tweener === "input"){
				this.editorInputContainer.classList.remove("hidden");
				this.editorColorContainer.classList.add("hidden");
				this.editorHottextContainer.classList.add("hidden");
				this.valueEditorInput.value = this.editorValue;
                this.valueEditorInput.addEventListener("blur",this,false);
			} else {
				this.log("Warning: unknown tweenable -"+tweenable.tweener+"- specified in style.js.")
			}
		}