
var url = "jsonTest/publisher.json?adc=1&cde=1&333";

var messageid = "5001";
var requestid = generateUUID();
var clientid = getCustomerId();

$(document).ready(function() {
	createData();
} );

function resetTable(){
	$('#example').DataTable().ajax.reload();
}

function createData(){
	var table = $('#example').DataTable( {
			    	"bPaginate": true, //??ҳ
			        "processing": true,
			        "serverSide": true,
			        "bFilter": false, //????
			        "bLengthChange": false, //ѡ????ҳ??
			        "iDisplayLength" : 10,// ÿҳ??ʾ????   
			        "bSort": false, //????
			        "bInfo": true,//չʾҳ????Ϣ
			        //"ordering": false,
			        
			        "ajax": {

			            "url": urlSubscriberPrefix() + "ownacc",
			            "contentType" : 'application/json',
			            "data": function ( d ) {
			            	  
			            	  d.messageid = messageid;
			            	  d.requestid = requestid;
			            	  d.clientid = clientid;
			            	  console.log(d);
						      return JSON.stringify( d );
						  },
			            
			            "type": "post"
			        },
			        
			        /*
			        "ajax": {
			        	"url": "jsonTest/publisher.json?" + new Date(),
						//"url": url,
						"type": "get"
			        },
                    */
			        "columns": [
			            { "data": "pnsgid" , "class": "center",'bVisible':false },
			            { "data": "pnsid" , "class": "center",'bVisible':false },
			            { "data": "currency-type" , "class": "center" , "render": function(data, type, row) {
				                return getCurrencyType(row);

				            }
				        },
			            { "data": "margin" , "class": "center" , "render": function(data, type, row) {
				                return  row.margin + "(" + getBTCUnit(row.margin) + ")";
				            }
				        },
			            { "data": "freemargin" , "class": "center" , "render": function(data, type, row) {
				                return  row.freemargin + "(" + getBTCUnit(row.freemargin) + ")";
				            }
				        },
			            { "data": "equity" , "class": "center" , "render": function(data, type, row) {
				                var equity = row.margin + row.freemargin;
				                return  equity + "(" + getBTCUnit(equity) + ")";
				                

				            }
				        },
			            { "data": "operate" , "class": "center" , "render": function(data, type, row) {
			            	    var operate = '<a href="javascript:void(0);" onclick="deposit(this)" style="cursor:pointer">deposit</a>' ;
			            	    operate += '/' ;
			            	    operate += '<a href="javascript:void(0);" onclick="withdraw(this)" style="cursor:pointer">withdraw</a>' ;
				                return   operate;
				            }
				        }
			        ],
			        language: {
			        	"sInfoFiltered": ""
			        },
			        /*
			        language: {
				        "sProcessing": "??????...",
				        "sLengthMenu": "??ʾ _MENU_ ??????",
				        "sZeroRecords": "û??ƥ??????",
				        "sInfo": "??ʾ?? _START_ ?? _END_ ?????????? _TOTAL_ ??",
				        "sInfoEmpty": "??ʾ?? 0 ?? 0 ?????????? 0 ??",
				        "sInfoFiltered": "(?? _MAX_ ??????????)",
				        "sInfoPostFix": "",
				        "sSearch": "????:",
				        "sUrl": "",
				        "sEmptyTable": "????????Ϊ??",
				        "sLoadingRecords": "??????...",
				        "sInfoThousands": ",",
				        "oPaginate": {
				            "sFirst": "??ҳ",
				            "sPrevious": "??ҳ",
				            "sNext": "??ҳ",
				            "sLast": "ĩҳ"
				        },
				        "oAria": {
				            "sSortAscending": ": ?????????д???",
				            "sSortDescending": ": ?Խ??????д???"
				        }
				    }, */

				    "pagingType": "full_numbers_no_ellipses"
			    } );
				//var table = $('#example').DataTable(); 

				/*$('#example tbody').on('click', 'tr', function () { 
					
					var data = table.row(this).data(); //??ȡ???е?????

				} ); */

        return table;
}

var apiMethod ;
var apiMessageId = "";
var apiDeposit = "cDeposit";
var apiDepositMsgId = "0x0017";
var apiWithdraw = "cWithdrawReq";
var apiWithdrawMsgId = "4005";
function deposit(object){
	apiMethod = apiDeposit;
	apiMessageId = apiDepositMsgId;
	// openDailog(object);
	console.log(object);
	var td = $(object).parent();
	console.log(td);
	var tr = td.parent();
	console.log(tr);
	var table = $('#example').DataTable();
	var data = table.row(tr).data();
	var pnsid = data.pnsid;
	var pnsgid = data.pnsgid;

	var clientid = getCustomerId();


	var params = {
		messageid:"0x0033",
	    requestid:generateUUID(),
		pnsid:pnsid,
		pnsgid:pnsgid,
		clientid:clientid
	};

	$.ajax({
		url:urlPrefix() + "cGetReceiveAddress",
		data:JSON.stringify( params ),
		type: 'POST',
		contentType : 'application/json',
		success:function(data){
			console.log(data);

			if (data.status == "SUCCESS"){

				$("#qrcode").empty();
				// $("#receiveAddress").empty();

				$('#depositModal').modal({
					backdrop: 'static',//������ֲ㲻�ر�ģ̬��
					keyboard: true//��esc�����˳�ģ̬��
				})


				var qrcode = new QRCode(document.getElementById("qrcode"), {
					width : 100,
					height : 100
				});

				console.log("===================================");
				var receiveAddress = data.receiveAddress;
				document.getElementById("address").innerHTML = receiveAddress;
				// $("#receiveAddress").val(receiveAddress);
				qrcode.makeCode(receiveAddress);


			}
			

        }
	});
}

function withdraw(object){
	apiMethod = apiWithdraw;
	apiMessageId = apiWithdrawMsgId;
	openDailog(object);
}

function openDailog(object){
	console.log(object);
	var td = $(object).parent();
	console.log(td);
	var tr = td.parent();
	console.log(tr);
	var table = $('#example').DataTable();
		var data = table.row(tr).data(); //??ȡ???е?????
		console.log(data);

		var pnsid = $("<input type='hidden' name='pnsid' value=" + data.pnsid +"></input>");

		var pnsgid = $("<input type='hidden' name='pnsgid' value=" + data.pnsgid +"></input>");

		var form = $("#form");

		form.append(pnsid,pnsgid);

		$('#myModal').modal({
			backdrop: 'static',//������ֲ㲻�ر�ģ̬��
			keyboard: true//��esc�����˳�ģ̬��
		})
	}


	$("#submit").on("click",function(){

		var pnsid = $("input[name='pnsid']").val();

		var pnsgid = $("input[name='pnsgid']").val();

		var quantity = $("input[name='quantity']").val();

		var amoumt = $("input[name='amoumt']").val();

		var receiveAddress = $("input[name='receiveAddress']").val();

		var clientid = getCustomerId();

		var username = getUserName();

		var fees = $("input[name='fees']").val();

		var params = {
			messageid:apiMessageId,
	    	requestid:generateUUID(),
	    	clientid:clientid,
	    	oid:generateUUID(),
			pnsid:pnsid,
			pnsgid:pnsgid,
			toaddress:receiveAddress,
			quant:quantity,
			fees:fees,
			toquant:quantity-fees,
		};

		$.ajax({
			url:urlPrefix() + apiMethod,
			xhrFields: {

				withCredentials: true

			},
			data:JSON.stringify( params ),
			contentType : 'application/json',
			type: 'POST',
			success:function(data){
				console.log(data);

				BootstrapDialog.show({  
					closable: true, 
					message: data.status,
					buttons: [{
						label: 'Close the dialog',
						action: function(dialogRef){
							dialogRef.close();   //�����ܹرյ�����
							if("SUCCESS" == data.status){
								closeModal();

								resetTable();

							}
						}
					}]
				});
			},
			error : function(xhr,textStatus,errorThrown){
				if (xhr.status == 401) {
						BootstrapDialog.show({  
							closable: true, 
							message: "please login",
							buttons: [{
								label: 'Close the dialog',
								action: function(dialogRef){
									dialogRef.close();   //�����ܹرյ�����
									window.location.href = "login.html";
								}
							}]
					});
			} else{
					// �����ⲿ��error
					error && error(xhr,textStatus,errorThrown);
			}
		}
	});

});

function closeModal(){
	$('#myModal').modal('hide');//????ģ̬??
	//???ձ???
	$("#myModal :input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val(""); 
	$("#myModal :input").removeAttr("checked").remove("selected");  
}



function createNewWallet(){
	$('#walletModal').modal({
		backdrop: 'static',//������ֲ㲻�ر�ģ̬��
		keyboard: true//��esc�����˳�ģ̬��
	})
}

$("#submitNewWallet").on("click",function(){

	
	var digitalCurrencyType = $("#digitalCurrencyType").val();

	var arr = digitalCurrencyType.split(",");



	var pnsid = arr[0];

	var pnsgid = arr[1];	

	var clientid = getCustomerId();

	var username = getUserName();

	var params = {
		messageid:"0x0021",
		requestid:generateUUID(),
		pnsid:pnsid,
		pnsgid:pnsgid,
		clientid:clientid
	};

	$.ajax({
		url:urlPrefix() + "cSaveCacc",
		xhrFields: {

			withCredentials: true

		},
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
						dialogRef.close();   //�����ܹرյ�����
						if("SUCCESS" == data.status){
							
							closeWalletModal();

							resetTable();
						}
					}
				}]
			});
		},
		error : function(xhr,textStatus,errorThrown){
			if (xhr.status == 401) {
				BootstrapDialog.show({  
					closable: true, 
					message: "please login",
					buttons: [{
						label: 'Close the dialog',
						action: function(dialogRef){
							dialogRef.close();   //�����ܹرյ�����
							window.location.href = "login.html";
						}
					}]
				});
			} else{
			    // �����ⲿ��error
			    error && error(xhr,textStatus,errorThrown);
			}
		}
	});


});

function closeWalletModal(){
	$('#walletModal').modal('hide');//????ģ̬??
	//???ձ???
	$("#walletModal :input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val(""); 
	$("#walletModal :input").removeAttr("checked").remove("selected");  
}