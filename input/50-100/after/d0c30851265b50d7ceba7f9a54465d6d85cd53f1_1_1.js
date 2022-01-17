function (r, id)
		{
			var id_dir	= r.get('id_direktorat');
			var id_div	= r.get('id');

			if (id_dir	== 0
			|| id_div	== 0
			|| id_dir	== this.id_direktorat) {
				return true;
			}
			return false;
		}