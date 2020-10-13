<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$data = json_decode(file_get_contents("php://input"));

	$caminho_json = "json/consumo_".$data->id_reserva.".json";

	if(is_array($data->valor_unitario)) {
		foreach($data->valor_unitario as $key => $valor) {
			$valor = str_replace('.', '', $valor);
			$valor = str_replace(',', '.', $valor);
			
			$data->valor_unitario[$key] = $valor;
		}
	} else {
		$valor = str_replace('.', '', $data->valor_unitario);
		$valor = str_replace(',', '.', $valor);

		$data->valor_unitario = $valor;
	}

	$array_json = array(
		"id_reserva" => $data->id_reserva,
		"dados" => array(
			"produto" => $data->nome_produto,
			"valor" => $data->valor_unitario,
			"quantidade" => $data->quantidade
		)
	);

	$fp = fopen($caminho_json, "w");
	fwrite($fp, json_encode($array_json));
	fclose($fp);
		
	echo json_encode($array_json);
?>