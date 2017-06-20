<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.Campo u SET NomeCampo=:nome, Via=:via, Localita=:localita WHERE u.idCampo=:id');
		$stm->bindValue(':via',$_GET['via']);
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':localita',$_GET['localita']);
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Campo modificato.');
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