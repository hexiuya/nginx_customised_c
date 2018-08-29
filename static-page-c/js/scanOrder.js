var pnsid = 1;
var pnsgid = 8;
var clientid = getCustomerId();
var messageid = "6025";
var pnsoid = "80434130-48b7-4698-ada2-e50448ab056f";

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

			            "url": urlSubscriberPrefix() + "pnsorder",
			            "contentType" : 'application/json',
			            "data": function ( d ) {
			            	  
			            	  d.side = "S";
			            	  d.pnsid = pnsid;
			            	  d.pnsgid = pnsgid;
			            	  d.clientid = clientid;
			            	  d.messageid = messageid;
			            	  d.requestid = generateUUID();
			            	  //d.pnsoid = pnsoid;
			            	  d.pnsoid = getParam("pnsoid");
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
			            { "data": "price" , "class": "center" },
			            { "data": "quant" , "class": "center" },
			            { "data": "status" , "class": "center" },
			            { "data": "timestamp" , "class": "center" , "render": function(data, type, row){
			            	var time = new Date(data).format("yyyy-MM-dd hh:mm:ss");
			            	return time;
			            }}
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

           
			