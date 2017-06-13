<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('SELECT p.Stato, r.Ruolo, u.id, u.Nickname, u.Descrizione FROM SitoSoftairLupiDiToscana.Utente u inner join SitoSoftairLupiDiToscana.Permessi p on (u.Permessi=p.idPermesso) inner join SitoSoftairLupiDiToscana.Ruolo r on (u.Ruolo=r.id) WHERE u.id!=2 ORDER BY u.Ruolo, u.Permessi');
		if($stm->execute() == true){
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