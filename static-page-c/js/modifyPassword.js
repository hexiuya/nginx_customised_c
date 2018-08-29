function modifyPassword(){

	var oldPassword = $("#oldPassword").val();

	var newPassword = $("#newPassword").val();
	
	var confirmPassword = $("#confirmPassword").val();
	
	var clientid = getCustomerId();
	
	var params = {
		messageid:"0x0011",
	    requestid:generateUUID(),
		clientid:clientid,
		oldpw:oldPassword,
		newpw:newPassword,
		repw:confirmPassword
	};

	$.ajax({
		url:urlPrefix() + "cChangePw",
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

			/*
			if(data.returnCode == "00000"){
				//alert("reset password successfully");
				BootstrapDialog.show({  
		            message: 'reset password successfully'  
		        });
			}else{
				//alert(data.returnDesc);
				BootstrapDialog.show({  
		            message: data.returnDesc  
		        });
			}
			*/
        }
	});
}