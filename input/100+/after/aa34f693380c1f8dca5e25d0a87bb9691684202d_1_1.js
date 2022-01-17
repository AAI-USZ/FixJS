function (data) {
		buffer.push(data);
		length += data.length;
		
		if (length > config.buffer_max_length) {
			console.error('Buffer limit reached, dropping client.');
			socket.destroy();
		} else if (data.substr(data.length - 2) == '\n\n') {
			job = create_job_from_data(buffer.join(''));
			
			if (job) {
				//queue_job(job);
				job.queue();
				socket.end('done');
			} else {
				socket.end('failed');
			}
			
			socket.destroy();	// Make sure connection is closed
			console.info('Connection ended.');
		}
	}