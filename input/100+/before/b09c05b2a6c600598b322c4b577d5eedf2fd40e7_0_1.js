function extractData(){

	var data = {};

	//VoID metadata

	data.voidTitle = $("#voidTitle").val();

	data.voidDescription = $("#voidDescription").val();

	data.voidCreatedBy = $("#voidCreatedBy").val();

	data.voidCreatedOn = $("#voidCreatedOn").val();

	//General metadata

	data.dsURI = $("#dsURI").val();	

	data.dsHomeURI = $("#dsHomeURI").val();

	data.dsName = $("#dsName").val();

	data.dsDescription = $("#dsDescription").val();

	data.dsLicenseURI = $("#dsLicenseURI").val();

	data.dsUriNs = $("#dsUriNs").val();

	//Provenance

	data.origin = $("input[name=data-origin]:checked").val();

	switch (data.origin) {

	case "original":

		data.provAccessedFrom = $("#provAccessedFrom").val();

		data.pavVersion = $("#pavAccessedVersion").val();

		data.provAccessedOn = $("#provAccessedOn").val();

		data.provPublishedOn = $("#provPublishedOn").val();

		data.provModifiedOn = $("#provModifiedOn").val();

		data.provAccessedBy = $("#provAccessedBy").val();

		break;

	case "retrieved":

		data.provRetrievedFrom = $("#provRetrievedFrom").val();

		data.pavVersion = $("#pavRetrievedVersion").val();

		data.provRetrievedOn = $("#provRetrievedOn").val();

		data.provRetrievedBy = $("#provRetrievedBy").val();	

		break;

	case "imported":

		data.provImportedFrom = $("#provImportedFrom").val();

		data.pavVersion = $("#pavImportedVersion").val();

		data.provImportedOn = $("#provImportedOn").val();

		data.provImportedBy = $("#provImportedBy").val();	

		break;

	case "derived":

		data.provDerivedFrom = $("#provDerivedFrom").val();

		data.pavVersion = $("#pavDerievedVersion").val();

		data.provDerivedOn = $("#provDerivedOn").val();

		data.provDerivedBy = $("#provDerivedBy").val();	

		break;

	default:

		break;

	}

	// topics

	var dsTopicURIList = new Array();

	$("#dsSelectedTopics div span").each(function (i) {

		dsTopicURIList.push($(this).attr("resource"));

	});

	data.dsTopicURIList = dsTopicURIList;

	// Example resources

	var dsExampleURIList = new Array();

	$(".dsExampleURI input").each(function (i) {

		var exampleURI = ($(this).val());

		if ($.inArray(exampleURI, validURIs) >= 0) {

			dsExampleURIList.push(exampleURI);

		}

	});

	data.dsExampleURIList = dsExampleURIList;

	//Subsets

	var subsetList = new Array();

	$("#existingSubsets > div").each(function (i) {

		var subset = {

				subsetURI : $(this).find("div span.ibtn").attr("resource"),

				subsetName : $(this).find("div span.subsetName").text(),

				subsetNSURI : $(this).find("div span.subsetNSURI").text()

		};

		subsetList.push(subset);

	});

	if (subsetList.length > 0) {

		data.dsSubsets = subsetList;

	}

	//Access methods information

	data.dsSPARQLEndpointURI = $("#dsSPARQLEndpointURI").val();

	data.dsLookupURI = $("#dsLookupURI").val();

	data.dsDumpURI = $("#dsDumpURI").val();

	return data;

}