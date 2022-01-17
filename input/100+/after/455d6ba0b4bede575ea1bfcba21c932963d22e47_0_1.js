function parseFile(callback)
{
var  individuals= [];

csv()
    .fromPath(__dirname+ '../../csv_data/individual.csv',{
        columns: true
    })
    .on('data',function(data,index){
        var item ={ id : data.Id,
                    ManagedBy : data.ManagedBy,
                    Title : data.Title,
                    FirstName : data.FirstName,
                    LastName : data.LastName,
                    Gender : data.Gender,
                    DOB : data.DOB,
                    TFN : data.TFN,
                    Mobile : data.Mobile,
                    Email : data.Email,
                    Twitter : data.Twitter,
                    AddressLine1 : data.AddressLine1,
                    ReferralId : data.ReferralId
                  }
        individuals.push(item);
      // console.log(JSON.stringify(item) );
    })
    .on('end',function(count){
        console.log('Number of lines: '+count );
        return callback(null,individuals);
    })
}