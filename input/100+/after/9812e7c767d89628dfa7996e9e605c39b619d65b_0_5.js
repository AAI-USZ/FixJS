function(listen, notify) {
    // 输出文档。
    notify('reference.build');

    // 点击 API 条目，进入细节页的对应位置。
    $content.on('click:relay(a)', function() {
      notify('details.show');
      var href = this.href;
      var id = href.slice(href.indexOf('#'));
      var $target = $(id);
      var scrollTop = $deatilsPanel.scrollTop;
      var top = $target.getClientRect().top + scrollTop;
      new Animation().addClip(Fx.base(function(x, y) {
        $deatilsPanel.scrollTop = scrollTop + ((top - 50) - scrollTop) * y;
      }), 0, 200, 'easeInOut')
          .on('playfinish', function() {
            $target.getFirst().highlight()
          })
          .play();
      return false;
    });

    // 如果指定了 hash，则直达细节页的对应位置。
//    if (location.hash) {
//      notify('details.show');
//      var $target = document.$(location.hash);
//      if ($target) {
//        $target.scrollIntoView();
//      }
//    }

    // 是否在索引页显示短描述。
    function showShortDescription(show) {
      $content[show ? 'addClass' : 'removeClass']('show_short_description');
    }

    var $shortDescription = $('#short_description').on('change', function() {
      showShortDescription(this.checked);
      localStorage.setItem('showShortDescription', this.checked);
    });

    if (localStorage.getItem('showShortDescription') === 'true') {
      showShortDescription(true);
      $shortDescription.checked = true;
    }

    // 代码高亮。
    prettyPrint();

  }