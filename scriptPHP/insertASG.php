<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.ASG (Nome,Marca,Descrizione,Potenza,idProprietario) VALUE(:nome,:marca,:descrizione,:potenza,:id)");
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':marca',$_GET['marca']);
		$stm->bindValue(':descrizione',$_GET['descrizione']);
		$stm->bindValue(':potenza',$_GET['potenza']);
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Arma inserita.');
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>