function() {
//    console.log("call");
  var COLOR_LIST = [["#FFFF66", 0], ["#9999FF", 0], ["#66FF66", 0], ["#99CCFF", 0], ["#FF99FF", 0], ["#0000CC", 1], ["#CC0000", 1]];
  var LAND_LIST = {star: "☆", wood: "木", rock: "岩", iron: "鉄", food: "糧"};
  var SAVE_PREFIX = "TokisabaMapTool";

  var unionData = {}
  var lordData = {}
  var unionList = Array();
  var lordList = Array();
  var landList = Array();
  var union = '';
  var lord = '';
  var min = true;
  var ele = document.evaluate('//div[@id="map51-content"]/div/ul/li', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

  // Common function
  var functionAddGlobalStyle = function (css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
      return
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  var functionCreateRadio = function (id, name, value, text, checked) {
    var d = document.createElement("div");
    d.style.padding = "2px";
    var r = document.createElement("input");
    r.type = "radio";
    r.id = id;
    r.name = name;
    r.value = value;
    r.checked = checked;

    var l = document.createElement("label");
    l.htmlFor = id;

    var t = document.createTextNode(text);
    l.appendChild(t);

    d.appendChild(r);
    d.appendChild(l);
    return d;
  }

  var functionCreateCheck = function (id, name, value, text, checked) {
    var d = document.createElement("div");
    d.style.padding = "2px";
    var r = document.createElement("input");
    r.type = "checkbox";
    r.id = id;
    r.name = name;
    r.value = value;
    r.checked = checked;

    var l = document.createElement("label");
    l.htmlFor = id;

    var t = document.createTextNode(text);
    l.appendChild(t);

    d.appendChild(r);
    d.appendChild(l);
    return d;
  }

  var functionCreateAddDelButton = function (id, value) {
    var b = document.createElement("input");
    b.type = "button";
    b.id = id;
    b.style.fontSize = "7px";
    b.value = value;

    return b;
  }

  var functionAddColorSet = function (prefix_id, color) {
    var d = document.createElement("div");

    d.appendChild(functionCreateAddDelButton("del" + prefix_id, "<-"));
    d.appendChild(functionCreateAddDelButton("add" + prefix_id, "->"));

    var dc = document.createElement("div");
    dc.style.color = color;
    dc.style.display = "inline";
    dc.innerHTML = "&nbsp;■&nbsp;";
    d.appendChild(dc);

    var sc = document.createElement("select");
    sc.id = "color_sel" + prefix_id;
    sc.style.width = "140px";
    d.appendChild(sc);

    return d;
  }

  var functionAddLandSet = function (id, name) {
    var d = document.createElement("div");
    d.style.display = "inline";

    var dc = document.createElement("div");
    dc.style.display = "inline";
    dc.innerHTML = "&nbsp;" + name + "&nbsp;";
    d.appendChild(dc);

    var sc = document.createElement("input");
    sc.id = "input_land_" + id;
    sc.style.width = "15px";
    d.appendChild(sc);

    return d;
  }

  var functionGetSelUnion = function () {
    val = "";
    if ($("#sel_union").children(":selected").val() != undefined) {
      val = $("#sel_union").children(":selected").val();
    }
    return val;
  }

  var functionGetSelLord = function () {
    val = "";
    if ($("#sel_lord").children(":selected").val() != undefined) {
      val = $("#sel_lord").children(":selected").val();
    }
    return val;
  }

  var functionCreateAddDelFunction = function (i) {
    $("#del" + i).click(function() {
      if ($("#color_sel" + i).children(":selected") != "undefined") {
        var selVal = $("#color_sel" + i).children(":selected").val().split(":", 2);
        $("#color_sel" + i).children(":selected").remove();

        if (selVal[0] == "u") {
          delete unionData[selVal[1]];
        } else {
          delete lordData[selVal[1]];
        }
      }
    });

    $("#add" + i).click(function() {
      if ($("input[name=sel]:checked").val() == 1) {
        if (functionGetSelUnion() != "" && unionData[functionGetSelUnion()] == null) {
          $("#color_sel" + i).append($("<option>").attr({value: "u:" + functionGetSelUnion()}).text(functionGetSelUnion() + " [同盟]"));
          unionData[functionGetSelUnion()] = i;
        }
      } else {
        if (functionGetSelLord() != "" && lordData[functionGetSelLord()] == null) {
          $("#color_sel" + i).append($("<option>").attr({value: "l:" + functionGetSelLord()}).text(functionGetSelLord() + " [君主]"));
          lordData[functionGetSelLord()] = i;
        }
      }
    });
  }

  var functionUpdateColor = function () {
    for (var i = 0; i < ele.snapshotLength; ++i) {
      ele.snapshotItem(i).style.removeProperty("background-color");
      ele.snapshotItem(i).style.removeProperty("color");
      var eleA = ele.snapshotItem(i).getElementsByTagName('a')[0];
      if (eleA) {
        eleA.style.removeProperty("background-color");
        eleA.style.removeProperty("color");
      }
    }

    for (var key in unionData) {
      for (var i = 0; unionList[key]!= undefined && i < unionList[key].length; ++i) {
        unionList[key][i].style.setProperty("background-color", COLOR_LIST[unionData[key] - 1][0], "");
        if (COLOR_LIST[unionData[key] - 1][1] == 1) {
          unionList[key][i].getElementsByTagName("A")[0].style.setProperty("color", "white", "");
        }
      }
    }
    for (var key in lordData) {
      for (var i = 0; lordList[key]!= undefined && i < lordList[key].length; ++i) {
        lordList[key][i].style.setProperty("background-color", COLOR_LIST[lordData[key] - 1][0], "");
        if (COLOR_LIST[lordData[key] - 1][1] == 1) {
          lordList[key][i].getElementsByTagName("A")[0].style.setProperty("color", "white", "");
        }
      }
    }
  }

  var functionSearchLand = function () {
    functionUpdateColor();

    loop: for (var i = 0; i < landList.length; ++i) {
      for (var j in LAND_LIST) {
        if ($("#input_land_" + j).val() != "" && $("#input_land_" + j).val() != landList[i][j]) {
          continue loop;
        }
      }
      landList[i]['dom'].getElementsByTagName("A")[0].style.setProperty("background-color", "#FF0000", "");
    }
  }

  // Create popup window
  var divPopup = document.createElement("div");
  divPopup.id = "popup";
  document.body.appendChild(divPopup);

  // Create popup window header
  var divHeader = document.createElement("div");
  divHeader.id = "popup_header";
  divPopup.appendChild(divHeader);

  // Create popup window body right
  var divBodyRight = document.createElement('div');
  divBodyRight.id = "popup_right";
  divPopup.appendChild(divBodyRight);

  // Create popup window body left
  var divBodyLeft = document.createElement("div");
  divBodyLeft.id = "popup_left";
  divPopup.appendChild(divBodyLeft);

  // Create popup window footer
  var divFooter = document.createElement("div");
  divFooter.id = "popup_footer";
  divPopup.appendChild(divFooter);

  var divClose = document.createElement("div");
  divClose.id = "popup_close";
  divClose.innerHTML = "×";
  divHeader.appendChild(divClose);

  var divMin = document.createElement("div");
  divMin.id = "popup_min";
  divMin.innerHTML = "▼";
  divHeader.appendChild(divMin);

  var divTitle = document.createElement("div");
  divTitle.id = "popup_title";
  divTitle.innerHTML = "マップツール";
  divHeader.appendChild(divTitle);

  // Union list
  divBodyLeft.appendChild(functionCreateRadio("radio_union", "sel", 1, "同盟一覧", true));
  var selectUnion = document.createElement("select");
  selectUnion.id = "sel_union";
  selectUnion.size = 10;
  selectUnion.style.width = "110px";
  divBodyLeft.appendChild(selectUnion);

  // Rord list
  divBodyLeft.appendChild(functionCreateRadio("radio_lord", "sel", 2, "君主一覧", false));
  var selectLord = document.createElement("select");
  selectLord.id = "sel_lord";
  selectLord.size = 15;
  selectLord.style.width = "110px";
  divBodyLeft.appendChild(selectLord);

  // Color list and add/delete button
  for (var i = 0; i < COLOR_LIST.length; ++i) {
    divBodyRight.appendChild(functionAddColorSet(i + 1, COLOR_LIST[i][0]));
    functionCreateAddDelFunction(i + 1);
  }

  // Land list
  var title = document.createElement("div");
  title.style.marginTop = "10px";
  title.innerHTML = "<span style='color: #FF0000'>■</span>資源検索";
  divBodyRight.appendChild(title);
  for (var i in LAND_LIST) {
    divBodyRight.appendChild(functionAddLandSet(i, LAND_LIST[i]));
  }
  var buttonDiv = document.createElement("div");
  buttonDiv.style.marginTop = "3px";
  var buttonSearch = document.createElement("input");
  buttonSearch.type = "button";
  buttonSearch.id = "button_search";
  buttonSearch.value = "検索";
  buttonDiv.appendChild(buttonSearch);
  divBodyRight.appendChild(buttonDiv);

  // Update/Save button
  var buttonUpdate = document.createElement("input");
  buttonUpdate.type = "button";
  buttonUpdate.id = "button_update";
  buttonUpdate.value = "更新";
  var buttonSave = document.createElement("input");
  buttonSave.type = "button";
  buttonSave.id = "button_save";
  buttonSave.value = "保存";

  divFooter.appendChild(functionCreateCheck("default_load", "default_load", 1, "初期反映", false));
  divFooter.appendChild(functionCreateCheck("default_min", "default_min", 1, "初期最小化", false));
  divFooter.appendChild(buttonUpdate);
  divFooter.appendChild(buttonSave);

  // main
  functionAddGlobalStyle('#popup { background-color: #CCCCFF; width: 350px; border: 1px solid #000000; position: absolute; display: none; z-index: 1000; }');
  functionAddGlobalStyle('#popup_left { padding: 5px; font-size:10px; }');
  functionAddGlobalStyle('#popup_right { padding: 5px; font-size:10px; float: right; }');
  functionAddGlobalStyle('#popup_footer { padding: 5px; font-size:10px; }');
  functionAddGlobalStyle('#popup_title { padding: 2px; background-color: #9999FF; cursor: move; font-weight: bold; }');
  functionAddGlobalStyle('#popup_min { padding: 2px; cursor: pointer; float: right; }');
  functionAddGlobalStyle('#popup_close { padding: 2px; cursor: pointer; float: right; }');

  $('#button_update').click(function() {
    functionUpdateColor();
  });

  $('#button_save').click(function() {
    GM_setValue(SAVE_PREFIX + "_unionData", unionData.toSource());
    GM_setValue(SAVE_PREFIX + "_lordData", lordData.toSource());
    if ($('#default_load').is(':checked')) {
      GM_setValue(SAVE_PREFIX + "_defaultLoad", 1);
    } else {
      GM_setValue(SAVE_PREFIX + "_defaultLoad", 0);
    }
    if ($('#default_min').is(':checked')) {
      GM_setValue(SAVE_PREFIX + "_defaultMin", 1);
    } else {
      GM_setValue(SAVE_PREFIX + "_defaultMin", 0);
    }
  });

  $('#button_search').click(function() {
    functionSearchLand();
  });

  $.popup = function() {
    var wx, wy;
    var mx, my;
    wx = $('#change-map-scale').offset().left;
    wy = $('#change-map-scale').offset().top + 47;

    $('#popup').css('top', wy).css('left', wx).fadeIn(100);
    // min button
    $('#popup_min').click(function() {
      if (min) {
        $('#popup_left').css("display", "none");
        $('#popup_right').css("display", "none");
        $('#popup_footer').css("display", "none");
        min = false;
      } else {
        $('#popup_left').css("display", "table");
        $('#popup_right').css("display", "table");
        $('#popup_footer').css("display", "table");
        min = true;
      }
    });
    // close button
    $('#popup_close').click(function() {$('#popup').fadeOut(100);});
    // タイトルバーをドラッグしたとき
    $('#popup_title').mousedown(function(e) {
      mx = e.pageX;
      my = e.pageY;
      $().mousemove(mouseMove).mouseup(mouseUp);
      return false;
    });
    function mouseMove(e) {
      wx += e.pageX - mx;
      wy += e.pageY - my;
      $('#popup').css('top', wy).css('left', wx);
      mx = e.pageX;
      my = e.pageY;
      return false;
    }
    function mouseUp() {
      $().unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
    }
  }

  // Execute
  for (var i = 0; i < ele.snapshotLength; ++i) {
    var eleA = ele.snapshotItem(i).getElementsByTagName('a')[0];
    if (eleA && eleA.href.match(/land.php.*/)) {
      // Union and lord data
      var ret = eleA.getAttribute('onmouseover').match(/<dt[^>]*>君主名<\/dt><dd[^>]*>(.*?)<\/dd>.*?<dt[^>]*>同盟名<\/dt><dd[^>]*>(.*?)<\/dd>/);
      if (ret != null && ret.length == 3) {
        if (lordList[ret[1]] == undefined) {
          lordList[ret[1]] = Array(ele.snapshotItem(i));
        } else {
          lordList[ret[1]].push(ele.snapshotItem(i));
        }
        if (unionList[ret[2]] == undefined) {
          unionList[ret[2]] = Array(ele.snapshotItem(i));
        } else {
          unionList[ret[2]].push(ele.snapshotItem(i));
        }
      }

      // Land data
      if (eleA && eleA.href.match(/land.php.*/)) {
        var star = eleA.childNodes[0].nodeValue;
        var ret = eleA.getAttribute('onmouseover').match(/木([0-9]*).*岩([0-9]*).*鉄([0-9]*).*糧([0-9]*)/);
        if (ret != null && ret.length == 5) {
          landList.push({dom: ele.snapshotItem(i), star: star, wood: ret[1], rock: ret[2], iron: ret[3], food: ret[4]})
        }
      }
    }
  }

  for (key in unionList) {
    var optionUnion = document.createElement("option");
    optionUnion.text = key;
    selectUnion.add(optionUnion, null);
  }

  for (key in lordList) {
    var optionLord = document.createElement("option");
    optionLord.text = key;
    selectLord.add(optionLord, null);
  }

  // Restore
  if (eval("("+GM_getValue(SAVE_PREFIX + "_unionData")+")") != undefined) {
    unionData = eval("("+GM_getValue(SAVE_PREFIX + "_unionData")+")");
    for (var key in unionData) {
      $("#color_sel" + unionData[key]).append($("<option>").attr({value: "u:" + key}).text(key + " [同盟]"));
    }
  }
  if (eval("("+GM_getValue(SAVE_PREFIX + "_lordData")+")") != undefined) {
    lordData = eval("("+GM_getValue(SAVE_PREFIX + "_lordData")+")");
    for (var key in lordData) {
      $("#color_sel" + lordData[key]).append($("<option>").attr({value: "l:" + key}).text(key + " [君主]"));
    }
  }
  if (eval("("+GM_getValue(SAVE_PREFIX + "_defaultMin")+")") == 1) {
    $('#default_min').attr({checked: "checked"});
    $('#popup_left').css("display", "none");
    $('#popup_right').css("display", "none");
    $('#popup_footer').css("display", "none");
    min = false;
  }
  if (eval("("+GM_getValue(SAVE_PREFIX + "_defaultLoad")+")") == 1) {
    $('#default_load').attr({checked: "checked"});
    functionUpdateColor();
  }

  // output
  $.popup();
}