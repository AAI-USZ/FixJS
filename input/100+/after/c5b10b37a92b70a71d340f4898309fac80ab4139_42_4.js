function serializeSnapshotVersionList(versionList){
	var buf = new Buffer((versionList.length*4)+1)
	buf[0] = versionList.length
	var off = 1
	for(var i=0;i<versionList.length;++i){
		bin.writeInt(buf,off,versionList[i])
		off+=4
	}
	return buf
}