function _init() {
    var db = require('ripple/db'),
        utils = require('ripple/utils'),
        allTZ, dbTZ, node = jQuery("#time-locale-select"),
        timezone = require('ripple/platform/tizen/1.0/timezone_info'),
        event = require('ripple/event'),
        timeNode = jQuery("#current-time"),
        triggerNode = jQuery("#trigger-alarm-id"),
        alarms, time, timeId;

    function triggerAlarm() {
        time = new Date();
        timeNode.empty();
        timeNode.append(utils.createElement("span", {
            "innerHTML": " " + time.toLocaleTimeString()
        }));
        alarms = db.retrieveObject("tizen1.0-db-alarms");
        if (alarms !== null) {
            utils.forEach(alarms, function (obj) {
                if (obj.id !== undefined) {
                    event.trigger("CheckAlarm", [obj.id]);
                }
            });
        }
    }
    window.setInterval(triggerAlarm, 1000);

    allTZ = timezone.getAllTimezone();
    utils.forEach(allTZ, function (tz) {
        node.append(utils.createElement("option", {
            "value": tz,
            "innerHTML": tz + " - " + timezone.getTimezoneAbbr(tz) + "(" + timezone.getTimezoneDiff(tz) + ")"
        }));
    });
    dbTZ = db.retrieve("tizen-timezone");
    if (timezone.isValidTimezone(dbTZ)) {
        node.val(dbTZ);
    } else {
        db.save("tizen-timezone", node.val());
    }
    node.bind("change", function () {
        db.save("tizen-timezone", node.val());
    });

    event.on("SendTriggerAppId", function (applicationId) {
        if (timeId !== undefined)
            clearTimeout(timeId);
        triggerNode.empty();
        triggerNode.append(utils.createElement("p", {
            "innerHTML": applicationId + " is triggered"
        }));
        triggerNode.show();
        timeId = setTimeout("jQuery('#trigger-alarm-id').empty();", 10000);// Comments will disappear after 10s
    });
}