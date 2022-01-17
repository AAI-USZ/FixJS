function(Obj, Locale, Str, Domplate, Css, CookieUtils) {

with (Domplate) {

// ********************************************************************************************* //
// Constants

const panelName = "cookies";

// ********************************************************************************************* //
// Implementation

var Breakpoints =
{
    breakOnCookie: function(context, cookie, action)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.breakOnCookie; " + action);

        var halt = false;
        var conditionIsFalse = false;

        // If there is an enabled breakpoint with condition:
        // 1) break if the condition is evaluated to true.
        var bp = context.cookies.breakpoints.findBreakpoint(CookieUtils.makeCookieObject(cookie));
        if (bp && bp.checked)
        {
            halt = true;
            if (bp.condition)
            {
                halt = bp.evaluateCondition(context, cookie);
                conditionIsFalse = !halt;
            }
        }

        // 2) If break on next flag is set and there is no condition evaluated to false,
        // break with "break on next" breaking cause (this new breaking cause can override
        // an existing one that is set when evaluating a breakpoint condition).
        if (context.breakOnCookie && !conditionIsFalse)
        {
            context.breakingCause = {
                title: Locale.$STR("firecookie.Break On Cookie"),
                message: Str.cropString(unescape(cookie.name + "; " + cookie.value), 200)
            };
            halt = true;
        }

        // Ignore if there is no reason to break.
        if (!halt)
            return;

        // Even if the execution was stopped at breakpoint reset the global
        // breakOnCookie flag.
        context.breakOnCookie = false;

        this.breakNow(context);

        // Clear breakpoint associated with removed cookie.
        if (action == "deleted")
        {
            breakpoints.removeBreakpoint(bp);
            context.invalidatePanels("breakpoints");
        }
    },

    breakNow: function(context)
    {
        if (Firebug.Breakpoint && Firebug.Breakpoint.updatePanelTab)
        {
            var panel = context.getPanel(panelName, true);
            Firebug.Breakpoint.updatePanelTab(panel, false);

            // xxxHonza: fix this
            // Don't utilize Firebug.Breakpoint.breakNow since the code doesn't
            // exclude firecookie files from the stack (chrome://firecookie/)
            // Firebug.Debugger.breakNowURLPrefix must be changed to: "chrome://",
            //Firebug.Breakpoint.breakNow(context.getPanel(panelName, true));
            //return;
        }

        Firebug.Debugger.halt(function(frame)
        {
            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.breakNow; debugger halted");

            for (; frame && frame.isValid; frame = frame.callingFrame)
            {
                var fileName = frame.script.fileName;
                if (fileName &&
                    fileName.indexOf("chrome://firebug/") != 0 &&
                    fileName.indexOf("chrome://firecookie/") != 0 &&
                    fileName.indexOf("/components/firebug-") == -1 &&
                    fileName.indexOf("/modules/firebug-") == -1)
                    break;
            }

            if (frame)
            {
                Firebug.Debugger.breakContext = context;
                Firebug.Debugger.onBreak(frame, 3);
            }
            else
            {
                if (FBTrace.DBG_COOKIES)
                    FBTrace.sysout("cookies.breakNow; NO FRAME");
            }
        });
    },

    getContextMenuItems: function(cookie, target, context)
    {
        var items = [];
        items.push("-");

        var cookieName = Str.cropString(cookie.cookie.name, 40);
        var bp = context.cookies.breakpoints.findBreakpoint(cookie.cookie);

        items.push({
            nol10n: true,
            tooltiptext: Locale.$STRF("firecookie.menu.tooltip.Break On Cookie", [cookieName]),
            label: Locale.$STRF("firecookie.menu.Break On Cookie", [cookieName]),
            type: "checkbox",
            checked: bp != null,
            command: Obj.bindFixed(this.onBreakOnCookie, this, context, cookie),
        });

        if (bp)
        {
            items.push(
                {label: "firecookie.menu.Edit Breakpoint Condition",
                    command: Obj.bindFixed(this.editBreakpointCondition, this, context, cookie) }
            );
        }

        return items;
    },

    onBreakOnCookie: function(context, cookie)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.breakOnCookie; ", context);

        var breakpoints = context.cookies.breakpoints;

        // Remove an existing or create a new breakpoint.
        var row = cookie.row;
        cookie = cookie.cookie;
        var bp = breakpoints.findBreakpoint(cookie);
        if (bp)
        {
            breakpoints.removeBreakpoint(cookie);
            row.removeAttribute("breakpoint");
            row.removeAttribute("disabledBreakpoint");
        }
        else
        {
            breakpoints.addBreakpoint(cookie);
            row.setAttribute("breakpoint", "true");
        }
    },

    updateBreakpoint: function(context, cookie)
    {
        // Make sure a breakpoint is displayed.
        var bp = context.cookies.breakpoints.findBreakpoint(cookie.cookie)
        if (!bp)
            return;

        var row = cookie.row;
        row.setAttribute("breakpoint", "true");
        row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
    },

    onContextMenu: function(context, event)
    {
        if (!Css.hasClass(event.target, "sourceLine"))
            return;

        var row = Dom.getAncestorByClass(event.target, "cookieRow");
        if (!row)
            return;

        var cookie = row.repObject;
        var bp = context.cookies.breakpoints.findBreakpoint(cookie.cookie);
        if (!bp)
            return;

        this.editBreakpointCondition(context, cookie);
        Events.cancelEvent(event);
    },

    editBreakpointCondition: function(context, cookie)
    {
        var bp = context.cookies.breakpoints.findBreakpoint(cookie.cookie);
        if (!bp)
            return;

        var condition = bp ? bp.condition : "";

        var panel = context.getPanel(panelName);
        panel.selectedSourceBox = cookie.row;
        Firebug.Editor.startEditing(cookie.row, condition);
    },
}

// ********************************************************************************************* //
// Cookie Breakpoints

Breakpoints.BreakpointTemplate = Domplate.domplate(Firebug.Rep,
{
    inspectable: false,

    tag:
        DIV({"class": "breakpointRow focusRow", _repObject: "$bp",
            role: "option", "aria-checked": "$bp.checked"},
            DIV({"class": "breakpointBlockHead", onclick: "$onEnable"},
                INPUT({"class": "breakpointCheckbox", type: "checkbox",
                    _checked: "$bp.checked", tabindex : "-1"}),
                SPAN("$bp|getTitle"),
                DIV({"class": "breakpointMutationType"}, "$bp|getType"),
                IMG({"class": "closeButton", src: "blank.gif", onclick: "$onRemove"})
            ),
            DIV({"class": "breakpointCode"},
                SPAN("$bp|getValue")
            )
        ),

    getTitle: function(bp)
    {
        return bp.name;
    },

    getValue: function(bp)
    {
        return bp.host + bp.path;
    },

    getType: function(bp)
    {
        return Locale.$STR("Break On Cookie Change");
    },

    onRemove: function(event)
    {
        Events.cancelEvent(event);

        var bpPanel = Firebug.getElementPanel(event.target);
        var context = bpPanel.context;

        if (!Css.hasClass(event.target, "closeButton"))
            return;

        // Remove from list of breakpoints.
        var row = Dom.getAncestorByClass(event.target, "breakpointRow");
        context.cookies.breakpoints.removeBreakpoint(row.repObject);

        // Remove from the UI.
        bpPanel.noRefresh = true;
        bpPanel.removeRow(row);
        bpPanel.noRefresh = false;

        var cookiePanel = context.getPanel(panelName, true);
        if (!cookiePanel)
            return;

        var cookie = cookiePanel.findRepObject(row.repObject);
        if (cookie)
        {
            cookie.row.removeAttribute("breakpoint");
            cookie.row.removeAttribute("disabledBreakpoint");
        }
    },

    onEnable: function(event)
    {
        var checkBox = event.target;
        if (!Css.hasClass(checkBox, "breakpointCheckbox"))
            return;

        var bp = Dom.getAncestorByClass(checkBox, "breakpointRow").repObject;
        bp.checked = checkBox.checked;

        var bpPanel = Firebug.getElementPanel(checkBox);
        var cookiePanel = bpPanel.context.getPanel(panelName, true);
        if (!cookiePanel)
            return;

        var cookie = cookiePanel.findRepObject(bp);
        if (cookie)
            cookie.row.setAttribute("disabledBreakpoint", bp.checked ? "false" : "true");
    },

    supportsObject: function(object)
    {
        return object instanceof Breakpoints.Breakpoint;
    }
});

// ********************************************************************************************* //
// Editor for Cookie breakpoint condition.

Breakpoints.ConditionEditor = function(doc)
{
    Firebug.Breakpoint.ConditionEditor.apply(this, arguments);
}

Breakpoints.ConditionEditor.prototype = Domplate.domplate(Firebug.Breakpoint.ConditionEditor.prototype,
{
    endEditing: function(target, value, cancel)
    {
        if (cancel)
            return;

        var cookie = target.repObject;
        var panel = Firebug.getElementPanel(target);
        var bp = panel.context.cookies.breakpoints.findBreakpoint(cookie.cookie);
        if (bp)
            bp.condition = value;
    }
});

// ********************************************************************************************* //

/**
 * @domplate Template for cookie breakpoint displayed in the Breakpoints side
 * panel.
 */
Breakpoints.Breakpoint = function(cookie)
{
    this.name = cookie.name;
    this.host = cookie.host;
    this.path = cookie.path;

    this.condition = "";
    this.checked = true;

    this.onEvaluateFails = Obj.bind(this.onEvaluateFails, this);
    this.onEvaluateSucceeds =  Obj.bind(this.onEvaluateSucceeds, this);
};

Breakpoints.Breakpoint.prototype =
{
    evaluateCondition: function(context, cookie)
    {
        try
        {
            var scope = {};
            scope["value"] = cookie.value;
            scope["cookie"] = CookieUtils.makeCookieObject(cookie);

            // The callbacks will set this if the condition is true or if the eval faults.
            delete context.breakingCause;

            // Construct expression to evaluate. Native JSON support is available since
            // Firefox 3.5 and breakpoints since Firebug 1.5, which supports min Fx 3.5
            // So, all is good.
            var expr = "(function (){var scope = " + JSON.stringify(scope) +
                "; with (scope) { return " + this.condition + ";}})();"

            // Evaluate condition using Firebug's command line.
            var rc = Firebug.CommandLine.evaluate(expr, context, null, context.window,
                this.onEvaluateSucceeds, this.onEvaluateFails);

            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.evaluateCondition; rc " + rc, {expr: expr, scope: scope});

            return !!context.breakingCause;
        }
        catch (err)
        {
            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.evaluateCondition; EXCEPTION", err);
        }

        return false;
    },

    onEvaluateSucceeds: function(result, context)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onEvaluateSucceeds; " + result, result);

        // Don't set the breakingCause if the breakpoint condition is evaluated to false.
        if (!result)
            return;

        context.breakingCause = {
            title: Locale.$STR("firecookie.Break On Cookie"),
            message: Str.cropString(unescape(this.name + "; " + this.condition + "; "), 200)
        };
    },

    onEvaluateFails: function(result, context)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onEvaluateFails; " + result, result);

        context.breakingCause = {
            title: Locale.$STR("firecookie.Break On Cookie"),
            message: Locale.$STR("firecookie.Breakpoint condition evaluation fails"),
            prevValue: this.condition, newValue:result
        };
    }
}

// ********************************************************************************************* //
// Registration

Firebug.registerRep(Breakpoints.BreakpointTemplate);

return Breakpoints;

// ********************************************************************************************* //
}}