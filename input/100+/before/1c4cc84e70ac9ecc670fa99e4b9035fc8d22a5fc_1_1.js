function () {
          self.curScrollTop = priv.scrollable[0].scrollTop;
          self.curScrollLeft = priv.scrollable[0].scrollLeft;

          if (self.blockedRows && self.curScrollTop !== self.lastScrollTop) {
            self.blockedRows.refreshBorders();
            self.blockedRows.main[0].style.top = self.curScrollTop + 'px';
          }

          if (self.blockedCols && self.curScrollLeft !== self.lastScrollLeft) {
            self.blockedCols.refreshBorders();
            self.blockedCols.main[0].style.left = self.curScrollLeft + 'px';
          }

          if (priv.cornerHeader && (self.curScrollTop !== self.lastScrollTop || self.curScrollLeft !== self.lastScrollLeft)) {
            if (self.curScrollTop === 0 && self.curScrollLeft === 0) {
              priv.cornerHeader.find('th').css({borderBottomWidth: 0, borderRightWidth: 0});
            }
            else if (self.lastScrollTop === 0 && self.lastScrollLeft === 0) {
              priv.cornerHeader.find('th').css({borderBottomWidth: '1px', borderRightWidth: '1px'});
            }
            priv.cornerHeader[0].style.top = self.curScrollTop + 'px';
            priv.cornerHeader[0].style.left = self.curScrollLeft + 'px';
          }

          self.lastScrollTop = self.curScrollTop;
          self.lastScrollLeft = self.curScrollLeft;
        }