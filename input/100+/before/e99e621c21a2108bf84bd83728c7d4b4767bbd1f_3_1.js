function (e) {
  //
  // Create a new object to hold resources which will be defined in macros
  //
  resources[e] = {};

  vows.describe('resourceful/' + e.name + '/relationship')
  .addBatch(macros.defineResources(e, resources))
  .addBatch({
    "In database 'test'": {
      topic: function () {
        return null
      },
      "getting an user named 'pavan'": {
        topic: function () {
          resources[e].User.get('pavan', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'pavan');
          assert.equal(obj.name, 'pavan');
          assert.equal(obj.resource, 'User');
        },
        "and it should have children": {
          "repositories": {
            topic: function (obj) {
              return obj;
            },
            "in an array": function (obj) {
              assert.lengthOf(obj.repository_ids, 2);
              assert.equal(obj.repository_ids[0], 'bullet');
              assert.equal(obj.repository_ids[1], 'octonode');
            },
            "and when 'Parent.children()' is used": {
              topic: function (obj) {
                resources[e].User.repositories('pavan', this.callback);
              },
              "should return them": function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj, 2);
                assert.equal(obj[0]._id, 'user/pavan/bullet');
                assert.equal(obj[0].name, 'bullet');
                assert.equal(obj[1]._id, 'user/pavan/octonode');
                assert.equal(obj[1].name, 'octonode');
              },
              "should be of proper resource type": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj[0].resource, 'Repository');
                assert.equal(obj[1].resource, 'Repository');
              },
              "should have the user_id set correctly": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj[0].user_id, 'pavan');
                assert.equal(obj[1].user_id, 'pavan');
              }
            },
            "and when 'Parent.prototype.children()' is used": {
              topic: function (obj) {
                obj.repositories(this.callback);
              },
              "should return them": function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj, 2);
                assert.equal(obj[0]._id, 'user/pavan/bullet');
                assert.equal(obj[0].name, 'bullet');
                assert.equal(obj[1]._id, 'user/pavan/octonode');
                assert.equal(obj[1].name, 'octonode');
              },
              "should be of proper resource type": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj[0].resource, 'Repository');
                assert.equal(obj[1].resource, 'Repository');
              },
              "should have the user_id set correctly": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj[0].user_id, 'pavan');
                assert.equal(obj[1].user_id, 'pavan');
              }
            }
          }
        }
      }
    }
  }).addBatch({
    "In database 'test'": {
      topic: function () {
        return null;
      },
      "getting an user named 'christian'": {
        topic: function () {
          resources[e].User.get('christian', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'christian');
          assert.equal(obj.name, 'christian');
          assert.equal(obj.resource, 'User');
          assert.lengthOf(obj.repository_ids, 2);
        },
        "and when 'Parent.prototype.createChild()' is used": {
          "successfully": {
            topic: function (obj) {
              obj.createRepository({ _id: 'issues', name: 'issues'}, this.callback);
            },
            "should return the newly created object": function (err, obj) {
              assert.isNull(err);
              assert.equal(obj._id, 'user/christian/issues');
              assert.equal(obj.name, 'issues');
              assert.equal(obj.resource, 'Repository');
            },
            "should set the user_id correctly": function (err, obj) {
              assert.isNull(err);
              assert.equal(obj.user_id, 'christian');
            },
            "and reloading parent object": {
              topic: function (child, parent) {
                parent.reload(this.callback);
              },
              "should be successful": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj._id, 'christian');
                assert.equal(obj.name, 'christian');
                assert.equal(obj.resource, 'User');
              },
              "should contain the new child object in the array": function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj.repository_ids, 3);
                assert.include(obj.repository_ids, 'issues');
              }
            },
            "should create the record in the db": {
              topic: function () {
                resources[e].Repository.get('user/christian/issues', this.callback);
              },
              "should respond with the right object": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj._id, 'user/christian/issues');
                assert.equal(obj.name, 'issues');
                assert.equal(obj.user_id, 'christian');
              }
            }
          },
          "unsuccessfully using same _id": {
            topic: function (obj) {
              obj.createRepository({ _id: 'repository-1', name: 'reposit' }, this.callback);
            },
            "should respond with error": function (err, obj) {
              assert.equal(err.error, 'conflict');
              assert.isUndefined(obj);
            }
          }
        }
      }
    }
  }).addBatch({
    "In database 'test'": {
      topic: function () {
        return null;
      },
      "getting an user named 'marak'": {
        topic: function () {
          resources[e].User.get('marak', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'marak');
          assert.equal(obj.name, 'marak');
          assert.equal(obj.resource, 'User');
          assert.lengthOf(obj.repository_ids, 2);
        },
        "and when 'Parent.createChild()' is used": {
          "successfully": {
            topic: function (obj) {
              resources[e].User.createRepository('marak', { _id: 'support', name: 'support'}, this.callback);
            },
            "should return the newly created object": function (err, obj) {
              assert.isNull(err);
              assert.equal(obj._id, 'user/marak/support');
              assert.equal(obj.name, 'support');
              assert.equal(obj.resource, 'Repository');
            },
            "should set the user_id correctly": function (err, obj) {
              assert.isNull(err);
              assert.equal(obj.user_id, 'marak');
            },
            "and reloading parent object": {
              topic: function (child, parent) {
                parent.reload(this.callback);
              },
              "should be successful": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj._id, 'marak');
                assert.equal(obj.name, 'marak');
                assert.equal(obj.resource, 'User');
              },
              "should contain the new child object in the array": function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj.repository_ids, 3);
                assert.include(obj.repository_ids, 'support');
              }
            },
            "should create the record in the db": {
              topic: function () {
                resources[e].Repository.get('user/marak/support', this.callback);
              },
              "should respond with the right object": function (err, obj) {
                assert.isNull(err);
                assert.equal(obj._id, 'user/marak/support');
                assert.equal(obj.name, 'support');
                assert.equal(obj.user_id, 'marak');
              }
            }
          },
          "unsuccessfully using same _id": {
            topic: function (obj) {
              obj.createRepository({ _id: 'npmtop', name: 'reposit' }, this.callback);
            },
            "should respond with error": function (err, obj) {
              assert.equal(err.error, 'conflict');
              assert.isUndefined(obj);
            }
          }
        }
      }
    }
  }).addBatch({
    "In database 'test'": {
      topic: function () {
        return null;
      },
      "getting a repository 'user/pavan/bullet'": {
        topic: function () {
          resources[e].Repository.get('user/pavan/bullet', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'user/pavan/bullet');
          assert.equal(obj.name, 'bullet');
          assert.equal(obj.resource, 'Repository');
        },
        "should have user_id 'pavan'": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.user_id, 'pavan');
        },
        "and when 'Child.prototype.parent()' is used": {
          topic: function (obj) {
            obj.user(this.callback);
          },
          "should return the parent": function (err, obj) {
            assert.isNull(err);
            assert.equal(obj._id, 'pavan');
            assert.equal(obj.name, 'pavan');
          },
          "should be of proper resource type": function (err, obj) {
            assert.isNull(err);
            assert.equal(obj.resource, 'User');
          },
          "should have the children ids": function (err, obj) {
            assert.isNull(err);
            assert.include(obj.repository_ids, 'bullet');
          }
        }
      }
    }
  }).addBatch({
    "In database 'test'": {
      topic: function () {
        return null;
      },
      "getting an user named 'pavan'": {
        topic: function () {
          resources[e].User.get('pavan', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'pavan');
          assert.equal(obj.name, 'pavan');
          assert.equal(obj.resource, 'User');
        },
        "should have children repositories": function (err, obj) {
          assert.isNull(err);
          assert.lengthOf(obj.repository_ids, 2);
        },
        "and when 'Child.byParent()' is used": {
          topic: function (obj) {
            resources[e].Repository.byUser('pavan', this.callback);
          },
          "should return the children": function (err, obj) {
            assert.isNull(err);
            assert.equal(obj[0]._id, 'user/pavan/bullet');
            assert.equal(obj[0].name, 'bullet');
            assert.equal(obj[1]._id, 'user/pavan/octonode');
            assert.equal(obj[1].name, 'octonode');
          },
          "should be of proper resource type": function (err, obj) {
            assert.isNull(err);
            assert.equal(obj[0].resource, 'Repository');
            assert.equal(obj[1].resource, 'Repository');
          },
          "should have the parent id set correctly": function (err, obj) {
            assert.isNull(err);
            assert.equal(obj[0].user_id, 'pavan');
            assert.equal(obj[1].user_id, 'pavan');
          }
        }
      }
    }
  }).addBatch({
    "In database 'test'": {
      topic: function () {
        return null;
      },
      "getting a repository 'user/christian/issues'": {
        topic: function () {
          resources[e].Repository.get('user/christian/issues', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'user/christian/issues');
          assert.equal(obj.name, 'issues');
          assert.equal(obj.resource, 'Repository');
        },
        "should have the correct user_id": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.user_id, 'christian');
        },
        "and getting the parent": {
          topic: function (obj) {
            obj.user(this.callback);
          },
          "should be successful": function (err, obj) {
            assert.isNull(err);
            assert.equal(obj._id, 'christian');
            assert.equal(obj.name, 'christian');
            assert.equal(obj.resource, 'User');
            assert.include(obj.repository_ids, 'issues');
          },
          "and destroying the child": {
            topic: function (parent, child) {
              console.log(parent, child);
              child.destroy(this.callback);
            },
            "should result in parent": {
              topic: function (parent, child) {
                parent.reload(this.callback);
              },
              "being modified": function (err, parent, child) {
                assert.isNull(err);
                assert.lengthOf(parent.repsitory_ids, 2);
              }
            }
          }
        }
      }
    }
  }).addBatch({
    "In database 'test'": {
      topic: function () {
        return null;
      },
      "getting an user named 'christian'": {
        topic: function () {
          resources[e].User.get('christian', this.callback);
        },
        "should be successful": function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'christian');
          assert.equal(obj.name, 'christian');
          assert.equal(obj.resource, 'User');
          assert.lengthOf(obj.repsitory_ids, 2);
        },
        "and destroying it": {
          topic: function (obj) {
            obj.destroy(this.callback);
          },
          "should be successful": function (err) {
            assert.isNull(err);
          },
          "should result in his repositories": {
            topic: function () {
              resources[e].Repository.get('user/christian/repository-1', this.callback);
            },
            "getting destroyed": function (err, obj) {
              assert.equal(err.status, '404');
              assert.isUndefined(obj);
            }
          }
        }
      }
    }
  }).addBatch({
    // TODO: Cascading destroy should result in
    // * reducing marak's follower count
    // * reducing nodejitsu's user count
    // * deleting christian following documents
  }).export(module);
}