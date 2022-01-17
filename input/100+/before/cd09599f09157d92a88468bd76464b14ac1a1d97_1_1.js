function () {
          if (_config.bindTo) {
            var width = _item.width() ? _item.width() : 280;
            var height = _item.height() ? _item.height() : 109;

            _bind_target = jQuery(_config.bindTo);
            var trgt_w = _bind_target.outerWidth();
            var trgt_h = _bind_target.outerHeight();
            var trgt_l = _bind_target.offset().left;
            var trgt_t = _bind_target.offset().top;

            switch (_config.gravity) {
            case 'TL':
              properties = {
                'left': trgt_l,
                'top': trgt_t + trgt_h + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_TL');
              break;
            case 'TR':
              properties = {
                'left': trgt_l + trgt_w - width + 'px',
                'top': trgt_t + trgt_h + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_TR');
              break;
            case 'BL':
              properties = {
                'left': trgt_l + 'px',
                'top': trgt_t - height + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_BL');
              break;
            case 'BR':
              properties = {
                'left': trgt_l + trgt_w - width + 'px',
                'top': trgt_t - height + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_BR');
              break;
            case 'LT':
              properties = {
                'left': trgt_l + trgt_w + 'px',
                'top': trgt_t + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_LT');
              break;
            case 'LB':
              properties = {
                'left': trgt_l + trgt_w + 'px',
                'top': trgt_t + trgt_h - height + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_LB');
              break;
            case 'RT':
              properties = {
                'left': trgt_l - width + 'px',
                'top': trgt_t + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_RT');
              break;
            case 'RB':
              properties = {
                'left': trgt_l - width + 'px',
                'top': trgt_t + trgt_h - height + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_RB');
              break;
            case 'T':
              properties = {
                'left': trgt_l + trgt_w / 2 - width / 2 + 'px',
                'top': trgt_t + trgt_h + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_T');
              break;
            case 'R':
              properties = {
                'left': trgt_l - width + 'px',
                'top': trgt_t + trgt_h / 2 - height / 2 + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_R');
              break;
            case 'B':
              properties = {
                'left': trgt_l + trgt_w / 2 - width / 2 + 'px',
                'top': trgt_t - height + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_B');
              break;
            case 'L':
              properties = {
                'left': trgt_l + trgt_w + 'px',
                'top': trgt_t + trgt_h / 2 - height / 2 + 'px'
              };
              _item.find('.' + _classes.item.arrow).addClass(_classes.item.arrow + '_L');
              break;
            }

            properties.position = 'absolute';
            _item.css(properties);

            return;
          }

          if (!_config.position) {
            _config.position = 'top right';
          }

          var marginTop = jQuery('.create-ui-toolbar-wrapper').outerHeight(true) + 6;
          pos = {
            position: 'fixed'
          };

          var activeHeight = function (items) {
            var total_height = 0;
            jQuery.each(items, function (i, item) {
              if (!item) {
                return;
              }
              total_height += item.getElement().height();
            });
            return total_height;
          };

          if (_config.position.match(/top/)) {
            pos.top = marginTop + activeHeight(_midgardnotifications_active) + 'px';
          }
          if (_config.position.match(/bottom/)) {
            pos.bottom = (_midgardnotifications_active.length - 1 * item.height()) + item.height() + 10 + 'px';
          }
          if (_config.position.match(/right/)) {
            pos.right = 20 + 'px';
          }
          if (_config.position.match(/left/)) {
            pos.left = 20 + 'px';
          }

          _item.css(pos);
        }