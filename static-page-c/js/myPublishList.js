var url = "jsonTest/publisher.json?adc=1&cde=1&333";

var pnsid_global = 1;
var pnsgid_global = 8;
var messageid_global = "701C";
var clientid_global = getCustomerId();
var side_global = "S";

$(document).ready(function() {
	createData();
} );

function refeshTable(type){
	side_global = type;
	resetTable();
}

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

			            "url": urlSubscriberPrefix() + "ownpns",
			            "contentType" : 'application/json',
			            "data": function ( d ) {
			            	  
			            	  d.side = side_global;
			            	  d.pnsid = pnsid_global;
			            	  d.pnsgid = pnsgid_global;
			            	  d.clientid = clientid_global;
			            	  d.messageid = "6023";
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
			            { "data": "pnsoid" , "class": "center" },
			            { "data": "poid" , "class": "center" },
			            { "data": "price" , "class": "center" },
			            { "data": "quant" , "class": "center" },
			            { "data": "traded" , "class": "center" },
			            { "data": "margin" , "class": "center" },
			            { "data": "net" , "class": "center" },
			            { "data": "can" , "class": "center" },
			            { "data": "max" , "class": "center" },
			            { "data": "min" , "class": "center" },
			            { "data": "status" , "class": "center" },
			            { "data": "operate" , "class": "center" , "render": function(data, type, row) {
			            	    var operate = '<a href="javascript:void(0);" onclick="scanOrder(this)" style="cursor:pointer">scan order</a>' ;
			            	    if(row["net"] > 0){

			            	    	operate += ' | ' ;
				                	operate += '<a href="javascript:void(0);" onclick="cancelConfirm(this)" style="cursor:pointer">cancel</a>' ;
				                
			            	    }
			            	    return operate ;
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

            
function scanOrder(object){
					
					console.log(object);
					var td = $(object).parent();
					console.log(td);
					var tr = td.parent();
					console.log(tr);
					var table = $('#example').DataTable();
					var data = table.row(tr).data(); //??取???械?????
					console.log(data);

					window.open("scanOrder.html?pnsoid="+data.pnsoid);
}

function cancelConfirm(object){
            BootstrapDialog.show({  
							closable: true, 
							title: "confirm",
				            message: "Do you want to continue ?",
				            buttons: [{
				            	label: 'cancel',
							    action: function(dialogRef){
							      dialogRef.close();   //总是能关闭弹出框
							      
							    }
				            },
				            {
				            	label: 'confirm',
							    action: function(dialogRef){
							    	
							      	dialogRef.close();   //总是能关闭弹出框
							      	cancel(object)
							      
							    }
				            }]
				        });
}
			
function cancel(object){

					console.log(object);
					var td = $(object).parent();
					console.log(td);
					var tr = td.parent();
					console.log(tr);
					var table = $('#example').DataTable();
					var data = table.row(tr).data(); //??取???械?????
					console.log(data);

				var pcancelParam = {
					messageid : "701D",
					requestid : generateUUID(),
					clientid : getCustomerId(),
					oid : 1,//之后修改成正确值
					cid : 1,//之后修改成正确值
					side : side_global,
					pnsoid : data.pnsoid,
					poid : data.poid,
					pnsid : pnsid_global,
					pnsgid : pnsgid_global,
					amount : data.net
				};

                /*
				$.ajax({
					url:urlTradePrefix() + "pcancel",
					//contentType : 'application/json',
					data:JSON.stringify(pcancelParam),
					type: 'POST',
					success:function(data){
						console.log(data);
					}
				});
				*/
				
				$.ajax({

					url:urlNewTradePrefix() + "pcancel",
					contentType : 'application/json',
					data:JSON.stringify(pcancelParam),
					type: 'post',

					success:function(data){
						console.log(data);
						
						resetTable();

						BootstrapDialog.show({  
							closable: true, 
				            message: data.status,
				            buttons: [{
				            	label: 'Close the dialog',
							    action: function(dialogRef){
							      dialogRef.close();   //总是能关闭弹出框
							      if("SUCCESS" == data.status){
							      	closeModal();

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
								      dialogRef.close();   //总是能关闭弹出框
								      window.location.href = "login.html";
								    }
					            }]
					        });
			         　} else{
			           　　// 调用外部的error
			            　 error && error(xhr,textStatus,errorThrown);
			      　　 }
			    　　}
				});
				
}			