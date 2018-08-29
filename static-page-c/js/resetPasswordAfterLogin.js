function resetPasswordAfterLogin(){
	var newPassword = $("#newPassword").val();
	
	var confirmPassword = $("#confirmPassword").val();
	
	var username = getParam("username");
	
	$.ajax({
		url:urlPrefix() + "/crm-test/onlineManage/resetPasswordAfterLogin",
		data:{username:username,newPassword:newPassword,confirmPassword:confirmPassword},
		type: 'POST',
		success:function(data){
			console.log(data);
			if(data.returnCode == "00000"){
				alert("reset password successfully");
				
			}else{
				alert(data.returnDesc);
			}
        }
	});
}