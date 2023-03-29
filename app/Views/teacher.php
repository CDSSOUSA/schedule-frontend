<?php
echo $this->extend('../../public/assets/pages/layout/default');
echo $this->section('content');

        
         //$validate = $this->validateToken($cookie);

        //  if(!$validate) {
        //     $login = new Login();
        //     return $login->index();
        //  }

?> 

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <!-- Navbar -->
    <?php //include('breadcrumb.html'); ?>
    <div class="container-fluid py-4">
      <?php include('teacher/menu-widget.html'); ?>
      <?php include('teacher/content.html'); ?>
      <div class="row my-4"></div>
      <?php include('footer.html'); ?>
    </div>
  </main>

  <?php //include('config.html'); 
  ?>
  <?php include('teacher/modal/add.html'); ?>
  <?php include('teacher/modal/edit.html'); ?>
  <?php include('teacher/modal/delete.html'); ?>

  <?php include('teacher-discipline/modal/add.html'); ?>
  <?php include('teacher-discipline/modal/edit.html'); ?>
  <?php include('teacher-discipline/modal/delete.html'); ?>

  <?php include('allocation/modal/add.html'); ?>
  <?php include('allocation/modal/delete.html'); ?>
  <?php include('allocation/modal/delete.html'); ?>

  <?php include('schedule/modal/delete.html'); ?>

  <?= $this->endSection();

  echo $this->section('script-js'); ?>

  <script src="../public/assets/js/teacherNew.js"></script>


  <?= $this->endSection();
