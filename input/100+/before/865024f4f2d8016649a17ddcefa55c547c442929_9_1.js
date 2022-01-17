function () {
            this.element.type = "checkbox";

            var checkbox = document.createElement("span");
            checkbox.className = this.element.className;
            checkbox.classList.add("montage-checkbox");

            this._background = document.createElement("span");
            this._background.classList.add("background");

            this._button = document.createElement("span");
            this._button.classList.add("button");

            this._checkmark = document.createElement("span");
            this._checkmark.classList.add("checkmark");

            this.element.parentNode.insertBefore(checkbox, this.element.nextSibling);

            var checkboxFragment = document.createDocumentFragment();
            checkboxFragment.appendChild(this._background);
            checkboxFragment.appendChild(this._button);
            checkboxFragment.appendChild(this._checkmark);
            checkboxFragment.appendChild(this.element);

            checkbox.appendChild(checkboxFragment);

            // Make sure this.element refers to the logical parent element of this component
            this._nativeCheckbox = this.element;
            this.element = checkbox;
        }