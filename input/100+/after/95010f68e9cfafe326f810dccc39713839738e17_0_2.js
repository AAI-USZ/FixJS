function( response )
              {
                me.cores_data = response.status;

                for( var core_name in response.status )
                {
                  var core_path = config.solr_path + '/' + core_name;
                  var schema =  response['status'][core_name]['schema'];
                  var solrconfig =  response['status'][core_name]['config'];
                  var classes = [];

                  if( !environment_basepath )
                  {
                    environment_basepath = core_path;
                  }

                  if( response['status'][core_name]['isDefaultCore'] )
                  {
                    classes.push( 'default' );
                  }

                  var core_tpl = '<li id="' + core_name + '" '
                      + '    class="' + classes.join( ' ' ) + '"'
                      + '    data-basepath="' + core_path + '"'
                      + '    schema="' + schema + '"'
                      + '    config="' + solrconfig + '"'
                      + '>' + "\n"
                      + '  <p><a href="#/' + core_name + '">' + core_name + '</a></p>' + "\n"
                      + '  <ul>' + "\n"

                      + '    <li class="ping"><a rel="' + core_path + '/admin/ping"><span>Ping</span></a></li>' + "\n"
                      + '    <li class="query"><a href="#/' + core_name + '/query"><span>Query</span></a></li>' + "\n"
                      + '    <li class="schema"><a href="#/' + core_name + '/schema"><span>Schema</span></a></li>' + "\n"
                      + '    <li class="config"><a href="#/' + core_name + '/config"><span>Config</span></a></li>' + "\n"
                      + '    <li class="replication"><a href="#/' + core_name + '/replication"><span>Replication</span></a></li>' + "\n"
                      + '    <li class="analysis"><a href="#/' + core_name + '/analysis"><span>Analysis</span></a></li>' + "\n"
                      + '    <li class="schema-browser"><a href="#/' + core_name + '/schema-browser"><span>Schema Browser</span></a></li>' + "\n"
                      + '    <li class="plugins"><a href="#/' + core_name + '/plugins"><span>Plugins / Stats</span></a></li>' + "\n"
                      + '    <li class="dataimport"><a href="#/' + core_name + '/dataimport"><span>Dataimport</span></a></li>' + "\n"

                      + '    </ul>' + "\n"
                      + '</li>';

                  if (me.menu_element) {
                    me.menu_element
                        .append( core_tpl );
                  }
                }

                $.ajax
                    (
                        {
                          url : environment_basepath + '/admin/system?wt=json',
                          dataType : 'json',
                          beforeSend : function( arr, form, options )
                          {
                          },
                          success : function( response )
                          {
                            me.dashboard_values = response;

                            var environment_args = null;
                            var cloud_args = null;

                            if( response.jvm && response.jvm.jmx && response.jvm.jmx.commandLineArgs )
                            {
                              var command_line_args = response.jvm.jmx.commandLineArgs.join( ' | ' );

                              environment_args = command_line_args.match( /-Dsolr.environment=((dev|test|prod)?[\w\d]*)/i );
                              cloud_args = command_line_args.match( /-Dzk/i );
                            }

                            // title

                            $( 'title', document )
                                .append( ' (' + response.core.host + ')' );

                            // environment

                            var environment_element = $( '#environment' );
                            if( environment_args )
                            {
                              environment_element
                                  .show();

                              if( environment_args[1] )
                              {
                                environment_element
                                    .html( environment_args[1] );
                              }

                              if( environment_args[2] )
                              {
                                environment_element
                                    .addClass( environment_args[2] );
                              }
                            }
                            else
                            {
                              environment_element
                                  .remove();
                            }

                            // cloud

                            var cloud_nav_element = $( '#menu #cloud' );
                            cloud_nav_element
                                .show();

                            // sammy

                            sammy.run( location.hash );
                          },
                          error : function()
                          {
                            var main = $( '#main' );

                            $( 'div[id$="-wrapper"]', main )
                                .remove();

                            main
                                .addClass( 'error' )
                                .append
                                (
                                    '<div class="message">This interface requires that you activate the admin request handlers, add the following configuration to your <code>solrconfig.xml:</code></div>' +
                                        '<div class="code"><pre class="syntax language-xml"><code>' +
                                        '<!-- Admin Handlers - This will register all the standard admin RequestHandlers. -->'.esc() + "\n" +
                                        '<requestHandler name="/admin/" class="solr.admin.AdminHandlers" />'.esc() +
                                        '</code></pre></div>'
                                );

                            hljs.highlightBlock( $( 'pre', main ).get(0) );
                          },
                          complete : function()
                          {
                            loader.hide( this );
                          }
                        }
                    );
              }