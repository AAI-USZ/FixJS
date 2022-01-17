f
	jQuery.extend(true, VIE.prototype.StanbolConnector.prototype, {

		// ### createRule(rulename, ruleSyntax, recipeURI, success, error,
		// options)
		// @author mere01
		// creates a rule on the rules/recipe/ endpoint, and adds it to the
		// specified recipe.
		// **Parameters**:
		// *{string}* **ruleName** the name of the rule to be created
		// *{string}* **ruleSyntax** the rule itself, in KRES syntax, e.g.
		// [has(?r, ?x, ?z) . has(?r, ?z, ?y) -> has(?r, ?x, ?y)]
		// *{string}* **recipeURI** the URI of the recipe to which the new rule
		// will be added
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** Options. You may optionally specify a
		// description for your rule like this '{desc : "a new rule"}'
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector
		// instance itself.
		createRule : function(rulename, ruleSyntax, recipeURI, success, error,
				options) {

			options = (options) ? options : {};

			// curl -X POST
			// -F "rules=transitivity[has(?r, ?x, ?z) . has(?r, ?z, ?y) ->
			// has(?r, ?x, ?y)]"
			// -F "description=Test rule"
			// http://[stanbol]/rules/recipe/<recipeURI>

			var connector = this;

			var data = new FormData();
			data.append('rules', rulename + ruleSyntax);

			if (options.desc) {
				data.append('description', options.desc);
			}

			console.log("the FormData object:")
			console.log(data)

			connector._iterate( {
				method : connector._createRule,
				methodNode : connector._createRuleNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					// var u = this.options.url[idx].replace(/\/$/, '');
				// u += this.options.rules.urlPostfix.replace(/\/$/, '');
				// u += this.options.rules.recipe.replace(/\/$/, '');

				// return u;
				return "http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe"
			},
			args : {
				recipe : recipeURI,
				data : data
			},
			urlIndex : 0
			});
		}, // end of createRule

		_createRule : function(url, args, success, error) {
			jQuery.ajax( {
				success : success,
				error : error,
				url : url + "/" + args.recipe,
				type : "POST",
				data : args.data,
				contentType : false,
				processData : false,
				cache : false

			});
		}, // end of _createRule

		_createRuleNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : args.verb,
				uri : url,
				body : args.content,
				headers : {
					Accept : "text/plain",
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
		}, // end of _createRuleNode

		// ### createRecipe(recipeURI, success, error, options)
		// @author mere01
		// creates a recipe on the rules/recipe/ endpoint.
		// Already existing recipes cannot be overridden by
		// this function (will result in a '409 Conflict').
		// **Parameters**:
		// *{string}* **recipeURI** the name of the recipe to be created
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** Options (not specified here)
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector
		// instance itself.
		createRecipe : function(recipeURI, success, error, options) {

			options = (options) ? options : {};

			// curl -i -X PUT
			// http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe/http://www.dfki.de/mere01/recipe/r1

			var connector = this;

			console.log("this.options.url[0]")
			console.log(this.options.url[0])
			connector._iterate( {
				method : connector._createRecipe,
				methodNode : connector._createRecipeNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					// var u = this.options.url[idx].replace(/\/$/, '');
				// u += this.options.rules.urlPostfix.replace(/\/$/, '');
				// u += this.options.rules.recipe.replace(/\/$/, '');

				// return u;
				return "http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe"
			},
			args : {
				id : recipeURI
			},
			urlIndex : 0
			});
		}, // end of createRecipe

		_createRecipe : function(url, args, success, error) {
			jQuery.ajax( {
				success : success,
				error : error,
				url : url + "/" + args.id,
				type : 'PUT'

			});
		}, // end of _createRecipe

		_createRecipeNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : args.verb,
				uri : url,
				body : args.content,
				headers : {
					Accept : "text/plain",
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
		}, // end of _createRecipeNode

		// ### deleteRecipe(recipeURI, success, error, options)
		// @author mere01
		// deletes a recipe from the rules/recipe/ endpoint.
		// **Parameters**:
		// *{string}* **recipeURI** the URI of the recipe to be deleted
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** Options (not specified here)
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector
		// instance itself.
		deleteRecipe : function(recipeURI, success, error, options) {

			options = (options) ? options : {};

			// curl -i -X DELETE
			// http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe/http://www.dfki.de/mere01/recipe/r1
			var connector = this;

			console.log("rules endpoint:")
			console.log(this.options.rules.urlPostfix)

			connector._iterate( {
				method : connector._deleteRecipe,
				methodNode : connector._deleteRecipeNode,
				success : success,
				error : error,
				url : function(idx, opts) {
					// var u = this.options.url[idx].replace(/\/$/, '');
				// u += this.options.rules.urlPostfix.replace(/\/$/, '');
				// u += this.options.rules.recipe.replace(/\/$/, '');

				// return u;
				return "http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe"
			},
			args : {
				id : recipeURI
			},
			urlIndex : 0
			});
		}, // end of deleteRecipe

		_deleteRecipe : function(url, args, success, error) {
			jQuery.ajax( {
				success : success,
				error : error,
				url : url + "/" + args.id,
				type : 'DELETE'

			});
		}, // end of _deleteRecipe

		_deleteRecipeNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : 'DELETE',
				uri : url,
				body : args.content,
				headers : {
					Accept : "text/plain",
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
		}, // end of _deleteRecipeNode

		// ### findRule(term, termType, success, error, complete, options)
		// @author mere01
		// searches the /rules/find/rules/ endpoint for a rule that matches the
		// specified search term, using SPARQL string matching.
		// **Parameters**:
		// *{string}* **term** the search term
		// *{string]* **termType** the type of the search term, this must be one
		// of 'name' or 'description' (depending on whether the rule shall
		// be searched by name or by its description).
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{function}* ** complete** The complete callback.
		// *{object}* **options** Options (not specified here)
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector
		// instance itself.
		findRule : function(term, termType, success, error, complete, options) {

			options = (options) ? options : {};
			var connector = this;
			// curl -H "Accept: application/rdf+xml" 
			//		http://lnv-89012.dfki.uni-sb.de:9001/rules/find/rules?name=transitivity
			// curl -H "Accept: application/rdf+xml" 
			//		http://lnv-89012.dfki.uni-sb.de:9001/rules/find/rules?description=has+rule

			connector._iterate( {
				method : connector._findRule,
				methodNode : connector._findRuleNode,
				success : success,
				error : error,
				complete : complete,
				url : function(idx, opts) {
				// var u = this.options.url[idx].replace(/\/$/, '');
				// u += this.options.rules.urlPostfix.replace(/\/$/, '');
				// u += this.options.rules.findRule.replace(/\/$/, '');

				// return u;
				return "http://lnv-89012.dfki.uni-sb.de:9001/rules/find/rules"
			},
			args : {
				options : options,
				termType : termType,
				term : term
			},
			urlIndex : 0
			});
		}, // end of findRule

		_findRule : function(url, args, success, error, complete) {
			jQuery.ajax( {
				success : success,
				error : error,
				complete : complete,
				url : url + "?" + args.termType + "=" + args.term,
//				type : "GET",
				accepts : {
					"application/rdf+xml" : "application/rdf+xml"
				}

			});
		}, // end of _findRule

		_findRuleNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "GET",
				uri : url,
				// body : args.content,
				headers : {
					Accept : "application/rdf+xml"
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
		}, // end of _findRuleNode

		// ### getRecipe(recipeURI, success, error, complete, options)
		// @author mere01
		// retrieves the specified recipe from the /rules/recipe/ endpoint. The
		// recipe must be existing.
		// **Parameters**:
		// *{string}* **recipeURI** the URI of the recipe
		// *{function}* **success** The success callback.
		// *{function}* **error** The error callback.
		// *{object}* **options** Options (not specified here)
		// **Throws**:
		// *nothing*
		// **Returns**:
		// *{VIE.StanbolConnector}* : The VIE.StanbolConnector
		// instance itself.
		getRecipe : function(recipeURI, success, error, complete, options) {

			options = (options) ? options : {};
			var connector = this;
			// curl -i -X GET
			// http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe/http://www.dfki.de/mere01/recipe/r1

			connector._iterate( {
				method : connector._getRecipe,
				methodNode : connector._getRecipeNode,
				success : success,
				error : error,
				complete : complete,
				url : function(idx, opts) {
					// var u = this.options.url[idx].replace(/\/$/, '');
				// u += this.options.rules.urlPostfix.replace(/\/$/, '');
				// u += this.options.rules.recipe.replace(/\/$/, '');

				// return u;
				return "http://lnv-89012.dfki.uni-sb.de:9001/rules/recipe"
			},
			args : {
				options : options,
				id : recipeURI
			},
			urlIndex : 0
			});
		}, // end of getRecipe

		_getRecipe : function(url, args, success, error, complete) {
			jQuery.ajax( {
				success : success,
				error : error,
				complete : complete,
				url : url + "/" + args.id,
				type : "GET",
				accepts : {
					"text/turtle" : "text/turtle"
				}

			});
		}, // end of _getRecipe

		_getRecipeNode : function(url, args, success, error) {
			var request = require('request');
			var r = request( {
				method : "GET",
				uri : url,
				// body : args.content,
				headers : {
					Accept : "text/turtle"
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
		} // end of _getRecipeNode

	});

})();