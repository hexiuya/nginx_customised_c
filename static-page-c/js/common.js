$(function(){
				$("#navigation").load('./commonPage/navigation.html');
				$("#menu_bar").load('./commonPage/menu_bar.html',function(){

					var filename=window.location.href;  
					var start_index = filename.lastIndexOf("/")+1 ; 
					var end_index = filename.indexOf("?") ;
          if(end_index == -1){
                end_index = filename.length ;
          }
					console.log("start_index:"+start_index+",end_index:"+end_index);
					filename=filename.substring(start_index,end_index);

					$(".nav-list li a").each(function(){
                       
						var href = $(this).attr("href");
						
						if(href == filename){
							
							$(".nav-list li").removeClass("active");//删除全部avtive
							$(this).parent().addClass("active");//显示当前对象的active

							$(".nav-list i").css("background-image","url(../img/glyphicons-halflings.png)");//删除图标的白色效果
							$(this).children().css("background-image","url(../img/glyphicons-halflings-white.png)");//增加图标的白色效果	

						}

					});
				});
				
        $("#currency_kinds").load('./commonPage/currency_kinds.html');
				
        getUserInfo();
});

function getParam(paramName) { 
    paramValue = "", isFound = !1; 
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
    } 
    return paramValue == "" && (paramValue = null), paramValue 
}

function getUserName(){
    //var username = getParam("username");
    
    var username = sessionStorage.username;
    return username;
}

function getCustomerId(){
    var customerId = sessionStorage.customerId;
    return customerId ;
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

function goBack(){
	window.location.href = document.referrer;//返回上一页并刷新  
}

function urlPrefix(){
	return "crm/";
}

function urlTradePrefix(){
	return "trade/";
}

function urlNewTradePrefix(){
  return "tradeNew/";
}

function urlSubscriberPrefix(){
	return "subscriber/";
}

function changeUrl(e){
	var href = $(e).attr("href");
	window.location.href = href;
	$(e).removeAttr("href");
	return false;
}
/*
function logout(){
	$.ajax({
		url:urlPrefix() + "crm-test/onlineManage/logout",
		success:function(result){
			window.location.href = "login.html";
        },
        error : function(xhr,textStatus,errorThrown){
       　　window.location.href = "login.html";
    　　}
	});
}
*/
function logout(){

    $.ajax({
      url:urlPrefix() + "cLogout",
      data:{},
      type: 'POST',
      contentType : 'application/json',
      success:function(data){
        
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
          
            goLoginPage();

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

function goLoginPage(){
  window.location.href = "login.html";
}

function getJson(){
	$.getJSON("./js/userinfo.json", function (data){
      
      var strHtml = "123";
      //存储数据的变量 
      
      //清空内容 
      $.each(data, function (infoIndex, info){
        strHtml += "姓名：" + info["name"] + "<br>";
        strHtml += "性别：" + info["sex"] + "<br>";
        strHtml += "邮箱：" + info["email"] + "<br>";
        strHtml += "<hr>" 
      }) 
      
      //显示处理后的数据 
      alert(strHtml);
    }) 
      
}

function getAjax(){
	$.ajax({
      type: "get",
      dataType: "json",
      url: "js/da.json",
      success: function (result) {
        var str = "";
                $.each(result,function(index,obj){              
                str += "<a href='" + obj["url"] + "' target='_blank'><img src='" + obj["img"] + "' /></a>";                   
                });
        alert(str);
      }
    });
}


Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}

function searchMarket(currency){
  if("BTC" == currency){
    pnsid = 1;
    pnsgid = 8;
  }
  if("ETH" == currency){
    pnsid = 2;
    pnsgid = 8;
  }
  if("USD" == currency){
    pnsid = 3;
    pnsgid = 8;
  }
  resetTable();
}

function getUserInfo(){
  $.post(urlPrefix() + "getUserInfo", {}, function(data){
    if(data == null){

      var filename=window.location.href;  
      var start_index = filename.lastIndexOf("/")+1 ; 
      var end_index = filename.indexOf("?") ;
      if(end_index == -1){
        end_index = filename.length ;
      }

      console.log("start_index:"+start_index+",end_index:"+end_index);
      filename=filename.substring(start_index,end_index);

      if(filename == "login.html" || filename == '' || filename == "register.html" || filename == "forgetPassword.html"){
        return ;
      }

      BootstrapDialog.show({  
        closable: true, 
        title: "warning",
        message: "please login",
        buttons: [{
          label: 'Close the dialog',
          action: function(dialogRef){
              dialogRef.close();   //总是能关闭弹出框
              window.location.href = "login.html";
            }
          }]
        });

      return ;
    }

    if(data.id == null || data.id == undefined){
      return ;
    }
    poid = data.id;
    clientid = data.id;

  }, 'json');
}

function getCookie(c_name){
  if (document.cookie.length>0)
    {
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
      { 
      c_start=c_start + c_name.length+1 
      c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      } 
    }
  return ""
}