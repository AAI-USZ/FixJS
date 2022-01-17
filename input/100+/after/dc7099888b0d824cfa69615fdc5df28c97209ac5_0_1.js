function(shiftX) {

            // время анимации
            this._touch.animationTime = ua.landscape ? '.3' : '.2';

            // собственно css-анимация
            transition = 'all ' + this._touch.animationTime + 's ease-out';

            this._currentX += shiftX;

            // слайд вправо
            if (shiftX > 0) {
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
            } else if (shiftX < 0) {
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

            this._doAnimation();

        }