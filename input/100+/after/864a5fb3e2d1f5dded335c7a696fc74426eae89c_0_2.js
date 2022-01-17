function () {
        if (cc.renderContextType == cc.CANVAS) {
            var size = this.getContentSize();
            switch (this._type) {
                case cc.CCPROGRESS_TIMER_TYPE_RADIAL_CW:
                    this._endAngle = 270 + 3.6 * this._percentage;
                    break;
                case cc.CCPROGRESS_TIMER_RADIAL_CCW:
                    this._startAngle = 270 - 3.6 * this._percentage;
                    break;
                case cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_LR:
                    //left to right
                    this._origin = cc.PointZero();
                    this._drawPosition = cc.PointZero();
                    this._drawSize = cc.SizeMake(0 | ((this._percentage / 100) * size.width), size.height);
                    break;
                case cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_RL:
                    //right to left
                    this._drawSize = cc.SizeMake(0 | ((this._percentage / 100) * size.width), size.height);
                    this._origin = cc.ccp((size.width - this._drawSize.width) | 0, 0);
                    this._drawPosition = cc.ccp(size.width - this._drawSize.width, 0);
                    break;
                case cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_BT:
                    //buttom to top
                    this._drawSize = cc.SizeMake(size.width, 0 | ((this._percentage / 100) * size.height));
                    this._drawPosition = cc.PointZero();
                    this._origin = cc.ccp(0, 0 | (size.height - this._drawSize.height));
                    break;
                case cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_TB:
                    //top to buttom
                    this._drawSize = cc.SizeMake(size.width, 0 | ((this._percentage / 100) * size.height));
                    this._drawPosition = cc.ccp(0, (size.height - this._drawSize.height) | 0);
                    this._origin = cc.ccp(0, 0);
                    break;
            }
        } else {
            switch (this._type) {
                case cc.CCPROGRESS_TIMER_TYPE_RADIAL_CW:
                case cc.CCPROGRESS_TIMER_RADIAL_CCW:
                    this._updateRadial();
                    break;
                case cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_LR:
                case cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_RL:
                case cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_BT:
                case cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_TB:
                    this._updateBar();
                    break;
                default:
                    break;
            }
        }
    }