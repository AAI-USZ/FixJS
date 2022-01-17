function(album_id, path, callback) {
	db.run("UPDATE albums SET albumart = ? WHERE id = ?", path, album_id, callback);
}