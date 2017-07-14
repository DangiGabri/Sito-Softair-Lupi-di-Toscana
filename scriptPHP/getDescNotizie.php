<?php
    session_start();

    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('SELECT * FROM SitoSoftairLupiDiToscana.Notizia WHERE idNotizia=:id');
		$stm->bindValue(':id',$_GET['descNot']);
		$stm->execute();
		if($stm->errorCode() == 0){
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