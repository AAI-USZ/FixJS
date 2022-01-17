functionUpdateColor = function () {
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