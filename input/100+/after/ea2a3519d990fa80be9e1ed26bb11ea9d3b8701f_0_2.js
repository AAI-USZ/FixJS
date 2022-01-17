functionSearchLand = function () {
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