function handleupload(x)
{
	if(x=="unexpectedrequest")
		alert("Something went wrong while uploading Data");
	else if(x=="mysqlfailed")
		alert("Mysql Failed with Error");
	else if(x=="sucess")
		alert("Data sucessfully Updated");
}