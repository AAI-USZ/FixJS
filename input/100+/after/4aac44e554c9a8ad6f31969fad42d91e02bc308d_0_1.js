function (config){ // ctor
	EventEmitter.call(this);
	var 
	me = this;	
	
	config = config || {};
	
	// Config
	this.fileName = config.fileName || '';
	if (this.fileName === '') {
		this._eexception({
				code: 'EEMPTYFILENAME',
				message: 'fileName config is not set'
		});
		return;
	}
	
	this.directory = config.directory || '';
	if (this.directory === '') {
		this._eexception({
				code: 'EEMPTYDIRECTORY',
				message: 'directory config is not set'
		});
		return;
	}
	this.directory = path.resolve(config.directory);	
	// Directory sync test
	if (!fs.existsSync(this.directory)) {
		this._eexception({
				code: 'EDIRNOTFOUND',
				message: 'Directory not found: "' + this.directory + '"'
		});
		return;
	}
	this.filePath = path.normalize(this.directory + '/' + this.fileName);

	this.writeDelay = config.writeDelay === undefined ? DEFAULT_WRITE_DELAY : config.writeDelay;
	this.writeDelay = Math.max(this.writeDelay, 10); // Buffer is flushed every 200 ms, min 10
	
	this.bufferSize = Math.max(config.bufferSize || 65536, 4096); // Buffer blocks size, min 4096o
	this.fileMaxSize = config.fileMaxSize || 1024 * 1024 * 5;
	//this.fileMaxSize = Math.max(config.fileMaxSize || 1024 * 1024 * 5, 1024 * 1024); // 5MB, min 1MB
	this.maxBackupFileNumber = config.maxBackupFileNumber; // Min 0
	if (this.maxBackupFileNumber === undefined) {
		this.maxBackupFileNumber = 10;
	}else { 
		if (this.maxBackupFileNumber < 0) {
			this.maxBackupFileNumber = 0;
		}
	}
	this.gzipBackupFile = config.gzipBackupFile || false;
	this.compressionLevel = config.compressionLevel || 1;
	if (this.compressionLevel < 1 || this.compressionLevel > 9){
		this.compressionLevel = 1;
	}
	this.verbose = config.verbose || false;
	
	this._buffers = []; // Array of buffer to write 
	this._timeoutId = -1; // write timer
	this._waitDrain = false; // Drain flag
	this._writtenSize = 0; // Quantity of data written. Initialized in _createWriteStream
	this._rotationPending = false; // File rotation flag
	this._maxBackupFileNumberLength = String(this.maxBackupFileNumber).length;
	
	this._createWriteStream(); // We create first stream
	
}