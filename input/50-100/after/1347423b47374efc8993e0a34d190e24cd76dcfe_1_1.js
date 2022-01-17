function(state, i) {
            var current_width = state / sum * self.width;
            self.parts[i].animate( {x:last_x, width: current_width}, t).attr({title: state});
            last_x += current_width;
        }