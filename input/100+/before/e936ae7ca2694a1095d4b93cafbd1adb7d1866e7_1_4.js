function (err, rs) {
			if (err) {
				winston.error(err);
				return self.failure("Distro failure.");
			}
			var olds = [image.path];
			var news = [dest];
			image.path = dest;
			if (nail) {
				image.thumb_path = nail;
				news.push(nail);
			}
			if (comp) {
				image.comp_path = comp;
				news.push(comp);
			}
			self.db.track_temporaries(news, olds,
					self.record_image.bind(self));
		}