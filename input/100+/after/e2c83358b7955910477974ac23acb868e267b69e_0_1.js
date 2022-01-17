function (editor)
           {
              return {
                 title : 'Embed Media Dialog',
                 minWidth : 550,
                 minHeight : 200,
                 contents :
                       [
                          {
                             id : 'iframe',
                             label : 'Embed Media',
                             expand : true,
                             elements :
                                   [
                                      {
						               type : 'html',
						               id : 'pageMediaEmbed',
						               label : 'Embed Media',
						               style : 'width : 100%;',
						               html : '<iframe src="'+me.path+'/dialogs/mediaembed.html" frameborder="0" name="iframeMediaEmbed" id="iframeMediaEmbed" allowtransparency="1" style="width:100%;margin:0;padding:0;"></iframe>'
						              }
                                   ]
                          }
                       ],
                  onOk : function()
                 {
		  for (var i=0; i<window.frames.length; i++) {
		     if(window.frames[i].name == 'iframeMediaEmbed') {
		        var content = window.frames[i].document.getElementById("embed").value;
		     }
		  }
		  final_html = 'MediaEmbedInsertData|---' + escape('<p class="media_embed">'+content+'</p>') + '---|MediaEmbedInsertData';
                    editor.insertHtml(final_html);
                    updated_editor_data = editor.getData();
                    clean_editor_data = updated_editor_data.replace(final_html,'<p class="media_embed">'+content+'</p>');
                    editor.setData(clean_editor_data);
                 }
              };
           }