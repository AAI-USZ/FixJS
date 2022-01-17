function (j, day) {
                            var _bar = null;
                            switch (settings.scale) {
                                case "hours":


                                    var dFrom = tools.genId(tools.dateDeserialize(day.from).getTime(), element.scaleStep);
                                    var from = $(element).find('#dh-' + dFrom);

                                    var dTo = tools.genId(tools.dateDeserialize(day.to).getTime(), element.scaleStep);
                                    var to = $(element).find('#dh-' + dTo);

                                    var cFrom = from.attr("offset");
                                    var cTo = to.attr("offset");
                                    var dl = Math.floor((cTo - cFrom) / tools.getCellSize()) + 1;

                                    _bar = core.createProgressBar(
                                                dl,
                                                day.customClass ? day.customClass : "",
                                                day.desc ? day.desc : "",
                                                day.label ? day.label : "",
                                                day.dataObj ? day.dataObj : null
                                            );

                                    // find row
                                    var topEl = $(element).find("#rowheader" + i);

                                    var top = tools.getCellSize() * 3 + 2 + parseInt(topEl.attr("offset"),10);
                                    _bar.css({ 'margin-top': top, 'margin-left': Math.floor(cFrom) });

                                    datapanel.append(_bar);
                                    break;
                                case "weeks":
                                    var dtFrom = tools.dateDeserialize(day.from);
                                    var dtTo = tools.dateDeserialize(day.to);

                                    if (dtFrom.getDate() <= 3 && dtFrom.getMonth() === 0) {
                                        dtFrom.setDate(dtFrom.getDate() + 4);
                                    }

                                    if (dtFrom.getDate() <= 3 && dtFrom.getMonth() === 0) {
                                        dtFrom.setDate(dtFrom.getDate() + 4);
                                    }

                                    if (dtTo.getDate() <= 3 && dtTo.getMonth() === 0) {
                                        dtTo.setDate(dtTo.getDate() + 4);
                                    }

                                    var from = $(element).find("#" + dtFrom.getWeekId());

                                    var cFrom = from.attr("offset");

                                    var to = $(element).find("#" + dtTo.getWeekId());
                                    var cTo = to.attr("offset");

                                    var dl = Math.round((cTo - cFrom) / tools.getCellSize()) + 1;

                                    _bar = core.createProgressBar(
                                             dl,
                                             day.customClass ? day.customClass : "",
                                             day.desc ? day.desc : "",
                                             day.label ? day.label : "",
                                            day.dataObj ? day.dataObj : null
                                        );

                                    // find row
                                    var topEl = $(element).find("#rowheader" + i);

                                    var top = tools.getCellSize() * 3 + 2 + parseInt(topEl.attr("offset"),10);
                                    _bar.css({ 'margin-top': top, 'margin-left': Math.floor(cFrom) });

                                    datapanel.append(_bar);
                                    break;
                                case "months":

                                    var dtFrom = tools.dateDeserialize(day.from);
                                    var dtTo = tools.dateDeserialize(day.to);

                                    if (dtFrom.getDate() <= 3 && dtFrom.getMonth() === 0) {
                                        dtFrom.setDate(dtFrom.getDate() + 4);
                                    }

                                    if (dtFrom.getDate() <= 3 && dtFrom.getMonth() === 0) {
                                        dtFrom.setDate(dtFrom.getDate() + 4);
                                    }

                                    if (dtTo.getDate() <= 3 && dtTo.getMonth() === 0) {
                                        dtTo.setDate(dtTo.getDate() + 4);
                                    }

                                    var from = $(element).find("#dh-" + tools.genId(dtFrom.getTime()));
                                    var cFrom = from.attr("offset");
                                    var to = $(element).find("#dh-" + tools.genId(dtTo.getTime()));
                                    var cTo = to.attr("offset");
                                    var dl = Math.round((cTo - cFrom) / tools.getCellSize()) + 1;

                                    _bar = core.createProgressBar(
                                        dl,
                                        day.customClass ? day.customClass : "",
                                        day.desc ? day.desc : "",
                                        day.label ? day.label : "",
                                        day.dataObj ? day.dataObj : null
                                    );

                                    // find row
                                    var topEl = $(element).find("#rowheader" + i);

                                    var top = tools.getCellSize() * 2 + 2 + parseInt(topEl.attr("offset"),10);
                                    _bar.css({ 'margin-top': top, 'margin-left': Math.floor(cFrom) });

                                    datapanel.append(_bar);
                                    break;

                                // Days                  
                                default:
                                    var dFrom = tools.genId(tools.dateDeserialize(day.from).getTime());
                                    var dTo = tools.genId(tools.dateDeserialize(day.to).getTime());

                                    var from = $(element).find("#dh-" + dFrom);
                                    var cFrom = from.attr("offset");

                                    var dl = Math.floor(((dTo / 1000) - (dFrom / 1000)) / 86400) + 1;
                                    _bar = core.createProgressBar(
                                                dl,
                                                day.customClass ? day.customClass : "",
                                                day.desc ? day.desc : "",
                                                day.label ? day.label : "",
                                                day.dataObj ? day.dataObj : null
                                        );

                                    // find row
                                    var topEl = $(element).find("#rowheader" + i);

                                    var top = tools.getCellSize() * 4 + 2 + parseInt(topEl.attr("offset"),10);
                                    _bar.css({ 'margin-top': top, 'margin-left': Math.floor(cFrom) });

                                    datapanel.append(_bar);

                                    break;
                            }
                            var $l = _bar.find(".fn-label");
                            if ($l && _bar.length) {
                                var gray = invertColor(_bar[0].style.backgroundColor);
                                $l.css("color", gray);
                            } else if ($l) {
                                $l.css("color", "");
                            }
                        }