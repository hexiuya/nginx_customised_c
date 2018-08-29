function login(){
	$("#loading_image").show();

	var username = $("#username").val();
	var password = $("#password").val();
	var params = {
		messageid:"0x0001",
	    requestid:generateUUID(),
		username:username,
		password:password
	};
	$.ajax({
		url:urlPrefix() + "cLogin",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			$("#loading_image").hide();
			console.log(data);
			if(data.status == undefined){
				BootstrapDialog.show({  
					closable: true, 
		            message: "busy service , please try again after 5 minutes .",
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					    }
		            }]
		    	});
				return ;
			}
			if(data.status == "SUCCESS"){
				sessionStorage.customerId = data.clientid;
				sessionStorage.username = data.username;
				console.log("customerDetail:"+sessionStorage.customerDetail);

				/*
				// 使用cookie
                var cookie = "clientid=" + data.clientid ; 
                var cookie1 = "username=" + data.username ;
                document.cookie = cookie ;
                document.cookie = cookie1 ;
                */

				window.location.href = "profile.html";
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
        error:function(){
        	BootstrapDialog.show({  
					closable: true, 
		            message: "internal error",
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					    }
		            }]
		    });
        }
	});
}