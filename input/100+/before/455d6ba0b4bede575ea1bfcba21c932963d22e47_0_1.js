function parseFile()
{

var rawdata = [];

csv()
    .fromPath(__dirname + '../../csv_data/Individual.csv')
    //.toStream(process.stdout)
    .transform(function(data,index){

        rawdata.push(data[0]);
      //  return (index>0 ? ',' : '') + data[0] + ":" + data[2] + ' ' + data[1];
    })
    .on('end',function(count){
        console.log('Number of lines: '+count );
        console.log('Number of items in array: '+rawdata.length );
    })
}