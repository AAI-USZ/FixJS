function(locationTimeData, callback) {

  if (!locationTimeData || typeof(locationTimeData) != 'object') {

    callback('No valid data was given to fetch weather data', null);

    return;

  }

  

  if(!locationTimeData.Date || !locationTimeData.Location) {

    callback('Missing data to fetch weather data', null);

    return;

  }

  

  //Initialize the object for storing column indexes of the weather table

  var dataColumns = {

    'temperature': 0,

    'humidity': 0,

    'windspeed': 0,

    'condition': 0

  };

  //result storage for interesting weather data

  var weatherData = {};



  //Formatting the result date, assuming the format yyyy.mm.dd hh:mm:ss

  var tempDate = locationTimeData.Date.split(' ');

  var resDate = tempDate[0].split('-');

  var resTime = ['12','00','00'];

  if(tempDate[1] !== undefined) {

    resTime = tempDate[1].split(':'); 

  }

  resTime[0] = parseInt(resTime[0].replace(/0(\d\/)/g,''));

  resTime[1] = parseInt(resTime[1].replace(/0(\d\/)/g,''));

  resTime = new Date(2010,1,1,resTime[0],resTime[1],0);



  var requestURL = 'http://api.wunderground.com/history/cgi-bin/findweather/getForecast?'

    + 'airportorwmo=query'

    + '&historytype=DailyHistory' 

    + '&code=' + locationTimeData.Location[0] + ',' + locationTimeData.Location[1]

    + '&month=' + resDate[1]

    + '&day=' + resDate[2]

    + '&year=' + resDate[0];

  

  //DEBUG:

  //console.log(requestURL);

  

  //Get the weather page

  restler

  .get(requestURL)

  .on('success', function(data) {    

        

    //Get jQuery working on the returned HTML page

    jsdom.env({

      html: data,

      scripts: [

        'http://code.jquery.com/jquery-1.7.1.min.js'

      ]

    }, function (error, window) {

      

      if(error) {

        callback(error, null);

        return;

      }

      

      try {

        var $ = window.jQuery;

        

        //Test if weather data is available for this date and this location

        if ($("#obsTable").length < 1){

          throw 'No weather data for this location and this date.';

        }

        

        //Get the column index for interesting fields from the table header

        var headerIndex = 1;

        

        $('#obsTable tr th').each(function(index) {

          

          if($(this).text() == 'Temp.') {

            dataColumns.temperature = headerIndex;

          }

          if($(this).text() == 'Humidity') {

            dataColumns.humidity = headerIndex;

          }

          if($(this).text() == 'Wind Speed') {

            dataColumns.windspeed = headerIndex;

          }

          if($(this).text() == 'Conditions') {

            dataColumns.condition = headerIndex;

          }

          headerIndex++;

        });

        

        //Get the closest weather data for the given time

        var targetRow = 0;

        var currentRow = 0;

        var minDiff = 1439; //initial: (24 * 60min) - 1;

        

        $('#obsTable tbody tr td:first-child').each(function(index) {

          //Formatting the wunderground time from format hh:mm AM/PM

          var splitTime = $(this).text().split(' ');

          var chkTime = splitTime[0].split(':');

          chkTime[0] = parseInt(chkTime[0]);

          chkTime[0] = (splitTime[1] == 'AM' && chkTime[0] == 12) ? 0 : chkTime[0];

          chkTime[0] = (splitTime[1] == 'PM' && chkTime[0] < 12) ? chkTime[0] + 12 : chkTime[0];

          chkTime[1] = parseInt(chkTime[1]);

          chkTime = new Date(2010,1,1,chkTime[0],chkTime[1],0);

          

          //Determining is the time of the current row is closer to the time of the result

          curDiff = resTime.getTime() - chkTime.getTime();

          curDiff = Math.abs(Math.floor(curDiff/1000/60));

          if(curDiff < minDiff) {

            minDiff = curDiff;

            targetRow = currentRow;

          }

          currentRow++; 

        });

        

        //Get the temperature for the most fitting time (usually 1st column)

        weatherData.temperature = $('#obsTable tbody tr:nth-child(' + targetRow + ') td:nth-child(' + dataColumns.temperature + ')').text();

        weatherData.temperature = parseFloat(weatherData.temperature).toFixed(1);

        

        //Get the humidity for the most fitting time (usually 3rd column)

        weatherData.humidity = $('#obsTable tbody tr:nth-child(' + targetRow + ') td:nth-child(' + dataColumns.humidity + ')').text();

        weatherData.humidity = parseFloat(weatherData.humidity).toFixed(1);

        

        //Get the windspeed for the most fitting time

        var winddata = $('#obsTable tbody tr:nth-child(' + targetRow + ') td:nth-child(' + dataColumns.windspeed + ')').text().replace(/^\s*|\s*$/g,'');

        weatherData.wind = (winddata == 'Calm' || winddata == '-') ? parseFloat('0.0') : Math.round(parseFloat(winddata));

        

        //Calculate the Beaufort number for the determined windspeed

        for(var b=0; b < beaufortScale.length; b++) {

          if(weatherData.wind >= beaufortScale[b].min && weatherData.wind <= beaufortScale[b].max) {

            weatherData.wind = beaufortScale[b].id;

            break;

          }

        }

        

        //Get the condition for the most fitting time

        weatherData.condition = $('#obsTable tbody tr:nth-child(' + targetRow + ') td:nth-child(' + dataColumns.condition + ')').text().replace(/^\s+|\s+$/g,"");

        weatherData.condition = weatherData.condition.replace('Light ','');

        weatherData.condition = weatherData.condition.replace('Heavy ','');

        //Get the condition identifier for the determined condition

        if(weatherCondition[weatherData.condition]) {

          weatherData.condition = weatherCondition[weatherData.condition];

        }

        

        //Fine we got something, so give it back

        callback(null, weatherData);

      

      } catch (error) {

        callback(error, null);

      }

    }); //End jsdom

  })

  .on('error', function(data,response) {

    callback(response.message, null);

  });  

}