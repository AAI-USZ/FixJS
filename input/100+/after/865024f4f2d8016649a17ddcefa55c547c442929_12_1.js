function() {
            this._element.classList.add("montage-Toggle");
            this._toggle = document.createElement('div');
            this._scroll = document.createElement('div');
            this._circle = document.createElement('div');
            this._handlerBg = document.createElement('div');
            this._handler = document.createElement('div');
            this._handlerOnBg = document.createElement('div');
            this._handlerOn = document.createElement('div');
            this._handlerDragArea = document.createElement('div');
            this._toggle.className = "toggle";
            this._scroll.className = "scroll";
            this._circle.className = "circle";
            this._handlerBg.className = "handlerbg";
            this._handler.className = "handler";
            this._handlerOnBg.className = "handleronbg";
            this._handlerOn.className = "handleron";
            this._handlerDragArea.className = "handlerdragarea";
            this._element.appendChild(this._toggle);
            this._toggle.appendChild(this._scroll);
            this._scroll.appendChild(this._handlerBg);
            this._handlerBg.appendChild(this._circle);
            this._handlerBg.appendChild(this._handler);
            this._handlerBg.appendChild(this._handlerOnBg);
            this._handlerBg.appendChild(this._handlerDragArea);
            this._handlerOnBg.appendChild(this._handlerOn);
            this._toggle.style.width = (this._width + 20) + "px";

            this._scrollTo = this._value ? this._width : 0;
        }