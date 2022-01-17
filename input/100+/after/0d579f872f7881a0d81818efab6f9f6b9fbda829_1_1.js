function(clientId, rolloverClass,

                  containerClass, rolloverContainerClass, borderClass, loadingMode, focusable, focusedClass,

                  onselectionchange, mirrorTabSetSuffix) {

    var tabbedPane = O$.initComponent(clientId, null, {

      _tabSet: O$(clientId + "--tabSet"),

      _mirrorTabSet:(mirrorTabSetSuffix) ? O$(clientId + "--tabSet" + mirrorTabSetSuffix) : null

    });



    // This allow server to use only _indexField of original TabSet.

    if (tabbedPane._mirrorTabSet)

      tabbedPane._mirrorTabSet._indexField = O$(clientId + "--tabSet" + "::selected");

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

        if (tabbedPane._mirrorTabSet)

          tabbedPane._mirrorTabSet.setSelectedIndex(index);

      }



    });



    function onChangeHandler(secondTabSet) {

       return function (evt) {

         var tabbedPane = this._tabbedPane;

         if (tabbedPane.onselectionchange) {

           if (tabbedPane.onselectionchange(evt) === false || evt.returnValue === false)

             return false;

         }

         tabbedPane.doSetSelectedIndex(evt._absoluteIndex);

         if (secondTabSet) {

           secondTabSet.setSelectedIndex(evt._absoluteIndex, true);

           secondTabSet._refreshTabs();

         }

       }

    }



    tabbedPane._tabSet.onchange = onChangeHandler(tabbedPane._mirrorTabSet);

    if (tabbedPane._mirrorTabSet)

      tabbedPane._mirrorTabSet.onchange = onChangeHandler(tabbedPane._tabSet);



    tabbedPane._tabSet._tabbedPane = tabbedPane;

    if (tabbedPane._mirrorTabSet)

      tabbedPane._mirrorTabSet._tabbedPane = tabbedPane;



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



      function _addFocusEventHandler(tabSet) {

        O$.addEventHandler(tabSet, "focus", function () {

          O$.setStyleMappings(tabbedPane, {

            focused: focusedClass

          });

        });

      };

      function _addBlurEventHandler(tabSet) {

        O$.addEventHandler(tabSet, "blur", function () {

          O$.setStyleMappings(tabbedPane, {

            focused: null

          });

        })

      };



      _addFocusEventHandler(tabbedPane._tabSet);

      _addBlurEventHandler(tabbedPane._tabSet);



      if (tabbedPane._mirrorTabSet) {

        _addFocusEventHandler(tabbedPane._mirrorTabSet);

        _addBlurEventHandler(tabbedPane._mirrorTabSet);

      }



    }



    tabbedPane._pagesContainer.className = borderClass;



    // setup methods

    O$.assignEventHandlerField(tabbedPane, "onmouseover", function (evt) {

      O$.TabbedPane._handleMouseover(this._tabSet);

      if (this._mirrorTabSet)

        O$.TabbedPane._handleMouseover(this._mirrorTabSet, evt);

    });

    O$.assignEventHandlerField(tabbedPane, "onmouseout", function (evt) {

      O$.TabbedPane._handleMouseout(this._tabSet);

      if (this._mirrorTabSet)

        O$.TabbedPane._handleMouseout(this._mirrorTabSet, evt);

    });

  }