function deserializeSnapshotVersionIds(buf){
	var versions = []
	var many = buf[0]
	var off = 1
	for(var i=0;i<many;++i){
		var v = bin.readInt(buf,off)
		versions.push(v)
		off+=4
	}
	return versions
}