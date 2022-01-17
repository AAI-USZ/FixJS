function () {
        invocation = {
                TARGET_TYPE_ALL : '',
                ACTION_TYPE_MENU : ''
            };
        mockedController = {
            remoteExec: jasmine.createSpy()
        };
        mockedApplication = {
            invocation : {
                TARGET_TYPE_ALL : '',
                ACTION_TYPE_MENU : ''
            }
        };

        GLOBAL.alert = jasmine.createSpy();
        GLOBAL.window = {
            qnx : {
                webplatform : {
                    getController : function () {
                        return mockedController;
                    },
                    getApplication : function () {
                        return mockedApplication;
                    }
                }
            }
        };
        GLOBAL.document = {
            createTextNode: jasmine.createSpy(),
            createElement: jasmine.createSpy().andReturn({
                appendChild: jasmine.createSpy(),
                setAttribute: jasmine.createSpy(),
                addEventListener: jasmine.createSpy()
            }),
            getElementById: function (id) {
                var returnElement;
                if (id === "contextMenu") {
                    menu = {
                        addEventListener: jasmine.createSpy(),
                        removeEventListener: jasmine.createSpy(),
                        showContextmenu: jasmine.createSpy(),
                        appendChild: jasmine.createSpy(),
                        className: undefined
                    };
                    returnElement = menu;
                } else if (id === "contextMenuHandle") {
                    menuHandle = {
                        addEventListener: jasmine.createSpy(),
                        removeEventListener: jasmine.createSpy()
                    };
                    returnElement = menuHandle;
                } else if (id === "contextMenuHeadText") {
                    headText = { innerText: undefined };
                    returnElement = headText;
                } else if (id === "contextMenuSubheadText") {
                    subheadText = { innerText: undefined };
                    returnElement = subheadText;
                } else if (id === "contextMenuHeader") {
                    header = { className: undefined };
                    returnElement = header;
                } else if (id === "contextMenuContent") {
                    menuContent = {
                        childNodes: [],
                        appendChild: jasmine.createSpy()
                    };
                    returnElement = menuContent;
                }
                return returnElement;
            }
        };
        GLOBAL.qnx = {
            callExtensionMethod: jasmine.createSpy("bond"),
            webplatform : {
                getController : function () {
                    return mockedController;
                }
            }
        };
    }