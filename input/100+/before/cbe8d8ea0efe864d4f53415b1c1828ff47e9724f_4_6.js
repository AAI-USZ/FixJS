function(dbName) {
    var crypto = require('crypto'),
        _ = require('underscore');
    var db = require('./sqlite-wrapper').init(dbName);

    function hash(str) {
        var hash = crypto.createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }

    function repeat(seq, sep, n) {
        var res = '';
        while (n > 1) {
            if (n % 2 == 1) {
                res += sep + seq;
                n--;
            }
            seq += sep + seq;
            n /= 2;
        }
        return seq + res;
    }

    return {
        _getGroupId: function(name, cb) {
            db.selectOne('groups', null, ['id'], 'name=?', [name], cb);
        },
        _getUserId: function(name, cb) {
            db.selectOne('users', null, ['id'], 'username=?', [name], cb);
        },
        checkAuth: function(user, password, cb) {
            db.selectOne('users', null, ['id'], 
                'username=? AND password_hash=?', [user, hash(password)], cb);
        },
        login: function(user, password, cb) {
            this.checkAuth(user, password, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, []);
                } else {
                    this.getUserPermissions(user, cb);
                }
            });
        },
        hasGroup: function(name, cb) {
            this._getGroupId(name, function(err, result) {
                console.log(result);
                if (err) {
                    return cb(err);
                }
                cb(null, !!result);
            });
        },
        addGroup: function(name, cb) {
            db.insert('groups', { name: name }, cb);
        },
        removeGroup: function(name, cb) {
            this._getGroupId(name, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.removeById('groups', result.id, function(err) {
                        cb(err, !err);
                    });
                }
            });
        },
        getAllGroups: function(cb) {
            db.list('groups', cb);
        },
        getGroupPermissions: function(name, cb) {
            this._getGroupId(name, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.select('permissions', null, ['service', 'method'], 
                        'group_id=?', [result.id], cb);
                }
            });
        },
        addGroupPermissions: function(name, permissions, cb) {
            var callback = _(cb).after(permissions.length);
            this._getGroupId(name, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    // Validate regexes
                    var valid = true;
                    permissions.forEach(function(item) {
                        try {
                            new RegExp(item.service);
                        } catch (e) {
                            valid = false;
                            return cb(e);
                        }

                        try {
                            new RegExp(item.method);
                        } catch (e) {
                            valid = false;
                            return cb(e);
                        }
                    });
                    if (!valid) {
                        return;
                    }
                    var errors = [];
                    permissions.forEach(function(item) {
                        db.insert('permissions', {
                            service: item.service,
                            group_id: result.id,
                            method: item.method
                        }, function(err) {
                            if (err) errors.push(err);
                            callback(errors.length > 0 ? errors : null, errors.length == 0);
                        });
                    });
                }
            });
        },
        removeGroupPermissions: function(name, permissions, cb) {
            function couples(n) {
                return repeat('(?,?)', ',', n);
            }
            var clause = 'group_id=? AND (service, method) IN (' + 
                couples(permissions.length) + ')';

            this._getGroupId(name, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.remove('groups', clause, permissions.reduce(function(prev, item) {
                        prev.push(items.service, item.method);
                        return prev;
                    }, [result.id]), function(err) {
                        return cb(err, !err);
                    });
                }
            });
        },

        clearGroupPermissions: function(name, cb) {
            this._getGroupId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false)
                }
                db.remove('permissions', 'group_id=?', [result.id], function(err) {
                    cb(err, !err);
                });
            });
        },
        hasUser: function(name, cb) {
            this._getUserId(name, function(err, result) {
                if (err) {
                    return cb(err);
                }
                cb(null, !!result);
            });
        },
        addUser: function(user, password, cb) {
            db.insert('users', {
                username: user,
                password_hash: hash(password)
            }, cb);
        },
        removeUser: function(name, cb) {
            this._getUserId(name, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.removeById('users', result.id, function(err) {
                        cb(err, !err);
                    });
                }
            });
        },
        getUserPermissions: function(name, cb) {
            db.select('permissions', {
                'groups': 'permissions.group_id=groups.id',
                'user_groups': 'groups.id=user_groups.group_id',
                'users': 'user_groups.user_id=users.id'
            }, {
                'permissions.service': 'service',
                'permissions.method': 'method'
            }, 'users.username=?', [name], cb, null, null, true);
        },
        getUserGroups: function(name, cb) {
            this._getUserId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.select('groups, user_groups', null, { 
                    'groups.name': 'name' 
                }, 'groups.id=user_groups.group_id AND user_groups.user_id=?',
                    [result.id], cb);
            });
        },
        clearUserGroups: function(name, cb) {
            this._getUserId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'user_id=?', [result.id], cb);
            });
        },
        addUserGroups: function(name, groups, cb) {
            var callback = _.after(cb, groups.length);

            this._getUserId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                var userId = result.id;

                db.select('groups', null, ['id'], 'name IN (' + 
                    repeat('?', ',', groups.length) + ')', groups,
                    function(err, rows) {
                        if (err) {
                            return cb(err);
                        }
                        var ids = rows.reduce(function(prev, item) {
                            prev.push(item.id);
                            return prev;
                        }, []);
                        var errors = [];
                        ids.forEach(function(id) {
                            db.insert('user_groups', {
                                group_id: id,
                                user_id: userId
                            }, function(err) {
                                if (err) errors.push(err);
                                callback(errors.length > 0 ? errors : null, errors.length == 0);
                            });
                        });
                    }
                );
            });
        },
        removeUserGroups: function(name, groups, cb) {
            this._getUserId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'group_id IN (SELECT id FROM groups WHERE name IN (' + 
                    repeat('?', ',', groups.length) + ')', groups, function(err) {
                        return cb(err, !err);
                    }
                );
            });
        },
        getGroupMembers: function(name, cb) {
            this._getGroupId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.select('groups g, user_groups ug', null, 
                    { 'g.name': 'name' }, 
                    'g.id=ug.group_id AND g.id=?', [result.id], cb);
            });
        },
        clearGroupMembers: function(name, cb) {
            this._getGroupId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'group_id=?', [result.id], cb);
            });
        },
        addGroupMembers: function(name, users, cb) {
            var callback = _.after(cb, users.length);
            this._getGroupId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                var gid = result.id,
                    errors = [];
                db.select('users', null, ['id'], 'username IN (' + 
                    repeat('?', ',', users.length) + ')', users, function(err, ids) {
                    ids.forEach(function(user) {
                        db.insert('user_groups', {
                            group_id: gid,
                            user_id: user.id
                        }, function(err) {
                            if (err) errors.push(err);
                            callback(errors.length == 0 ? null : errors, errors.length == 0);
                        });
                    });
                });
            });
        },
        removeGroupMembers: function(name, users, cb) {
            this._getGroupId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'user_id IN (SELECT id FROM users WHERE username IN (' + 
                    repeat('?', ',', users.length) + ')', groups, function(err) {
                        return cb(err, !err);
                    }
                );
            });
        }
    };
}