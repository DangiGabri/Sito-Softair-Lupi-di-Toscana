<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.Campo (Nome,Via,Localita,Mappa) VALUE(:nome,:via,:loc,:map)");
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':map',$_GET['map']);
		$stm->bindValue(':via',$_GET['via']);
		$stm->bindValue(':loc',$_GET['loc']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Campo inserito.');
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>