<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <title>
    Soft UI Dashboard by Creative Tim
  </title>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
  <!-- Nucleo Icons -->
  <link href="../public/assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="../public/assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link href="../assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="../public/assets/css/soft-ui-dashboard.css?v=1.0.7" rel="stylesheet" />
  <link id="pagestyle" href="../public/assets/css/docs-soft.css" rel="stylesheet" />
  <link id="pagestyle" href="../public/assets/css/style.css" rel="stylesheet" />
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../public/assets/css/bootstrap-toaster.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <link id="pagestyle" href="../public/assets/css/cute-alert.css" rel="stylesheet" />

</head>

<body class="g-sidenav-show position-relative bg-gray-100">
<div class="toast-container position-fixed top-50 start-50 p-3">
    <div id="basicToast" class="toast align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <span class="status-icon bi me-2 text-success bi-check-circle-fill" aria-hidden="true"></span>
        <strong class="me-auto">Parabéns</strong>
        <!-- <small class="text-muted"></small> -->
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="d-flex">
        <div class="toast-body">
          Operação realizada com sucesso!
        </div>

      </div>
    </div>
  </div>
  <?php include('header.html'); ?>
  

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <!-- Navbar -->
    <?php //include('breadcrumb.html'); ?>
    <div class="container-fluid py-4">
      <?php include('menu-widget-schedule.html'); ?>
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

  <script src="../assets/js/jquery.min.js"></script>
  <script src="../assets/js/core/popper.min.js"></script>
  <script src="../assets/js/core/bootstrap.min.js"></script>
  <script src="../assets/js/bootstrap-toaster.min.js"></script>
  <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script src="../assets/js/plugins/chartjs.min.js"></script>

  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="../assets/js/soft-ui-dashboard.min.js?v=1.0.7"></script>
  <script src="../assets/js/axios.min.js"></script>
  <script src="../assets/js/utils.js"></script>
  <script src="../assets/js/teacherNew.js"></script>
  <script src="../assets/js/cute-alert.js"></script>
  

</body>

</html>