//
// jQuery Plugin
//
// ;(function($) {
//     $.fn.toJSON = function() {
//         var $elements = {};
//         var $form = $(this);
//         $form.find('input, select, textarea').each(function(){
//           var name = $(this).attr('name')
//           var type = $(this).attr('type')
//           if(name){
//             var $value;
//             if(type == 'radio'){
//               $value = $('input[name='+name+']:checked', $form).val()
//             } else if(type == 'checkbox'){
//               $value = $(this).is(':checked')
//             } else {
//               $value = $(this).val()
//             }
//             $elements[$(this).attr('name')] = $value
//           }
//         });
//         return JSON.stringify( $elements )
//     };
//     $.fn.fromJSON = function(json_string) {
//         var $form = $(this)
//         var data = JSON.parse(json_string)
//         $.each(data, function(key, value) {
//           var $elem = $('[name="'+key+'"]', $form)
//           var type = $elem.first().attr('type')
//           if(type == 'radio'){
//             $('[name="'+key+'"][value="'+value+'"]').prop('checked', true)
//           } else if(type == 'checkbox' && (value == true || value == 'true')){
//             $('[name="'+key+'"]').prop('checked', true)
//           } else {
//             $elem.val(value)
//           }
//         })
//     };
// }( jQuery ));

   // $("#_load").on('click', function(){
   //   if(localStorage['form_data']){
   //     console.log("Loading form data...")
   //     console.log(JSON.parse(localStorage['form_data']))
   //     $("form#myForm").fromJSON(localStorage['form_data'])
   //   } else {
   //     console.log("Error: Save some data first")
   //   }
     
   //   return false;
   // })

$(document).ready(function(){
	if ( !Storage.prototype.setObject ) {
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
}

if ( !Storage.prototype.getObject ) {
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }
}

	var chapter_id = 0
	var chapter
   $("#_save_chapter").on('click', function(){
   	chapter_id += 1
     console.log("Saving chapter data...")
     chapter={
     	chapter_id:chapter_id,
     	chapter_name:$("#chapter_name").val(),
     	chapter_description:$("#chapter_description").val(),
     	casts:[],
     	scenes:[]
     };
     // localStorage.setItem("chapter_id",chapter_id);
     // localStorage.setItem("chapter_name",$("#chapter_name").val())
     // localStorage.setItem("chapter_description",$("#chapter_description").val())

     // var chapter_data = $("form#chapter_info").toJSON()
     localStorage.setObject('chapter',chapter);
      console.log(localStorage.getObject('chapter'));
     // localStorage['form_data'] = data;
     return false;
   })
   
   $("#_save_cast").on('click',function(){
   		
   		console.log("Saving cast data...")
   		var cast = {
   			cast_name:$("#cast_name").val(),
   			cast_notes:$("#cast_notes").val(),
   			cast_role:$('input[name=cast_role]:checked').val(),
   			voice:$('#cast_voice:selected').text()
   		};
   		console.log(cast);
     	chapter.casts.push(cast);
     	localStorage.setObject('chapter',chapter);
     	console.log(localStorage.getObject('chapter'));


     	return false;
   })


var data_download = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage.getObject('chapter')));

$('<a href="data:' + data_download + '" download="demo.json">download JSON</a>').appendTo('#_download');

});

