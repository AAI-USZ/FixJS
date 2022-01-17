function(Xpcom, Obj, Locale, Domplate, Dom, Options, Persist, Str, Http, Css, Events, Arr,
    BaseObserver, MenuUtils, CookieUtils, Cookie, Breakpoints, CookieEvents,
    CookiePermissions, EditCookie, CookieClipboard) {

with (Domplate) {

// ********************************************************************************************* //
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;

const lastSortedColumn = "cookies.lastSortedColumn";
const hiddenColsPref = "cookies.hiddenColumns";

// Cookie status & policy
var STATUS_UNKNOWN = Ci.nsICookie2.STATUS_UNKNOWN;
var STATUS_ACCEPTED = Ci.nsICookie2.STATUS_ACCEPTED;
var STATUS_DOWNGRADED = Ci.nsICookie2.STATUS_DOWNGRADED;
var STATUS_FLAGGED = Ci.nsICookie2.STATUS_FLAGGED;
var STATUS_REJECTED = Ci.nsICookie2.STATUS_REJECTED;

var POLICY_UNKNOWN = Ci.nsICookie2.POLICY_UNKNOWN;
var POLICY_NONE = Ci.nsICookie2.POLICY_NONE;
var POLICY_NO_CONSENT = Ci.nsICookie2.POLICY_NO_CONSENT;
var POLICY_IMPLICIT_CONSENT = Ci.nsICookie2.POLICY_IMPLICIT_CONSENT;
var POLICY_NO_II = Ci.nsICookie2.POLICY_NO_II;

const panelName = "cookies";

// ********************************************************************************************* //
// Templates Helpers

// Object with all rep CookieReps.
var CookieReps = {};

/**
 * @domplate Basic template for all Firecookie CookieReps.
 */
CookieReps.Rep = domplate(Firebug.Rep,
{
    getContextMenuItems: function(cookie, target, context)
    {
        // xxxHonza not sure how to do this better if the default Firebug's "Copy"
        // command (cmd_copy) shouldn't be there.
        var popup = Firebug.chrome.$("fbContextMenu");
        if (popup.firstChild && popup.firstChild.getAttribute("command") == "cmd_copy")
            popup.removeChild(popup.firstChild);
    }
});

// ********************************************************************************************* //
// Cookie Template (domplate)

/**
 * @domplate Represents a domplate template for cookie entry in the cookie list.
 */
CookieReps.CookieRow = domplate(CookieReps.Rep,
/** @lends CookieReps.CookieRow */
{
    inspectable: false,

    cookieTag:
        FOR("cookie", "$cookies",
            TR({"class": "cookieRow", _repObject: "$cookie", onclick: "$onClickRow",
                $sessionCookie: "$cookie|isSessionCookie",
                $rejectedCookie: "$cookie|isRejected"},
                TD({"class": "cookieDebugCol cookieCol"},
                   DIV({"class": "sourceLine cookieRowHeader", onclick: "$onClickRowHeader"},
                        "&nbsp;"
                   )
                ),
                TD({"class": "cookieNameCol cookieCol"},
                    DIV({"class": "cookieNameLabel cookieLabel"}, "$cookie|getName")
                ),
                TD({"class": "cookieValueCol cookieCol"},
                    DIV({"class": "cookieValueLabel cookieLabel"}, 
                        SPAN("$cookie|getValue"))
                ),
                TD({"class": "cookieDomainCol cookieCol"},
                    SPAN({"class": "cookieDomainLabel cookieLabel", onclick: "$onClickDomain"}, 
                        "$cookie|getDomain")
                ),
                TD({"class": "cookieSizeCol cookieCol"},
                    DIV({"class": "cookieSizeLabel cookieLabel"}, "$cookie|getSize")
                ),
                TD({"class": "cookiePathCol cookieCol"},
                    DIV({"class": "cookiePathLabel cookieLabel", "title": "$cookie|getPath"},
                        SPAN("$cookie|getPath")
                    )
                ),
                TD({"class": "cookieExpiresCol cookieCol"},
                    DIV({"class": "cookieExpiresLabel cookieLabel"}, "$cookie|getExpires")
                ),
                TD({"class": "cookieHttpOnlyCol cookieCol"},
                    DIV({"class": "cookieHttpOnlyLabel cookieLabel"}, "$cookie|isHttpOnly")
                ),
                TD({"class": "cookieSecurityCol cookieCol"},
                    DIV({"class": "cookieLabel"}, "$cookie|isSecure")
                ),
                TD({"class": "cookieStatusCol cookieCol"},
                    DIV({"class": "cookieLabel"}, "$cookie|getStatus")
                )
            )
        ),

    bodyRow:
        TR({"class": "cookieInfoRow"},
            TD({"class": "sourceLine cookieRowHeader"}),
            TD({"class": "cookieInfoCol", colspan: 10})
        ),

    bodyTag:
        DIV({"class": "cookieInfoBody", _repObject: "$cookie"},
            DIV({"class": "cookieInfoTabs"},
                A({"class": "cookieInfoValueTab cookieInfoTab", onclick: "$onClickTab",
                    view: "Value"},
                    Locale.$STR("firecookie.info.valuetab.label")
                ),
                A({"class": "cookieInfoRawValueTab cookieInfoTab", onclick: "$onClickTab",
                    view: "RawValue",
                    $collapsed: "$cookie|hideRawValueTab"},
                    Locale.$STR("firecookie.info.rawdatatab.Raw Data")
                ),
                A({"class": "cookieInfoJsonTab cookieInfoTab", onclick: "$onClickTab",
                    view: "Json",
                    $collapsed: "$cookie|hideJsonTab"},
                    Locale.$STR("firecookie.info.jsontab.JSON")
                ),
                A({"class": "cookieInfoXmlTab cookieInfoTab", onclick: "$onClickTab",
                    view: "Xml",
                    $collapsed: "$cookie|hideXmlTab"},
                    Locale.$STR("firecookie.info.xmltab.XML")
                )
            ),
            DIV({"class": "cookieInfoValueText cookieInfoText"}),
            DIV({"class": "cookieInfoRawValueText cookieInfoText"}),
            DIV({"class": "cookieInfoJsonText cookieInfoText"}),
            DIV({"class": "cookieInfoXmlText cookieInfoText"})
        ),

    hideRawValueTab: function(cookie)
    {
        return (cookie.cookie.value == cookie.cookie.rawValue);
    },

    hideJsonTab: function(cookie)
    {
        return cookie.getJsonValue() ? false : true;
    },

    hideXmlTab: function(cookie)
    {
        return cookie.getXmlValue() ? false : true;
    },

    getAction: function(cookie)
    {
        return cookie.action;
    },

    getName: function(cookie)
    {
        return cookie.cookie.name;
    },

    getValue: function(cookie)
    {
        var limit = 200;
        var value = cookie.cookie.value;
        if (value.length > limit)
            return Str.escapeNewLines(value.substr(0, limit) + "...");
        else
            return Str.escapeNewLines(value);
    },

    getDomain: function(cookie)
    {
        if (!cookie.cookie.host)
            return "";

        return cookie.cookie.host;
    },

    getExpires: function(cookie)
    {
        if (cookie.cookie.expires == undefined)
            return "";

        // The first character is space so, if the table is sorted according
        // to this column, all "Session" cookies are displayed at the begining.
        if (cookie.cookie.expires == 0)
            return " " + Locale.$STR("firecookie.Session");

        try
        {
            // Format the expires date using the current locale.
            var date = new Date(cookie.cookie.expires * 1000);
            return date.toLocaleString();
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("cookies.CookieRow.getExpires; EXCEPTION " + err, err);
        }

        return "";
    },

    isHttpOnly: function(cookie)
    {
        return cookie.cookie.isHttpOnly ? "HttpOnly" : "";
    },

    isSessionCookie: function(cookie)
    {
        return !cookie.cookie.expires;
    },

    isRejected: function(cookie)
    {
        return !!cookie.cookie.rejected;
    },

    getSize: function(cookie)
    {
        var size = cookie.cookie.name.length + cookie.cookie.value.length;
        return this.formatSize(size);
    },

    formatSize: function(bytes)
    {
        if (bytes == -1 || bytes == undefined)
            return "?";
        else if (bytes < 1024)
            return bytes + " B";
        else if (bytes < 1024*1024)
            return Math.ceil(bytes/1024) + " KB";
        else
            return (Math.ceil(bytes/1024)/1024) + " MB";    // OK, this is probable not necessary ;-)
    },

    getPath: function(cookie)
    {
        var path = cookie.cookie.path;
        return path ? path : "";
    },

    isDomainCookie: function(cookie)
    {
        return cookie.cookie.isDomain ? Locale.$STR("firecookie.domain.label") : "";
    },

    isSecure: function(cookie)
    {
        return cookie.cookie.isSecure ? Locale.$STR("firecookie.secure.label") : "";
    },

    getStatus: function(cookie)
    {
        if (!cookie.cookie.status)
            return "";

        switch (cookie.cookie.status)
        {
            case STATUS_UNKNOWN:
                return "";
            case STATUS_ACCEPTED:
                return Locale.$STR("firecookie.status.accepted");
            case STATUS_DOWNGRADED:
                return Locale.$STR("firecookie.status.downgraded");
            case STATUS_FLAGGED:
                return Locale.$STR("firecookie.status.flagged");
            case STATUS_REJECTED:
                return Locale.$STR("firecookie.status.rejected");
        }

        return "";
    },

    getPolicy: function(cookie)
    {
        switch (cookie.cookie.policy)
        {
            //xxxHonza localization
            case POLICY_UNKNOWN:
                return "POLICY_UNKNOWN";
            case POLICY_NONE:
                return "POLICY_NONE";
            case POLICY_NO_CONSENT:
                return "POLICY_NO_CONSENT";
            case POLICY_IMPLICIT_CONSENT:
                return "POLICY_IMPLICIT_CONSENT";
            case POLICY_NO_II:
                return "POLICY_NO_II";
        }

        return "";
    },

    // Firebug rep support
    supportsObject: function(cookie)
    {
        return cookie instanceof Cookie;
    },

    browseObject: function(cookie, context)
    {
        return false;
    },

    getRealObject: function(cookie, context)
    {
        return cookie.cookie;
    },

    getContextMenuItems: function(cookie, target, context)
    {
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);

        var items = [];
        var rejected = cookie.cookie.rejected;

        if (!rejected)
        {
            items.push({
              label: Locale.$STR("firecookie.Cut"),
              nol10n: true,
              command: Obj.bindFixed(this.onCut, this, cookie)
            });
        }

        items.push({
          label: Locale.$STR("firecookie.Copy"),
          nol10n: true,
          command: Obj.bindFixed(this.onCopy, this, cookie)
        });

        if (!rejected)
        {
            items.push({
              label: Locale.$STR("firecookie.Paste"),
              nol10n: true,
              disabled: CookieClipboard.isCookieAvailable() ? false : true,
              command: Obj.bindFixed(this.onPaste, this, cookie)
            });
            items.push("-");
        }

        items.push({
          label: Locale.$STR("firecookie.CopyAll"),
          nol10n: true,
          command: Obj.bindFixed(this.onCopyAll, this, cookie)
        });

        if (!rejected)
        {
            items.push("-");
            items.push({
              label: Locale.$STR("firecookie.Delete"),
              nol10n: true,
              command: Obj.bindFixed(this.onRemove, this, cookie)
            });

            items.push("-");
            items.push({
              label: Locale.$STR("firecookie.Edit"),
              nol10n: true,
              command: Obj.bindFixed(this.onEdit, this, cookie)
            });

            if (cookie.cookie.rawValue)
            {
                items.push({
                  label: Locale.$STR("firecookie.Clear Value"),
                  nol10n: true,
                  command: Obj.bindFixed(this.onClearValue, this, cookie)
                });
            }
        }

        // Permissions
        var permItems = CookiePermissions.getContextMenuItems(cookie, target, context);
        if (permItems)
            items = items.concat(permItems);

        // Breakpoints
        var breakOnItems = Breakpoints.getContextMenuItems(cookie, target, context);
        if (breakOnItems)
            items = items.concat(breakOnItems);

        return items;
    },

    // Context menu commands
    onCut: function(clickedCookie)
    {
        this.onCopy(clickedCookie);
        this.onRemove(clickedCookie);
    },

    onCopy: function(clickedCookie)
    {
        CookieClipboard.copyTo(clickedCookie);
    },

    onCopyAll: function(clickedCookie)
    {
        var text = "";
        var tbody = Dom.getAncestorByClass(clickedCookie.row, "cookieTable").firstChild;
        for (var row = tbody.firstChild; row; row = row.nextSibling) {
            if (Css.hasClass(row, "cookieRow") && row.repObject)
                text += row.repObject.toString() + "\n";
        }

        copyToClipboard(text);
    },

    onPaste: function(clickedCookie) // clickedCookie can be null if the user clicks within panel area.
    {
        var context = Firebug.currentContext;
        var values = CookieClipboard.getFrom();
        if (!values || !context)
            return;

        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.Get cookie values from clipboard", values);

        // Change name so it's unique and use the current host.
        values.name = Firebug.CookieModule.getDefaultCookieName(context, values.name);
        values.host = context.browser.currentURI.host;

        values.rawValue = values.value;
        values.value = unescape(values.value);

        // If the expire time isn't set use the default value.
        if (values.expires == undefined)
            values.expires = Firebug.CookieModule.getDefaultCookieExpireTime();

        // Create/modify cookie.
        var cookie = new Cookie(values);
        Firebug.CookieModule.createCookie(cookie);

        if (FBTrace.DBG_COOKIES)
            checkList(context.getPanel(panelName, true));
    },

    onRemove: function(cookie)
    {
        // Get the real XPCOM cookie object and remove it.
        var realCookie = cookie.cookie;
        if (!cookie.cookie.rejected)
            Firebug.CookieModule.removeCookie(realCookie.host, realCookie.name, realCookie.path);
    },

    onEdit: function(cookie)
    {
        var params = {
            cookie: cookie.cookie,
            action: "edit",
            window: null,
            EditCookie: EditCookie,
            Firebug: Firebug,
            FBTrace: FBTrace,
        };

        var parent = Firebug.currentContext.chrome.window;
        return parent.openDialog("chrome://firebug/content/cookies/editCookie.xul",
            "_blank", "chrome,centerscreen,resizable=yes,modal=yes",
            params);
    },

    onClearValue: function(cookie)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onClearValue;", cookie);

        var newCookie = new Firebug.CookieModule.Cookie(cookie.cookie);
        newCookie.cookie.rawValue = "";
        Firebug.CookieModule.createCookie(newCookie);
    },

    // Event handlers
    onClickDomain: function(event)
    {
        if (Events.isLeftClick(event))
        {
            var domain = event.target.innerHTML;
            if (domain)
            {
                Events.cancelEvent(event);
                event.cancelBubble = true;
                //xxxHonza www.google.com (more windows are opened)
                // openNewTab(domain);
            }
        }
    },

    onClickRowHeader: function(event)
    {
        Events.cancelEvent(event);

        var rowHeader = event.target;
        if (!Css.hasClass(rowHeader, "cookieRowHeader"))
            return;

        var row = Dom.getAncestorByClass(event.target, "cookieRow");
        if (!row)
            return;

        var context = Firebug.getElementPanel(row).context;
        Breakpoints.onBreakOnCookie(context, row.repObject);
    },

    onClickRow: function(event)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.Click on cookie row.", event);

        if (Events.isLeftClick(event))
        {
            var row = Dom.getAncestorByClass(event.target, "cookieRow");
            if (row)
            {
                this.toggleRow(row);
                Events.cancelEvent(event);
            }
        }
    },

    toggleRow: function(row, forceOpen)
    {
        var opened = Css.hasClass(row, "opened");
        if (opened && forceOpen)
            return;

        Css.toggleClass(row, "opened");

        if (Css.hasClass(row, "opened"))
        {
            var bodyRow = this.bodyRow.insertRows({}, row)[0];
            var bodyCol = Dom.getElementByClass(bodyRow, "cookieInfoCol");
            var cookieInfo = this.bodyTag.replace({cookie: row.repObject}, bodyCol);

            // If JSON or XML tabs are available select them by default.
            if (this.selectTabByName(cookieInfo, "Json"))
                return;

            if (this.selectTabByName(cookieInfo, "Xml"))
                return;

            this.selectTabByName(cookieInfo, "Value");
        }
        else
        {
            row.parentNode.removeChild(row.nextSibling);
        }
    },

    selectTabByName: function(cookieInfoBody, tabName)
    {
        var tab = Dom.getChildByClass(cookieInfoBody, "cookieInfoTabs",
            "cookieInfo" + tabName + "Tab");

        // Don't select collapsed tabs. 
        if (tab && !Css.hasClass(tab, "collapsed"))
            return this.selectTab(tab);

        return false;
    },

    onClickTab: function(event)
    {
        this.selectTab(event.currentTarget);
    },

    selectTab: function(tab)
    {
        var cookieInfoBody = tab.parentNode.parentNode;

        var view = tab.getAttribute("view");
        if (cookieInfoBody.selectedTab)
        {
            cookieInfoBody.selectedTab.removeAttribute("selected");
            cookieInfoBody.selectedText.removeAttribute("selected");
        }

        var textBodyName = "cookieInfo" + view + "Text";

        cookieInfoBody.selectedTab = tab;
        cookieInfoBody.selectedText = Dom.getChildByClass(cookieInfoBody, textBodyName);

        cookieInfoBody.selectedTab.setAttribute("selected", "true");
        cookieInfoBody.selectedText.setAttribute("selected", "true");

        var cookie = Firebug.getRepObject(cookieInfoBody);
        var context = Firebug.getElementPanel(cookieInfoBody).context;
        this.updateInfo(cookieInfoBody, cookie, context);

        return true;
    },

    updateRow: function(cookie, context)
    {
        var panel = context.getPanel(panelName, true);
        if (!panel)
            return;

        var parent = cookie.row.parentNode;
        var nextSibling = cookie.row.nextSibling;
        parent.removeChild(cookie.row);

        var row = CookieReps.CookieRow.cookieTag.insertRows({cookies: [cookie]}, 
            panel.table.lastChild.lastChild)[0];

        var opened = Css.hasClass(cookie.row, "opened");

        cookie.row = row;
        row.repObject = cookie;

        if (nextSibling && row.nextSibling != nextSibling)
        {
            parent.removeChild(cookie.row);
            parent.insertBefore(row, nextSibling);
        }

        if (opened)
            Css.setClass(row, "opened");

        Breakpoints.updateBreakpoint(context, cookie);
    },

    updateInfo: function(cookieInfoBody, cookie, context)
    {
        var tab = cookieInfoBody.selectedTab;
        if (Css.hasClass(tab, "cookieInfoValueTab"))
        {
            var valueBox = Dom.getChildByClass(cookieInfoBody, "cookieInfoValueText");
            if (!cookieInfoBody.valuePresented)
            {
                cookieInfoBody.valuePresented = true;

                var text = cookie.cookie.value;
                if (text != undefined)
                    Str.insertWrappedText(text, valueBox);
            }
        }
        else if (Css.hasClass(tab, "cookieInfoRawValueTab"))
        {
            var valueBox = Dom.getChildByClass(cookieInfoBody, "cookieInfoRawValueText");
            if (!cookieInfoBody.rawValuePresented)
            {
                cookieInfoBody.rawValuePresented = true;

                var text = cookie.cookie.rawValue;
                if (text != undefined)
                    Str.insertWrappedText(text, valueBox);
            }
        }
        else if (Css.hasClass(tab, "cookieInfoJsonTab"))
        {
            var valueBox = Dom.getChildByClass(cookieInfoBody, "cookieInfoJsonText");
            if (!cookieInfoBody.jsonPresented)
            {
                cookieInfoBody.jsonPresented = true;

                var jsonObject = cookie.getJsonValue();
                if (jsonObject) {
                    Firebug.DOMPanel.DirTable.tag.replace(
                        {object: jsonObject, toggles: this.toggles}, valueBox);
                }
            }
        }
        else if (Css.hasClass(tab, "cookieInfoXmlTab"))
        {
            var valueBox = Dom.getChildByClass(cookieInfoBody, "cookieInfoXmlText");
            if (!cookieInfoBody.xmlPresented)
            {
                cookieInfoBody.xmlPresented = true;

                var docElem = cookie.getXmlValue();
                if (docElem) {
                    var tag = Firebug.HTMLPanel.CompleteElement.getNodeTag(docElem);
                    tag.replace({object: docElem}, valueBox);
                }
            }
        }
    },

    updateTabs: function(cookieInfoBody, cookie, context)
    {
        // Iterate over all info-tabs and update visibility.
        var cookieInfoTabs = Dom.getElementByClass(cookieInfoBody, "cookieInfoTabs");
        var tab = cookieInfoTabs.firstChild;
        while (tab)
        {
            var view = tab.getAttribute("view");
            var hideTabCallback = CookieReps.CookieRow["hide" + view + "Tab"];
            if (hideTabCallback)
            {
                if (hideTabCallback(cookie))
                    Css.setClass(tab, "collapsed");
                else
                    Css.removeClass(tab, "collapsed");
            }

            tab = tab.nextSibling;
        }

        // If the selected tab was collapsed, make sure another one is selected.
        if (Css.hasClass(cookieInfoBody.selectedTab, "collapsed"))
        {
            if (this.selectTabByName(cookieInfoBody, "Json"))
                return;

            if (this.selectTabByName(cookieInfoBody, "Xml"))
                return;

            this.selectTabByName(cookieInfoBody, "Value");
        }
    }
});

// ********************************************************************************************* //
// Console Event Templates (domplate)

/**
 * @domplate This template is used for displaying cookie-changed events
 * (except of "clear") in the Console tab.
 */
CookieReps.CookieChanged = domplate(CookieReps.Rep,
{
    inspectable: false,

    // Console
    tag:
        DIV({"class": "cookieEvent", _repObject: "$object"},
            TABLE({cellpadding: 0, cellspacing: 0},
                TBODY(
                    TR(
                        TD({width: "100%"},
                            SPAN(Locale.$STR("firecookie.console.cookie"), " "),
                            SPAN({"class": "cookieNameLabel", onclick: "$onClick"}, 
                                "$object|getName", 
                                " "),
                            SPAN({"class": "cookieActionLabel"}, 
                                "$object|getAction", 
                                ".&nbsp;&nbsp;"),
                            SPAN({"class": "cookieValueLabel"}, 
                                "$object|getValue")
                        ),
                        TD(
                            SPAN({"class": "cookieDomainLabel", onclick: "$onClickDomain",
                                title: "$object|getOriginalURI"}, "$object|getDomain"),
                            SPAN("&nbsp;") 
                        )
                    )
                )
            )
        ),

    // Event handlers
    onClick: function(event)
    {
        if (!Events.isLeftClick(event))
            return;

        var target = event.target;

        // Get associated nsICookie object.
        var cookieEvent = Firebug.getRepObject(target);
        if (!cookieEvent)
            return;

        var cookieWrapper = new Cookie(CookieUtils.makeCookieObject(cookieEvent.cookie));
        var context = Firebug.getElementPanel(target).context;
        context.chrome.select(cookieWrapper, panelName);
    },

    onClickDomain: function(event)
    {
    },

    getOriginalURI: function(cookieEvent)
    {
        var context = cookieEvent.context;
        var strippedHost = cookieEvent.rawHost;

        if (!context.cookies.activeCookies)
            return strippedHost;

        var cookie = cookieEvent.cookie;
        var activeCookies = context.cookies.activeCookies[cookie.host];
        if (!activeCookies)
            return strippedHost;

        var activeCookie = activeCookies[CookieUtils.getCookieId(cookie)];

        var originalURI;
        if (activeCookie)
            originalURI = activeCookie.originalURI.spec;
        else 
            originalURI = cookieEvent.rawHost;

        if (FBTrace.DBG_COOKIES)
        {
            FBTrace.sysout("cookies.context.cookies.activeCookies[" + cookie.host + "]",
                activeCookies);

            FBTrace.sysout("cookies.Original URI for: " + CookieUtils.getCookieId(cookie) + 
                " is: " + originalURI, activeCookie);
        }

        return originalURI;
    },

    getAction: function(cookieEvent)
    {
        // Return properly localized action.
        switch(cookieEvent.action)
        {
          case "deleted":
              return Locale.$STR("firecookie.console.deleted");
          case "added":
              return Locale.$STR("firecookie.console.added");
          case "changed":
              return Locale.$STR("firecookie.console.changed");
          case "cleared":
              return Locale.$STR("firecookie.console.cleared");
        }

        return "";
    },

    getName: function(cookieEvent) {
        return cookieEvent.cookie.name;
    },

    getValue: function(cookieEvent) {
        return Str.cropString(cookieEvent.cookie.value, 75);
    },

    getDomain: function(cookieEvent) {
        return cookieEvent.cookie.host;
    },

    // Firebug rep support
    supportsObject: function(cookieEvent)
    {
        return cookieEvent instanceof CookieEvents.CookieChangedEvent;
    },

    browseObject: function(cookieEvent, context)
    {
        return false;
    },

    getRealObject: function(cookieEvent, context)
    {
        return cookieEvent;
    },

    // Context menu
    getContextMenuItems: function(cookieEvent, target, context)
    {
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);
    }
});

// ********************************************************************************************* //

/**
 * @domplate Represents a domplate template for displaying rejected cookies.
 */
CookieReps.CookieRejected = domplate(CookieReps.Rep,
/** @lends CookieReps.CookieRejected */
{
    inspectable: false,

    tag:
        DIV({"class": "cookieEvent", _repObject: "$object"},
            TABLE({cellpadding: 0, cellspacing: 0},
                TBODY(
                    TR(
                        TD({width: "100%"},
                            SPAN({"class": "cookieRejectedLabel"},
                                Locale.$STR("firecookie.console.cookiesrejected")),
                            " ",
                            SPAN({"class": "cookieRejectedList"},
                                "$object|getCookieList")
                        ),
                        TD(
                            SPAN({"class": "cookieDomainLabel", onclick: "$onClickDomain"}, 
                                "$object|getDomain"),
                            SPAN("&nbsp;") 
                        )
                    )
                )
            )
        ),

    supportsObject: function(object)
    {
        return object instanceof CookieEvents.CookieRejectedEvent;
    },

    getDomain: function(cookieEvent)
    {
        return cookieEvent.uri.host;
    },

    getCookieList: function(cookieEvent)
    {
        var context = cookieEvent.context;
        var activeHost = context.cookies.activeHosts[cookieEvent.uri.host];
        var cookies = activeHost.receivedCookies;
        if (!cookies)
            return Locale.$STR("firecookie.console.nocookiesreceived");

        var label = "";
        for (var i=0; i<cookies.length; i++)
            label += cookies[i].cookie.name + ((i<cookies.length-1) ? ", " : "");

        return Str.cropString(label, 75);
    },

    onClickDomain: function(event)
    {
    },

    // Context menu
    getContextMenuItems: function(cookie, target, context)
    {
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);
    }
});

// ********************************************************************************************* //

/**
 * @domplate Represents a domplate template for cookie cleared event that is
 * visualised in Firebug Console panel.
 */
CookieReps.CookieCleared = domplate(CookieReps.Rep,
/** @lends CookieReps.CookieCleared */
{
    inspectable: false,

    tag:
        DIV({_repObject: "$object"},
            DIV("$object|getLabel")
        ),

    supportsObject: function(object)
    {
        return object instanceof CookieEvents.CookieClearedEvent;
    },

    getLabel: function()
    {
        return Locale.$STR("firecookie.console.cookiescleared");
    },

    // Context menu
    getContextMenuItems: function(cookie, target, context)
    {
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);
    }
});

// ********************************************************************************************* //
// Header Template (domplate)

/**
 * @domplate Represents a template for basic cookie list layout. This
 * template also includes a header and related functionality (such as sorting).
 */
CookieReps.CookieTable = domplate(CookieReps.Rep,
/** @lends CookieReps.CookieTable */
{
    inspectable: false,

    tableTag:
        TABLE({"class": "cookieTable", cellpadding: 0, cellspacing: 0, hiddenCols: ""},
            TBODY(
                TR({"class": "cookieHeaderRow", onclick: "$onClickHeader"},
                    TD({id: "cookieBreakpointBar", width: "1%", "class": "cookieHeaderCell"},
                        "&nbsp;"
                    ),
                    TD({id: "colName", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.name.tooltip")}, 
                        Locale.$STR("firecookie.header.name"))
                    ),
                    TD({id: "colValue", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.value.tooltip")}, 
                        Locale.$STR("firecookie.header.value"))
                    ),
                    TD({id: "colDomain", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.domain.tooltip")}, 
                        Locale.$STR("firecookie.header.domain"))
                    ),
                    TD({id: "colSize", "class": "cookieHeaderCell"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.size.tooltip")}, 
                        Locale.$STR("firecookie.header.size"))
                    ),
                    TD({id: "colPath", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.path.tooltip")}, 
                        Locale.$STR("firecookie.header.path"))
                    ),
                    TD({id: "colExpires", "class": "cookieHeaderCell"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.expires.tooltip")}, 
                        Locale.$STR("firecookie.header.expires"))
                    ),
                    TD({id: "colHttpOnly", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.httponly.tooltip")}, 
                        Locale.$STR("firecookie.header.httponly"))
                    ),
                    TD({id: "colSecurity", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.security.tooltip")}, 
                        Locale.$STR("firecookie.header.security"))
                    ),
                    TD({id: "colStatus", "class": "cookieHeaderCell alphaValue"},
                        DIV({"class": "cookieHeaderCellBox", title: Locale.$STR("firecookie.header.status.tooltip")}, 
                        Locale.$STR("firecookie.header.status"))
                    )
                )
            )
        ),

    onClickHeader: function(event)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onClickHeader");

        if (!Events.isLeftClick(event))
            return;

        var table = Dom.getAncestorByClass(event.target, "cookieTable");
        var column = Dom.getAncestorByClass(event.target, "cookieHeaderCell");
        this.sortColumn(table, column);
    },

    sortColumn: function(table, col, direction)
    {
        if (!col)
            return;

        if (typeof(col) == "string")
        {
            var doc = table.ownerDocument;
            col = doc.getElementById(col);
        }

        if (!col)
            return;

        var numerical = !Css.hasClass(col, "alphaValue");

        var colIndex = 0;
        for (col = col.previousSibling; col; col = col.previousSibling)
            ++colIndex;

        this.sort(table, colIndex, numerical, direction);
    },

    sort: function(table, colIndex, numerical, direction)
    {
        var tbody = table.lastChild;
        var headerRow = tbody.firstChild;

        // Remove class from the currently sorted column
        var headerSorted = Dom.getChildByClass(headerRow, "cookieHeaderSorted");
        Css.removeClass(headerSorted, "cookieHeaderSorted");

        // Mark new column as sorted.
        var header = headerRow.childNodes[colIndex];
        Css.setClass(header, "cookieHeaderSorted");

        // If the column is already using required sort direction, bubble out.
        if ((direction == "desc" && header.sorted == 1) ||
            (direction == "asc" && header.sorted == -1))
            return;

        var values = [];
        for (var row = tbody.childNodes[1]; row; row = row.nextSibling)
        {
            var cell = row.childNodes[colIndex];
            var value = numerical ? parseFloat(cell.textContent) : cell.textContent;

            // Issue 43, expires date is formatted in the UI, so use the original cookie
            // value instead.
            if (Css.hasClass(cell, "cookieExpiresCol"))
                value = row.repObject.cookie.expires;

            if (Css.hasClass(row, "opened"))
            {
                var cookieInfoRow = row.nextSibling;
                values.push({row: row, value: value, info: cookieInfoRow});
                row = cookieInfoRow;
            }
            else
            {
                values.push({row: row, value: value});
            }
        }

        values.sort(function(a, b) { return a.value < b.value ? -1 : 1; });

        if ((header.sorted && header.sorted == 1) || (!header.sorted && direction == "asc"))
        {
            Css.removeClass(header, "sortedDescending");
            Css.setClass(header, "sortedAscending");

            header.sorted = -1;

            for (var i = 0; i < values.length; ++i)
            {
                tbody.appendChild(values[i].row);
                if (values[i].info)
                    tbody.appendChild(values[i].info);
            }
        }
        else
        {
            Css.removeClass(header, "sortedAscending");
            Css.setClass(header, "sortedDescending");

            header.sorted = 1;

            for (var i = values.length-1; i >= 0; --i)
            {
                tbody.appendChild(values[i].row);
                if (values[i].info)
                    tbody.appendChild(values[i].info);
            }
        }

        // Remember last sorted column & direction in preferences.
        var prefValue = header.getAttribute("id") + " " + (header.sorted > 0 ? "desc" : "asc");
        Options.set(lastSortedColumn, prefValue);
    },

    supportsObject: function(object)
    {
        return (object == this);
    },

    /**
     * Provides menu items for header context menu.
     */
    getContextMenuItems: function(object, target, context)
    {
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);

        var items = [];

        // Iterate over all columns and create a menu item for each.
        var table = context.getPanel(panelName, true).table;
        var hiddenCols = table.getAttribute("hiddenCols");

        var lastVisibleIndex;
        var visibleColCount = 0;

        var header = Dom.getAncestorByClass(target, "cookieHeaderRow");

        // Skip the first column for breakpoints.
        var columns = Arr.cloneArray(header.childNodes);
        columns.shift();

        for (var i=0; i<columns.length; i++)
        {
            var column = columns[i];
            var visible = (hiddenCols.indexOf(column.id) == -1);

            items.push({
                label: column.textContent,
                type: "checkbox",
                checked: visible,
                nol10n: true,
                command: Obj.bindFixed(this.onShowColumn, this, context, column.id)
            });

            if (visible)
            {
                lastVisibleIndex = i;
                visibleColCount++;
            }
        }

        // If the last column is visible, disable its menu item.
        if (visibleColCount == 1)
            items[lastVisibleIndex].disabled = true;

        items.push("-");
        items.push({
            label: Locale.$STR("net.header.Reset Header"),
            nol10n: true, 
            command: Obj.bindFixed(this.onResetColumns, this, context)
        });

        return items;
    },

    onShowColumn: function(context, colId)
    {
        var table = context.getPanel(panelName, true).table;
        var hiddenCols = table.getAttribute("hiddenCols");

        // If the column is already presented in the list of hidden columns,
        // remove it, otherwise append.
        var index = hiddenCols.indexOf(colId);
        if (index >= 0)
        {
            table.setAttribute("hiddenCols", hiddenCols.substr(0,index-1) +
                hiddenCols.substr(index+colId.length));
        }
        else
        {
            table.setAttribute("hiddenCols", hiddenCols + " " + colId);
        }

        // Store current state into the preferences.
        Option.set(hiddenColsPref, table.getAttribute("hiddenCols"));
    },

    onResetColumns: function(context)
    {
        var panel = context.getPanel(panelName, true);
        var header = Dom.getElementByClass(panel.panelNode, "cookieHeaderRow");

        // Reset widths
        var columns = header.childNodes;
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            if (col.style)
                col.style.width = "";
        }

        // Reset visibility. Only the Status column is hidden by default.
        panel.table.setAttribute("hiddenCols", "colStatus");
        Options.set(hiddenColsPref, "colStatus");
    },

    createTable: function(parentNode)
    {
        // Create cookie table UI.
        var table = this.tableTag.replace({}, parentNode, this);

        // Update columns width according to the preferences.
        var header = Dom.getElementByClass(table, "cookieHeaderRow");
        var columns = header.getElementsByTagName("td");
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            var colId = col.getAttribute("id");
            if (!colId || !col.style)
                continue;

            var width = Options.get("firecookie." + colId + ".width");
            if (width)
                col.style.width = width + "px";
        }

        return table;
    },

    render: function(cookies, parentNode)
    {
        // Create basic cookie-list structure.
        var table = this.createTable(parentNode);
        var header = Dom.getElementByClass(table, "cookieHeaderRow");

        var tag = CookieReps.CookieRow.cookieTag;
        return tag.insertRows({cookies: cookies}, header);
    }
});

// ********************************************************************************************* //

var OBJECTLINK = FirebugReps.OBJECTLINK;

// xxxHonza: TODO
CookieReps.CookieRep = domplate(CookieReps.Rep,
{
    tag:
        OBJECTLINK(
            SPAN({"class": "objectTitle"}, "$object|getTitle")
        ),

    className: "cookie",

    supportsObject: function(cookie)
    {
        return cookie instanceof Cookie;
    },

    getTitle: function(cookie)
    {
        return cookie.cookie.name;
    },

    getTooltip: function(cookie)
    {
        return cookie.cookie.value;
    }
});

// ********************************************************************************************* //
// Debug helpers

function checkList(panel)
{
    if (!FBTrace.DBG_COOKIES)
        return;

    if (!panel || !this.panelNode)
        return; 

    var row = Dom.getElementByClass(this.panelNode, "cookieRow");
    while (row)
    {
        var rep = row.repObject;
        if ((rep.cookie.name != row.firstChild.firstChild.innerHTML) ||
            (rep.cookie.path != row.childNodes[3].firstChild.innerHTML))
        {
            FBTrace("---> Check failed!");
            FBTrace("--->" + rep.rawHost + ", " + rep.cookie.name + ", " +
                rep.cookie.path);
            FBTrace("    " + row.firstChild.firstChild.innerHTML + ", " +
                row.childNodes[3].firstChild.innerHTML);
        }

        row = row.nextSibling;
    }

    return null;
}

// ********************************************************************************************* //
// Firebug Registration

Firebug.registerRep(
    //CookieReps.CookieRep,          // Cookie
    CookieReps.CookieTable,          // Cookie table with list of cookies
    CookieReps.CookieRow,            // Entry in the cookie table
    CookieReps.CookieChanged,        // Console: "cookie-changed" event
    CookieReps.CookieRejected,       // Console: "cookie-rejected" event
    CookieReps.CookieCleared         // Console: cookies "cleared" event
);

return CookieReps;

// ********************************************************************************************* //
}}