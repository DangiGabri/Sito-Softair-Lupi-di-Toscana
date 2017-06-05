<?php
    session_start();
    if($_SESSION['permesso']==1)
        echo json_encode('show');
    else
        echo json_encode('hide');
?>