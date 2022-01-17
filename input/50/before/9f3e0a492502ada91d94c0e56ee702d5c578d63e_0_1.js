function () {
      var latest_circles = Circles.find({graph_id: Session.get('selected_graph')}, {});
      for (circle in latest_circles) {
        draw_circle(circle.cx, circle.cy);
      }
    }