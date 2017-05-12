<?php
    session_start();
    
    $_SESSION['esiste']=0;
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.Utente (Nickname,Password,Nome,Cognome,Email,Ruolo) VALUE(:username,:password,:nome,:cognome,:email,'1')");
		$stm->bindValue(':username',$_GET['nick']);
		$stm->bindValue(':password',$_GET['pass']);
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':cognome',$_GET['cognome']);
		$stm->bindValue(':email',$_GET['email']);
		if($stm->execute() == true){
			$_SESSION['esiste']=1;
			echo json_encode('Registrato.');
		}
		else{
			echo json_encode('Username non valido.');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>