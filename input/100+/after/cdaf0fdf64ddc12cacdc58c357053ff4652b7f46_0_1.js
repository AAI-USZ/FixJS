function(data, silent) {
            if (this.application.ninja.colorController.colorPopupManager) {
                //Hiding any open popups (of gradient buttons)
                this.application.ninja.colorController.colorPopupManager.hideGradientChipPopup();
                //Creating stop elements
                var stop = document.createElement('div'),
                    holder = document.createElement('div'),
                    tooltip = document.createElement('span'),
                    button = document.createElement('button');
                //Setting up elements
                stop.appendChild(tooltip);
                stop.appendChild(holder);
                holder.appendChild(button);
                //Adding events to the stops
                stop.addEventListener('mousedown', this, false);
                stop.addEventListener('mouseup', this, false);
                //Storing refereces to buttons and actual stop container
                button.stop = stop;
                tooltip.stop = stop;
				holder.stop = stop;
				stop.stop = stop;
                stop.button = button;
                //Adding stop to container
                this.trackChips.appendChild(stop);
                //Checking for bounds to add stop
                if (data.percent >= 0 && data.percent <= 100) {
                    this.positionStop(stop, data.percent);
                    button.stopPosition = data.percent;
                }
                //Creating an instance of input chip
                this.application.ninja.colorController.addButton('chip', button);
                //Initialing button with color data
                button.color(data.color.mode, data.color.value);
                //Button popup data
                button.props = {side: 'top', align: 'center', nocolor: false, wheel: true, palette: false, gradient: false, image: false, offset: -84, gradientPopup: true, history: false};
                //Listening for color events from button
                button.addEventListener('change', this, false);
                //Dispatching event depending on type of mode
                if (!silent) {
                    this._dispatchEvent('change', false);
                } else {
                    this._dispatchEvent('change', true);
                }
                //
            } else {
                    //Handle Error
            }
        }