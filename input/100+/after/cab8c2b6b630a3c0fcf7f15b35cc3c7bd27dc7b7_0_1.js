function PostsTab(selector) {
          var _this = this;
          this.tab = $metabox.find(selector);
          this.params = {
            subaction: 'search',
            s: ''
          };
          this.init_pagination_data();
          this.tab.delegate('.p2p-prev, .p2p-next', 'click', function(ev) {
            return _this.change_page(ev.target);
          });
        }