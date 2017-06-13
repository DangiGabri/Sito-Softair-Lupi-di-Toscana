<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('SELECT e.id,e.Nome,e.Data,e.Descrizione,c.NomeCampo,c.idCampo FROM SitoSoftairLupiDiToscana.Evento e inner join SitoSoftairLupiDiToscana.Campo c on (c.idCampo=e.idCampo) ORDER BY e.Data');
		if($stm->execute() == true){
			echo json_encode($stm->fetchAll());
		}
		else
		{
			echo json_encode('Errore!');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
    }
?>