$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if(o[this.name] !== undefined) {
            if(!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).on("focus", ".input_int", function() {
	$(this).mask("#");
});

$(document).on("focus", ".input_decimal", function() {
	$(this).mask("R$ #.##0,00", {reverse: true});
});

$('#add_produto').click(function() {
	var container = $('.container_produto[data-num="1"]').clone();
	var num_containers = $('.container_produto').length+1;
	container.attr('data-num', num_containers);
	container.find('div').html(num_containers+'.');
	container.find('input').val('');
	container.insertBefore(".botoes");
});

$(document).on('submit', '#form-consumo', function() {
	var dataJSON = JSON.stringify($(this).serializeObject());
	
	$.ajax({
		url: "manipulajson.php",
		type: "POST",
		contentType: 'application/json',
		data: dataJSON,
		success: function(result) {
			// cliente was created, go back to clientes list
			$('input[type="text"]').val('');
			alert('Consumo cadastrado');
			location.reload();
		},
		error: function(xhr, resp, text) {
			// show error to console
			console.log(xhr, resp, text);
		}
	});

	return false;
});