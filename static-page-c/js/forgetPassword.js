$(function(){
	changeImage();
});

var rnd ;

function getRandom(){
	var timestamp = new Date().getTime();

	return timestamp + Math.random();
}

function changeImage(){
	rnd = getRandom();
	var src = urlPrefix() + "cVerifyCode?rnd=" + rnd;  
	$("#img_code").attr("src",src);
}



function forgetPassword(){
	var email = $("#email").val();
	var params = {
		messageid:"0x0007",
	    requestid:generateUUID(),
		email:email
	};
	$.ajax({
		url:urlPrefix() + "cForgotPw",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);
			if(data.status == "SUCCESS"){
				$("#forgetPassword_message").text("send email successfully , please check it than reset your password");
			}else{
				alert(data.status);
			}
        }
	});
}