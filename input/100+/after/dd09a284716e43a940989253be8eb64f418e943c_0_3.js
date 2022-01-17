function(ind, element) {
                var ele = element.eleRef;

                if (ele instanceof Toe.Model.Clef) {
                    // this is a clef
                    var left = element.left;
                    var top = element.top;
                    if (elements.length > 1) {
                        // calculate object's absolute positions from within selection group
                        left = selection.left + element.left;
                        top = selection.top + element.top;
                    }

                    // snap release position to line/space
                    var snappedCoords = ele.staff.ohSnap({x: left, y: top}, null, {ignoreEle: ele});

                    // TODO clefs moving to different staves?

                    // get staff position of snapped coordinates
                    var staffPos = -Math.round((snappedCoords.y - ele.staff.zone.uly) / (ele.staff.delta_y/2));

                    ele.setStaffPosition(staffPos);

                    var neumesOnStaff = ele.staff.getPitchedElements({neumes: true, custos: false});
                    if (neumesOnStaff.length > 0 && ele.staff.getActingClefByEle(neumesOnStaff[0]) == ele) {
                        // if the shift of the clef has affected the first neume on this staff
                        // update the custos on the previous staff
                        var prevStaff = gui.page.getPreviousStaff(ele.staff);
                        if (prevStaff) {
                            var newPname = neumesOnStaff[0].components[0].pname;
                            var newOct = neumesOnStaff[0].components[0].oct;
                            gui.handleUpdatePrevCustos(newPname, newOct, prevStaff);
                        }
                    }

                    // gather new pitch information of affected pitched elements
                    var pitchInfo = $.map(ele.staff.getPitchedElements({clef: ele}), function(e) {
                        if (e instanceof Toe.Model.Neume) {
                            var pitchInfo = new Array();
                            $.each(e.components, function(nInd, n) {
                                pitchInfo.push({pname: n.pname, oct: n.oct});
                            });
                            return {id: e.id, noteInfo: pitchInfo};
                        }
                        else if (e instanceof Toe.Model.Custos) {
                            // the custos has been vertically moved
                            // update the custos bounding box information in the model
                            // do not need to update pitch name & octave since this does not change
                            var outbb = gui.getOutputBoundingBox([e.zone.ulx, e.zone.uly, e.zone.lrx, e.zone.lry]);
                            $.post(gui.apiprefix + "/move/custos", {id: e.id, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3]})
                            .error(function() {
                                // show alert to user
                                // replace text with error message
                                $("#alert > p").text("Server failed to move custos. Client and server are not synchronized.");
                                $("#alert").animate({opacity: 1.0}, 100);
                            });
                        }
                    });

                    // convert staffPos to staffLine format used in MEI attribute
                    var staffLine = ele.staff.props.numLines + (ele.props.staffPos/2);
                    var outbb = gui.getOutputBoundingBox([ele.zone.ulx, ele.zone.uly, ele.zone.lrx, ele.zone.lry]);
                    var args = {id: ele.id, line: staffLine, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3], pitchInfo: pitchInfo};

                    // send pitch shift command to server to change underlying MEI
                    $.post(gui.apiprefix + "/move/clef", {data: JSON.stringify(args)})
                    .error(function() {
                        // show alert to user
                        // replace text with error message
                        $("#alert > p").text("Server failed to move clef. Client and server are not synchronized.");
                        $("#alert").animate({opacity: 1.0}, 100);
                    });
                }
                else if (ele instanceof Toe.Model.Neume) {
                    // we have a neume, this is a pitch shift
                    var left = element.left;
                    var top = element.top;
                    if (elements.length > 1) {
                        // calculate object's absolute positions from within selection group
                        left = selection.left + element.left;
                        top = selection.top + element.top;
                    }

                    // get y position of first neume component
                    var nc_y = ele.staff.zone.uly - ele.rootStaffPos*ele.staff.delta_y/2;
                    var finalCoords = {x: left, y: nc_y - delta_y};

                    var sModel = gui.page.getClosestStaff(finalCoords);
                    
                    // snap to staff
                    var snapCoords = sModel.ohSnap(finalCoords, element.currentWidth, {ignoreEle: ele});

                    var newRootStaffPos = Math.round((sModel.zone.uly - snapCoords.y) / (sModel.delta_y/2));

                    // construct bounding box hint for the new drawing: bounding box changes when dot is repositioned
                    var ulx = snapCoords.x-(element.currentWidth/2);
                    var uly = top-(element.currentHeight/2)-(finalCoords.y-snapCoords.y);
                    var bb = [ulx, uly, ulx + element.currentWidth, uly + element.currentHeight];
                    ele.setBoundingBox(bb);

                    var oldRootStaffPos = ele.rootStaffPos;
                    // derive pitch name and octave of notes in the neume on the appropriate staff
                    $.each(ele.components, function(ncInd, nc) {
                        var noteInfo = sModel.calcPitchFromCoords({x: snapCoords.x, y: snapCoords.y - (sModel.delta_y/2 * nc.pitchDiff)});
                        nc.setPitchInfo(noteInfo["pname"], noteInfo["oct"]);
                    });

                    // remove the old neume
                    $(ele).trigger("vEraseDrawing");
                    ele.staff.removeElementByRef(ele);
     
                    // mount the new neume on the most appropriate staff
                    var nInd = sModel.addNeume(ele);
                    if (elements.length == 1) {
                        $(ele).trigger("vSelectDrawing");
                    }

                    var outbb = gui.getOutputBoundingBox([ele.zone.ulx, ele.zone.uly, ele.zone.lrx, ele.zone.lry]);
                    var args = {id: ele.id, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3]};
                    if (oldRootStaffPos != newRootStaffPos) {
                        // this is a pitch shift
                        args.pitchInfo = new Array();
                        $.each(ele.components, function(ncInd, nc) {
                            args.pitchInfo.push({"pname": nc.pname, "oct": nc.oct});
                        });

                        // if this element is the first neume on the staff
                        if (ele == sModel.elements[1]) {
                            var prevStaff = gui.page.getPreviousStaff(sModel);
                            if (prevStaff) {
                                var cPname = ele.components[0].pname;
                                var cOct = ele.components[0].oct;
                                gui.handleUpdatePrevCustos(cPname, cOct, prevStaff);
                            }
                        }
                    }
                    else {
                        args.pitchInfo = null
                    }

                    // get next element to insert before
                    if (nInd + 1 < sModel.elements.length) {
                        args["beforeid"] = sModel.elements[nInd+1].id;
                    }
                    else {
                        // insert before the next system break (staff)
                        var sNextModel = gui.page.getNextStaff(sModel);
                        args["beforeid"] = sNextModel.id;
                    }

                    // send pitch shift command to server to change underlying MEI
                    $.post(gui.apiprefix + "/move/neume", {data: JSON.stringify(args)})
                    .error(function() {
                        // show alert to user
                        // replace text with error message
                        $("#alert > p").text("Server failed to move neume. Client and server are not synchronized.");
                        $("#alert").animate({opacity: 1.0}, 100);
                    });
                }
                else if (ele instanceof Toe.Model.Division) {
                    // this is a division
                    var left = element.left;
                    var top = element.top;
                    if (elements.length > 1) {
                        // calculate object's absolute positions from within selection group
                        left += selection.left;
                        top += selection.top;
                    }

                    var finalCoords = {x: left, y: top};
                    
                    // get closest staff
                    var staff = gui.page.getClosestStaff(finalCoords);

                    var snapCoords = staff.ohSnap(finalCoords, element.currentWidth, {x: true, y: false});

                    // get vertical snap coordinates for the appropriate staff
                    switch (ele.type) {
                        case Toe.Model.Division.Type.div_small:
                            snapCoords.y = staff.zone.uly;
                            break;
                        case Toe.Model.Division.Type.div_minor:
                            snapCoords.y = staff.zone.uly + (staff.zone.lry - staff.zone.uly)/2;
                            break;
                        case Toe.Model.Division.Type.div_major:
                            snapCoords.y = staff.zone.uly + (staff.zone.lry - staff.zone.uly)/2;
                            break;
                        case Toe.Model.Division.Type.div_final:
                            snapCoords.y = staff.zone.uly + (staff.zone.lry - staff.zone.uly)/2;
                            break;
                    }

                    // remove division from the previous staff representation
                    ele.staff.removeElementByRef(ele);
                    gui.rendEng.canvas.remove(element);
                    gui.rendEng.repaint();

                    // set bounding box hint 
                    var ulx = snapCoords.x - element.currentWidth/2;
                    var uly = snapCoords.y - element.currentHeight/2;
                    var bb = [ulx, uly, ulx + element.currentWidth, uly + element.currentHeight];
                    ele.setBoundingBox(bb);

                    // get id of note to move before
                    var dInd = staff.addDivision(ele);
                    if (elements.length == 1) {
                        ele.selectDrawing();
                    }

                    var beforeid = null;
                    if (dInd + 1 < staff.elements.length) {
                        beforeid = staff.elements[dInd+1].id;
                    }
                    else {
                        // insert before the next system break staff
                        var sNextModel = gui.page.getNextStaff(sModel);
                        beforeid = sNextModel.id;
                    }

                    var outbb = gui.getOutputBoundingBox([ele.zone.ulx, ele.zone.uly, ele.zone.lrx, ele.zone.lry]);
                    var data = {id: ele.id, ulx: outbb[0], uly: outbb[1], lrx: outbb[2], lry: outbb[3], beforeid: beforeid};

                    // send move command to the server to change underlying MEI
                    $.post(gui.apiprefix + "/move/division", data)
                    .error(function() {
                        // show alert to user
                        // replace text with error message
                        $("#alert > p").text("Server failed to move division. Client and server are not synchronized.");
                        $("#alert").animate({opacity: 1.0}, 100);
                    });
                }
            }