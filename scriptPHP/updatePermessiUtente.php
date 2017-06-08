<?php
	session_start();

	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_SESSION['esiste']==0){
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.Evento e VAL Nome=:nome, Descrizione=:desc, Data=:data WHERE e.id=:id');
			$stm->bindValue(':nome',$_GET['nome']);
			$stm->bindValue(':data',$_GET['data']);
			$stm->bindValue(':desc',$_GET['descrizione']);
			$stm->bindValue(':id',$_GET['id']);
			$stm->execute();
			if($stm->errorCode() == 0){
				echo json_encode('Evento modificato.');
    		}
    		else
    		{
    			echo json_encode('Errore!');
    		}
		}catch(PDOException $e){
			$e->getMessage();
			echo json_encode('Errore!!');
		}
    }
?>