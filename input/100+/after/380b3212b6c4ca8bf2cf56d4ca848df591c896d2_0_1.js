f  var progressReporter = new ProgressReporter();
  progressReporter.addListener(function (r) {
    sendProgress(requestID, r.getProgress());
  });
  progressReporter.begin("Parsing...");

  var symbolicationTable = {};
  var symbols = [];
  var symbolIndices = {};
  var functions = [];
  var functionIndices = {};
  var samples = [];
  var meta = null;
  var armIncludePCIndex = {};

  if (typeof rawProfile == "string" && rawProfile[0] == "{") {
    // rawProfile is a JSON string.
    rawProfile = JSON.parse(rawProfile);
  }

  if (typeof rawProfile == "object") {
    switch (rawProfile.format) {
      case "profileStringWithSymbolicationTable,1":
        symbolicationTable = rawProfile.symbolicationTable;
        parseProfileString(rawProfile.profileString);
        break;
      case "profileJSONWithSymbolicationTable,1":
        symbolicationTable = rawProfile.symbolicationTable;
        parseProfileJSON(rawProfile.profileJSON);
        break;
      default:
        throw new Error("Unsupported profile JSON format");
    }
  } else {
    parseProfileString(rawProfile);
  }

  function cleanFunctionName(functionName) {
    var ignoredPrefix = "non-virtual thunk to ";
    if (functionName.substr(0, ignoredPrefix.length) == ignoredPrefix)
      return functionName.substr(ignoredPrefix.length);
    return functionName;
  }

  function parseResourceName(url) {
    // TODO Fix me, this certainly doesn't handle all URLs formats
    var match = /^.*:\/\/(.*?)\/.*$/.exec(url);

    if (!match)
      return url;

    if (meta && meta.addons && url.indexOf("resource:") == 0 && endsWith(match[1], "-at-jetpack")) {
      // Assume this is a jetpack url
      var jetpackID = match[1].substring(0, match[1].length - 11) + "@jetpack";

      for (var i in meta.addons) {
        var addon = meta.addons[i];
        dump("match " + addon.id + " vs. " + jetpackID + "\n");
        // TODO handle lowercase name collision
        if (addon.id.toLowerCase() == jetpackID.toLowerCase()) {
          dump("Found addon: " + addon.name + "\n");
          var iconHTML = "";
          if (addon.iconURL)
            iconHTML = "<img src=\"" + addon.iconURL + "\" style='width:12px; height:12px;'> "
          return iconHTML + addon.name;
        }
      }
      dump("Found jetpackID: " + jetpackID + "\n");
    }

    var iconHTML = "";
    if (url.indexOf("http://") == 0) {
      iconHTML = "<img src=\"http://" + match[1] + "/favicon.ico\" style='width:12px; height:12px;'> ";
    } else if (url.indexOf("https://") == 0) {
      iconHTML = "<img src=\"https://" + match[1] + "/favicon.ico\" style='width:12px; height:12px;'> ";
    }
    return iconHTML + match[1];
  }

  function parseScriptFile(url) {
     // TODO Fix me, this certainly doesn't handle all URLs formats
     var match = /^.*\/(.*)\.js$/.exec(url);

     if (!match)
       return url;

     return match[1] + ".js";
  }

  function getFunctionInfo(fullName) {
    var match =
      /^(.*) \(in ([^\)]*)\) (\+ [0-9]+)$/.exec(fullName) ||
      /^(.*) \(in ([^\)]*)\) (\(.*:.*\))$/.exec(fullName) ||
      /^(.*) \(in ([^\)]*)\)$/.exec(fullName);
      // Try to parse a JS frame
    var jsMatch1 = match ||
      /^(.*) \((.*):([0-9]+)\)$/.exec(fullName);
    if (!match && jsMatch1) {
      match = [0, jsMatch1[1]+"() @ "+parseScriptFile(jsMatch1[2]) + ":" + jsMatch1[3], parseResourceName(jsMatch1[2]), ""];
    }
    var jsMatch2 = match ||
      /^(.*):([0-9]+)$/.exec(fullName);
    if (!match && jsMatch2) {
      match = [0, "<Anoymous> @ "+parseScriptFile(jsMatch2[1]) + ":" + jsMatch2[2], parseResourceName(jsMatch2[1]), ""];
    }
    if (!match) {
      match = [fullName, fullName];
    }
    return {
      functionName: cleanFunctionName(match[1]),
      libraryName: match[2] || "",
      lineInformation: match[3] || ""
    };
  }

  function indexForFunction(functionName, libraryName) {
    var resolve = functionName+"_LIBNAME_"+libraryName;
    if (resolve in functionIndices)
      return functionIndices[resolve];
    var newIndex = functions.length;
    functions[newIndex] = {
      functionName: functionName,
      libraryName: libraryName
    };
    functionIndices[resolve] = newIndex;
    return newIndex;
  }

  function parseSymbol(symbol) {
    var info = getFunctionInfo(symbol);
    return {
      symbolName: symbol,
      functionIndex: indexForFunction(info.functionName, info.libraryName),
      lineInformation: info.lineInformation
    };
  }

  function translatedSymbol(symbol) {
    return symbolicationTable[symbol] || symbol;
  }

  function indexForSymbol(symbol) {
    if (symbol in symbolIndices)
      return symbolIndices[symbol];
    var newIndex = symbols.length;
    symbols[newIndex] = parseSymbol(translatedSymbol(symbol));
    symbolIndices[symbol] = newIndex;
    return newIndex;
  }

  function clearRegExpLastMatch() {
    /./.exec(" ");
  }

  function shouldIncludeARMLRForPC(pcIndex) {
      if (pcIndex in armIncludePCIndex)
          return true;

      var pcName = symbols[pcIndex];
      if (sARMFunctionsWithValidLR.indexOf(pcName) != -1) {
          armIncludePCIndex[pcIndex] = true;
          return true;
      }

      return false;
  }

  function parseProfileString(data) {
    var extraInfo = {};
    var lines = data.split("\n");
    var sample = null;
    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i];
      if (line.length < 2 || line[1] != '-') {
        // invalid line, ignore it
        continue;
      }
      var info = line.substring(2);
      switch (line[0]) {
      //case 'l':
      //  // leaf name
      //  if ("leafName" in extraInfo) {
      //    extraInfo.leafName += ":" + info;
      //  } else {
      //    extraInfo.leafName = info;
      //  }
      //  break;
      case 'm':
        // marker
        if (!("marker" in extraInfo)) {
          extraInfo.marker = [];
        }
        extraInfo.marker.push(info);
        break;
      case 's':
        // sample
        var sampleName = info;
        sample = makeSample([indexForSymbol(sampleName)], extraInfo);
        samples.push(sample);
        extraInfo = {}; // reset the extra info for future rounds
        break;
      case 'c':
      case 'l':
        // continue sample
        if (sample) { // ignore the case where we see a 'c' before an 's'
          sample.frames.push(indexForSymbol(info));
        }
        break;
      case 'L':
        // continue sample; this is an ARM LR record.  Stick it before the
        // PC if it's one of the functions where we know LR is good.
        if (sample && sample.frames.length > 1) {
          var pcIndex = sample.frames[sample.frames.length - 1];
          if (shouldIncludeARMLRForPC(pcIndex)) {
            sample.frames.splice(-1, 0, indexForSymbol(info));
          }
        }
        break;
      case 't':
        // time
        if (sample) {
          sample.extraInfo["time"] = parseFloat(info);
        }
        break;
      case 'r':
        // responsiveness
        if (sample) {
          sample.extraInfo["responsiveness"] = parseFloat(info);
        }
        break;
      }
      progressReporter.setProgress((i + 1) / lines.length);
    }
  }

  function parseProfileJSON(profile) {
    // Thread 0 will always be the main thread of interest
    // TODO support all the thread in the profile
    var profileSamples = null;
    meta = profile.meta;
    // Support older format that aren't thread aware
    if (profile.threads != null) {
      profileSamples = profile.threads[0].samples;
    } else {
      profileSamples = profile;
    }
    for (var j = 0; j < profileSamples.length; j++) {
      var sample = profileSamples[j];
      var indicedFrames = [];
      for (var k = 0; k < sample.frames.length; k++) {
        var frame = sample.frames[k];
        if (frame.location !== undefined) {
          indicedFrames.push(indexForSymbol(frame.location));
        } else {
          indicedFrames.push(indexForSymbol(frame));
        }
      }
      if (sample.extraInfo == null) {
        sample.extraInfo = {};
      }
      if (sample.responsiveness) {
        sample.extraInfo["responsiveness"] = sample.responsiveness;
      }
      if (sample.responsiveness) {
        sample.extraInfo["time"] = sample.time;
      }
      samples.push(makeSample(indicedFrames, sample.extraInfo));
      progressReporter.setProgress((j + 1) / profileSamples.length);
    }
  }

  progressReporter.finish();
  var profileID = gNextProfileID++;
  gProfiles[profileID] = JSON.parse(JSON.stringify({
    meta: meta,
    symbols: symbols,
    functions: functions,
    allSamples: samples
  }));
  clearRegExpLastMatch();
  sendFinished(requestID, {
    meta: meta,
    numSamples: samples.length,
    profileID: profileID,
    symbols: symbols,
    functions: functions
  });
}
