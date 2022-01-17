functionSearchLand = function () {
    functionUpdateColor();

    for (var i = 0; i < landList.length; ++i) {
      var flag = true;
      for (var j in LAND_LIST) {
        if ($("#input_land_" + j).val() != "" && $("#input_land_" + j).val() != landList[i][j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        landList[i]['dom'].getElementsByTagName("A")[0].style.setProperty("background-color", "#FF0000", "");
      }
    }
  }