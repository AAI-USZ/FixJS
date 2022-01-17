function (element, options) {

            if (!(typeof GroupedItems != 'undefined')) { // only fo this if GroupedItems does not exist

                WinJS.Namespace.define("GroupedItems", {

                    initUI: this.initUI,

                    itemInvoked: this.itemInvoked,

                    initializeLayout: this.initializeLayout,

                    photoReady: this.photoReady,

                    ShowPopUp: this.showPopUp,

                    FlickError: this.flickError

                });



                app.onsettings = function (e) {

                    e.detail.applicationcommands = {

                        "setUser": { title: "Set User", href: "/pages/SetUserFlyout.html" }

                    };

                    ui.SettingsFlyout.populateSettings(e);

                };



                // this happens when the app is shutting down

                app.oncheckpoint = function (eventInfo) {

                    //eventInfo.setPromise(MetroFlickrViewer.FlickrUser.saveData());



                    // save the current config

                    var previousData = {

                        lastUser: MetroFlickrViewer.FlickrUser.userName

                    }



                    app.local.writeText(configFileName, JSON.stringify(previousData));

                };



                // define a page for the setting page

                ui.Pages.define("/pages/SetUserFlyout.html", {



                    // This function is called whenever a user navigates to this page. It

                    // populates the page elements with the app's data.

                    ready: function (element, options) {

                        var userName = MetroFlickrViewer.FlickrUser.userName;

                        if (userName == undefined) {

                            userName = '';

                        }



                        element.querySelector('.usernameInput').value = userName;

                        element.querySelector('.usernameInput').focus();

                    }

                });



                this.startGettingPhotos();

            }



            var listView = document.querySelector(".groupeditemslist").winControl;

            listView.groupHeaderTemplate = document.querySelector(".headerTemplate");

            listView.itemTemplate = document.querySelector(".itemtemplate");

            listView.oniteminvoked = GroupedItems.itemInvoked.bind(GroupedItems);



            GroupedItems.initializeLayout(listView, appView.value);



            Data.popuplateList(MetroFlickrViewer.FlickrHandler.PhotoHash);

            listView.element.focus();

        }