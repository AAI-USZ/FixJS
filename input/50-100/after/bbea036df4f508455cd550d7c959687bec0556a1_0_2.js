function (new_heatmap, new_grid_width, new_grid_height) {
        if (new_grid_width * new_grid_height !== new_heatmap.length) {
          throw new Error("Heatmap: provided heatmap has wrong dimensions.");
        }
        heatmap = new_heatmap;
        grid_width = new_grid_width;
        grid_height = new_grid_height;
        this.setCanvasSize(grid_width, grid_height);
      }