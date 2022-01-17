function () {

		/// <summary>

		/// Crawls for active village storages and crop production/consumption

		/// </summary>



		Log("Services: Crawling village storage...");



		var activeVillage = GetActiveVillage();



		$("#res > li > p > span").each(function (index, obj) {

			var resText = $(obj).text();

			var seperatorIndex = resText.indexOf("/");

			var resInStorage = parseInt(resText.substr(0, seperatorIndex));

			var storageMax = parseInt(resText.substr(seperatorIndex + 1, resText.length - seperatorIndex + 1));



			// If storage, else it's crop production/consumtion

			if (index < 4) {

				// Set Storage mac value

				if (index == 0) activeVillage.Resources.Storage[0] = storageMax;

				if (index == 3) activeVillage.Resources.Storage[1] = storageMax



				// Set current stored value

				activeVillage.Resources.Stored[index] = resInStorage;

			}

			else {

				activeVillage.Resources.TotalCropProduction = storageMax;

				activeVillage.Resources.Consumption = resInStorage;

			}

		});



		DLog("Services: Stored in Village [" + activeVillage.VID + "] is [" + activeVillage.Resources.Stored + "] and crop [" + activeVillage.Resources.Consumption + " of " + activeVillage.Resources.TotalCropProduction + "]");

		DLog("Services: Storage of Village [" + activeVillage.VID + "] is [" + activeVillage.Resources.Storage + "]");



		UpdateActiveVillage(activeVillage);

	}