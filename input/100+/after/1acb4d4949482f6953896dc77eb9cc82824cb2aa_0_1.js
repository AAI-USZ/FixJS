function _updateInformationView() {
    var infoPane = document.getElementById(constants.COMMON.INFO_SECTION),
        infoList = [],
        device = devices.getCurrentDevice(),
        tempString = "",
        widgetInfo = app.getInfo();

    //TODO: refactor this stuff to grab info from API, do this in a loop rather then hardcoded. Better DOM injection approach. This is legacy code

    infoList.push('<section id=\"information-banner\" style=\"display:none\"><img id=\"information-banner-icon\" width=\"16px\" height=\"16px\"/> <span id=\"information-banner-count\"></span></section>');

    if (widgetInfo.icon) {
        infoList.push('<section style="position: absolute; left: 260px;"  class="information-widgeticon"><img class="ui-corner-all" width="64" src="' + utils.appLocation() + widgetInfo.icon + '" alt="widget icon"/></section>');
    }
    if (widgetInfo.name) {
        infoList.push('<section class="information-widgetname">' + widgetInfo.name + '</section>');
        //Update Title
        document.title = "Web Simulator - " + widgetInfo.name;
    }

    infoList.push('<table class="tf_panel-table" style="border-spacing: 0px;">');

    infoList.push("<tr><td><label class=\"ui-text-label\">Platform: </label></td><td>" + platform.current().name + "</td></tr>");
   
    if (widgetInfo.version) {
        infoList.push('<tr><td><label class=\"ui-text-label\">Version:</label></td><td>' + widgetInfo.version + '</td></tr>');
    }
    infoList.push("<tr><td><label class=\"ui-text-label\">Device: </label></td><td>" + device.name + "</td></tr>");
    infoList.push("<tr><td><label class=\"ui-text-label\">Manufacturer: </label></td><td>" + device.manufacturer + "</td></tr>");
    infoList.push("<tr><td><label class=\"ui-text-label\">OS: </label></td><td>" + device.osName + " " + device.osVersion + "</td></tr>");
    infoList.push("<tr><td><label class=\"ui-text-label\">Screen: </label></td><td>" + device.screen.width + "x" + device.screen.height + "</td></tr>");

    if (device.screen.height !== device.viewPort.portrait.height) {
        infoList.push("<tr><td><label class=\"ui-text-label\">Viewport: </label></td><td>" + device.viewPort.portrait.width + "x" + device.viewPort.portrait.height + "</td></tr>");
    }

    infoList.push("<tr><td><label class=\"ui-text-label\">Pixel Density: </label></td><td>" + device.ppi + " PPI</td></tr>");
    infoList.push("<tr><td><label class=\"ui-text-label\">Browser(s): </label></td><td>" + device.browser.join(", ") + "</td></tr>");
    infoList.push("<tr><td><label class=\"ui-text-label\" style=\"float:left; padding-top: 0px; \">User Agent: </label></td><td>" +
                    device.userAgent + "</td></tr>");

    infoList.push('</table>');

    if (device.notes) {
        utils.forEach(device.notes, function (note) {
            tempString += "<li>" + note + "</li>";
        });
        infoList.push("<section><div style=\"clear:both;\"></div><label class=\"ui-text-label\">Notes: </label><ul>" + tempString + "</ul></section>");
    }

    infoPane.innerHTML = infoList.join("");
}