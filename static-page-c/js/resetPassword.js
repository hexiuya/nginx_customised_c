function resetPassword(){
	var newPassword = $("#newPassword").val();
	
	var confirmPassword = $("#confirmPassword").val();
	
	var email = getParam("email");
	
	var token = getParam("token");

	var params = {
		messageid:"0x0009",
	    requestid:generateUUID(),
		email:email,
		token:token,
		newPassword:newPassword,
		confirmPassword:confirmPassword
	};
	
	$.ajax({
		url:urlPrefix() + "cResetPw",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				alert("reset password successfully");
				
				var username = data.username;
				
				autoLogin(username,newPassword)
				
			}else{
				alert(data.status);
			}
        }
	});
}


function autoLogin(username,newPassword){
	var email = getParam("email");
	
	var params = {
		messageid:"0x0001",
	    requestid:generateUUID(),
		email:email,
		password:newPassword
	};

	$.ajax({
		url:urlPrefix() + "cLogin",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				sessionStorage.customerId = data.clientid;
				sessionStorage.username = data.username;
				window.location.href = "profile.html";
			}else{
				alert(data.status);
			}
        }
	});
}