function(clientId, rolloverClass,

                  containerClass, rolloverContainerClass, borderClass, loadingMode, focusable, focusedClass,

                  onselectionchange) {

    var tabbedPane = O$.initComponent(clientId, null, {

      _tabSet: O$(clientId + "--tabSet")

    });

    O$.MultiPage._init(clientId, rolloverClass, containerClass, loadingMode,

            tabbedPane._tabSet.getTabCount(), tabbedPane._tabSet.getSelectedIndex());



    O$.extend(tabbedPane, {

      _rolloverContainerClass: rolloverContainerClass,

      onselectionchange: onselectionchange,



      getSelectedIndex: function () {

        return tabbedPane._tabSet.getSelectedIndex();

      },



      setSelectedIndex: function(index) {

        tabbedPane._tabSet.setSelectedIndex(index);

      }



    });



    tabbedPane._tabSet.onchange = function (evt) {

      var tabbedPane = this._tabbedPane;

      if (tabbedPane.onselectionchange) {

        if (tabbedPane.onselectionchange(evt) === false || evt.returnValue === false)

          return false;

      }

      tabbedPane.doSetSelectedIndex(evt._absoluteIndex);

    };



    tabbedPane._tabSet._tabbedPane = tabbedPane;



    if (focusable) {

      tabbedPane.focus = function () {

        this._tabSet.focus();

      };

      tabbedPane.blur = function () {

        this._tabSet.blur();

      };

      O$.addEventHandler(tabbedPane, "click", function (evt) {

        if (tabbedPane._tabSet.onclick)

          tabbedPane._tabSet.onclick(evt);

        if (window.getSelection) {

          if (window.getSelection() != "")

            return; // don't switch focus to make text selection possible under FF (JSFC-1134)

        }

        var e = evt ? evt : event;

        if (tabbedPane._focused)

          return;



        var target = (e != null)

                ? (e.target ? e.target : e.srcElement)

                : null;

        if (O$.isControlFocusable(target))

          return;

        tabbedPane._tabSet._preventPageScrolling = true;

        tabbedPane._tabSet.focus();

        tabbedPane._tabSet._preventPageScrolling = false;

      });

      O$.addEventHandler(tabbedPane._tabSet, "focus", function () {

        O$.setStyleMappings(tabbedPane, {

          focused: focusedClass

        });

      });



      O$.addEventHandler(tabbedPane._tabSet, "blur", function () {

        O$.setStyleMappings(tabbedPane, {

          focused: null

        });

      });



    }



    tabbedPane._pagesContainer.className = borderClass;



    // setup methods

    O$.assignEventHandlerField(tabbedPane, "onmouseover", function (evt) {

      if (this._tabSet._tabs) {

        var tab = this._tabSet._getTabByAbsoluteIndex(tabbedPane._tabSet._index);

        tab._tabbedPaneCall = true;

        tab.onmouseover(evt);

      }

    });

    O$.assignEventHandlerField(tabbedPane, "onmouseout", function (evt) {

      if (this._tabSet._tabs) {

        var tab = this._tabSet._getTabByAbsoluteIndex(tabbedPane._tabSet._index);

        tab._tabbedPaneCall = true;

        tab.onmouseout(evt);

      }

    });



  }