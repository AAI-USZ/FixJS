function($) {

  // this.baseUrl = "http://petstore.swagger.wordnik.com/api/resources.json";
  // this.apiKey = "special-key";

  var ApiSelectionController = Spine.Controller.create({
    proxied: ["showApi"],

    baseUrlList: new Array(),

    init: function() {

      if (this.supportsLocalStorage()) {
        var privateKey = localStorage.getItem("com.wordnik.swagger.ui.privateKey");
        var clientKey = localStorage.getItem("com.wordnik.swagger.ui.clientKey");

        if (privateKey && privateKey.length > 0)
        $("#input_privateKey").val(privateKey);

        if (clientKey && clientKey.length > 0)
        $("#input_clientKey").val(clientKey);

      } else {
        log("localStorage not supported, user will need to specifiy the api url");
      }

      $("a#explore").click(this.showApi);

      this.adaptToScale();
      $(window).resize(function() {
      	apiSelectionController.adaptToScale();
      });

      this.handleEnter();
    },

    handleEnter: function(){
      var self = this;
      var submit = function() {
        self.showApi();
      };
      $('#input_baseUrl').keydown(function(e) {
        if(e.which != 13) return;
        submit();
      });
      $('#input_apiKey').keydown(function(e) {
        if(e.which != 13) return;
        submit();
      });
    },

    adaptToScale: function() {
      // var form_width = $('form#api_selector').width();
      // var inputs_width = 0;
      // $('form#api_selector div.input').each( function(){ inputs_width += $(this).outerWidth(); });
      //
      // // Update with of baseUrl input
      // var free_width = form_width - inputs_width;
      // $('#input_baseUrl').width($('#input_baseUrl').width() + free_width - 50);
    },


    slapOn: function() {
      // messageController.showMessage("Please enter the base URL of the API that you wish to explore.");
      $("#content_message").show();
      $("#resources_container").hide();
      this.showApi();
    },

    supportsLocalStorage: function() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch(e) {
        return false;
      }
    },

    showApi: function() {
      var baseUrl = "/";
      var apiKey = "";
      var privateKey = jQuery.trim($("#input_privateKey").val());
      var clientKey = jQuery.trim($("#input_clientKey").val());
      if (baseUrl.length == 0) {
        $("#input_baseUrl").wiggle();
      } else {
        if (this.supportsLocalStorage()) {
          localStorage.setItem("com.wordnik.swagger.ui.privateKey", privateKey);
          localStorage.setItem("com.wordnik.swagger.ui.clientKey", clientKey);
          localStorage.setItem("com.wordnik.swagger.ui.baseUrl", baseUrl);
        }
        var resourceListController = ResourceListController.init({
          baseUrl: baseUrl,
          apiKey: apiKey
        });
      }
    }
  });

  var MessageController = Spine.Controller.create({
    showMessage: function(msg) {
      if (msg) {
        $("#content_message").html(msg);
        $("#content_message").show();
      } else {
        $("#content_message").html("");
        $("#content_message").hide();
      }

    },

    clearMessage: function() {
      this.showMessage();
    }
  });
  var messageController = MessageController.init();

  // The following heirarchy is followed by these view controllers
  // ResourceListController
  //   >>> ResourceController
  // >>> ApiController
  //  >>> OperationController
  var ResourceListController = Spine.Controller.create({
    proxied: ["addAll", "addOne"],

    ApiResource: null,

    init: function() {
      if (this.baseUrl == null) {
        throw new Error("A baseUrl must be passed to ResourceListController");
      }

      $("#content_message").hide();
      $("#resources_container").hide();
      $("#resources").html("");

      // create and initialize SwaggerService
      var swaggerService = new SwaggerService(this.baseUrl, this.apiKey,
      function(msg) {
        if (msg)
        messageController.showMessage(msg);
        else
        messageController.showMessage("Fetching remote JSON...");
      });

      // $("#api_host_url").html(swaggerService.apiHost());

      swaggerService.init();

      // Create convenience references to Spine models
      this.ApiResource = swaggerService.ApiResource();

      this.ApiResource.bind("refresh", this.addAll);
    },

    addAll: function() {
      this.ApiResource.each(this.addOne);
      messageController.clearMessage();
      $("#resources_container").slideDown(function() {
        setTimeout(function() {
          Docs.shebang();
          if (apiSelectionController.supportsLocalStorage()){
	          var userIdEls = $("input[name='userId']", "#resources_container");
	          userIdEls.each(function(){
	          	var userIdEl = $(this);
	          	var userIdStored = localStorage.getItem("com.groupdocs.swagger.ui.userId");
	          	if (userIdStored){
	          		userIdEl.val(userIdStored);
	          	}
	          	userIdEl.change(function(){
	          		var userIdNew = userIdEl.val();
	          		localStorage.setItem("com.groupdocs.swagger.ui.userId", userIdNew);
	          		userIdEls.each(function(){
	          			$(this).val(userIdNew);
	          		});
	          	});
	          });
	      }
        },
        400);
      });
    },

    addOne: function(apiResource) {
      ResourceController.init({
        item: apiResource,
        container: "#resources"
      });
    }
  });

  var ResourceController = Spine.Controller.create({
    proxied: ["renderApi", "renderOperation"],

    templateName: "#resourceTemplate",
    apiResource: null,
    apiList: null,
    modelList: null,

    init: function() {
      this.render();
      this.apiResource = this.item;
      this.apiList = this.apiResource.apiList;
      this.modelList = this.apiResource.modelList;
      this.apiList.each(this.renderApi);
    },

    render: function() {
      $(this.templateName).tmpl(this.item).appendTo(this.container);
      $('#colophon').fadeIn();
    },

    renderApi: function(api) {
      var resourceApisContainer = "#" + this.apiResource.name + "_endpoint_list";
      ApiController.init({
        resource: this.apiResource,
        item: api,
        container: resourceApisContainer
      });

    }

  });


  var ApiController = Spine.Controller.create({
    proxied: ["renderOperation"],

    api: null,
    templateName: "#apiTemplate",

    init: function() {
      this.render();

      this.api = this.item;

      this.api.operations.each(this.renderOperation);
    },

    render: function() {
      this.item.resourceName = this.resource.name;
      $(this.templateName).tmpl(this.item).appendTo(this.container);
    },

    renderOperation: function(operation) {
      var operationsContainer = "#" + this.resource.name + "_endpoint_operations";
      OperationController.init({
        resource: this.resource,
        item: operation,
        container: operationsContainer
      });
    }
  });


  // Param Model
  // ----------------------------------------------------------------------------------------------
  var Param = Spine.Model.setup(
    "Param",
    ["name", "defaultValue", 'description', 'required', 'dataType', 'allowableValues', 'paramType', 'allowMultiple', "readOnly"]
  );

  Param.include({

    cleanup: function() {
      this.defaultValue = this.defaultValue || '';
    },

    templateName: function(){
      var n = "#paramTemplate";

      if (this.allowableValues && this.allowableValues.valueType == "LIST") {
        n += "Select";
      } else if(!utils.isPrimitiveType(this.dataType)) {
          n += "Json";
      } else {
        if (this.required) n += "Required";
        if (this.readOnly) n += "ReadOnly";
      }

      return(n);
    }

  });


  var OperationController = Spine.Controller.create({
    proxied: ["submitOperationSigned", "showResponse", "showErrorStatus", "showCompleteStatus"],

    operation: null,
    templateName: "#operationTemplate",
    elementScope: "#operationTemplate",
    modelsArrayIndex: {},
    hasComplexType: false,
    containerParamName: null,

    init: function() {
      this.render();

      this.operation = this.item;
      this.isGetOperation = (this.operation.httpMethodLowercase == "get");
      this.elementScope = "#" + this.resource.name + "_" + this.operation.nickname + "_" + this.operation.httpMethod;

      this.renderParams();
    },

    render: function() {
      this.item.resourceName = this.resource.name;
      $(this.templateName).tmpl(this.item).appendTo(this.container);
    },

    renderParams: function() {
      if (this.operation.parameters && this.operation.parameters.count() > 0) {
        var operationParamsContainer = this.elementScope + "_params";

        for (var p = 0; p < this.operation.parameters.count(); p++) {
          var param = Param.init(this.operation.parameters.all()[p]);


          if(param.paramType == "body" && !utils.isPrimitiveType(param.dataType)){
              var modelHtml = $("<div/>");
              this.generateModelHtml(param.dataType, modelHtml, null, param.name);
              var tmplArgs = {  modelName: param.name,
                                modelHtml: modelHtml.html(),
                                description: param.description};
              $(param.templateName()).tmpl(tmplArgs).appendTo(operationParamsContainer);
              this.hasComplexType = true;
              var modelDef = this.getModelDef(param.dataType);
              if(modelDef && modelDef.container){
                  // List[string] or List[ComplexType]
                  this.containerParamName = param.name;
              }
          } else if(param.paramType == "body" && param.dataType == "string"){
          	  param.cleanup();
          	  if(param.name == "stream"){
          	  	log("hardcoded file input for param.name==stream");
              	$("#paramTemplateFile").tmpl(param).appendTo(operationParamsContainer);
             } else {
             	$(param.templateName()).tmpl(param).appendTo(operationParamsContainer);
             }

          } else {
              param.cleanup();
              $(param.templateName()).tmpl(param).appendTo(operationParamsContainer);
          }
        }
      }

      $(this.elementScope + "_content_sandbox_response_button").click(this.submitOperationSigned);
    },

    generateModelHtml: function(dataType, parentNode, parentModelDef, rootParamName){
      var modelDef = this.getModelDef(dataType);
      if(!modelDef) return;

      var fieldsetCaption;
      if(parentModelDef){
          if(parentModelDef.container){ // on click Add more
              fieldsetCaption = this.modelsArrayIndex[parentModelDef.arrayItemId];
          } else if(modelDef.primitive) { // List[string]
              fieldsetCaption = parentModelDef.propName;
          } else if(modelDef.model) { // List[ComplexType]
              fieldsetCaption = parentModelDef.propName + " (" + modelDef.model.id + ")";
          }
      } else {
          // actual model (highest level ancestor)
          if(modelDef.model){
              fieldsetCaption = modelDef.model.id;
          } else {
              // List[string]
              fieldsetCaption = rootParamName;
          }
      }

      var modelHtml = $("#modelTemplate").tmpl({ title: fieldsetCaption });
      modelHtml.appendTo(parentNode);

      if(modelDef.container){
          var arrayItemId = parentModelDef ? parentModelDef.propPath.replace(".", "_").replace("[", "_").replace("]", "_") : rootParamName;
          $("#modelArrayActionsTemplate").tmpl({itemPath: arrayItemId, propName: (parentModelDef ? parentModelDef.propName : rootParamName )}).appendTo(modelHtml);

          var context = this.elementScope + "_params";
          $(".addArrayItem_" + arrayItemId, context).live('click', {refThis: this}, function(event){
              log("adding " + arrayItemId);
              var refThis = event.data.refThis;
              if(refThis.modelsArrayIndex[arrayItemId] === undefined){
                  refThis.modelsArrayIndex[arrayItemId] = 0;
              } else {
                  refThis.modelsArrayIndex[arrayItemId]++;
              }

              var propPath;
              if(parentModelDef){
                  propPath = parentModelDef.propPath;
              } else if(rootParamName){
                  propPath = rootParamName;
              }
              var pathArrIdx = "[" + refThis.modelsArrayIndex[arrayItemId] + "]";
              if(modelDef.model){
                  modelDef.propPath = propPath ? propPath + pathArrIdx : "";
                  modelDef.arrayItemId = arrayItemId;
                  refThis.generateModelHtml(modelDef.model.id, $(this).parent().parent(), modelDef);
              } else {
                  var tmplArgs = { name: refThis.modelsArrayIndex[arrayItemId],
                                    path: propPath ? propPath + pathArrIdx : "",
                                    dataType: modelDef.primitive, required: false };
                  $("#propTemplate").tmpl(tmplArgs).appendTo($(this).parent().parent());
              }
              $(".removeArrayItem_" + arrayItemId, context).show();
          });

          $(".removeArrayItem_" + arrayItemId, context).live('click', {refThis: this}, function(event){
              var refThis = event.data.refThis;
              if(refThis.modelsArrayIndex[arrayItemId] !== undefined){
                  if(refThis.modelsArrayIndex[arrayItemId] >= 0){
                      if(modelDef.primitive){
                          $('div.complexTypeProp:last-child', $(this).parent().parent()).remove();
                      } else {
                          $('fieldset:last-child', $(this).parent().parent()).remove();
                      }
                      refThis.modelsArrayIndex[arrayItemId]--;
                  }
                  if(refThis.modelsArrayIndex[arrayItemId] < 0){
                      $(this).hide();
                  }
              }
          });
      } else if(modelDef.model){
          for (var propName in modelDef.model.properties){
              var prop = modelDef.model.properties[propName];
              var propPath = parentModelDef ? parentModelDef.propPath : "";
              if(utils.isPrimitiveType(prop.type)){
                  var tmplName = "#propTemplate";
                  var tmplArgs = { name: propName, required: prop.required, dataType: prop.type,
                                path: (propPath ? propPath + "." + propName : propName) };
                  var constants = prop['enum'];
//                  log(constants);
                  if(constants){
                      tmplName += "Select";
                      tmplArgs.allowableValues = constants;
                  }
                  $(tmplName).tmpl(tmplArgs).appendTo(modelHtml);
              } else {
                  modelDef.propName = propName;
                  modelDef.propPath = propPath ? propPath + "." + propName : propName;
                  this.generateModelHtml(prop.type, modelHtml, modelDef);
              }
          }
      }
    },

    getModelDef: function(customOrContainerType) {
      var modelDef = { model: null, container: null, primitive: null };
      var regex = new RegExp("(List|Set|Array)\\[(\\w*)\\]");
      var matches = customOrContainerType.match(regex);
      var modelName;
      if(matches){
          modelDef.container = matches[1];
          modelName = matches[2];
          if(utils.isPrimitiveType(modelName)){
              // List[string]
              modelDef.primitive = modelName;
              return modelDef;
          }
      } else {
          modelName = customOrContainerType;
      }

      for(var modelIdx in this.resource.rawModels){
          var model = this.resource.rawModels[modelIdx];
          if(model.id == modelName){
              modelDef.model = model;
              // CustomType or List[CustomType]
              return modelDef;
          }
      }
      return null;
    },

    submitOperationSigned: function() {
      var privateKey = jQuery.trim($("#input_privateKey").val());
      var clientKey = jQuery.trim($("#input_clientKey").val());
      if(privateKey.length == 0){
          $("#input_privateKey").wiggle();
          return;
      } else if (apiSelectionController.supportsLocalStorage()) {
          localStorage.setItem("com.wordnik.swagger.ui.privateKey", privateKey);
      }
      if(clientKey.length == 0){
          $("#input_clientKey").wiggle();
          return;
      } else if (apiSelectionController.supportsLocalStorage()) {
          localStorage.setItem("com.wordnik.swagger.ui.clientKey", clientKey);
      }

      var form = $(this.elementScope + "_form");
      var error_free = true;
      var missing_input = null;

      // Cycle through the form's required inputs
      form.find("input.required").each(function() {

        // Remove any existing error styles from the input
        $(this).removeClass('error');

        // Tack the error style on if the input is empty..
        if ($(this).val() == '') {
          if (missing_input == null)
          missing_input = $(this);
          $(this).addClass('error');
          $(this).wiggle();
          error_free = false;
        }

      });

      if (error_free) {
        var formData = form.find("td>input, td>select").serializeArray();
        console.log(formData);
        var invocationUrl = this.operation.invocationUrlSigned(formData, clientKey, privateKey);
        if(invocationUrl){
        	var ajaxArgs = {
                type: this.operation.httpMethod,
                contentType: "application/json; charset=utf-8",
                url: invocationUrl,
                headers: this.operation._headers,
                dataType: "json",
                success: this.showResponse
            };
            var requestData;
            if(this.hasComplexType){
                var serialized = form2js(form.find("td>fieldset")[0]);
                if(this.containerParamName){
                    // json array
                    requestData = JSON.stringify(serialized[this.containerParamName]);
                } else {
                    // json object
                    requestData = JSON.stringify(serialized);
                }

                // if(this.operation.httpMethodLowercase == "put" || this.operation.httpMethodLowercase == "post")
                var signature = this.operation.signString(requestData, privateKey);
                ajaxArgs.headers["signature"] = signature;
                ajaxArgs.headers["clientkey"] = clientKey;

            } else {
            	var fileInput = $(":file", form)[0];
            	if(fileInput){
            		console.log(invocationUrl);
            		// var fd = new FormData();
            		// fd.append(fileInput.name, fileInput.files[0]);
            		// requestData = fd;
//
            		// ajaxArgs.processData = false;
            		// ajaxArgs.contentType = false;
            		// ajaxArgs.cache = false;

            		form.fileupload({
					    url: invocationUrl,
					    // forceIframeTransport: true,
					    multipart: false
					});

					var args = {};
					if(fileInput.files !== undefined){
						log("browser supports File API");
						args.files = fileInput.files;
					} else {
						log("we are in dark ages, using iframe hack which is always multipart");
						args.files = [{name: "stream"}];
						args.fileInput = form;
					}

					form.fileupload('send', args).complete(this.showCompleteStatus).error(this.showErrorStatus);
					return;

					// form.fileupload('disable');
					// form.fileupload('enable');

            	} else {
            		requestData = this.operation._queryParams;
            	}
            }
            ajaxArgs.data = requestData;
            console.log(requestData);

            $(".request_url", this.elementScope + "_content_sandbox_response").html("<pre>" + invocationUrl + "</pre>");
            $.ajax(ajaxArgs).complete(this.showCompleteStatus).error(this.showErrorStatus);
        }
      }

    },

    showResponse: function(response) {
      // log(response);
      var prettyJson = JSON.stringify(response, null, "\t").replace(/\n/g, "<br>");
      // log(prettyJson);
      $(".response_body", this.elementScope + "_content_sandbox_response").html(prettyJson);

      $(this.elementScope + "_content_sandbox_response").slideDown();
    },

    showErrorStatus: function(data) {
      // log("error " + data.status);
      this.showStatus(data);
      $(this.elementScope + "_content_sandbox_response").slideDown();
    },

    showCompleteStatus: function(data) {
      // log("complete " + data.status);
      this.showStatus(data);
    },

    showStatus: function(data) {
      // log(data);
      // log(data.getAllResponseHeaders());
      var responseText;
      if(data.responseText){
      	 if(data.getResponseHeader("Content-Type").indexOf("application/xml") != -1){
      	 	responseText = this.htmlEscape(this.formatXml(data.responseText));
      	 } else {
      	 	responseText = JSON.stringify(JSON.parse(data.responseText), null, 2).replace(/\n/g, "<br>");
      	 }
      } else {
        responseText = "";
      }
      var response_body = "<pre>" + responseText + "</pre>";
      $(".response_code", this.elementScope + "_content_sandbox_response").html("<pre>" + data.status + "</pre>");
      $(".response_body", this.elementScope + "_content_sandbox_response").html(response_body);
      $(".response_headers", this.elementScope + "_content_sandbox_response").html("<pre>" + data.getAllResponseHeaders() + "</pre>");
    },

    formatXml: function(xml) {
	    var formatted = '';
	    var reg = /(>)(<)(\/*)/g;
	    xml = xml.replace(reg, '$1\r\n$2$3');
	    var pad = 0;
	    jQuery.each(xml.split('\r\n'), function(index, node) {
	        var indent = 0;
	        if (node.match( /.+<\/\w[^>]*>$/ )) {
	            indent = 0;
	        } else if (node.match( /^<\/\w/ )) {
	            if (pad != 0) {
	                pad -= 1;
	            }
	        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
	            indent = 1;
	        } else {
	            indent = 0;
	        }

	        var padding = '';
	        for (var i = 0; i < pad; i++) {
	            padding += '  ';
	        }

	        formatted += padding + node + '\r\n';
	        pad += indent;
	    });

	    return formatted;
	},

    htmlEscape: function(str) {
	    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br />');;
	}

  });

  var utils = {
    isPrimitiveType: function(dataType){
        var type = dataType.toLowerCase();
        if(type == "string" || type == "int" || type == "integer" ||
            type == "long" || type == "float" || type == "double" ||
            type == "byte" || type == "boolean" || type == "date"){
            return true;
        } else {
            return false;
        }
    }
  };

  // Attach controller to window*
  window.apiSelectionController = ApiSelectionController.init();

  if (this.baseUrl) {
    window.resourceListController = ResourceListController.init({
      baseUrl: this.baseUrl,
      apiKey: this.apiKey
    });
  } else {
    apiSelectionController.slapOn();
  }

}