function()
		{
			var _this = this;
			
			this.elemId = Math.floor(Math.random()*10000);

			var imageHTML = '';

			console.log(this.model)

			var frames = this.model.frames.models;
			
			var attr = _.isUndefined(this.model.get('attr')) ? {} : this.model.get('attr');

			//maybe don't need frame id there if just need img src
			for(var i=0;i<frames.length;i++){
				var frame = frames[i];
				imageHTML += 	'<a href="#"><img class="publish-cover-image'+ 
								(attr.project_thumbnail == frame.get('thumbnail_url') ? ' publish-image-select' : '') + 
								'" id="'+ frame.id +'" src="' + frame.get('thumbnail_url')+ '"></a>';
				
			}
			//http://dev.zeega.org/joseph/web/project/ID/view
			var projectlink = zeega.app.url_prefix + 'project/'+ this.model.id +'/view';
			this.iframeHTML = '<iframe src="'+ projectlink +'" width="100%" height="100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			var iframeEmbed = this.convertHTML(this.iframeHTML);

			var blanks = {
				//title : this.model.get('title'),
				//author : attr.author,
				imageHTML : imageHTML,
				projectlink 	: 	projectlink,
				uriEncodedProjectlink : encodeURIComponent(projectlink),
				uriEncodedTitle : encodeURIComponent(this.model.get("title")),
				iframeEmbed : iframeEmbed,
				iframeHTML : this.iframeHTML,
				randId : this.elemId,
				//tags : this.model.get('tags'),
			};
			//var template = _.template( this.getTemplate() );

			console.log(this)
			console.log( _.extend(this.model.attributes,blanks) )

			$(this.el).html( _.template( this.getTemplate(), _.extend(this.model.attributes,blanks) ) );

			$(this.el).find('.tagsedit').empty().tagsInput({
				'interactive':true,
				'defaultText':'add a tag',
				'onAddTag':function(){_this.updateTags('',_this)},
				'onRemoveTag':function(){_this.updateTags('',_this)},
				'removeWithBackspace' : false,
				'minChars' : 1,
				'maxChars' : 0,
				'placeholderColor' : '#C0C0C0',
			});

			$(this.el).find('#preview-images img').mouseup(function(){
				$('#preview-images img').removeClass('publish-image-select');
				$(this).addClass('publish-image-select');
				
			});
			$(this.el).find('#close-modal').mouseup(function(){
				$(_this.el).html(" "); //need to get rid of preview because audio/video keeps playing
				$(_this.el).modal('hide');
				return false;
			});
			$(this.el).find('#publish-open-customize-size').mouseup(function(){
				$('#publish-customize-size').fadeToggle();
				return false;
			});
			$(this.el).find('#looks-good').mouseup(function(){

				attr.project_thumbnail = $('#preview-images .publish-image-select').attr('src');
				_this.model.save({	
							'title': $('#publish-project-title').val(),
							//'attr': attr,
							'published':true,
							'author' : $('#publish-project-author').val(),
							'estimated_time' : $('#publish-project-estimated-time').val()
				},
				{
					success : function(model, response){
						console.log(_this.model)
						$(_this.el).find('#publish-project-modal-step1').hide();
						$(_this.el).find('#publish-project-modal-step2').show();
					},
					error : function(model, response){
						console.log('error publishing project');
						console.log(model);
					},
				});
				
				return false;
			});
			$(this.el).find('#publish-back').mouseup(function(){

				$(_this.el).find('#publish-project-modal-step2').hide();
				$(_this.el).find('#publish-project-modal-step1').show();
				return false;
			});
			$(this.el).find('#publish-width, #publish-height').blur(
				function(e){
					var iframeElem = null;
					if ($(this).attr("id") == 'publish-width')
					{
					 	iframeElem = $(_this.iframeHTML).attr("width", $(this).val());
					} else {
						iframeElem = $(_this.iframeHTML).attr("height", $(this).val());
					}
					_this.iframeHTML = iframeElem[0].outerHTML;
					$(_this.el).find('#publish-embed').html(_this.convertHTML(_this.iframeHTML));
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
			);
			$(this.el).modal('show');
			return this;
		}