function(){

      load_general_fund_pie();
      $("#pie").bind("plothover", pieHover);
      $("#pie").bind("plotclick", pieClick);

      var data = [
              {
    		  "_id": {"$oid": "500b1fe0339a29ca34000001"},
    		  "cost_center": {
    		    "_id": {"$oid": "500b209f339a29ca34000002"},
    		    "code": "1010",
    		    "created_at": "2012-07-21T21:35:27Z",
    		    "name": "General Fund: General Purpose",
    		    "updated_at": "2012-07-21T21:35:27Z"
    		  },
    		  "created_at": "2012-07-21T21:32:45Z",
    		  "department": {
    		    "_id": {"$oid": "500b20b5339a29ca34000003"},
    		    "created_at": "2012-07-21T21:35:49Z",
    		    "name": "Office of Communications and Information Services",
    		    "updated_at": "2012-07-21T21:35:49Z"
    		  },
    		  "expenditure": 7489612,
    		  "fiscal_period_id": {"$oid": "500b20c4339a29ca34000004"},
    		  "revenue": 2388740,
    		  "updated_at": "2012-07-21T21:36:22Z"
    		},
    		{"_id": {"$oid": "500b1fe0339a29ca34000001"},
	  		  "cost_center": {
	  		    "_id": {"$oid": "500b209f339a29ca34000002"},
	  		    "code": "1010",
	  		    "created_at": "2012-07-21T21:35:27Z",
	  		    "name": "General Fund: General Purpose",
	  		    "updated_at": "2012-07-21T21:35:27Z"
	  		  },
	  		  "created_at": "2012-07-21T21:32:45Z",
	  		  "department": {
	  		    "_id": {"$oid": "500b20b5339a29ca34000003"},
	  		    "created_at": "2012-07-21T21:35:49Z",
	  		    "name": "Office of Communications and Information Services",
	  		    "updated_at": "2012-07-21T21:35:49Z"
	  		  },
	  		  "expenditure": 235113,
	  		  "fiscal_period_id": {"$oid": "500b20c4339a29ca34000004"},
	  		  "revenue": 235666,
	  		  "updated_at": "2012-07-21T21:36:22Z"
    		}
    		];
      
      data = App.convert_to_pie_data(data, "department", "expenditure");
      
      // DEFAULT
      $.plot($("#pie"), data, {
          series: {
            pie: { 
              show: true,
              label: {
                  show: true,
                  radius: 0.60,
                  formatter: function(label, series){
                      return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                  },
                  background: { opacity: 0.8 }
              },
            }
          },
          grid: {
            hoverable: true,
            clickable: true
          },
          legend: {
        	  show: false
          }
      });

      $("#pie").bind("plothover", pieHover);
      $("#pie").bind("plotclick", pieClick);

    }