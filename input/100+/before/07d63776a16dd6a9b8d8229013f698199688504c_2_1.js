function() {

	$('#newExam').click(function(e) {

		e.preventDefault();

		e.stopPropagation();



		$('#newExam').hide();

		$('#newExamForm')

			.show()

			.css('display','inline-block')

			.find('input[name="name"]')

				.focus()

		;

	});



	function cancelCreate() {

		$('#newExam').show();

		$('#newExamForm').hide();

	}



	$('#newExamForm')

		.hide()

		.submit(function(e) {

			var name = $(this).find('input[name="name"]').val();

			if(!name.trim().length)

			{

				e.preventDefault();

				e.stopPropagation();

			}

		})

		.find('input[name="name"]')

			.keyup(function(e) {

				if(e.which==27)

					cancelCreate();

			})

	;



	$('.exam .delete').on('click',function(e) {

		e.stopPropagation();

		e.preventDefault();

		if(window.confirm('Delete this exam?')) {

			var url = $(this).attr('href');

			var item = $(this).parents('.exam');

			$.post(url,{csrfmiddlewaretoken: getCookie('csrftoken')})

				.success(function() {

					item.slideUp(200,function() {item.remove()})

				})

				.error(function(response) {

					noty({text: 'Error deleting exam:\n\n'+response.responseText, layout: 'center', type: 'error'});

				})

			;

		}

	});



	$('#exam-list').tablesorter();



    $('#upload').click(function(e) {

        if(!$('#uploadForm input[type=file]').val().length) {

            e.preventDefault();

            e.stopPropagation();

            $('#uploadForm input[type=file]').trigger('click');

        }

    });

    $('#uploadForm input[type=file]').change(function(e) {

        if($.browser.msie)

            $('#upload').text('Click again to upload');

        else

            $('#uploadForm').submit();

    });



/*

	function uploadFile(content) {

		contentInput.text(content);

		$('#uploadForm').submit();

	}



	function loadFile(file) {

		if(!file) { return; }

		var fr = new FileReader();

		var contentInput = $('#uploadForm').find('[name=content]')

		fr.onload = function(e) {

			var content = e.target.result;

			uploadFile(content);

		}

		fr.readAsText(file);

	}



    $.event.props.push('dataTransfer');

    $('#uploadForm').on({

        dragenter: function(e) {

            e.stopPropagation();

            e.preventDefault();

            $(this).addClass('over')

        },

        dragover: function(e) {

            e.stopPropagation();

            e.preventDefault();

            $(this).addClass('over')

        },

        dragleave: function(e) {

            $(this).removeClass('over');

        },

        drop: function(e) {

            $(this).removeClass('over');

			if('files' in e.dataTransfer)

	            loadFile(e.dataTransfer.files[0]);

			else

			{

				console.log(JSON.stringify(e.dataTransfer));

			//	uploadFile(e.dataTransfer.getData('text'));

			}

        }

    })

	.find('button').on('click',function(e) {

		e.preventDefault();

		e.stopPropagation();

		$('#uploadForm input[type=file]').click();

	})

	.end()

	.find('input[type=file]').on('change',function() {

		if(this.files)

			loadFile(this.files[0]);

		else

		{

//			$('textarea[name=content]').remove();

//			$(this).attr('name','content');

			$('#uploadForm').submit();

		}

	});

*/



    function ExamSelect()

    {

		var e = this;



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

                deleteExam: function(q) {

                    if(window.confirm('Delete this exam?')) {

                        var results = this;

                        var item = $(this).parents('.exam');

                        $.post(q.deleteURL,{csrfmiddlewaretoken: getCookie('csrftoken')})

                            .success(function() {

                                results.all.remove(q);

                            })

                            .error(function(response) {

                                noty({text: 'Error deleting exam:\n\n'+response.responseText, layout: 'center', type: 'error'});

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



		ko.computed(function() {

            var vm = this;

            this.search.searching(true);

			var data = {

				q: this.search.query(),

				author: this.search.author(),

				mine: this.search.mine()

			};

            $.getJSON('/exam/search/',data)

                .success(function(data) {

                    vm.search.results.all(data.object_list);

                })

                .error(function() {

					if('console' in window)

	                    console.log(arguments);

                })

                .complete(function() {

                    vm.search.searching(false);

                });

            ;



		},this).extend({throttle:100});

    }

    

    //create a view model

    viewModel = new ExamSelect();

    ko.applyBindings(viewModel);





}