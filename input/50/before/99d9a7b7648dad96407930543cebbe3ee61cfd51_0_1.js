function() {
          cameraLoader.empty();
          cameraLoader.append($(".camera_list_container .offscreen > li"));
          cameraLoader.listview('refresh');
      }