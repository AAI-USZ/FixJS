function readObject(id, cb){
		++stats.readFromDisk
		objectReaderDedup(id, cb)
	}