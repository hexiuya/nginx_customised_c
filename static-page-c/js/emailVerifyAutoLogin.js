$(function(){
	autoLogin();
});

function autoLogin(){
	var username = getParam("username");
	var token = getParam("token");

	var params = {
		messageid:"0x0031",
	    requestid:generateUUID(),
		username:username,
		token:token
	};

	$.ajax({
		url:urlPrefix() + "cEmailAutoLogin",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				sessionStorage.customerId = data.clientid;
				sessionStorage.username = data.username;
				console.log("customerDetail:"+sessionStorage.customerDetail);

				window.location.href = "profile.html";
			}else{
				alert(data.status);
			}
        }
	});
}