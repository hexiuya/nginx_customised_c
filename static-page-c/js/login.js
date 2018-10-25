var dlg ;

function enterSumbit(){  
     var event=arguments.callee.caller.arguments[0]||window.event;//消除浏览器差异  
     if (event.keyCode == 13){  
        login();  
     }  
}  

function login(){
	// 关闭弹出框 开始..................
	$.each(BootstrapDialog.dialogs, function(id, dialogs) {
		//if(id=='appkeys'){//遍历所有的弹出框，关闭制定的一个
		//	dialogs.close();
		//}
		dialogs.close();
	});

	if (dlg != null || dlg != undefined){
		dlg.close();
	}

	$("#appkeys").css("z-index:-1");
	$("#appkeys").remove() ;
	// 关闭弹出框 结束..................

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
				dlg = BootstrapDialog.show({ 
					id: "appkeys", 
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

				window.location.href = "myWallet.html";
			}else{
				dlg = BootstrapDialog.show({
					id: "appkeys",
					closable: true,
					message: data.status,
					onshow: function(dialog) {

						var button = dialog.getButton('button-w'); //通过getButton('id')获得按钮
					},
					buttons: [{
						id: 'button-w',
						label: 'close',
						action: function(dialogRef) {
							dialogRef.close(); //总是能关闭弹出框
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