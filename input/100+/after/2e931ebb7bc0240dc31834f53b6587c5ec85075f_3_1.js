function(n, ease, duration, fast, firstrun) {
            var _ease		= config.ease,
                _duration	= config.duration,
                is_last		= false,
                is_first	= false;

            current_marker = 	n;

            timenav_pos.left			= (config.width/2) - VMM.Lib.position(markers[current_marker].marker).left;
            timenav_pos.visible.left	= Math.abs(timenav_pos.left) - 100;
            timenav_pos.visible.right	= Math.abs(timenav_pos.left) + config.width + 100;

            if (current_marker == 0) {
                is_first = true;
            }
            if (current_marker +1 == markers.length) {
                is_last = true
            }
            if (ease != null && ease != "") {_ease = ease};
            if (duration != null && duration != "") {_duration = duration};

            // set marker style
            for(var i = 0; i < markers.length; i++) {
                VMM.Lib.removeClass(markers[i].marker, "active");
            }

            if (config.start_page && markers[0].type == "start") {
                VMM.Lib.visible(markers[0].marker, false);
                VMM.Lib.addClass(markers[0].marker, "start");
            }

            VMM.Lib.addClass(markers[current_marker].marker, "active");

            if (firstrun || !fast) {
                // ANIMATE MARKER
                VMM.Lib.stop($timenav);
                VMM.Lib.animate($timenav, _duration, _ease, {"left": timenav_pos.left});
			} else {
				VMM.Lib.css($timenav, "left", timenav_pos.left);
			}
        }