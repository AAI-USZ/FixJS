function QuestionSelect()

    {

		var vm = this;



		this.search = {

			query: ko.observable(''),

			author: ko.observable(''),

			results: {

				all: ko.observableArray([]),

				page: ko.observable(1),

				prevPage: function() {

					var page = this.page();

					if(page>1)

						this.page(page-1);

				},

				nextPage: function() {

					var page = this.page();

					if(page<this.pages().length)

						this.page(page+1);

				},

                deleteQuestion: function(q) {

                    if(window.confirm('Delete this question?')) {

                        var results = this;

                        var item = $(this).parents('.question');

                        $.post(q.deleteURL,{csrfmiddlewaretoken: getCookie('csrftoken')})

                            .success(function() {

                                results.all.remove(q);

                            })

                            .error(function(response) {

                                noty({text: 'Error deleting question:\n\n'+response.responseText, layout: 'center', type: 'error'});

                            })

                        ;

                    }

                }

			},

			searching: ko.observable(false),

			realMine: ko.observable(false),

			clearMine: function() {

				this.search.mine(false);

			}

		}

		this.search.results.pages = ko.computed(function() {

			this.page(1);



			var results = this.all();

			var pages = [];

			for(var i=0;i<results.length;i+=10) {

				pages.push(results.slice(i,i+10));

			}



			return pages;

		},this.search.results);

		this.search.results.pageText = ko.computed(function() {

			return this.page()+'/'+this.pages().length;

		},this.search.results);





		this.search.mine = ko.computed({

			read: function() {

				return this.realMine();

			},

			write: function(v) {

				this.realMine(v);

				if(v)

					this.author('');

			}

		},this.search);



		Editor.searchBinding(this.search,'/questions/search/',function() {

			return {

				q: vm.search.query(),

				author: vm.search.author(),

				mine: vm.search.mine()

			};

		});

    }