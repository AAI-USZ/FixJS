function () {

    "use strict";



    var appView = Windows.UI.ViewManagement.ApplicationView;

    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;

    var nav = WinJS.Navigation;

    var ui = WinJS.UI;

    var utils = WinJS.Utilities;





    function templateHandler(itemPromise) {

        return itemPromise.then(function (currentItem, recycled) {





            var tplSelect;

            if (currentItem.index == 0) {

                tplSelect = document.querySelector('.largeitemtemplate').winControl;

            }

            else {

                tplSelect = document.querySelector('.itemtemplate').winControl;

            }



            tplSelect = tplSelect.renderItem(itemPromise, recycled);



            return tplSelect.element;



        });

    }



    function layoutGroupInfoHandler() {

        return {

            enableCellSpanning: true,

            cellWidth: 250,

            cellHeight: 250

        };

    }



    ui.Pages.define("/pages/groupedItems/groupedItems.html", {



        // This function updates the ListView with new layouts

        initializeLayout: function (listView, viewState) {

            /// <param name="listView" value="WinJS.UI.ListView.prototype" />



            if (viewState === appViewState.snapped) {

                listView.itemDataSource = Data.groups.dataSource;

                listView.groupDataSource = null;

                listView.layout = new ui.ListLayout();

            } else {

                listView.itemDataSource = Data.homeItems.dataSource;

                listView.groupDataSource = Data.homeGroups.dataSource;

                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top", groupInfo: layoutGroupInfoHandler });

            }

        },



        itemInvoked: function (args) {

            if (appView.value === appViewState.snapped) {

                // If the page is snapped, the user invoked a group.

                var group = Data.groups.getAt(args.detail.itemIndex);

                nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: group.key });

            } else {

                // If the page is not snapped, the user invoked an item.

                var item = Data.items.getAt(args.detail.itemIndex);

                nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item), index: args.detail.itemIndex });

            }

        },



        // This function is called whenever a user navigates to this page. It

        // populates the page elements with the app's data.

        ready: function (element, options) {



            var listView = element.querySelector(".groupeditemslist").winControl;

            listView.groupHeaderTemplate = element.querySelector(".headerTemplate");

            listView.itemTemplate = templateHandler;

            listView.oniteminvoked = this.itemInvoked.bind(this);



            // Listen to the share event

            var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();

            dtm.ondatarequested = null;



            if (Data.appConfig.logo) {

                var logo = document.createElement('img');

                logo.src = Data.appConfig.logo;

                element.querySelector("header[role=banner] .pagetitle").textContent = '';

                element.querySelector("header[role=banner] .pagetitle").appendChild(logo);

            }

            else {

                if (Data.appConfig.name) {

                    element.querySelector("header[role=banner] .pagetitle").textContent = Data.appConfig.name;

                }

            }



            this.initializeLayout(listView, appView.value);

        },



        // This function updates the page layout in response to viewState changes.

        updateLayout: function (element, viewState, lastViewState) {

            /// <param name="element" domElement="true" />

            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />



            var listView = element.querySelector(".groupeditemslist").winControl;

            if (lastViewState !== viewState) {

                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {

                    var handler = function (e) {

                        listView.removeEventListener("contentanimating", handler, false);

                        e.preventDefault();

                    }

                    listView.addEventListener("contentanimating", handler, false);

                    this.initializeLayout(listView, viewState);

                }

            }

        }

    });

}