$(document).ready(function() {
  $('#summernote').summernote({
    height: 200,//,
    /*toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']]
    ],*/
    placeholder: console.log()// $(this).attr('data-placeholder') //'type starting with : and any alphabet'
  });
});