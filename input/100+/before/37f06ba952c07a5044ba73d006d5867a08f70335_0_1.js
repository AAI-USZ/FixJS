function () {
    var api_key = "ei4napgems7bf1bo";
    function get_article(article_id) {
        url = "http://api.trove.nla.gov.au/newspaper/" + article_id + "?key=" + api_key + "&include=articletext&encoding=json";
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                $("#article").html("<h3>" + data.article.heading + "</h3><p><a class='btn' href='" + data.article.troveUrl + "'>View in Trove &raquo;</a>" + data.article.articleText);  
            }
        });
    }
    var chart;
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                }
            },
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                        }
                    }
                }
            },
        series: [{
                    data: series['words'],
                    type: 'pie'
                }]
    });
    $("#show").click(function() {
        newspaper_id = $("#newspaper").val();
        url = "/frontpages/" + newspaper_id + "/words/";
        categories = []
        $('input:checkbox:checked').each(function() {
            categories.push($(this).val());
        })
        if (categories.length > 0) {
            url += "?category=" + categories.join('&category=')
        }
        window.location.href = url;
        return false;
    });
    $(".article_title").each(function() {
        var id = this.href.match(/(\d+)$/)[1];
        $(this).prop("href", "#");
        $(this).click(function(event) {
            event.preventDefault();
            get_article(id);
            return false;
        })
    });
}