function() {
          if (!navigator.isIE6) {
            $header.setStyle('right', 0);
          }
          $html.setStyles({paddingRight: 0, overflow: ''});
          // 取消事件绑定。
          $html.off('keydown.deatilsPanel, mousedown.deatilsPanel');
          window.off('resize.deatilsPanel');
        }