function(headerBuf) {
            var res = headerBuf.unpack('CCSL');
            var type = res[0];
            var seq_num = res[2];

            if (type == 0)
            {              
                var error_code = res[1];
                var error = {};
                error.error = error_code;
                error.seq = seq_num;
                error.message = xerrors.errorText[error_code];
                error.stack = client.seq2stack[error.seq]

                // unpack error packet (32 bytes for all error types, 8 of them in CCSL header)
                client.pack_stream.get(24, function(buf) {
                    // TODO: dispatch, use sequence number
                    //TODO: add more generic way to read common values
                    // if (error_code == 14)
                    {
                        var res = buf.unpack('LSC');
                        error.badParam = res[0]; // id: GC, WinID, Font, Atom etc; Value
                        error.minorOpcode = res[1];
                        error.majorOpcode = res[2];                       
                    }
                    var handler = client.replies[seq_num];
                    if (handler) {
                        var callback = handler[1];
                        var handled = callback(error);
                        if (!handled)
                            client.emit('error', error);
                        // TODO: should we delete seq2stack and reply even if there is no handler?
                        delete client.seq2stack[seq_num];
                        delete client.replies[seq_num];
                    } else
                        client.emit('error', error);
                    client.expectReplyHeader();
                } ); 
                return;
            } else if (type > 1)
            {
                client.pack_stream.get(24, function(buf) {
                    var extra = res[3];
                    var code = res[1];
                    var ev = client.unpackEvent(type, seq_num, extra, code, buf);
              
                    // raw event 32-bytes packet (primarily for use in SendEvent);
                    // TODO: Event::pack based on event parameters, inverse to unpackEvent
                    ev.rawData = new Buffer(32);
                    headerBuf.copy(ev.rawData);
                    buf.copy(ev.rawData, 8);
                    
                    client.emit('event', ev);
                    var ee = client.event_consumers[ev.wid];
                    if (ee) {
                       ee.emit('event', ev);
                    }
                    client.expectReplyHeader();
                } ); 
                return;
            }

            var opt_data = res[1];
            var length_total = res[3];            // in 4-bytes units, _including_ this header
            var bodylength = 24 + length_total*4; // 24 is rest if 32-bytes header

            client.pack_stream.get( bodylength, function( data ) {
                
                var handler = client.replies[seq_num];
                if (handler) {
                    var unpack = handler[0];
                    var result = unpack( data, opt_data );
                    var callback = handler[1];
                    callback(null, result);
                    // TODO: add multiple replies flag and delete handler only after last reply (eg ListFontsWithInfo)
                    delete client.replies[seq_num];
                }
                // wait for new packet from server
                client.expectReplyHeader();
            });        
        }