<?php
	session_start();

	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_SESSION['esiste']==0){
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.Utente u SET Ruolo=:ruolo, Descrizione=:desc, Permessi=:permesso WHERE u.id=:id');
			$stm->bindValue(':ruolo',$_GET['ruolo']);
			$stm->bindValue(':permesso',$_GET['permesso']);
			$stm->bindValue(':desc',$_GET['desc']);
			$stm->bindValue(':id',$_GET['id']);
			$stm->execute();
			if($stm->errorCode() == 0){
				echo json_encode('Utente modificato.');
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