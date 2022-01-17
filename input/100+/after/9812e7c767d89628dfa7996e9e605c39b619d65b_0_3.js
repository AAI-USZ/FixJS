function(listen, notify) {
//--------------------------------------------------[细节层]
    // 获取滚动条宽度。
    var scrollbarWidth = function() {
      var $outer = $('<div></div>').setStyles({position: 'absolute', top: 0, left: -10000, width: 100, height: 100, overflow: 'scroll'});
      var $inner = $('<div></div>').setStyles({height: 200});
      $(document.body).append($outer.append($inner));
      var width = 100 - $inner.offsetWidth;
      $outer.remove();
      return width;
    }();

    // 调整位置。
    var adjustDeatilsPanel = function() {
      var pinnedOffsetX = $content.getClientRect().left + 50;
      var clientSize = window.getClientSize();
      $deatilsPanel.setStyles({
        width: clientSize.width - pinnedOffsetX,
        height: clientSize.height
      });
      $detailsClose.setStyles({
        left: Math.max(710 - 20, clientSize.width - pinnedOffsetX - 55)
      });
      deatilsPanel.setOptions({offsetX: pinnedOffsetX});
    };
    // 使用对话框实现。
    var deatilsPanel = new Dialog($deatilsPanel, {
      maskStyles: {background: 'black', opacity: .05},
      offsetX: 0,
      offsetY: 0
    })
        .on('open',
        function() {
          // 按下 ESC 键或点击细节层外即关闭细节层。
          $html.on('keydown.deatilsPanel, mousedown.deatilsPanel', function(e) {
            if (e.isMouseEvent && !$deatilsPanel.contains(e.target) || e.which === 27) {
              detailsLayer.close();
            }
          });
          // 调整窗口尺寸的同时调整细节层的尺寸。
          window.on('resize.deatilsPanel', adjustDeatilsPanel);
        })
        .on('close',
        function() {
          if (!navigator.isIE6) {
            $header.setStyle('right', 0);
          }
          $html.setStyles({paddingRight: 0, overflow: ''});
          // 取消事件绑定。
          $html.off('keydown.deatilsPanel, mousedown.deatilsPanel');
          window.off('resize.deatilsPanel');
        });
    // 打开/关闭细节层，包裹对话框的方法。
    var detailsLayer = {
      open: function() {
        if (!this.isOpen) {
          this.isOpen = true;
          var offsetY = window.getPageOffset().y;
          if (!navigator.isIE6) {
            $header.setStyle('right', scrollbarWidth);
          }
          $html.setStyles({paddingRight: scrollbarWidth, overflow: 'hidden'});
          adjustDeatilsPanel();
          deatilsPanel.open();
          window.scrollTo(0, offsetY);
          // 打开时的向左移动的效果。
          var detailsPanelLeft = parseInt($deatilsPanel.getStyle('left'), 10);
          $deatilsPanel.setStyles({left: detailsPanelLeft + 30, opacity: 0}).morph({left: detailsPanelLeft, opacity: 1}, {duration: 150});
        }
      },
      close: function() {
        if (this.isOpen) {
          this.isOpen = false;
          // 关闭时的向右移动的效果。
          var detailsPanelLeft = parseInt($deatilsPanel.getStyle('left'), 10);
          $deatilsPanel.morph({left: detailsPanelLeft + 15, opacity: 0}, {transition: 'easeIn', duration: 150, onFinish: function() {
            var offsetY = window.getPageOffset().y;
            deatilsPanel.close();
            window.scrollTo(0, offsetY);
          }});
        }
      },
      isOpen: false
    };
    // 点击关闭按钮关闭细节层。
    $detailsClose.on('click', function() {
      detailsLayer.close();
      return false;
    });

//--------------------------------------------------[打开细节层]
    listen('show', function() {
      detailsLayer.open();
    });

  }