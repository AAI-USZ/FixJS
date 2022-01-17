function (loadChildren, node, openNode, closeNode, callback) {
		ASSERT(loadChildren && node && openNode && closeNode && callback);

		/**
		 * We maintain an array of nodes with statuses. The status codes are 0 :
		 * waiting to be processed 1 : loadChildren is called already 2 :
		 * openNode needs to be called 3 : closeNode needs to be called
		 */
		var requests = [ {
			status: 0,
			node: node
		} ];

		var pending = 0;

		var process = function (currentNode, err, children) {
			var temp;
			if( callback ) {
				if( err ) {
					temp = callback;
					callback = null;
					temp(err);
				}
				else {
					temp = 0;
					while( requests[temp].node !== currentNode ) {
						++temp;
						ASSERT(temp < requests.length);
					}
					ASSERT(requests[temp].status === 1);

					requests[temp].status = 3;

					err = children.length;
					while( --err >= 0 ) {
						requests.splice(temp, 0, {
							status: 0,
							node: children[err]
						});
					}

					requests.splice(temp, 0, {
						status: 2,
						node: currentNode
					});

					ASSERT(pending >= 1);
					--pending;

					scan();
				}
			}
		};

		var processing = 0;
		var done = function (err) {
			if( callback && (err || (--processing === 0 && requests.length === 0 && pending === 0)) ) {
				var temp = callback;
				callback = null;
				temp(err);
			}
		};

		var scan = function () {
			// console.log("scan", pending, requests.length);

			while( requests.length !== 0 && requests[0].status >= 2 ) {
				++processing;
				if( requests[0].status === 2 ) {
					openNode(requests.shift().node, done);
				}
				else {
					closeNode(requests.shift().node, done);
				}
			}

			var selected = [];

			for( var i = 0; i < requests.length && pending < CONFIG.reader.concurrentReads; ++i ) {
				if( requests[i].status === 0 ) {
					ASSERT(pending >= 0);
					++pending;

					requests[i].status = 1;
					selected.push(requests[i].node);
				}
			}

			for( i = 0; i < selected.length; ++i ) {
				loadChildren(selected[i], process.bind(null, selected[i]));
			}
		};

		scan();
	}