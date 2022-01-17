function(e, args) {
            var user = e.currentTarget.ancestor('.'+CSS.USER);
            var params = [];
            params['id'] = this.get(UEP.COURSEID);
            params['userid'] = user.getAttribute("rel");
            params['enrolid'] = args.enrolid;
            params['sesskey'] = M.cfg.sesskey;
            params['action'] = 'enrol';
            params['role'] = this.get(UEP.BASE).one('.'+CSS.ENROLMENTOPTION+'.'+CSS.ROLE+' select').get('value');
            params['startdate'] = this.get(UEP.BASE).one('.'+CSS.ENROLMENTOPTION+'.'+CSS.STARTDATE+' select').get('value');
            params['duration'] = this.get(UEP.BASE).one('.'+CSS.ENROLMENTOPTION+'.'+CSS.DURATION+' select').get('value');
            if (this.get(UEP.DISABLEGRADEHISTORY) != true) {
                params['recovergrades'] = this.get(UEP.BASE).one('#'+CSS.RECOVERGRADES).get('checked')?1:0;
            } else {
                params['recovergrades'] = 0;
            }

            Y.io(M.cfg.wwwroot+this.get(UEP.AJAXURL), {
                method:'POST',
                data:build_querystring(params),
                on: {
                    start : this.displayLoading,
                    complete : function(tid, outcome, args) {
                        try {
                            var result = Y.JSON.parse(outcome.responseText);
                            if (result.error) {
                                return new M.core.ajaxException(result);
                            } else {
                                args.userNode.addClass(CSS.ENROLLED);
                                args.userNode.one('.'+CSS.ENROL).remove();
                                this.set(UEP.REQUIREREFRESH, true);
                            }
                        } catch (e) {
                            new M.core.exception(e);
                        }
                    },
                    end : this.removeLoading
                },
                context:this,
                arguments:{
                    params : params,
                    userNode : user
                }
            });

        }