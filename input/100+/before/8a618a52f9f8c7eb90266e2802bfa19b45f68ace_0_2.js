function () {
                // #artifact-(optionnal repositoryId)
                // format groupId:artifactId org.apache.maven.plugins:maven-jar-plugin
                // or  groupId:artifactId:version org.apache.maven.plugins:maven-jar-plugin:2.3.1
                this.get('#artifact/:groupId/:artifactId',function(context){
                  var groupId= this.params['groupId'];
                  var artifactId= this.params['artifactId'];
                  $.log("get #artifact:"+groupId+":"+artifactId);
                  goToBrowseArtifactDetail(groupId,artifactId);//,null,null);
                  return;

                });
                this.get('#artifact:repositoryId/:groupId/:artifactId/:version',function(context){

                  var repositoryId = this.params['repositoryId'];
                  var groupId= this.params['groupId'];
                  var artifactId= this.params['artifactId'];
                  var version= this.params['version'];

                  if(!version){
                    displayBrowseArtifactDetail(splitted[0],splitted[1]);//,null,null);
                  } else {
                    generalDisplayArtifactDetailsVersionView(groupId,artifactId,version,repositoryId);
                  }
                });
                this.get('#browse/:groupId',function(context){
                  var groupId = this.params['groupId'];
                  if (groupId){
                    displayBrowseGroupId(groupId);
                  } else {
                    displayBrowse(true);
                  }
                });
                this.get('#:folder', function () {
                    self.activeMenuId(this.params.folder);
                    var baseItems = self.artifactMenuItems?self.artifactMenuItems:[];
                    ko.utils.arrayFirst(baseItems.concat(self.usersMenuItems, self.administrationMenuItems), function(p) {
                        if ( p.href == "#"+self.activeMenuId()) {
                          p.func();
                          return;
                        }
                    });
                    
                });
                this.get('#open-admin-create-box',function(){
                  $.log("#open-admin-create-box");
                  adminCreateBox();
                });
                //this.get('', function () { this.app.runRoute('get', '#search') });
          }