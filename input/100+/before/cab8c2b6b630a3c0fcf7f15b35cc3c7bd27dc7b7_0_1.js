function() {

        PostsTab.name = 'PostsTab';

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

        PostsTab.prototype.init_pagination_data = function() {
          this.params.paged = this.tab.find('.p2p-current').data('num') || 1;
          return this.total_pages = this.tab.find('.p2p-total').data('num') || 1;
        };

        PostsTab.prototype.change_page = function(button) {
          var $navButton, new_page;
          $navButton = jQuery(button);
          new_page = this.params.paged;
          if ($navButton.hasClass('inactive')) {
            return;
          }
          if ($navButton.hasClass('p2p-prev')) {
            new_page--;
          } else {
            new_page++;
          }
          $spinner.appendTo(this.tab.find('.p2p-navigation'));
          return this.find_posts(new_page);
        };

        PostsTab.prototype.find_posts = function(new_page) {
          var _this = this;
          if ((0 < new_page && new_page <= this.total_pages)) {
            this.params.paged = new_page;
          }
          return ajax_request(this.params, function(response) {
            return _this.update_rows(response);
          }, 'GET');
        };

        PostsTab.prototype.update_rows = function(response) {
          $spinner.remove();
          this.tab.find('button, .p2p-results, .p2p-navigation, .p2p-notice').remove();
          this.tab.append(response.rows);
          return this.init_pagination_data();
        };

        return PostsTab;

      }