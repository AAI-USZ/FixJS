function(seq) //update function
		{
			console.log('fragment.getSequence(): update_fn called with '+seq.length+' bases');
			self.seq = seq;
		
			//while we have enough data to make a complete row
			while((self.seq.length - self.pos) > self.rowlength)
				self.pos = self.pos + self._make_row(self.pos);
		
			self.$prog.text(self.seq.length);
			self.$bar.progressbar('value', parseInt((100 * self.seq.length) / self.len));
		}