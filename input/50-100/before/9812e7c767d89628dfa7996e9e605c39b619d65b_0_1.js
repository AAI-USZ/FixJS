function() {
          $html.setStyle('overflow', '');
          // 取消事件绑定。
          $html.off('keydown.deatilsPanel, mousedown.deatilsPanel');
          window.off('resize.deatilsPanel');
        }