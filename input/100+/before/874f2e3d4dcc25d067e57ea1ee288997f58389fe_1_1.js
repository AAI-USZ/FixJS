function(){
	var builid;
	var projectid;
	if(parent.document.getElementById("frame.pageType").value=="all"){	
		projectid = 0;
	}
	else{
		projectid = parseInt(parent.document.getElementById("frame.pageId").value);
    }
	if(parent.document.getElementById("frame.housepageType").value=="all"){
		builid = 0;
	}
	else{
		builid = parseInt(parent.document.getElementById("frame.housepageId").value);
	}

    $('#houselist').flexigrid({
	     url:"loadHouseList?buildingId="+builid+"&projectId="+projectid,
	     dataType:"json",
	  	 colModel: [
	  	     { display: '所属小区', name:'building.project.proName',width: Width*0.15, sortable:true, align: 'center' },
             { display: '房号', name:'houseNum',width: Width*0.15, sortable:true, align: 'center' },
			 { display: '房屋面积',name:'houseArea', width: Width*0.1, sortable:true, align: 'center' },
             { display: '是否空置',name:'isempty', width: Width*0.1, sortable:true, align: 'center' },
             { display: '房屋描述',name:'houseDesc', width: Width*0.15, sortable:true, align: 'center' }
         ], 
         buttons:[
              { name: '删除房屋', bclass: 'delete', onpress: deleteHouse },
              { separator: true }
      	 ],
		 searchitems:[
		     { display: '小区', name: 'building.project.proName', isDefault:true },
 		     { display: '房号', name: 'houseNum', isDefault:false },
 		     { display: '是否空置', name: 'isempty', isDefault:false }
 		 ],
         height:Height*0.96,
         showSearch:true,
         showcheckbox:true,
         usepager: true,
 		 useRp: true,
 		 rp: 15,
 		 operation:true,
 		 operationcontent:'<a href="javascript:void(0)" onclick="openEditHouse($(this).parent().parent().parent())">编辑</a>',
		 operationWidth: Width*0.1
     });		

}