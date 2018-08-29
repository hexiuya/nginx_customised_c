$(function(){
	scanPersonalInformation();
});

function scanPersonalInformation(){
	
	var clientid = getCustomerId();
	var params = {
		messageid:"0x0025",
	    requestid:generateUUID(),
		clientid:clientid
	}
	$.ajax({
		url:urlPrefix() + "cScanPersonalInfo",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				
				$("#mobile").val(data.mobile);
				$("#identification").val(data.identification);
				$("#id").val(data.clientid);
			}else{
				BootstrapDialog.show({  
					closable: true, 
		            message: data.status,
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					    }
		            }]
		        });
			}
        },
        error : function(xhr,textStatus,errorThrown){
       　　if (xhr.status == 401) {
       			BootstrapDialog.show({  
					closable: true, 
		            message: "please login",
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					      window.location.href = "login.html";
					    }
		            }]
		        });
         　} else{
           　　// 调用外部的error
            　 error && error(xhr,textStatus,errorThrown);
      　　 }
    　　}
	});
}


function modifyPersonalInformation(){
	
	var clientid = getCustomerId();
	
	var mobile = $("#mobile").val();

	var identification = $("#identification").val();

	var params = {	
		messageid:"0x0013",
		requestid:generateUUID(),
		mobile:mobile,
		identification:identification,
		clientid:clientid
	};
	
	$.ajax({
		url:urlPrefix() + "cModifyDetails",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);

			BootstrapDialog.show({  
					closable: true, 
		            message: data.status,
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					    }
		            }]
		        });
			if(data.status == "SUCCESS"){
				scanPersonalInformation();
			}
        },
        error : function(xhr,textStatus,errorThrown){
       　　if (xhr.status == 401) {
       			BootstrapDialog.show({  
					closable: true, 
		            message: "please login",
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					      window.location.href = "login.html";
					    }
		            }]
		        });
         　} else{
           　　// 调用外部的error
            　 error && error(xhr,textStatus,errorThrown);
      　　 }
    　　}
        
	});
}