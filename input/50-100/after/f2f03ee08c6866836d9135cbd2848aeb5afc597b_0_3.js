function() {
        this._initInput();
        //在setup模式下，原生select也需要reset。By Dengping
        if (this.select) {
            var index = this._options.originIndex == -1 ? 0 : this._options.originIndex;
            this.select.options[index].selected = true;
        }
    }