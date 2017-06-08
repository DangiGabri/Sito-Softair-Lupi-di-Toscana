<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.Evento (Nome,Data,Descrizione,idCampo) VALUE(:nome,:data,:descrizione,:campo)");
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':data',$_GET['data']);
		$stm->bindValue(':descrizione',$_GET['descrizione']);
		$stm->bindValue(':campo',$_GET['campo']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Evento inserito.');
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>