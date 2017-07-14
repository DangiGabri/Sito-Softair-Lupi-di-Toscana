<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.Notizia (Titolo,Data,Contenuto) VALUE(:nome,NOW(),:descrizione)");
		$stm->bindValue(':nome',$_GET['tit']);
		$stm->bindValue(':descrizione',$_GET['desc']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Notizia inserita.');
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>