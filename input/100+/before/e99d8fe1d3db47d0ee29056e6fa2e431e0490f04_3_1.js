function(options)  {
      var widget,
         // these are our final options
         opts = $.extend({}, defaults, options),
         id = this.attr("id"),
         // our plugin is bound to an HTML ul element
         tabs = this.find(".tab:nth-child(n+1)"),
         // store the contents
         container = $(this.attr("data-tab-container")),
         // array containing content divs for each tabs 
         contents = [],
         selectedTabData,
         selectedIndex = opts.selectedIndex,
         
         // tab selection logic
         selectTab = function(tabData) {
            clearTabs();
            selectedIndex = tabData.index;
            tabData.tab.addClass("selected");
            showTabContent(tabData);
         },
         
         selectTabByIndex = function(idx)  {
            if(idx < 0 || idx > tabs.length) {
               return;
            }
            var $tab = $(tabs[idx]), ref = $tab.attr("data-ref");
            selectTab({
               tab: $tab,
               index: idx,
               contentId: ref
            });
         },
         
         showTabContent = function(tabData) {
            var id = tabData.contentId;
            
            if(id.indexOf("#") === 0) {
               $(id).setStyle({display: "block"});
            }else {
               window.location.href = id;
            }
         },
         
         clearTabs = function()   {
            hideContents();
            forEach(tabs, function(tab, idx) {
               $(tab).removeClass("selected");
            });
            selectedIndex = -1;
         },
         
         hideContents = function() {
            forEach(contents, function(con) {
               con.setStyle({display: "none"});
            });
         };
         
      function handler(data) {
         var retVal = opts.onselect(data.tab.get(0), data.index);
         if(typeof(retVal) !== "undefined" || retVal !== false) {
            selectTab(data);
         }
         return false;
      }
      
      // iterate over tabs and add bind events
      forEach(tabs, function(liElem, idx)   {
         var $li = $(liElem),
            // $a = $li.find("a:first-child"),
            href = $li.attr("data-ref");
         
         // this is not a valid tab
         if(typeof(href) === "undefined")   {
            return;
         }
         
         if(href.indexOf("#") === 0) {
            contents.push($(href));
         }
         
         // find the first a element and bind with 'click' event, null data, and a handler
         $li.bind("click", handler.bind(null, {tab: $li, index:idx, contentId: href}));
      });
      
      // by default select the tab as specified by selectedIndex
      selectTabByIndex(opts.selectedIndex);
      
      // our widget API object
      widget = {
         getSelectedIndex: function()  {
            return selectedIndex;
         },
         
         selectTab: function(idx)   {
            selectTabByIndex(idx);
         }
      };
      
      return widget;
   }