function(path, newName, data) {
        var _this = this;
        if (newName != null) {
          return TodoList.updateTodoList(data.rslt.obj.data("id"), {
            title: newName
          }, function() {
            data.inst.deselect_all();
            return data.inst.select_node(data.rslt.obj);
          });
        }
      }