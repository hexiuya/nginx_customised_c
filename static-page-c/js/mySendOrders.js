$(function(){
	        $( "#dialog-form" ).dialog({
            	autoOpen: false,
            	modal: false
            });
});
var url = "jsonTest/publisher.json?adc=1&cde=1&333";

var pnsid_global = 1;
var pnsgid_global = 8;
var cid = getCustomerId();
var poid = getCustomerId();

$(document).ready(function() {
	createData();
} );

function resetTable(){
	pnsid_global = pnsid;
	pnsgid_global = pnsgid;
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

			            "url": urlSubscriberPrefix() + "allordsent",
			            "contentType" : 'application/json',
			            "data": function ( d ) {
			            	  
			            	  
			            	  d.pnsid = pnsid_global;
			            	  d.pnsgid = pnsgid_global;
			            	  d.poid = poid;
			            	  d.cid = getCustomerId();
			            	  d.messageid = '602B';
			            	  d.requestid = generateUUID();
			            	  d.clientid = getCustomerId();
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
			            { "data": "pnsoid" , "class": "center" },
			            { "data": "poid" , "class": "center" },
			            { "data": "side" , "class": "center" },
			            { "data": "price" , "class": "center" },
			            { "data": "quant" , "class": "center" },
			            { "data": "status" , "class": "center" },
			            { "data": "timestamp" , "class": "center" , "render": function(data, type, row){
								var time = new Date(data).format("yyyy-MM-dd hh:mm:ss");
								return time;
			            	}
			            },
			            { "data": "status" , "class": "center" , "render": function(data, type, row) {
				            	if("DEALING" == data){
				            		var cancel =  '<a href="javascript:void(0);" onclick="cancelOrder(this)" style="cursor:pointer">cancel</a>' ;
				            		var pay = '<a href="javascript:void(0);" onclick="openDialog(this)" style="cursor:pointer">pay</a>' ;

				            		return cancel + " / " + pay ;
				            	}

				            	if("PAID" == data && row["side"] == "S"){//支付确认
			            	    	return '<a href="javascript:void(0);" onclick="openPaidConfirmDialog(this)" style="cursor:pointer">paid confirm</a>' ;
			            	    }

				                return '-';
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
            function cancelOrder(object){
					
					console.log(object);
					var td = $(object).parent();
					console.log(td);
					var tr = td.parent();
					console.log(tr);
					var table = $('#example').DataTable();
					var data = table.row(tr).data(); //??取???械?????
					console.log(data);

					faceName = data.poname;

					var price = addDetail("price",data.price);

					var quant = addDetail("quant",data.quant);

					var pnsoid = addDetail("pnsoid",data.pnsoid);

					var side = addDetail("side",data.side);
	
				    

				    var oid = addDetail("oid",data.oid);

				    var type = addDetail("type",'D');

				    var poid = addDetail("poid",data.poid);
				   
				    var form = $("#form");

					form.empty();//情况form

				    form.append(oid,price,quant,pnsoid,side,type,poid);

				    $('#myModal').modal({
				    	backdrop: 'static',//点击遮罩层不关闭模态框
				        keyboard: true//按esc键，退出模态框
				    })
	        }

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
					orderStatus += "<div>this order need to be paid , please click paid button :</div>";
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

	        function openPaidConfirmDialog(object){
					
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
					orderStatus += "<div>this order need to be paid , please click paid button :</div>";
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

	        function paidConfirm(strData){
	        	//alert("pay confirm success ...");
	        	
	        	var paidParam = {
	        		            messageid:"7007",
	        		            requestid:generateUUID(),
                            	clientid:getCustomerId(),
                            	oid:strData.oid,
                            	cid:getCustomerId(),
                            	side:strData.side,
                            	pnsoid:strData.pnsoid,
                            	poid:strData.poid,
                            	pnsid:pnsid_global,
                            	pnsgid:pnsgid_global,
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


	        function chat(orderStatus){
				var username = getUserName();

	        	//var orderStatus = $("<div>this is order status</div>");
				
	        	var iframe = $("<iframe width='280' height='380' src='" + chatDNS + "/autoLogin.html?loginname=" + username +"&faceName=" + faceName +"'></iframe>");
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
			        }
			      }
			    });
	        }

	        function pay(strData){
	        	//alert("pay confirm success ...");
	        	
	        	var paidParam = {
                            	clientid:strData.cid,
                            	oid:strData.oid,
                            	side:strData.side,
                            	pnsoid:strData.pnsoid,
                            	poid:strData.poid,
                            	pnsid:strData.pnsid,
                            	pnsgid:strData.pnsgid,
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
							var time = new Date(strData.ord.timestamp).format("yyyy-MM-dd hh:mm:ss");
							var elementId = "#" + data.oid;
							var orderId = $(elementId);	
							orderId.empty();
							var orderStatus = "<div id='" + data.oid + "'>"
							orderStatus += "<div>this order has paid confirmed , please wait saler comfrim , thank you :</div>";
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
			
			$("#submit2").on("click",function(){
                
				//var pnsid = pnsid;

				//var pnsgid = pnsgid;

				var price = $("input[name='price']").val();

				var quant = $("input[name='quant']").val();
				
				var pnsoid = $("input[name='pnsoid']").val();

				var side = $("input[name='side']").val();

				var oid = $("input[name='oid']").val();

				var type = $("input[name='type']").val();

				
				
				var username = getParam("username");

				var params = {
					    pnsid:pnsid_global,
						price:price,
						quant:quant,
						pnsoid:pnsoid,
						pnsgid:pnsgid_global,
						side:side,
						username:username,
						messageid:"32323",
						poid:poid,
						oid,oid,
						type,type
					};

				$.ajax({
					url:urlTradePrefix() + "cancel",
					contentType : 'application/json',
					data:JSON.stringify(params),
					type: 'POST',
					success:function(data){
						console.log(data);

						closeModal();//关闭模态框

						resetTable();//刷新表格
					}
				});

				
			});

			function closeModal(){
				$('#myModal').modal('hide');//????模态??
				//???毡???
				$("#myModal :input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val(""); 
                $("#myModal :input").removeAttr("checked").remove("selected");  
			}

			function addDetail(key,value){
				var detail = "";
				detail += '<div class="form-group">';
				detail += 	'<label for="quant" class="col-sm-2 control-label">'+ key +' : </label>';
				detail += 	'<div class="col-sm-10">';
				detail +=   	'<input type="text" class="form-control" id="'+key+'" name="'+key+'" value="'+value+'">';
				detail += 	'</div>';
				detail += '</div>';
				detail += '<br/>';
				return detail;
			}

			$("#submit").on("click",function(){
				dCancel();
			});

			function dCancel(){
				var price = $("input[name='price']").val();

				var quant = $("input[name='quant']").val();
				
				var pnsoid = $("input[name='pnsoid']").val();

				var side = $("input[name='side']").val();

				var oid = $("input[name='oid']").val();

				var type = $("input[name='type']").val();

				var poid = $("input[name='poid']").val();
				
				var username = getParam("username");

				var params = {
					    messageid : "701E" ,
					    requestid : generateUUID() ,
					    clientid : getCustomerId() ,
					    oid : oid ,
					    cid : getCustomerId(),//????为什么
					    side : side ,
					    pnsoid : pnsoid ,
					    poid : poid,
					    pnsid : pnsid_global,
					    pnsgid : pnsgid_global,
					    price : price ,
					    quant : quant
					};

				$.ajax({
					url:urlNewTradePrefix() + "dcancel",
					contentType : 'application/json',
					data:JSON.stringify(params),
					type: 'POST',
					success:function(data){
						console.log(data);

						closeModal();//关闭模态框

						resetTable();//刷新表格
					}
				});
			}
			