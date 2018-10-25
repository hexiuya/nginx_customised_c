
$(function(){
	        $( "#dialog-form" ).dialog({
            	autoOpen: false,
            	modal: false
            });
});
var url = "jsonTest/publisher.json?adc=1&cde=1&333";

var pnsid = 1;
var pnsgid = 8;
var clientid = 

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

			            "url": urlSubscriberPrefix() + "market",
			            "contentType" : 'application/json',
			            "data": function ( d ) {
			            	  d.requestid = generateUUID();;
			            	  d.messageid = "0x6021";
			            	  d.side = "B";
			            	  d.pnsid = pnsid;
			            	  d.pnsgid = pnsgid;
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
			            { "data": "pnsoid" , "class": "center" },
			            { "data": "poid" , "class": "center" },
			            { "data": "poname" , "class": "center" , "render": function(data, type, row) {
				                //return  '<a href="#" class="tooltip-test" data-toggle="tooltip" title="默认的 Tooltip">'+row.poname+'</a>';
				                return row.poname;
				            }
				        },
			            { "data": "price" , "class": "center" },
			            { "data": "quant" , "class": "center" , "render": function(data, type, row) {
				                return  row.quant + "(" + getBTCUnit(row.quant) + ")";
				            }
				        },
			            { "data": "net" , "class": "center" , "render": function(data, type, row) {
			            		return  row.net + "(" + getBTCUnit(row.net) + ")";
				            }
				        },
			            { "data": "min" , "class": "center" },
			            { "data": "max" , "class": "center" },
			            { "data": "operate" , "class": "center" , "render": function(data, type, row) {
				                return  '<a href="javascript:void(0);" onclick="sale(this)" style="cursor:pointer">Sell</a>' ;
				            }
				        },
				        { "data": "chat" , "class": "center" , "bVisible":false , "render": function(data, type, row) {
				        		//可以不要这一列
				                return  '<a href="javascript:void(0);" onclick="chatMultipleOrder(this)" style="cursor:pointer">chat</a>' ;
				            }
				        },
				        { "data": "pay-type" , "class": "center" ,sWidth:"120", "render": function(data, type, row) {
			            	    //return "<a background-image=url('./img/wechat.png') width='30' height='30'  />";
			            	    return "<img src='./img/wechat.png' width='25' height='25'/>&nbsp;" +
			            	    "<img src='./img/alipay.jpg' width='25' height='25' />&nbsp;" + 
			            	    "<img src='./img/bankcard.png' width='40' height='30' />";
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
            function sale(object){
					
					console.log(object);
					var td = $(object).parent();
					console.log(td);
					var tr = td.parent();
					console.log(tr);
					var table = $('#example').DataTable();
					var data = table.row(tr).data(); //??取???械?????
					console.log(data);

					faceName = data.poname;


					//var pnsid = $("<input type='hidden' name='pnsid' value=" + data.pnsid +"></input>");

					var price = $("<input type='hidden' name='price' value=" + data.price +"></input>");

					//var quant = $("<input type='hidden' name='quant' value=" + data.quant +"></input>");

					var pnsoid = $("<input type='hidden' name='pnsoid' value=" + data.pnsoid +"></input>");

					//var pnsgid = $("<input type='hidden' name='pnsgid' value=" + data.pnsgid +"></input>");
					
					var side = $("<input type='hidden' name='side' value=" + "B" +"></input>");

					var poid = $("<input type='hidden' name='poid' value=" + data.poid +"></input>");
	
				    var messageid = $("<input type='hidden' name='messageid' value=" + data.messageid +"></input>");
				   
				    var form = $("#form");

				    form.append(price,pnsoid,side,poid,messageid);

				    $('#myModal').modal({
				    	backdrop: 'static',//点击遮罩层不关闭模态框
				        keyboard: true//按esc键，退出模态框
				    })
	        }

	        function chat(orderStatus){
				var username = getUserName();

	        	//var orderStatus = $("<div>this is order status</div>");
				
	        	var iframe = $("<iframe width='280' height='380' src='" + chatDNS +"/autoLogin.html?loginname=" + username +"&faceName=" + faceName +"'></iframe>");
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

	        function chatMultipleOrder(object){
	        	var orderStatus = $("<div id='orderStatus'></div>");
	        	chat(orderStatus);
	        	searchMultipleOrder(object);
				
	        }

	        function searchMultipleOrder(params){
	        	$.ajax({
					url:urlNewTradePrefix() + "deal",
					contentType : 'application/json',
					data:JSON.stringify(params),
					type: 'POST',
					success:function(data){
						console.log(data);
						
						var html
						for(var i=0;i<data.length;i++){
							var status = data[i].status;
							if("DEALING" == status){//订单为"未支付"
								html += "<div>this order need to be confirmed , please click confirm button <input type='button' value='confirm' onclick='payConfirm()'/></div><br/>";
													
							}
						}
						
			        }
				});
				
                
				var orderStatus = $("#orderStatus");

				var html = "<div>this order need to be confirmed , please click confirm button <input type='button' value='confirm' onclick='payConfirm()'/></div><br/>";
                
                html += html;
                
				orderStatus.append(html);
				
	        }

	        function chatOneOrder(object){//查看单个"未支付确认"的订单
				chat(object);
	        }

	        function searchOneOrder(params){
	        	params.requestid = generateUUID();
	        	params.messageid = "6031";
	        	params.clientid = getCustomerId();

	        	$.ajax({
					url:urlSubscriberPrefix() + "ownsingleorder",
					contentType : 'application/json',
					data:JSON.stringify(params),
					type: 'POST',
					success:function(data){
						console.log(data);

						var status = data.ordrow.status;
						var side = data.ordrow.side;
						if("DEALING" == status && side == "B"){//订单为"未支付"
                            
                            var strData = JSON.stringify(data);
							var time = new Date(data.ordrow.timestamp).format("yyyy-MM-dd hh:mm:ss");
							var orderStatus = "<div id='" + data.ordrow.oid + "'>"
							orderStatus += "<div>this order need to be confirmed , please click confirm button :</div>";
                            orderStatus += "<div>order id:" + data.ordrow.oid + "</div>"
                            orderStatus += "<div>time:" + time + "</div>"
                            orderStatus += "<div>price:" + data.ordrow.price +"</div>";
                            orderStatus += "<div>quant:" + data.ordrow.quant +"</div>";
                            orderStatus += "<div>status:" + data.ordrow.status +"</div>";
							orderStatus += "<input type='button' value='pay' onclick='payConfirm(" + strData + ")'/>";
							orderStatus += "</div>";
							chat(orderStatus);//打开聊天框							
						}

						if("DEALING" == status && side == "S"){//订单需要发布买产品的人支付
                            
                            var strData = JSON.stringify(data);
							var time = new Date(data.ordrow.timestamp).format("yyyy-MM-dd hh:mm:ss");
							var orderStatus = "<div id='" + data.ordrow.oid + "'>"
							orderStatus += "<div>this order need to be paid , please wait buyer to pay :</div>";
                            orderStatus += "<div>order id:" + data.ordrow.oid + "</div>"
                            orderStatus += "<div>time:" + time + "</div>"
                            orderStatus += "<div>price:" + data.ordrow.price +"</div>";
                            orderStatus += "<div>quant:" + data.ordrow.quant +"</div>";
                            orderStatus += "<div>status:" + data.ordrow.status +"</div>";
							orderStatus += "</div>";
							chat(orderStatus);//打开聊天框							
						}
						
			        }
				});
	        }

	        function payConfirm(strData){
	        	//alert("pay confirm success ...");
	        	
	        	var paidParam = {
	        		            messageid:"7005",
                            	clientid:strData.ord.cid,
                            	requestid:generateUUID(),
                            	oid:strData.ord.oid,
                            	side:strData.side,
                            	pnsoid:strData.pnsoid,
                            	poid:strData.poid,
                            	pnsid:strData.pnsid,
                            	pnsgid:strData.pnsgid,
                            	price:strData.ord.price,
                            	quant:strData.ord.quant
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
			
			$("#submit").on("click",function(){
                
				//var pnsid = pnsid;

				//var pnsgid = pnsgid;

				var price = $("input[name='price']").val();

				var quant = $("input[name='quant']").val();
				
				var pnsoid = $("input[name='pnsoid']").val();

				var side = $("input[name='side']").val();

				var poid = $("input[name='poid']").val();
				
				var username = getParam("username");

				var params = {
					    pnsid:pnsid,
						price:price,
						quant:quant,
						pnsoid:pnsoid,
						pnsgid:pnsgid,
						side:"S",
						username:username,
						messageid:"7003",
						poid:poid,
						clientid:getCustomerId(),
						requestid:generateUUID()
					};

				$.ajax({
					url:urlNewTradePrefix() + "deal",
					contentType : 'application/json',
					data:JSON.stringify(params),
					type: 'POST',
					success:function(data){
						console.log(data);

						closeModal();

						var searchParams = {
							oid:data.oid,
							cid:data.clientid,
							pnsoid:data.pnsoid,
							poid:data.poid,
							pnsgid:data.pnsgid,
							pnsid:data.pnsid,
							side:data.side
						};
						searchOneOrder(searchParams);//查询订单状态
			        }
				});

				
			});

			function closeModal(){
				$('#myModal').modal('hide');//????模态??
				//???毡???
				$("#myModal :input").not(":button, :submit, :reset, :hidden, :checkbox, :radio").val(""); 
                $("#myModal :input").removeAttr("checked").remove("selected");  
			}

			