function calculateSeriesResults(sheet, placeRange) {
    var boats = getBoats_();

    var sailNos = sheet.getRange("A2:A22").getValues();
    var races = sheet.getRange("D1:K1").getValues();

    // Stage 1 - boat names and owners
    var boatNamesAndOwners = [];

    for (var i = 0; i < sailNos.length; i++) {
        var boat = lookupBoat_(boats, sailNos[i][0]);

        if (boat) {
            boatNamesAndOwners.push([boat.name, boat.owner]);
        } else {
            boatNamesAndOwners.push(["", ""]);
        }
    }

    sheet.getRange("B2:C22").setValues(boatNamesAndOwners);

    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();

    // Stage 2 - race details
    var raceData = spreadSheet.getSheetByName("Races").getRange("A2:D40").getValues();

    // Stage 3 - sheet objects
    var sheets = [];
    var oods = [];
    for (var i = 0; i < races[0].length; i++) {
        if (races[0][i] && races[0][i] != "Total") {
            sheets.push(spreadSheet.getSheetByName(races[0][i]));

            for (var j = 0; j <= raceData.length; j++) {
                if (raceData[j][0] && raceData[j][0] == races[0][i]) {
                    oods.push(raceData[j][1]);
                    break;
                }
            }
        }
    }

    // Stage 4 - get the placings
    var places = [];
    for (var i = 0; i < sheets.length; i++) {
        var sailValues = sheets[i].getRange("A3:A23").getValues();
        var placeValues = sheets[i].getRange(placeRange).getValues();
        var racePlaces = [];
        for (var j = 0; j < sailValues.length; j++) {
            if (sailValues[j][0]) {
                racePlaces.push([sailValues[j][0], placeValues[j][0]]);
            }
        }
        places.push(racePlaces);

    }

    // Initialize the contents of the series table
    var results = [];
    for (var i = 0; i < sailNos.length; i++) {
        results.push([]);
        for (var j = 0; j < races[0].length; j++) {
            results[i].push("");
        }
    }

    // Stage 5 - calculate the points
    for (var i = 0; i < sailNos.length; i++) {
        var boat = lookupBoat_(boats, sailNos[i][0]);
        if (!boat) {
            continue;
        }
        var points = [];
        var numAvgs = 0;
        for (var j = 0; j < sheets.length; j++) {
            var racePlaces = places[j];
            if (racePlaces.length) {
                var ood = oods[j];
                if (ood == boat.sail) {
                    results[i][j] = "AVG";
                } else {
                    for (var k = 0; k < racePlaces.length; k++) {
                        if (racePlaces[k][0] == boat.sail) {
                            results[i][j] = racePlaces[k][1];
                            break;
                        }
                    }
                }
                if (!results[i][j]) {
                    results[i][j] = "DNC";
                }
                if (results[i][j] == "DNF") {
                    points.push(racePlaces.length + DNF_PENALTY);
                } else if (results[i][j] == "DNC") {
                    points.push(racePlaces.length + DNC_PENALTY);
                } else if (results[i][j] == "AVG") {
                    points.push(0);
                    numAvgs++;
                } else {
                    points.push(results[i][j]);
                }
            }
        }

        points.sort(sortfunc_);
        points = points.slice(0, points.length - numDiscards_(points.length));

        var total = 0;
        for (var k = 0; k < points.length; k++) {
            total += points[k];
        }
        if (points.length) {
            Logger.log(total + " " +  points.length + " " + numAvgs);
            total += total / (points.length - numAvgs) * numAvgs;
        }

        results[i][j] = total;
    }

    // Stage 6 - write out the series table
    sheet.getRange(2, 4, sailNos.length, races[0].length).setValues(results);

    // Stage 7 - generate hyperlinks
    var spreadSheetUrl = spreadSheet.getUrl().replace("/ccc?", "/pub?");

    var headers = [];
    for (var i = 0; i < races[0].length; i++) {
        if (races[0][i] != "Total") {
            Logger.log(races[0][i]);
            var sheetId = spreadSheet.getSheetByName(races[0][i]).getSheetId();
            var url = spreadSheetUrl + "&gid=" + sheetId + "&single=true";
            headers.push("=hyperlink(\"" + url + "\", \"" + races[0][i] + "\")");
        } else {
            headers.push(races[0][i]);
        }
    }
    Logger.log(headers);
    sheet.getRange(1, 4, 1, races[0].length).setValues([headers]);
}