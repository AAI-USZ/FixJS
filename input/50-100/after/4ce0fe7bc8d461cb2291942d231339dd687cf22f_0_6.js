function(data) {
            data.url = "tasks/" + data.id + "/";
            _this.tasks.add(data);
            $(".task:first .description").focus();
            helpers.selectAll($(".task:first input.description"));
            if (!_this.isEditMode) {
              return $(".task:first .task-buttons").hide();
            } else {
              return $(".task:first .task-buttons").show();
            }
          }