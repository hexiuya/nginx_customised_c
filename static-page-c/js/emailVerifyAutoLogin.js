$(function(){
	autoLogin();
});

function autoLogin(){
	var username = getParam("username");
	var token = getParam("token");
	$.ajax({
		url:urlPrefix() + "crm-test/onlineManage/emailAutoLogin",
		data:{username:username,token:token},
		type: 'POST',
		success:function(data){
			console.log(data);
			if(data.returnCode == "0000"){
				window.location.href = "profile.htm?username=" + data.lists[0].username;
			}else{
				alert(data.returnDesc);
			}
        }
	});
}