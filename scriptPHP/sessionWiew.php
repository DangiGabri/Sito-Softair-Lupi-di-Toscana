<?php
    session_start();
    if($_SESSION[esiste]==1)
        echo json_encode('show');
    else
        echo json_encode('hide');
?>