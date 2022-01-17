function () {

    'use strict';



    var settings = Windows.Storage.ApplicationData.current.roamingSettings.values;

    var localSettings = Windows.Storage.ApplicationData.current.localSettings.values;

    var notifications = Windows.UI.Notifications;

    var pushChannel;

    var token;



    var gtalk = null;

    var activeEmail = Kupo.LaunchParameters.arguments;

    var activeJid = null;

    var activeConversation = null;

    var switchOnLogin = !!Kupo.LaunchParameters.arguments;



    var shareOperation = null;



    var pageData = {};

    pageData.onlineItems = [];

    pageData.searchItems = [];

    pageData.allItems = [];

    pageData.recentItems = [];

    pageData.activeTab = 'online';

    pageData.activeItems = pageData.onlineItems;



    var rosterTimeout = null;

    var timeoutData = null;



    // Custom event raised after the fragment is appended to the DOM.

    WinJS.Application.addEventListener('fragmentappended', function handler(e) {

        if (e.location === '/pages/kupo/kupo.html') { fragmentLoad(e.fragment, e.state); }

    });



    WinJS.UI.Pages.define('/pages/kupo/kupo.html', {

        ready: function (element, options) {

            fragmentLoad(element, options);

        }

    });



    function updateListView(lv) {

        WinJS.UI.setOptions(lv, {

            layout: new WinJS.UI.ListLayout(),

            dataSource: (new WinJS.Binding.List(pageData.activeItems)).dataSource

        });

    }



    function viewStateChanged(e) {

        restoreSnapView();

        var list = document.querySelector('.roster');

        if (list) {

            var lv = WinJS.UI.getControl(list);

            updateListView(lv);

        }

    }



    function fragmentLoad(elements, options) {

        window.addEventListener('resize', viewStateChanged);



        elements.querySelector('.pageTitle').textContent = 'Kupo';



        WinJS.UI.processAll(elements).then(function () {

        });



        var lv = $('.roster').get(0).winControl;

        lv.itemRenderer = $('.itemTemplate').get(0);

        

        gtalk = new Kupo.Gtalk();

        gtalk.restore(localSettings).then(function () {

            rosterUpdated();

        });

        pageData.recentItems = [];

        var recentItems = JSON.parse(localSettings['recentItems'] || '[]');



        for (var i = 0; i < recentItems.length; i++) {

            if (recentItems[i]) {

                pageData.recentItems.push(gtalk.roster.get(recentItems[i].email));

            }

        }



        Console.log(JSON.stringify(gtalk.conversations));



        gtalk.addEventListener('roster', rosterUpdated);

        gtalk.addEventListener('message', messageReceived);

        gtalk.addEventListener('status', statusUpdated);



        $('.chatInput textarea').autogrow();



        elements.querySelector('.chatInput textarea').addEventListener('keyup', function (e) {

            if (e.keyCode === 13 && !e.shiftKey) {

                var message = Kupo.unformatMessage(elements.querySelector('.chatInput textarea').value);



                if (message[message.length - 1] == "\n") {

                    message = message.substring(0, message.length - 1);

                }



                if (message == "") return;



                message = {

                    to: activeEmail,

                    date: new Date(),

                    direction: 'out',

                    message: message,

                    otr: gtalk.roster.get(activeEmail).otr

                };

                

                gtalk.sendMessage(activeEmail, message);



                $('.chatMessages').append('<div class="chat chatSent">' + Kupo.formatMessage(message) + '</div>');

                $('.chatInput textarea').val('').trigger('change');

                $('.chatContainer').animate({scrollTop: $('.chatContainer')[0].scrollHeight}, 'slow');



                activeConversation.push(message);



                updateRecentList(activeEmail);

                gtalk.save(localSettings);



                if (shareOperation) {

                    var contact = gtalk.roster.get(activeEmail);

                    // report share completed and add quicklink to contact

                    var quickLink = new Windows.ApplicationModel.DataTransfer.ShareTarget.QuickLink();

                    quickLink.title = contact.name;

                    quickLink.id = activeEmail;

                    var dataFormats = Windows.ApplicationModel.DataTransfer.StandardDataFormats;

                    quickLink.supportedDataFormats.replaceAll([dataFormats.text, dataFormats.uri, dataFormats.bitmap]);



                    Windows.Storage.ApplicationData.current.localFolder.getFileAsync(

                        contact.photo + '.jpg'

                    ).then(function (iconFile) {

                        quickLink.thumbnail = Windows.Storage.Streams.StreamReference.createFromFile(iconFile);

                        shareOperation.reportCompleted(quickLink);

                    }, function () {

                        Console.log('Error finding icon file');

                        shareOperation.reportCompleted(quickLink);

                    });

                }

            }

        });



        // register login window events

        document.getElementById('rememberPassword').attributes.checked.value = settings['rememberPassword'] ? 'checked' : '';

        if (settings['rememberPassword']) {

            try {

                var vault = new Windows.Security.Credentials.PasswordVault();

                var cred = vault.retrieve('Kupo-usercred', settings['username']);



                document.getElementById('username').value = cred.userName;

                document.getElementById('password').value = cred.password;



                if (settings['autoLogin'] && settings['rememberPassword']) {

                    login();

                }

            } catch (err) {

                // hope for the best

                $('#login-overlay').removeClass('hidden');

            }

        } else {

            $('#login-overlay').removeClass('hidden');

        }



        elements.querySelector('#login-content form').addEventListener('submit', function (e) {

            e.preventDefault(); // prevent form submission



            login();

        });



        Windows.UI.ViewManagement.InputPane.getForCurrentView().addEventListener('showing', function (e) {

            if (document.activeElement.id === 'username' || document.activeElement.id === 'password') {

                moveLoginPosition();

                e.ensuredFocusedElementInView = true;

            } else {

                var inputBox = document.activeElement;

                var rectangle = e.occludedRect;

                var offsetToEnsureFocusInView = rectangle.y - 20 - (inputBox.offsetTop + inputBox.offsetHeight - window.pageYOffset);

                var moved = document.querySelector('.mainPage');

                WinJS.UI.Animation.hidePanel(moved, { top: offsetToEnsureFocusInView + "px", left: "0px" }).then(function () {

                    moved.style.msTransform = "translate(0px," + offsetToEnsureFocusInView + "px)";

                });

            }

        });



        Windows.UI.ViewManagement.InputPane.getForCurrentView().addEventListener('hiding', function (e) {

            resetLoginPosition();



            var moved = document.querySelector('.mainPage');

            WinJS.UI.Animation.hidePanel(moved, { top: '0px', left: '0px' }).then(function () {

                moved.style.msTransform = 'translate(0px,0px)';

            });

        });



        var exiting = function () {

            gtalk.save(localSettings);

        };



        if (Kupo.LaunchParameters.shareOperation) {

            shareOperation = Kupo.LaunchParameters.shareOperation;

            startShare();

        }



        Windows.UI.WebUI.WebUIApplication.addEventListener("suspending", exiting, false);

        Windows.UI.WebUI.WebUIApplication.addEventListener("exiting", exiting, false);

        Windows.UI.WebUI.WebUIApplication.addEventListener("activated", function (eventArgs) {

            Console.log('started as ' + eventArgs.kind);

            if (eventArgs.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {

                if (eventArgs.arguments !== '') {

                    Console.log('started with ' + eventArgs.arguments);

                    activeEmail = eventArgs.arguments;

                    switchOnLogin = true;

                }

            } else if (eventArgs.kind === Windows.ApplicationModel.Activation.ActivationKind.search) {

                search(eventArgs.queryText);

            }

        }, false);



        document.querySelector('.chatInput textarea').addEventListener('blur', function () {

            var moved = document.querySelector('.chatSection');

            WinJS.UI.Animation.hidePanel(moved, { top: '0px', left: '0px' }).then(function () {

                moved.style.msTransform = 'translate(0px,0px)';

            });

        });



        document.getElementById('username').addEventListener('blur', function () {

            if (document.activeElement.id !== 'password') {

                resetLoginPosition();

            }

        });



        document.getElementById('password').addEventListener('blur', function () {

            if (document.activeElement.id !== 'username') {

                resetLoginPosition();

            }

        });

        /*

        document.getElementById('logout').addEventListener('click', function () {

            settings.clear();

            localSettings.clear();



            gtalk.logout();

            activeEmail = null;

            activeJid = null;

            activeConversation = null;

            switchOnLogin = false;



            shareOperation = null;



            pageData = {};

            pageData.onlineItems = [];

            pageData.searchItems = [];

            pageData.allItems = [];

            pageData.recentItems = [];

            pageData.activeTab = 'online';

            pageData.activeItems = pageData.onlineItems;



            realRosterUpdated();



            WinJS.UI.getControl(document.getElementById('changeStatusFlyout')).hide();

            $('.chatSection').hide();

            $('#login-overlay').show();

        });



        document.getElementById('otr').addEventListener('click', function () {

            $('#otr').toggleClass('on');

            gtalk.otr(activeEmail, $('#otr').hasClass('on'));

            $('.chatContainer').animate({ scrollTop: $('.chatContainer')[0].scrollHeight }, 'slow');

        });

        */



        document.querySelector('.win-backbutton').addEventListener('click', function () {

            restoreSnapView();

        });

        /*

        document.getElementById('sharePicMenu').addEventListener('click', function () {

            var anchor = document.getElementById('sharePicMenu');

            var flyout = WinJS.UI.getControl(document.getElementById('sharePicFlyout'));

            flyout.show(anchor);

        });



        document.getElementById('changeStatus').addEventListener('click', function () {

            var anchor = document.getElementById('changeStatus');

            var flyout = WinJS.UI.getControl(document.getElementById('changeStatusFlyout'));

            flyout.show(anchor);

        });



        $('#status-change').click(function (elm) {

            gtalk.status(null, $('#status-value').val());

        });



        $('.status-menu').click(function (elm) {

            if (elm.target.attributes.value && ['available', 'busy', 'invisible', 'away'].indexOf(elm.target.attributes.value.nodeValue) != -1) {

                if (elm.target.attributes.value.nodeValue == 'available' || elm.target.attributes.value.nodeValue == 'busy') {

                    gtalk.status(elm.target.attributes.value.nodeValue, '');

                } else {

                    gtalk.status(elm.target.attributes.value.nodeValue, null);

                }

            }



            WinJS.UI.getControl(document.getElementById('changeStatusFlyout')).hide();

        });



        document.getElementById('sharePic').addEventListener('click', function () {

            if (activeEmail) {

                Windows.UI.ViewManagement.ApplicationLayout.tryUnsnap();

                var openPicker = new Windows.Storage.Pickers.FileOpenPicker();

                openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;

                openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;

                openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);



                openPicker.pickSingleFileAsync().then(function (file) {

                    if (file) {

                        Console.log("Picked photo: " + file.name);



                        Kupo.Imgur.upload(file).then(function (imgur) {

                            $('.chatInput textarea').append(imgur.original);

                        }, function (err) {

                            Console.log("imgur " + file);

                        });

                    }

                });

            }

        });



        document.getElementById('shareCam').addEventListener('click', function () {

            Windows.UI.ViewManagement.ApplicationLayout.tryUnsnap();

            var captureUI = new Windows.Media.Capture.CameraCaptureUI();

            captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {

                if (capturedItem) {

                    Kupo.Imgur.upload(capturedItem).then(function (imgur) {

                        $('.chatInput textarea').append(imgur.original);

                    }, function (err) {

                        Console.log("imgur " + err);

                    });

                } else {

                    Console.log("imgur cancelled");

                }

            });

        });



        document.getElementById('pin').addEventListener('click', function () {

            if (activeEmail && !Windows.UI.StartScreen.SecondaryTile.exists(activeEmail)) {

                var contact = gtalk.roster.get(activeEmail);



                var secondaryTile = new Windows.UI.StartScreen.SecondaryTile(

                    activeEmail,

                    contact.name,

                    contact.name,

                    activeEmail,

                    Windows.UI.StartScreen.TileDisplayAttributes.showName | Windows.UI.StartScreen.TileDisplayAttributes.dynamicTileCapable,

                    new Windows.Foundation.Uri('localfolder://' + contact.photo + '.jpg')

                );



                secondaryTile.requestCreateAsync().then(function (isPinned) {

                    // celebrate?

                });

            }

        });

        */



        $('.itemListFilter').click(function (e) {

            if ($(e.target).hasClass('itemListFilterSelected')) return;



            $('.itemListFilterSelected').removeClass('itemListFilterSelected');

            $(e.target).addClass('itemListFilterSelected');



            if (e.target.id === 'roster-recent-tab') {

                pageData.activeItems = pageData.recentItems;

                pageData.activeTab = 'recent';

            } else if (e.target.id === 'roster-online-tab') {

                pageData.activeItems = pageData.onlineItems;

                pageData.activeTab = 'online';

            } else if (e.target.id === 'roster-all-tab') {

                pageData.activeItems = pageData.allItems;

                pageData.activeTab = 'all';

            } else if (e.target.id === 'roster-search-tab') {

                pageData.activeItems = pageData.searchItems;

                pageData.activeTab = 'search';

            }



            rosterUpdated();

        });



        $('#set-status').click(function () {

            gtalk.status($('#status').val());

        });



        var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();

        searchPane.addEventListener("suggestionsrequested", function (e) {

            var suggestions = gtalk.roster.search(e.queryText.toLocaleLowerCase(), 5);



            for (var i = 0, len = suggestions.length; i < len; i++) {

                e.request.searchSuggestionCollection.appendQuerySuggestion(suggestions[i].name || suggestions[i].email);

            }

        }, false);



        if (Kupo.LaunchParameters.searchQuery) {

            search(Kupo.LaunchParameters.searchQuery);

        }

    }



    function realRosterUpdated(data) {

        rosterTimeout = null;

        timeoutData = null;



        var lv = document.querySelector('.roster').winControl;

        var needsRefresh = true;



        if (data && data.email) {

            for (var i = 0, len = pageData.activeItems.length; i < len; i++) {

                // find the changed element

                if (data.email === pageData.activeItems[i].email) {

                    needsRefresh = false;

                    lv.dataSource.change(i, data);

                    break;

                }

            }

        }



        if (gtalk && (pageData.activeTab === 'all' || pageData.activeTab === 'online')) {

            var newList = gtalk.roster.getList(pageData.activeTab);



            needsRefresh |= pageData[pageData.activeTab + 'Items'].length !== newList.length;

            needsRefresh |= pageData.activeTab === 'online' && data && data.showChanged;



            pageData[pageData.activeTab + 'Items'] = newList;

            pageData.activeItems = newList;

        }



        if (needsRefresh) {

            updateListView(lv);

        }



        if (data && data.email && activeEmail === data.email) {

            if (switchOnLogin) {

                switchOnLogin = false;

                switchToChat(activeEmail);

            } else {

                var details = document.querySelector('.chatSection');

                pageData.selectedItem = gtalk.roster.get(activeEmail);

                WinJS.Binding.processAll(details, pageData.selectedItem);

            }

        } else if (switchOnLogin && gtalk.roster.get(activeEmail)) {

            switchToChat(activeEmail);

        }

    }



    function rosterUpdated(data) {

        if (rosterTimeout) {

            if (timeoutData == data) return;



            clearTimeout(rosterTimeout);

            rosterTimeout = setTimeout(function () { realRosterUpdated(); }, 100);

        } else {

            timeoutData = data;

            rosterTimeout = setTimeout(function () { realRosterUpdated(data); }, 100);

        }

    }



    function statusUpdated(data) {

        $('#changeStatusFlyout button.disposable').remove();



        $('#status-value').val(data.status);

        $('#status-image').attr('src', data.image);

        /*

        for (var i = data.default.length - 1; i >= 0; i--) {

            if (!data.default[i]) continue;



            (function (elm) {

                $('<button role="menuitem" class="status-menu disposable"><img src="/images/available.png" alt="Available" /> ' + elm + '</button>')

                .click(function () {

                    gtalk.status('available', elm);



                    WinJS.UI.getControl(document.getElementById('changeStatusFlyout')).hide();

                })

                .insertAfter($('#changeStatusFlyout button[value="available"]'));

            })(data.default[i]);

        }

        

        for (var i = data.dnd.length - 1; i >= 0; i--) {

            if (!data.dnd[i]) continue;



            (function (elm) {

                $('<button role="menuitem" class="status-menu disposable"><img src="/images/busy.png" alt="Available" /> ' + elm + '</button>')

                .click(function () {

                    gtalk.status('busy', elm);



                    WinJS.UI.getControl(document.getElementById('changeStatusFlyout')).hide();

                })

                .insertAfter($('#changeStatusFlyout button[value="busy"]'));

            })(data.dnd[i]);

        }

        */

    }



    function updateRecentList(jid) {

        if (!gtalk) return;



        var user = gtalk.roster.get(jid);



        for (var i = 0; i < pageData.recentItems.length; i++) {

            if (user.email === pageData.recentItems[i].email) {

                if (i == 0) return;



                pageData.recentItems.splice(i, 1);

                break;

            }

        }



        if (pageData.recentItems.length == 10) {

            pageData.recentItems.pop();

        }



        pageData.recentItems.unshift(user);



        localSettings['recentItems'] = JSON.stringify(pageData.recentItems);



        if (pageData.activeTab == 'recent') {

            rosterUpdated(user);

        }

    }



    function messageReceived(message, doc) {

        if (message.from.indexOf(activeEmail) == 0) {

            if (message.event) {

                if (message.event == 'otr enabled') {

                    $('.chatMessages').append('<div>This chat is off the record</div>');

                    $('#otr').addClass('on');

                } else if (message.event == 'otr disabled') {

                    $('.chatMessages').append('<div>This chat is no longer off the record</div>');

                    $('#otr').removeClass('on');

                }

            } else {

                if (message.message) {

                    $('.chatMessages').append('<div class="chat chatReceived">' + Kupo.formatMessage(message) + '</div>');

                }



                if (doc.get(0).getElementsByTagName('cha:composing').length) {

                    $('.typingStatus').html('typing...');

                } else if (doc.get(0).getElementsByTagName('cha:paused').length) {

                    $('.typingStatus').html('stopped typing.');

                } else {

                    $('.typingStatus').html('');

                }

            }



            $('.chatContainer').animate({ scrollTop: $('.chatContainer')[0].scrollHeight }, 'slow');

        } else if (message.message) {

            var toastXml = notifications.ToastNotificationManager.getTemplateContent(notifications.ToastTemplateType.toastImageAndText02);



            var toastNode = toastXml.selectSingleNode("/toast");

                

            toastNode.setAttribute('launch', '{"type":"toast"}');



            var strings = toastXml.getElementsByTagName('text');

            strings[0].appendChild(toastXml.createTextNode(gtalk.roster.get(message.from).name));

            strings[1].appendChild(toastXml.createTextNode(message.message));



            var audio = toastXml.createElement('audio');

            audio.setAttribute('src', 'ms-winsoundevent:Notification.IM');

            toastNode.appendChild(audio);



            var image = toastXml.getElementsByTagName('image')[0];

            // contact has real photo

            var photo = gtalk.roster.get(message.from).photo;

            image.setAttribute('src', 'localfolder://' + photo + '.jpg');



            var toast = new notifications.ToastNotification(toastXml);



            toast.addEventListener('activated', function () {

                switchToChat(message.from.split('/')[0]);

            }, false);



            notifications.ToastNotificationManager.createToastNotifier().show(toast);



            gtalk.roster.addNotification(message.from.split('/')[0], message);



            rosterUpdated(gtalk.roster.get(message.from));

        }



        updateRecentList(message.from);

        gtalk.save(localSettings);

    }



    function search(query) {

        $('.itemListFilterSelected').removeClass('itemListFilterSelected');

        $('#roster-search-tab').addClass('itemListFilterSelected').show();



        pageData.searchItems = gtalk.roster.search(query.toLocaleLowerCase());

        pageData.activeItems = pageData.searchItems;



        var lv = WinJS.UI.getControl($('.roster').get(0));

        updateListView(lv);

    }



    function startShare() {

        if (shareOperation) {

            var log = 'Share data: ';



            if (shareOperation.data.properties.title) {

                $('.chatInput textarea').append(shareOperation.data.properties.title + ' ').trigger('change');

                log += 'title: ' + shareOperation.data.properties.title + ', ';

            }



            if (shareOperation.data.properties.description) {

                $('.chatInput textarea').append(shareOperation.data.properties.description + ' ').trigger('change');

                log += 'description: ' + shareOperation.data.properties.description + ', ';

            }



            if (shareOperation.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {

                var text = shareOperation.data.getText();

                $('.chatInput textarea').append(text + ' ').trigger('change');

                log += 'text: ' + text + ', ';

            }



            if (shareOperation.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.uri)) {

                var uri = shareOperation.data.getUri().absoluteUri;

                // check this for IE data duplication

                if (uri !== shareOperation.data.properties.description) {

                    $('.chatInput textarea').append(uri + ' ').trigger('change');

                }

                log += 'uri: ' + uri + ', ';

            }



            if (shareOperation.data.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.bitmap)) {

                log += 'bitmap';

                var bitmapStream = shareOperation.data.getBitmap();

                Kupo.Imgur.upload(bitmapStream, bitmapStream.size, 'image/bmp').then(function (imgur) {

                    Console.log('uploaded shared image');

                    $('.chatInput textarea').append(imgur.original);

                }, function (err) {

                    Console.log('error uploading shared image: ' + err);

                }, function (p) {

                    Console.log('progress uplodating shared image: ' + p);

                });

            }

            Console.log(log);



            // Share window style

            $('body').addClass('share');



            // Share to a frequently shared contact

            if (shareOperation.quickLinkId !== "") {

                switchToChat(shareOperation.quickLinkId);

            }

        }

    }



    function login() {

        $('#login-progress').show();

        $('#login-button').attr('disabled', 'true');

        $('#login-error').hide();



        gtalk.login(

            $('#username').val(),

            $('#password').val()

        ).then(function () {

            // save credentials

            settings['rememberPassword'] = $('#rememberPassword').attr('checked') == 'checked';

            if (settings['rememberPassword']) {

                settings['autoLogin'] = $('#autoLogin').attr('checked') == 'checked';

                settings['username'] = $('#username').val();

                try {

                    var cred = new Windows.Security.Credentials.PasswordCredential("Kupo-usercred", $('#username').val(), $('#password').val());

                    var vault = new Windows.Security.Credentials.PasswordVault();

                    vault.add(cred);

                } catch (err) {

                    // hope for the best

                }

            }



            $('#login-overlay').hide();



            $('#login-progress').hide();

            $('#login-button').removeAttr('disabled');



            if (activeEmail) {

                if (roster.get(activeEmail)) {

                    switchToChat(activeEmail);

                } else {

                    switchOnLogin = true;

                }

            }

        }, function (err) {

            Console.log('wrong credentials');

            $('#login-progress').hide();

            $('#login-button').removeAttr('disabled');

            $('#login-error').show();

        });

    }



    function moveLoginPosition() {

        var dialog = document.getElementById('login-dialog');

        WinJS.UI.Animation.hidePanel(dialog, { top: '-150px', left: '0px' }).then(function () {

            dialog.style.msTransform = 'translate(0px,-150px)';

        });

    }



    function resetLoginPosition() {

        var dialog = document.getElementById('login-dialog');

        WinJS.UI.Animation.showPanel(dialog, { top: '0px', left: '0px' }).then(function () {

            dialog.style.msTransform = 'translate(0px,0px)';

        });

    }



    function _itemInvoked(e) {

        switchToChat(pageData.activeItems[e.detail.itemIndex].email);

    }



    function switchToChat(email) {

        var details = document.querySelector('.chatSection');

        pageData.selectedItem = gtalk.roster.get(email);

        WinJS.Binding.processAll(details, pageData.selectedItem);

        details.scrollTop = 0;



        $('.chatSection').show();



        $('.chatInput').show();

        activeEmail = email;

        activeJid = activeEmail;

        activeConversation = gtalk.conversation(activeEmail);



        $('.chatMessages').empty();



        for (var i = 0; i < activeConversation.length; i++) {

            var message = activeConversation[i];



            if (message.event) {

                if (message.event == 'otr enabled') {

                    $('.chatMessages').append('<div>This chat is off the record</div>');

                } else if (message.event == 'otr disabled') {

                    $('.chatMessages').append('<div>This chat is no longer off the record</div>');

                }

            } else if (message.message) {

                if (message.direction == 'out') {

                    $('.chatMessages').append('<div class="chat chatSent">' + Kupo.formatMessage(message) + '</div>');

                } else {

                    $('.chatMessages').append('<div class="chat chatReceived">' + Kupo.formatMessage(message) + '</div>');

                }

            }

        }



        if (!shareOperation) {

            $('.chatInput textarea').val('').trigger('change').focus();

        }



        $('.typingStatus').html('');

        if (gtalk.roster.get(activeEmail).otr) {

            $('#otr').addClass('on');

        } else {

            $('#otr').addClass('off');

        }



        $('.chatContainer').animate({ scrollTop: $('.chatContainer')[0].scrollHeight }, 'slow');

        $('.win-right').show();

        

        var isSnapped = Windows.UI.ViewManagement.ApplicationLayout.value === Windows.UI.ViewManagement.ApplicationLayoutState.snapped;

        var isPortrait = Windows.Graphics.Display.DisplayProperties.currentOrientation === Windows.Graphics.Display.DisplayOrientations.portrait || Windows.Graphics.Display.DisplayProperties.currentOrientation === Windows.Graphics.Display.DisplayOrientations.portraitFlipped;

        if (isSnapped || shareOperation || isPortrait) {

            $('.itemListSection').hide();

            $('.chatSection').css('-ms-grid-column', '2');

            $('.win-backbutton').removeAttr('disabled');

            $('.pageTitle').hide();

            $('.win-left').hide();

            $('.win-right').show();

        }



        if (pageData.selectedItem.notificationsCount) {

            gtalk.roster.clearNotifications(activeEmail);



            gtalk.save(localSettings);



            rosterUpdated(pageData.selectedItem);

        }

    }

    

    function restoreSnapView() {

        $('.itemListSection').show();

        $('.chatSection').css('-ms-grid-column', '3');

        $('.win-backbutton').attr('disabled', 'disabled');

        $('.pageTitle').show();

        $('.win-left').show();



        var viewStates = Windows.UI.ViewManagement.ApplicationViewState;

        var newViewState = Windows.UI.ViewManagement.ApplicationView.value;



        var isSnapped, isPortrait;



        if (newViewState === viewStates.snapped) {

            isSnapped = true;

        } else if (newViewState === viewStates.filled) {

            

        } else if (newViewState === viewStates.fullScreenLandscape) {

            

        } else if (newViewState === viewStates.fullScreenPortrait) {

            isPortrait = true;

        }



        if (isSnapped || shareOperation || isPortrait) {

            $('.win-right').hide();

        } else {

            $('.win-right').show();

        }



        var lv = WinJS.UI.getControl(document.querySelector('.roster'));

        lv.refresh();

    }

    

    WinJS.Namespace.define('splitPage', {

        fragmentLoad: fragmentLoad,

        itemInvoked:  WinJS.Utilities.markSupportedForProcessing(_itemInvoked)

    });

}