function() {

            // скорость в px/ms
            this._touch.speed = this._touch.shiftXAbs / (Date.now() - this._touch.t1);
            // ускорение
            if (this._perScreen) {
                // в поэкранном слайдере нет ускорения
                this._touch.accel = 1;
            } else {
                this._touch.accel = this._touch.speed > 0.3 && this._touch.speed < 0.6 ? 2 :
                                this._touch.speed >= 0.6 && this._touch.speed < 1 ? 3 :
                                this._touch.speed >= 1 ? 4 :
                                1;
            }
            // время анимации
            if (ua.landscape) {
                this._touch.animationTime = this._touch.accel >= 3 ? '.3' : '.4';
            } else {
                this._touch.animationTime = this._touch.accel >= 3 ? '.2' : '.3';
            }
            // собственно css-анимация
            transition = 'all ' + this._touch.animationTime + 's ease-out';

            //alert(this._touch.shiftXAbs);
            // если слайд преодолел порог
            if (this._touch.shiftXAbs >= this._options.threshold) {
                // слайд длиной больше одного шага
                if (this._touch.shiftXAbs > this._step) {
                    this._currentX += ~~(this._touch.shiftX / this._step) * this._step;
                }

                // слайд вправо
                if (this._touch.shiftX > 0) {
                    this._currentX += this._step * this._touch.accel;

                    // левый предел
                    if (this._currentX > 0) {
                        this._currentX = 0;
                        this.trigger('limitLeft');
                    }

                    // индекс текущего экрана
                    if (this._perScreen && this._index >= 1) {
                        this._index--;
                    }
                // слайд влево
                } else if (this._touch.shiftX < 0) {
                    this._currentX -= this._step * this._touch.accel;

                    // правый предел
                    if (this._currentX < this._limitX) {
                        this._currentX = this._limitX;
                        this.trigger('limitRight');
                    }

                    // индекс текущего экрана
                    if (this._perScreen && this._index <= this._count) {
                        this._index++;
                    }
                }

            }

            this._doAnimation();

        }