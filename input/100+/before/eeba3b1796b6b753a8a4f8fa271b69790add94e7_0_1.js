function XClient(stream, displayNum, screenNum)
{
    EventEmitter.call(this);
    this.stream = stream;

    // TODO: this is probably not used
    this.core_requests = {};
    this.ext_requests = {};
    
    this.displayNum = displayNum;
    this.screenNum = screenNum;
    this.authHost = os.hostname();

    var pack_stream = new PackStream();

    // data received from stream is dispached to
    // read requests set by calls to .unpack and .unpackTo
    //stream.pipe(pack_stream);
   
    // pack_stream write requests are buffered and
    // flushed to stream as result of call to .flush
    // TODO: listen for drain event and flush automatically 
    //pack_stream.pipe(stream);
    var client = this;
    pack_stream.on('data', function( data ) {
        //console.error(hexy(data, {prefix: 'from packer '}));
        //for (var i=0; i < data.length; ++i)
        //   console.log('<<< ' + data[i]);
        stream.write(data);
    });
    stream.on('data', function( data ) {
        //console.error(hexy(data, {prefix: 'to unpacker '}));
        //for (var i=0; i < data.length; ++i)
        //   console.log('>>> ' + data[i]);
        pack_stream.write(data); 
    });
    stream.on('end', function() {
        client.emit('end');
    });

    this.pack_stream = pack_stream;

    this.rsrc_id = 0; // generated for each new resource
    this.seq_num = 0; // incremented in each request. (even if we don't expect reply)
    this.seq2stack = {}; // debug: map seq_num to stack at the moment request was issued   
 
    // in/out packets indexed by sequence ID
    this.replies = {};
    this.atoms = stdatoms;
    this.event_consumers = {}; // maps window id to eventemitter TODO: bad name
    this.eventParsers = {};   

    this.importRequestsFromTemplates(this, coreRequests);
    
    this.startHandshake();
    this._closing = false;
}