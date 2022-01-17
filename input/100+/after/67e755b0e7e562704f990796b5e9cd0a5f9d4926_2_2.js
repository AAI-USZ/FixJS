function getelement(service, element)
{
  var srv = JSON.stringify(service);
  var ret = null;
  if(element === 'name')
  {
    var nm = srv.split(element)[2];
    var index = nm.indexOf(",");
    //remove "" 
    ret = nm.slice(3, index-1); 
  }
  else if(element ==='addresses')
  {
    var el = srv.split(element)[1];
    var index = el.indexOf(","); 
    ret = el.slice(4, index-2);
  } 
  else
  {
    var el = srv.split(element)[1];
    var index = el.indexOf(","); 
    ret = el.slice(2, index);
  }
  return ret;	
}