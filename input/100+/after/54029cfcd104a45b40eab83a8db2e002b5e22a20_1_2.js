function Question(data)
    {
		var isadvanced = this.isadvanced = ko.observable(true);

        this.name = ko.observable('Untitled Question');
		this.realName = ko.computed(function() {
			var name = this.name()
			return name.length>0 ? name : 'Untitled Question';
		},this);

		var realtags = this.realtags = ko.observableArray([]);
        this.tags = ko.computed({
            read: this.realtags,
            write: function(newtags) {
                for(var i=newtags.length-1;i>=0;i--)
                {
                    if(newtags.indexOf(newtags[i])<i)
                        newtags.splice(i,1);
                }
                this.realtags(newtags);
            }
        },this);

        this.tags.push = function(thing) {
            if(realtags().indexOf(thing)==-1)
                realtags.push(thing);
        }
        this.tags.pop = function(thing) {
            return realtags.pop();
        }
        this.tags.splice = function(i,n) {
            return realtags.splice(i,n);
        }

		this.notes = ko.observable('');
		this.metadata = ko.computed(function() {
			return {
				notes: this.notes()
			};
		},this);

		this.extensions = ko.observableArray([]);
		for(var i=0;i<Editor.numbasExtensions.length;i++) {
			var ext = Editor.numbasExtensions[i];
			ext.used = ko.observable(false);
			this.extensions.push(ext);
		}
		this.usedExtensions = ko.computed(function() {
			return this.extensions().filter(function(e){return e.used()});
		},this);

        this.statement = Editor.contentObservable('');
        this.advice = Editor.contentObservable('');

        var rulesets = this.rulesets = ko.observableArray([]);
        this.allsets = ko.computed(function() {
            return builtinRulesets.concat(rulesets().map(function(r){return r.name()})).sort();
        });

        this.functions = ko.observableArray([]);

        this.variables = ko.observableArray([]);

        this.parts = ko.observableArray([]);

        this.output = ko.computed(function() {
            return prettyData(this.toJSON());
        },this);

        ko.computed(function() {
            document.title = this.name() ? this.name()+' - Numbas Editor' : 'Numbas Editor';
        },this);

		ko.computed(function() {
			//the ko dependency checker seems not to pay attention to what happens in the computeVariables method, so access the variable bits here to give it a prompt
			this.variables().map(function(v) {
				v.name();
				v.definition();
			});
			this.computeVariables();
		},this).extend({throttle:300});

        if(data)
		{
			this.id = data.id;

			if('metadata' in data) {
				tryLoad(data.metadata,['notes'],this);
			}

			this.load(parseExam(data.content));

			try{
				this.tags(data.tags);
			}
			catch(e) {
				this.tags([]);
			}
		}

        if(Editor.editable) {
            this.save = ko.computed(function() {
                window.onbeforeunload = function() {
                    return 'There are still unsaved changes.';
                }

                return {
                    content: this.output(),
                    tags: this.tags(),
                    metadata: this.metadata()
                };
            },this);

            this.autoSave = ko.computed(function() {
                var q = this;
                var vm = this;

                if(!this.save_noty)
                {
                    this.save_noty = noty({
                        text: 'Saving...', 
                        layout: 'topCenter', 
                        type: 'information',
                        timeout: 0, 
                        speed: 150,
                        closeOnSelfClick: false, 
                        closeButton: false
                    });
                }
                
                $.post(
                    '/question/'+this.id+'/'+slugify(this.realName())+'/',
                    {json: JSON.stringify(this.save()), csrfmiddlewaretoken: getCookie('csrftoken')}
                )
                    .success(function(data){
                        var address = location.protocol+'//'+location.host+data.url;
                        if(history.replaceState)
                            history.replaceState({},q.realName(),address);
                        $.noty.close(vm.save_noty);
                        noty({text:'Saved.',type:'success',timeout: 1000, layout: 'topCenter'});
                    })
                    .error(function(response,type,message) {
                        if(message=='')
                            message = 'Server did not respond.';

                        noty({
                            text: 'Error saving question:\n\n'+message,
                            layout: "topLeft",
                            type: "error",
                            textAlign: "center",
                            animateOpen: {"height":"toggle"},
                            animateClose: {"height":"toggle"},
                            speed: 200,
                            timeout: 5000,
                            closable:true,
                            closeOnSelfClick: true
                        });
                    })
                    .complete(function() {
                        window.onbeforeunload = null;
                        $.noty.close(vm.save_noty);
                        vm.save_noty = null;
                    })
                ;
            },this).extend({throttle:1000});
        }
    }