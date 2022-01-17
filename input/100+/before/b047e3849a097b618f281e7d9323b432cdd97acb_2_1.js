function(data) {    

    try { 

      

      var photo = data.photo || {};

      

      //First, grab the user tags of the image

      var tags = new Array();

      

      if(photo.tags) {

        for(var t=0; t < photo.tags.tag.length; t++) {

          tags.push(photo.tags.tag[t]['_content']);

          //make sure to get not too many tags

          if(t > 6) {

            break;

          }

        }

      }

      //then collect all the data we can get from this request

      var result = {

        "FlickrId" : imageId,  

        "Type": "ImageType",

        "Name": photo.title['_content'] || "",

        "Description": photo.description['_content'] || "",

        "Tags": tags,

        "Extension": photo.originalformat || 'jpg',

        "License": licenses[photo.license].name, 

        "LicenseURL": licenses[photo.license].url,

        "Author": photo.owner.realname || photo.owner.username,

        "Date": photo.dates.taken,

        "Size": "",

        "URL": "",

        "Preview": "",

        "Emotions": [],

        "Location": [],

        "Weather": {}

      };

      

      //Check if we have an location

      if(photo.location) {

        result.Location = [photo.location.latitude || 0 ,photo.location.longitude || 0,0,0];

        

        //get weather data if we have a location

        weather.fetchWeather({Date: photo.dates.taken, Location: result.Location}, function(error, data) {

          if(error) {

            console.log('No weather data found for image with id ' + imageId);

          } else {

            result.Weather = data;

          }

          //Ok, got everything here so give the result back

          callback(null, result);

        });

      } else {

        //No location, hence no weather, just return the result

        callback(null, result);

      }

      

    } catch (error) {

      callback(error, null);

    }

  }