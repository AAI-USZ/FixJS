function (data) {

                $('#calendar-container').find('.work-diary').html('');

                $(data.documents).each(function (index, item) {

                    var id = '#date-' + item.year.toString() + item.month.toString() + item.date.toString();

                    var $content = $(id);

                    $content.find('.work-diary').append($('<span class="front front' + item.front + '" front="' + item.front + '">' + data.user['id_' + item.front] + '</span>'));

                })

            }