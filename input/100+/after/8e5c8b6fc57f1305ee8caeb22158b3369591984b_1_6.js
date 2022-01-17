function() {

	jQuery.extend(true, VIE.prototype.StanbolConnector.prototype, {

		// ### uploadContent(content, success, error, options)
		// **Parameters**:
		// *{string}* **content** The text content to be uploaded upon the
		//		contenthub.
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** Options: specify index: '<indexName>' to load
		// up items to a specific index;
		// specify id: '<id>' as the ID under which your content item will be
		// stored on the contenthub.
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		uploadContent : function(content, success, error, options) {
			options = (options) ? options : {};
			var connector = this;

			connector._iterate( {
				method : connector._uploadContent,
				methodNode : connector._uploadContentNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');

					var index = (opts.index) ? opts.index
							: this.options.contenthub.index;

					u += "/" + index.replace(/\/$/, '');
					u += "/store";

					var id = (opts.id) ? "/" + opts.id : '';

					u += id;

					return u;
				},
				args : {
					content : content,
					options : options
				},
				urlIndex : 0
			});
		},

		_uploadContent : function(url, args, success, error) {
			jQuery.ajax( {
				success : success,
				error : error,
				url : url,
				type : "POST",
				data : args.content,
				contentType : "text/plain"
			});
		},

		_uploadContentNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "POST",
				uri : url,
				body : args.content,
				headers : {
					Accept : "application/rdf+xml",
					"Content-Type" : "text/plain"
				}
			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		},

		// ### getTextContentByID(id, success, error, options)
		// @author mere01
		// This method queries the Apache Stanbol contenthub for the text
		// content of a specific entity.
		// **Parameters**:
		// *{string}* **id** The id of the content item to be retrieved.
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** The Options, specify e.g. index: '<indexName>'
		// if the content item you want to
		// retrieve is stored on some contenthub index other than the default
		// index.
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		// **Example usage**:
		//
		// var stnblConn = new vie.StanbolConnector(opts);
		// stnblConn.getTextContentByID('urn:content-item-sha1-37c8a8244041cf6113d4ee04b3a04d0a014f6e10',
		// function (res) { ... },
		// function (err) { ... },
		// {
		// index: 'myIndex'
		// });
		getTextContentByID : function(id, success, error, options) {

			options = (options) ? options : {};

			var connector = this;

			connector._iterate( {
				method : connector._getTextContentByID,
				methodNode : connector._getTextContentByIDNode,

				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');

					var index = (opts.index) ? opts.index
							: this.options.contenthub.index;

					u += "/" + index.replace(/\/$/, '');
					u += "/store/raw";

					return u;
				},
				args : {
					id : id,
					// format : "application/json",
					format : "text/plain",
					options : options
				},
				success : success,
				error : error,
				urlIndex : 0
			});
		}, // end of getTextContentByID

		_getTextContentByID : function(url, args, success, error) {

			jQuery.ajax( {

				success : success,
				error : error,
				url : url + "/" + args.id,
				type : "GET",
				contentType : args.format,
				accepts : args.format
			});

		}, // end of _getTextContentByID

		_getTextContentByIDNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "GET",
				uri : url + "/" + args.id,
				// body: args.text,
				headers : {
					Accept : args.format,
					'Content-Type' : args.format
				}
			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		}, // end of _getTextContentByIDNode

		// ### getMetadataByID(id, success, error, options)
		// @author mere01
		// This method queries the Apache Stanbol contenthub for the metadata,
		// i.e. enhancements of a
		// specific entity.
		// **Parameters**:
		// *{string}* **id** The id of the content item to be retrieved.
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** The Options, specify e.g. "index:
		// '<indexName>'" if the content item you want to
		// retrieve is stored on some contenthub index other than the default
		// index.
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		// **Example usage**:
		//
		// var stnblConn = new vie.StanbolConnector(opts);
		// stnblConn.getTextContentByID('urn:content-item-sha1-37c8a8244041cf6113d4ee04b3a04d0a014f6e10',
		// function (res) { ... },
		// function (err) { ... },
		// {
		// index: 'myIndex'
		// } );
		getMetadataByID : function(id, success, error, options) {

			options = (options) ? options : {};

			var connector = this;

			connector._iterate( {
				method : connector._getMetadataByID,
				methodNode : connector._getMetadataByIDNode,

				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');

					var index = (opts.index) ? opts.index
							: this.options.contenthub.index;

					u += "/" + index.replace(/\/$/, '');
					u += "/store/metadata";

					u += "/" + id;

					return u;
				},
				args : {
					id : id,
					format : "application/json",
					options : options
				},
				success : success,
				error : error,
				urlIndex : 0
			});

		}, // end of query

		_getMetadataByID : function(url, args, success, error) {

			jQuery.ajax( {

				success : success,
				error : error,
				url : url,
				type : "GET",
				contentType : "text/plain",
				accepts : "text/plain"
			});

		}, // end of _getMetadataByID

		_getMetadataByIDNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "GET",
				uri : url,
				body : args.text,
				headers : {
					Accept : args.format,
					'Content-Type' : 'text/plain'
				}
			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		}, // end of _getMetadataByIDNode

		// ### createIndex(ldpathProgram, success, error)
		// TODO access problem for unknown reason
		// @author mere01
		// This method creates a new index on the contenthub, using the
		// specified ldpath program.
		// To remove the index again, go to http://<stanbol>/contenthub/ldpath
		// and click "Delete this
		// program" next to your LD Path Program.
		// **Parameters**:
		// *{string}* **ldpathProgram** The specification of the new index in
		// ldpath Syntax
		// (see
		// http://incubator.apache.org/stanbol/docs/trunk/contenthub/contenthub5min)
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		// **Example usage**:
		//
		// var stnblConn = new vie.StanbolConnector(opts);
		// stnblConn.createIndex(<ldpath>,
		// function (res) { ... },
		// function (err) { ... });
		createIndex : function(ldpath, success, error) {

			var connector = this;
			
			var data = new FormData();
			data.append('name', ldpath.name.replace(/\/$/, ''));
			data.append('program', ldpath.program.replace(/\/$/, ''));

			connector._iterate( {
				method : connector._createIndex,
				methodNode : connector._createIndexNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');
					u += "/ldpath/program";

					return u;
				},
				args : {
					data : data
				},
				urlIndex : 0
			});
		}, // end of createIndex()

		_createIndex : function(url, args, success, error) {

			jQuery.ajax( {

				success : success,
				error : error,
				url : url,
				type : "POST",
				data : args.data,
				
				contentType : false,
				processData : false,
				cache : false
			});

		}, // end of _createIndex

		_createIndexNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "POST",
				uri : url,
				body : args.content,
				headers : {
					Accept : args.format
				}
			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		}, // end of _createIndexNode

		// ### deleteIndex(index, success, error)
		// TODO access problems for method DELETE
		// @author mere01
		// This method deletes the specified index from the contenthub, using
		// contenthub/ldpath/program/<indexID>
		// TAKE CARE: This will not only delete a specific index, but also all
		// the content items that were
		// stored to this specific index!
		// **Parameters**:
		// *{string}* **index** The name of the index to be deleted permanently
		// from the contenthub.
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		// **Example usage**:
		//
		// var stnblConn = new vie.StanbolConnector(opts);
		// stnblConn.createIndex(<index>,
		// function (res) { ... },
		// function (err) { ... });
		deleteIndex : function(index, success, error) {

			var connector = this;
			connector._iterate( {
				method : connector._deleteIndex,
				methodNode : connector._deleteIndexNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');
					u += "/ldpath/program/" + index;

					return u;
				},
				args : {

				},
				urlIndex : 0
			});
		}, // end of deleteIndex()

		_deleteIndex : function(url, args, success, error) {

			jQuery.ajax( {

				success : success,
				error : error,
				url : url,
				type : "DELETE"
			});

		}, // end of _deleteIndex

		_deleteIndexNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "DELETE",
				uri : url

			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		}, // end of _deleteIndexNode

		// ### contenthubIndices(success, error, options)
		// @author mere01
		// This method returns a list of all indices that are currently being
		// managed on the contenthub.
		// **Parameters**:
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** Options, unused here.
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		// **Example usage**:
		//
		// var stnblConn = new vie.StanbolConnector(opts);
		// stnblConn.contenthubIndices(
		// function (res) { ... },
		// function (err) { ... });
		contenthubIndices : function(success, error, options) {
			options = (options) ? options : {};
			var connector = this;

			var successCB = function(indices) {
				var array = []
				for ( var program in indices) {
					var ldpath = "name=";
					console.log(program);
					ldpath += program;
					console.log(indices[program]);
					ldpath += "&program=" + indices[program];

					array.push(ldpath);
				}

				return success(array);
			};

			connector._iterate( {
				method : connector._contenthubIndices,
				methodNode : connector._contenthubIndicesNode,
				success : successCB,
				error : error,
				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix + "/ldpath";

					return u;
				},
				args : {
					options : options
				},
				urlIndex : 0
			});
		},

		_contenthubIndices : function(url, args, success, error) {
			jQuery.ajax( {
				success : success,
				error : error,
				url : url,
				type : "GET",
				accepts : {
					"application/rdf+json" : "application/rdf+json"
				}
			});
		}, // end of _contenthubIndices

		_contenthubIndicesNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "GET",
				uri : url,
				headers : {
					Accept : args.format
				}
			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		}, // end of _contenthubIndicesNode


		// ### deleteContent(itemURI, success, error, options)
		// TODO access problems for method DELETE
		// @author mere01
		// This method deletes the specified content item from the contenthub, implementing
		// curl -i -X DELETE http://<server>/contenthub/<index>/store/<item-urn>
		// **Parameters**:
		// *{string}* **itemURI** The URI of the content item to be deleted permanently
		// 		from the contenthub.
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** The options. If deleting a content item on a specific index,
		//		specify 'index' : '<indexURI>'
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector instance itself.
		// **Example usage**:
		//
		// var stnblConn = new vie.StanbolConnector(opts);
		// stnblConn.deleteIndex(<index>,
		// function (res) { ... },
		// function (err) { ... });
		deleteContent : function(itemURI, success, error, options) {

			var index = (options.index) ? ("/" + options.index) : "/contenthub";
			
			var connector = this;
			connector._iterate( {
				method : connector._deleteContent,
				methodNode : connector._deleteContentNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');
					
					u += index;
					u += "/store/";
					

					return u;
				},
				args : {
					item : itemURI
				},
				urlIndex : 0
			});
		}, // end of deleteContent

		_deleteContent : function(url, args, success, error) {

			jQuery.ajax( {

				success : success,
				error : error,
				url : url + args.item,
				type : "DELETE"
			});

		}, // end of _deleteContent

		_deleteContentNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "DELETE",
				uri : url + args.index

			}, function(err, response, body) {
				try {
					success( {
						results : JSON.parse(body)
					});
				} catch (e) {
					error(e);
				}
			});
			r.end();
		} // end of _deleteContentNode

		
		
	});

}