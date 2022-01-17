function (index, item) {

					console.log(item);

					var article =
						'<div class="three columns">'
							+ '<div class="innercontents" data-id="' + item.uuid + '" id="' + item.uuid + '">'
							+ '<span class="uploader">' + item.user.firstName + " " + item.user.lastName+ '</span>'
							+ isProf(item.user.type) //return nothing if not
							+ '<div class="post_details"> '
							+ '<p>Posted in '
							+ '<span class="coursename">' +'<a>' + item.course.subject +" "+ item.course.number
							+ '-'  + (item.section.title).replace('WEEK ',"WK")  + '</a>'
							+ '</span>'
							+ '<span class="post_time"> ' + formartDate(item.createdAt) + '</span>'
							+ '</p>'
							+ '</div>'
							+ '<h5>'
							+ '<a href="/article/' + item.uuid + '">' + item.title + '</a></h5>'
							+ '<div class="imgpreview">'
							+ '<img src="'+ item.thumbnail + '" alt="'+ item.title + '" />'
							+ '</div>'
							+ '<div class="articlepreview">' + '<p>' + item.excerpt + '</p>'
							+ '</div>'
							+ '<div class="likescomments">'
							+ '<span class="typicn star starred"></span>'

							+ '<span> Like ('+ item.likes +') </span>'
							+ '<span> Comments ('+ item.totalComments +') </span>'
							+ '</div>'
							+ '</div>'
							+ '</div>';

					$('#contents').append(article);
				}