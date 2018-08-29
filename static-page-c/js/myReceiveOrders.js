$(function(){
	        $( "#dialog-form" ).dialog({
            	autoOpen: false,
            	modal: false
            });
});
var url = "jsonTest/publisher.json?adc=1&cde=1&333";

var pnsid = 1;
var pnsgid = 8;
var clientid = getCustomerId();
var messageid = '602D';
var poid = getCustomerId();//在allordrecv接口里，poid=clientid;若接口初始化table时，poid=clientid,其余情况poid必须从接口里获取
$(document).ready(function() {
	createData();
} );

function resetTable(){
	$('#example').DataTable().ajax.reload();
}

function createData(){
	var table = $('#example').DataTable( {
			    	"bPaginate": true, //??页
			        "processing": true,
			        "serverSide": true,
			        "bFilter": false, //????
			        "bLengthChange": false, //选????页??
			        "iDisplayLength" : 10,// 每页??示????   
			        "bSort": false, //????
			        "bInfo": true,//展示页????息
			        //"ordering": false,
			        
			        "ajax": {

			            "url": urlSubscriberPrefix() + "allordrecv",
			            "contentType" : 'application/json',
			            "data": function ( d ) {
			            	  
			            	  d.clientid = getCustomerId();
			            	  d.pnsid = pnsid;
			            	  d.pnsgid = pnsgid;
			            	  d.messageid = messageid;
			            	  d.requestid = generateUUID();
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
			            { "data": "oid" , "class": "center" },
			            { "data": "cid" , "class": "center" },
			            { "data": "side" , "class": "center" },
			            { "data": "price" , "class": "center" },
			            { "data": "quant" , "class": "center" },
			            { "data": "status" , "class": "center" },
			            { "data": "timestamp" , "class": "center" },
			            { "data": "status" , "class": "center" , "render": function(data, type, row) {
			            	    if("PAID" == data && row["side"] == "B"){//支付确认
			            	    	return  '<a href="javascript:void(0);" onclick="openDialog(this)" style="cursor:pointer">paid confirm</a>' ;
			            	    }
			            	    if("DEALING" == data && row["side"] == "S"){//支付订单
			            	    	return '<a href="javascript:void(0);" onclick="openPayDialog(this)" style="cursor:pointer">pay</a>' ;
			            	    }
				                return  '-' ;
				            }
				        }
			        ],
			        /*
			        "columnDefs": [
				        {
				        	"render": function(data, type, row) {
				                return  '<a href="#" onclick="buy(this)" style="cursor:pointer">Buy</a>' ;
				            },
				            "targets": 2
				        }
			        ],*/
			        language: {
			        	"sInfoFiltered": ""
			        },
			        /*
			        language: {
				        "sProcessing": "??????...",
				        "sLengthMenu": "??示 _MENU_ ??????",
				        "sZeroRecords": "没??匹??????",
				        "sInfo": "??示?? _START_ ?? _END_ ?????????? _TOTAL_ ??",
				        "sInfoEmpty": "??示?? 0 ?? 0 ?????????? 0 ??",
				        "sInfoFiltered": "(?? _MAX_ ??????????)",
				        "sInfoPostFix": "",
				        "sSearch": "????:",
				        "sUrl": "",
				        "sEmptyTable": "????????为??",
				        "sLoadingRecords": "??????...",
				        "sInfoThousands": ",",
				        "oPaginate": {
				            "sFirst": "??页",
				            "sPrevious": "??页",
				            "sNext": "??页",
				            "sLast": "末页"
				        },
				        "oAria": {
				            "sSortAscending": ": ?????????写???",
				            "sSortDescending": ": ?越??????写???"
				        }
				    }, */

				    "pagingType": "full_numbers_no_ellipses"
			    } );
				//var table = $('#example').DataTable(); 

				/*$('#example tbody').on('click', 'tr', function () { 
					
					var data = table.row(this).data(); //??取???械?????

				} ); */

        return table;
}

var faceName ;
            function openDialog(object){
					
					console.log(object);
					var td = $(object).parent();
					console.log(td);
					var tr = td.parent();
					console.log(tr);
					var table = $('#example').DataTable();
					var data = table.row(tr).data(); //??取???械?????
					console.log(data);

					faceName = data.poname;


					var strData = JSON.stringify(data);
					var time = new Date(data.timestamp).format("yyyy-MM-dd hh:mm:ss");
					var orderStatus = "<div id='" + data.oid + "'>"
					orderStatus += "<div>this order need to be confirmed , please click confirm button :</div>";
                    orderStatus += "<div>order id:" + data.oid + "</div>"
                    orderStatus += "<div>time:" + time + "</div>"
                    orderStatus += "<div>price:" + data.price +"</div>";
                    orderStatus += "<div>quant:" + data.quant +"</div>";
                    orderStatus += "<div>status:" + data.status +"</div>";
					orderStatus += "<input type='button' value='paid confirm' onclick='paidConfirm(" + strData + ")'/>";
					orderStatus += "</div>";
					chat(orderStatus);//打开聊天框
					return false;
	        }

	        function openPayDialog(object){
					
					console.log(object);
					var td = $(object).parent();
					console.log(td);
					var tr = td.parent();
					console.log(tr);
					var table = $('#example').DataTable();
					var data = table.row(tr).data(); //??取???械?????
					console.log(data);

					faceName = data.poname;


					var strData = JSON.stringify(data);
					var time = new Date(data.timestamp).format("yyyy-MM-dd hh:mm:ss");
					var orderStatus = "<div id='" + data.oid + "'>"
					orderStatus += "<div>this order need to be confirmed , please click confirm button :</div>";
                    orderStatus += "<div>order id:" + data.oid + "</div>"
                    orderStatus += "<div>time:" + time + "</div>"
                    orderStatus += "<div>price:" + data.price +"</div>";
                    orderStatus += "<div>quant:" + data.quant +"</div>";
                    orderStatus += "<div>status:" + data.status +"</div>";
					orderStatus += "<input type='button' value='pay' onclick='pay(" + strData + ")'/>";
					orderStatus += "</div>";
					chat(orderStatus);//打开聊天框
					return false;
	        }

	        function pay(strData){
	        	//alert("pay confirm success ...");
	        	//
	        	var paidParam = {
	        		            messageid:"7005",
	        		            requestid:generateUUID(),
                            	clientid:getCustomerId(),
                            	oid:strData.oid,
                            	cid:strData.cid,
                            	side:strData.side,
                            	pnsoid:strData.pnsoid,
                            	poid:getCustomerId(),
                            	pnsid:pnsid,
                            	pnsgid:pnsgid,
                            	price:strData.price,
                            	quant:strData.quant
                            };
	        	$.ajax({
					url:urlTradePrefix() + "paid",
					contentType : 'application/json',
					data:JSON.stringify(paidParam),
					type: 'POST',
					success:function(data){
						console.log(data);

						var status = data.status;

						if("SUCCESS" == status){
							//var time = new Date(strData.ord.timestamp).format("yyyy-MM-dd hh:mm:ss");
							var elementId = "#" + data.oid;
							var orderId = $(elementId);	
							orderId.empty();
							var orderStatus = "<div id='" + data.oid + "'>"
							orderStatus += "<div>this order has paid confirmed , please wait saler comfrim , thank you :</div>";
                            orderStatus += "<div>order id:" + data.oid + "</div>"
                            //orderStatus += "<div>time:" + time +"</div>";
                            orderStatus += "<div>price:" + data.price +"</div>";
                            orderStatus += "<div>quant:" + data.quant +"</div>";
                            //orderStatus += "<div>status:" + data.status +"</div>";
							orderStatus += "</div>";
							orderId.append(orderStatus);
						}
			        }
				});
	        }

	        function chat(orderStatus){
				var username = getParam("username");

	        	//var orderStatus = $("<div>this is order status</div>");
				
	        	var iframe = $("<iframe width='280' height='380' src='http://localhost:8883/autoLogin.html?loginname=" + username +"&faceName=" + faceName +"'></iframe>");
	        	/*
	        	var chatDialog = $( "#dialog-confirm" );
	        	chatDialog.empty();
	        	chatDialog.append(orderStatus,iframe);
                */

                var orderGroup = $("#orderGroup");
                orderGroup.empty();
                orderGroup.append(orderStatus);

                var chatGroup = $("#chatGroup");
                chatGroup.empty();
                chatGroup.append(iframe);

	        	$( "#dialog-confirm" ).dialog({
			      resizable: true,
			      height:530,
			      width:512,
			      modal: false,
			      buttons: {
			        "close": function() {
			          $( this ).dialog( "close" );
			          resetTable();
			        }
			      }
			    });
	        }

	        function paidConfirm(strData){
	        	//alert("pay confirm success ...");
	        	
	        	var paidParam = {
	        		            messageid:"7007",
	        		            requestid:generateUUID(),
                            	clientid:clientid,
                            	oid:strData.oid,
                            	cid:strData.cid,
                            	side:strData.side,
                            	pnsoid:strData.pnsoid,
                            	poid:poid,
                            	pnsid:pnsid,
                            	pnsgid:pnsgid,
                            	price:strData.price,
                            	quant:strData.quant
                            };
	        	$.ajax({
					url:urlNewTradePrefix() + "payconfirm",
					contentType : 'application/json',
					data:JSON.stringify(paidParam),
					type: 'POST',
					success:function(data){
						console.log(data);

						var status = data.status;

						if("SUCCESS" == status){
							var time = new Date(strData.timestamp).format("yyyy-MM-dd hh:mm:ss");
							var elementId = "#" + data.oid;
							var orderId = $(elementId);	
							orderId.empty();
							var orderStatus = "<div id='" + data.oid + "'>"
							orderStatus += "<div>this order has paid confirmed , thank you :</div>";
                            orderStatus += "<div>order id:" + data.oid + "</div>"
                            orderStatus += "<div>time:" + time +"</div>";
                            orderStatus += "<div>price:" + data.price +"</div>";
                            orderStatus += "<div>quant:" + data.quant +"</div>";
                            //orderStatus += "<div>status:" + data.status +"</div>";
							orderStatus += "</div>";
							orderId.append(orderStatus);
						}
			        }
				});
	        }

			