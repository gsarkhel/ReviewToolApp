<!DOCTYPE html>
<html>
<head>
    <title>Auto Submit Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<style>
  #loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7); /* white transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    display: none; /* Hidden by default */
  }

  .loader-content {
    text-align: center;
  }
</style>
<body>

<div id="loader">
    <div class="loader-content">
        <div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>

<form id="autoSubmitForm" action="{{ route('comment.fetchComments') }}" method="GET">
    <input type="hidden" id="access_token" name="access_token" value="">
    <input type="hidden" id="course_uuid" name="course_uuid" value="">
    <input type="hidden" id="pageNo" name="pageNo" value="">
    <input type="hidden" id="moduleName" name="moduleName" value="">
</form>

<script src="{{ asset('js/app_view.js') }}"></script>

</body>
</html>
