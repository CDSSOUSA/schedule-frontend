<?php
echo view('layout/header.html');

$this->renderSection('content');


echo view('layout/footer.html');

$this->renderSection('script-js');?>


</body>
</html>