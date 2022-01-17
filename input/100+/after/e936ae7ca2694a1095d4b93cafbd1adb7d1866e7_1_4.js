function (err, rs) {
			if (err)
				return self.failure(Muggle("Distro failure.",
						err));
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