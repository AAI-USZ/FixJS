function (e) {
            if (e._target._element.className === 'cpp_popup') {
                e._target.removeEventListener('firstDraw', this, false);
                //Creating an instance of the popup and sending in created color popup content
                e._target.popup = this.application.ninja.popupManager.createPopup(e._target.element, {x: e._target.props.x, y: e._target.props.y}, {side: e._target.props.side, align: e._target.props.align});
                //Displaying popup once it's drawn
                e._target.popup.addEventListener('firstDraw', this, false);
                //Hiding popup while it draws
                e._target.popup.element.style.opacity = 0;
                //Storing popup for use when closing
                e._target.popup.base = e._target;
            } else if (e._target._element.className === 'default_popup' && e._target._content.className === 'cpp_popup') {
                if (!e._target.base.isPopupChip) {
                    this._colorPopupDrawing = false;
                } else  if (e._target.base.props && e._target.base.props.gradientPopup) {
                    this._colorGradientPopupDrawing = false;
                } else {
                    this._colorChipPopupDrawing = false;
                }
                //
                e._target.base.popup.removeEventListener('firstDraw', this, false);
                //Fades in with CSS transition
                e._target.base.popup.element.style.opacity = 1;
                //Popup was added, so it's opened
                e._target.base.opened = true;
                //
                if (e._target.base.props && e._target.base.props.source) {
                    //
                    var cbtn = e._target.base.props.source, color, hsv;
                    //
                    if (cbtn.colorMode === 'rgb') {
                        //
                        if (cbtn.colorValue && !isNaN(cbtn.colorValue.r)) {
                            color = cbtn.colorValue;
                        } else if (cbtn.colorValue && cbtn.colorValue.color){
                            color = cbtn.colorValue.color;
                        } else {
                            return;
                        }
                        //
                        hsv = this.colorManager.rgbToHsv(color.r, color.g, color.b);
                    } else if (cbtn.colorMode === 'hsl') {
                        //
                        if (cbtn.colorValue && !isNaN(cbtn.colorValue.h)) {
                            color = cbtn.colorValue;
                        } else if (cbtn.colorValue && cbtn.colorValue.color){
                            color = cbtn.colorValue.color;
                        } else {
                            return;
                        }
                        //
                        color = this.colorManager.hslToRgb(color.h/360, color.s/100, color.l/100);
                        //
                        hsv = this.colorManager.rgbToHsv(color.r, color.g, color.b);
                    }
                    //
                    if (color && color.a && !e._target.base.props.panel) {
                        e._target.base.colorManager.alpha = color.a;
                        e._target.base._components.combo.slider.value = color.a*100;
                    } else if (!e._target.base.props.panel){
                        e._target.base._components.combo.slider.value = 100;
                    }
                    //
                    if (hsv) {
                        hsv.wasSetByCode = false;
                        hsv.type = 'change';
                        e._target.base._components.wheel.value = hsv;
                    } else {
                        e._target.base._components.hex.value = null;
                        e._target.base.colorManager.applyNoColor(false);
                    }
                }
            }
        }