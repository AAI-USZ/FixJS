function($) {
    Samples.Pages.SocialGraph = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/single-column",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/social-graph", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-social-graph"));
            },

            setupSocialGraph : function(el) {
                var self = this;
                this.d3("social-graph", {
                    "title" : "Social Graph",
                    "loadFunction" : function(queryForm, divId) {

                        Samples.defaultClient().then(function() {

                            var nodes = {};
                            var links = [];
                            var userNames = [];
                            var personNodesLookup = {};

                            this.queryDomains({
                                "title": "LOTR"
                            }).keepOne().listUsers().each(function(){
                                var principalName = this.getName();

                                var name = this.getFirstName() ? this.getFirstName() : "";

                                if (this.getLastName()) {
                                    if (name) {
                                        name += " "
                                    }
                                    name += this.getLastName();
                                }

                                var userObj = {
                                    "name" : principalName,
                                    "fullName": name,
                                    "email": this.getEmail(),
                                    "avatar" : this.attachment('avatar').getDownloadUri()
                                }

                                nodes[principalName] = userObj;
                                userNames.push(principalName);
                            });

                            this.queryRepositories({
                                "title": "LOTR Repository"
                            }).keepOne().readBranch('master').then(function() {
                                var branch = this;

                                // read all related person node
                                this.queryNodes({
                                    "_type" : "n:person",
                                    "principal-name" : {
                                        "$in" : userNames
                                    }
                                }).each(function() {
                                    var principalName = this.get("principal-name");
                                    var gender = this.get("gender");
                                    var biography = this.get("biography");
                                    if (nodes[principalName]) {
                                        nodes[principalName]["gender"] = gender;
                                        nodes[principalName]["biography"] = biography;
                                    }
                                    personNodesLookup[this.getId()] = principalName;
                                });

                                var otherIds = [];

                                // find out person relations
                                this.queryNodes({
                                    "_type" : {
                                        "$in" : ["lotr:relationship", "lotr:seeking"]
                                    }
                                }).each(function() {

                                    var sourceNodeId, targetNodeId;

                                    if (personNodesLookup[this.getSourceNodeId()]) {
                                        sourceNodeId = personNodesLookup[this.getSourceNodeId()];
                                    } else {
                                        sourceNodeId = this.getSourceNodeId();
                                        otherIds.push(sourceNodeId);
                                    }

                                    if (personNodesLookup[this.getTargetNodeId()]) {
                                        targetNodeId = personNodesLookup[this.getTargetNodeId()];
                                    } else {
                                        targetNodeId = this.getTargetNodeId();
                                        otherIds.push(targetNodeId);
                                    }

                                    var link = {
                                        "source" : sourceNodeId,
                                        "target" : targetNodeId,
                                        "type" : this.getTypeQName().replace(":","_"),
                                        "directionality" : this.getDirectionality()
                                    };
                                    links.push(link);
                                }).then(function() {
                                    if (otherIds.length > 0) {
                                        this.subchain(branch).queryNodes({
                                            "_doc" : {
                                                "$in" : otherIds
                                            }
                                        }).each(function() {
                                           var nodeObj = this.object;
                                           if (nodeObj['title']) {
                                               nodeObj['name'] = nodeObj['title'];
                                           }
                                           nodeObj["avatar"] = this.attachment('avatar').getDownloadUri();
                                           nodes[this.getId()] = this.object;
                                        });
                                    }
                                });
                            });

                            this.then(function() {

                                return Samples.Utils.D3.dynamicForceGraph(null, divId, {
                                    "nodes" : nodes,
                                    "links" : links
                                }, "");
                            })
                        });

                    }
                });
            },

            setupDashlets : function(el) {
                this.setupSocialGraph(el);
            },

            setupPage : function(el) {
                var componentKey = el.tokens["componentKey"];
                var page = {
                    "title" : "Title",
                    "description" : "Description",
                    "dashlets" :[
                        [
                            {
                                "id" : "test1",
                                "grid" : "span12",
                                "gadget" : "d3",
                                "subscription" : "social-graph"
                            }
                        ]
                    ]
                };

                this.page(page);
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.SocialGraph);

}