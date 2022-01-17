function () {
      var latest_circles = Circles.find({graph_id: Session.get('selected_graph')}, {});
      for (var circle in latest_circles) {
        draw_circle(circle.cx, circle.cy);
      }
    }