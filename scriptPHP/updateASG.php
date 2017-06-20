<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.ASG u SET Nome=:nome, Marca=:marca, Potenza=:potenza, Descrizione=:desc WHERE u.idASG=:id');
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':marca',$_GET['marca']);
		$stm->bindValue(':potenza',$_GET['potenza']);
		$stm->bindValue(':desc',$_GET['desc']);
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Arma modificata.');
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