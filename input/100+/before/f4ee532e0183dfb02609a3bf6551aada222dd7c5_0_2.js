function barPath(groups) {
			var path = [],
				i = -1,
				n = groups.length,
				d;
			while (++i < n) {
				d = groups[i];
				path.push("M", x(d.key), ",", height, "V", y(d.value), "h", barWidth, "V", height);
			}
			return path.join("");
		}