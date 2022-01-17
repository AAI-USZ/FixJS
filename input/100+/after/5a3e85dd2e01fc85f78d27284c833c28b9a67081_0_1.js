function _show(entrance, tipInfo) {
        if (!tipInfo || !entrance) {
            return;
        }

        !_isInit && Control._init();
        
        // 阻止浮动层的隐藏
        if (_isShow) {
            _preventHide();
        }
        
        // 填入标题与内容
        baidu.g(BODY_ID).innerHTML = tipInfo.content;
        var title = tipInfo.title;
        if (title) {
            baidu.g(TITLE_ID).innerHTML = title;
            baidu.show(TITLE_ID);
        } else {
            baidu.hide(TITLE_ID);
        }
        
        // 预初始化各种变量
        var arrow       = tipInfo.arrow, // 1|tr|rt|rb|br|bl|lb|lt|tl
            closeBtn    = tipInfo.closeButton,
            pos         = baidu.dom.getPosition(entrance),
            mainLeft    = pos.left,
            mainTop     = pos.top,
            mainWidth   = entrance.offsetWidth,
            mainHeight  = entrance.offsetHeight,
            viewWidth   = baidu.page.getViewWidth(),
            viewHeight  = baidu.page.getViewHeight(),
            scrollLeft  = baidu.page.getScrollLeft(),
            scrollTop   = baidu.page.getScrollTop(),
            layerMain   = _layer.getMain(),
            closeMain   = ui.get(CLOSE_ID).getMain(),
            layerWidth  = layerMain.offsetWidth,
            layerHeight = layerMain.offsetHeight,
            offsetX     = 5,
            offsetY     = 0,
            temp        = 0,
            arrowClass  = ARROW_CLASS,
            layerLeft,
            layerTop,
            tLeft,
            tRight,
            tTop,
            tBottom,
            lLeft,
            lRight,
            lTop,
            lBottom;
        
        if ( !ui._hasValue( arrow ) ) {
            arrow = Control.ARROW;
        }

        if ( !ui._hasValue( closeBtn ) ) {
            closeBtn = Control.CLOSE_BUTTON;
        }
        closeMain.style.display = closeBtn ? '' : 'none';

        if (arrow) {
            temp = 1;
            arrow = String(arrow).toLowerCase();
            offsetX = 20;
            offsetY = 14;
            tLeft   = mainLeft + mainWidth - offsetX;
            tRight  = mainLeft + offsetX - layerWidth;
            tTop    = mainTop + mainHeight + offsetY;
            tBottom = mainTop - offsetY - layerHeight;
            lLeft   = mainLeft + mainWidth + offsetX;
            lTop    = mainTop + mainHeight - offsetY;
            lBottom = mainTop + offsetY - layerHeight;
            lRight  = mainLeft - offsetX - layerWidth;

            // 计算手工设置arrow时的位置
            switch (arrow) {
            case 'tr':
                layerLeft = tRight;
                layerTop = tTop;
                break;
            case 'tl':
                layerLeft = tLeft;
                layerTop = tTop;
                break;
            case 'bl':
                layerLeft = tLeft;
                layerTop = tBottom;
                break;
            case 'br':
                layerLeft = tRight;
                layerTop = tBottom;
                break;
            case 'lt':
                layerLeft = lLeft;
                layerTop = lTop;
                break;
            case 'lb':
                layerLeft = lLeft;
                layerTop = lBottom;
                break;
            case 'rb':
                layerLeft = lRight;
                layerTop = lBottom;
                break;
            case 'rt':
                layerLeft = lRight;
                layerTop = lTop;
                break;
            default:
                temp = 0;
                offsetX = - offsetX;
                break;
            }
        } 
        
        // 计算自适应的位置
        if (!temp) {
            layerTop = mainTop + mainHeight + offsetY;
            arrow && (arrow = 't');
            if (layerTop + layerHeight > viewHeight + scrollTop) {
                if ((temp = mainTop - offsetY - layerHeight) > 0) {
                    layerTop = temp;
                    arrow && (arrow = 'b');
                }
            }

            layerLeft = mainLeft + mainWidth + offsetX;
            arrow && (arrow += 'l');
            if (layerLeft + layerWidth > viewWidth + scrollLeft) {
                if ((temp = mainLeft - offsetX - layerWidth) > 0) {
                    layerLeft = temp;
                    arrow && (arrow = arrow.substr(0,1) + 'r');
                }
            }
        }
    
        arrow && (arrowClass += ' ' + ARROW_CLASS + '-' + arrow);
        baidu.g(ARROW_ID).className = arrowClass;
        
        // 绑定浮出层行为
        if (tipInfo.mode != 'auto') {
            layerMain.onmouseover = _preventHide;
            layerMain.onmouseout = _getHider(tipInfo.hideDelay);
        }

        // 显示提示层
        _isShow = true;
        _layer.show(layerLeft, layerTop);
    }