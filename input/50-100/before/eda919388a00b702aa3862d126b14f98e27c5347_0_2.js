function(seq) //Complete function
		{
			console.log('fragment.getSequence(): complete_fn called with '+seq.length+' bases');
			self.seq = seq;
			//we're done, so remove the progress bar
			self.$loader.slideUp(500);
			
			//Use up all the remaining data
			while(self.seq.length > self.pos)
				self.pos = self.pos + self._make_row(self.pos);

			self._label_features();
			self._get_char_width();
		}