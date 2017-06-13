<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('SELECT u.id, u.Nome, u.Descrizione FROM SitoSoftairLupiDiToscana.UpgradeASG u WHERE u.idTipo=2');
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