$(function() {
	
	$('#username').blur(function () {  
		checkUsernameUnique();
	});  
	
	$('#email').blur(function () {  
		checkEmailUnique();
	});
	
});

function checkUsernameUnique(){
	var username = $("#username").val();
	var params = {
		messageid:"0x0027",
	    requestid:generateUUID(),
		username:username
	};
	$.ajax({
		url:urlPrefix() + "cCheckUsernameUnique",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			$("#username_alert_msg").remove();
			$("#username").after("<span id='username_alert_msg'></span>");
			if(data.status == "SUCCESS"){
				
				$("#username_alert_msg").css('color','green');
				$("#username_alert_msg").html("username is available");
			}else{
				
				$("#username_alert_msg").css('color','red');
				$("#username_alert_msg").html("username is not available");
			}
        }
	});
}

function checkEmailUnique(){
	
	var email = $("#email").val();
	var params = {
		messageid:"0x0029",
	    requestid:generateUUID(),
		email:email
	};
	$.ajax({
		url:urlPrefix() + "cCheckEmailUnique",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			$("#email_alert_msg").remove();
			$("#email").after("<span id='email_alert_msg'></span>");
			if(data.status == "SUCCESS"){
				
				$("#email_alert_msg").css('color','green');
				$("#email_alert_msg").html("email is available");
			}else{
				
				$("#email_alert_msg").css('color','red');
				$("#email_alert_msg").html("email is not available");
			}
        }
	});
}

function register(){
	var username = $("#username").val();
	var password = $("#password").val();
	var confirmPassword = $("#confirmPassword").val();
	var mobile = $("#mobile").val();
	var identification = $("#identification").val();
	var email = $("#email").val();

	var params = {
		messageid:"0x0003",
	    requestid:generateUUID(),
		username:username,
		password:password,
		confirmPassword:confirmPassword,
		mobile:mobile,
		identification:identification,
		email:email
	};

	$.ajax({
		url:urlPrefix() + "cRegister",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				//alert("send email successfully , please check email and complete registeration");
				BootstrapDialog.show({  
					closable: true, 
		            message: "send email successfully , please check email and complete registeration",
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					    }
		            }]
		        });
				window.location.href = "login.html";
			}else{
				BootstrapDialog.show({  
					closable: true, 
					title:"warning",
		            message: data.status,
		            buttons: [{
		            	label: 'Close the dialog',
					    action: function(dialogRef){
					      dialogRef.close();   //总是能关闭弹出框
					    }
		            }]
		        });
			}
        }
	});
}