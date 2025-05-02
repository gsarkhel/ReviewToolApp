<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Course Details</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Proxima Nova", sans-serif;
    }
    body {
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    /* Top Logo Bar */
    .logo-bar {
        background-color: #fff;
        /* text-align: center; */
        /* padding: 0.5rem 0; */
        padding: 1rem 0;
      }
      .logo-bar img {
        height: 25px;
        max-width: 100%;
      }
    /* NAVBAR (Gradient) */
    .navbar-gradient {
      background: linear-gradient(to right, #1DAA58, #193661);
    }
    .navbar-gradient .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff !important;
      cursor: default;
      /* margin-left: 0.5rem; */
    }
    .navbar-buttons {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    /* Logout Button styling similar to other buttons */
    .logout-btn {
      background: linear-gradient(to right, #1DAA58, #00669B);
      color: #DCDEE4 !important;
      border: none;
      font-size: 18px;
      padding: 8px 20px;
      border-radius: 5px;
      text-decoration: none;
      transition: opacity 0.3s ease-in-out;
    }
    .logout-btn:hover {
      background: linear-gradient(to right, #1DAA58, #00669B);
      opacity: 0.9;
    }
    /* Greenish Gradient Button for other buttons */
    .btn-gradient {
      background: linear-gradient(to right, #1b9d71, #3c7e83);
      color: #DCDEE4 !important;
      border: none;
      font-size: 18px;
      padding: 8px 20px;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
      transition: opacity 0.3s ease-in-out;
      text-align: center;
      width: 180px; /* Fixed width for uniform size */
    }
    .btn-gradient:hover {
      background: linear-gradient(to right, #1DAA58, #00669B);
      opacity: 0.9;
    }
    .content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
    }
    .main-image {
      max-width: 90%;
      height: auto;
      border: 5px solid #ccc;
      border-radius: 10px;
    }
    /* Container for Upload/Edit buttons */
    .upload-container {
      padding: 0.5rem 1.5rem 0.5rem 0;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
    }
    /* Enhanced style for Return to Course button */
    .btn-return {
      background: linear-gradient(to right, #09694c, #32ad9a);
      color: #fff !important;
      border: none;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 0.4rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .btn-return:hover {
      background: linear-gradient(to right, #17a14e, #1a3159);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

     /* ===========user and logout--------------- */
      
     .navb_r {
        display: flex;
        align-items: center;
      }


      .header_user_thumb {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--color-olive);
        display: flex;
        position: relative;
      }
      .header_user_thumb > a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-olive);
      }
      ul.header_menu_dropdown {
          list-style: none;
      }

      .header_menu_dropdown {
          position: absolute;
          top: 55px;
          right: 0px;
          background-color: #ffffff;
          padding: 10px 15px;
          border-radius: 5px;
          z-index: 9;
          box-shadow: 0 5px 7px rgba(0, 0, 0, .1);
          display: none;
          width: 150px;
          border: 1px solid #1da658;
      }

      .header_menu_dropdown:before {
        bottom: 100%;
        left: 86%;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-bottom-color: #1da658;
        border-width: 7px;
          margin-left: -7px;
      }

      ul.header_menu_dropdown li + li {
          margin-top: 4px;
          border-top: 1px solid #a6d2b8;
          padding-top: 4px;
      }

      ul.header_menu_dropdown li a {
          text-decoration: none;
          color: var(--color-olive);
      }

      .openMenupanel .header_menu_dropdown{
          display: block;
      }

        /* ===========end of user and logout--------------- */
  </style>
  @if($user->role == 'reviewer')
    <script>
      this.getServerData = function() {
          return {
              reviewerName: "{{$user->name}}",
              courseName: "{{$course->name}}",
              reviewerId: {{$user->id}},
              courseId: {{$course->id}}
          };
      };
      this.setServerData = function(data, callback) {
            console.log("Sending data:", data); // Debugging

            fetch("{{ url('api/save_course_comment') }}", {
                method: "POST", // Use POST to send data
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": "{{ csrf_token() }}" // Include CSRF token for security
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if(typeof callback === "function"){
                  callback("success");
                }
            })
            .catch(error => {
                if(typeof callback === "function"){
                    callback("fail");
                  }
            });
        };

  </script>
  @endif
</head>
<body>
  <div class="logo-bar">
    <div class="container-fluid">
      <img src="{{ asset('images/Logo.png') }}" alt="Client Logo" />
    </div>
  </div>

  <nav class="navbar navbar-expand-lg navbar-gradient">
    <div class="container-fluid d-flex align-items-center">
      <!-- Left side: Logout button and Course title -->
      <div class="d-flex align-items-center">
        {{-- <span class="navbar-brand">
            <a href="{{ route('reviewer.courses') }}" class="btn btn-secondary btn-sm me-2">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </a>
            Course
        </span> --}}
        <button onclick="location.href='{{ route('reviewer.courses') }}'" type="button" class="btn btn-return me-2">
          Back
        </button>
        <a class="navbar-brand" href="#">Course</a>
      </div>
      <!-- Right side: View Comments button and Profile Logo -->
      <div class="ms-auto navbar-buttons">
        {{-- <a href="{{ route('reviewer.view_comments', ['id' => $course->id]) }}" class="btn btn-gradient" style="width: 200px;">View Comments</a> --}}
        {{-- <button class="btn btn-gradient" style="width: 200px;" onclick="openOrFocusTab()">View Comments</button> --}}
        <!-- Profile Logo Button -->
        <div class="header_user_thumb">
          <a href="#" class="header_thumb_link">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 100 100"
               width="40"
               height="40"
             >
               <!-- Outer Circle -->
               <circle cx="50" cy="50" r="48" fill="#1DAA58" stroke="#193661" stroke-width="2" />
               <!-- User Head -->
               <circle cx="50" cy="40" r="15" fill="#ffffff" />
               <!-- User Shoulders -->
               <path
                 d="M50 55c-15 0-22 8-22 15v5h44v-5c0-7-7-15-22-15z"
                 fill="#ffffff"
               />
             </svg>
           </a>
           <ul class="header_menu_dropdown" href="#">
               <li><a href="{{ route('reviewer.userprofile') }}">User Profile</a></li>
               <li><a href="{{ route('logout') }}">Log Out</a></li>
           </ul>
         </div>
      </div>
    </div>
  </nav>

  <!-- Upload and Edit Course Buttons aligned to the right in a single row -->
  <div class="upload-container">
    <!-- Trigger the Upload Course modal -->
    <!-- <a href="#" class="btn btn-gradient" data-bs-toggle="modal" data-bs-target="#uploadModal">Upload Course</a> -->
    <!-- Trigger the Edit Course modal -->
    <!-- <a href="#" class="btn btn-gradient" data-bs-toggle="modal" data-bs-target="#editModal">Edit Course</a> -->
  </div>

  <div class="content p-0">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body">
              <iframe src="{{ $scormUrl }}?access_token={{ $accessToken }}&course_uuid={{ $course->uuid }}&add_comment=true" width="100%" height="800px" style="border: none;"></iframe>
            </div>
        </div>
    </div>
  </div>

  <!-- Upload Course Modal -->
  <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="uploadCourseForm">
          <div class="modal-header">
            <h5 class="modal-title" id="uploadModalLabel">Upload Course</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- <p>Select the type of course upload:</p> -->
            <!-- <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="uploadType" id="moduleOption" value="module" checked>
                <label class="form-check-label" for="moduleOption">Upload Module</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="uploadType" id="zipOption" value="zip">
                <label class="form-check-label" for="zipOption">Upload ZIP File</label>
              </div>
            </div> -->
            <div class="mb-3">
              <label for="courseFile" class="form-label">Select file (Upload ZIP File)</label>
              <input class="form-control" type="file" id="courseFile" name="courseFile" accept=".zip, .js, .html, .css, .json">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-gradient">Upload</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Edit Course Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="editCourseForm">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Course</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Select the course, then upload the updated ZIP file:</p>
            <div class="mb-3">
              <label for="courseSelect" class="form-label">Select Course</label>
              <select class="form-select" id="courseSelect" name="courseSelect">
                <option value="">-- Choose Course --</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <!-- Additional courses can be added here -->
              </select>
            </div>
            <div class="mb-3">
              <label for="updatedZipFile" class="form-label">Select updated ZIP file</label>
              <input class="form-control" type="file" id="updatedZipFile" name="updatedZipFile" accept=".zip">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-gradient">Update Course</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    
  <script src=" https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <script>
    // Upload Course Form Handler
    document.getElementById('uploadCourseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const uploadType = document.querySelector('input[name="uploadType"]:checked').value;
      const fileInput = document.getElementById('courseFile');
      const file = fileInput.files[0];
      
      if (!file) {
        alert("Please select a file to upload.");
        return;
      }
      
      // Process the upload based on the selected type (module or zip)
      alert(`Uploading ${uploadType} file: ${file.name}`);
      
      // Close the modal after submission
      const uploadModalEl = document.getElementById('uploadModal');
      const uploadModal = bootstrap.Modal.getInstance(uploadModalEl);
      uploadModal.hide();
    });

    // Edit Course Form Handler
    document.getElementById('editCourseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const selectedCourse = document.getElementById('courseSelect').value;
      const fileInput = document.getElementById('updatedZipFile');
      const file = fileInput.files[0];

      if (!selectedCourse) {
        alert("Please select a course.");
        return;
      }
      if (!file) {
        alert("Please select a ZIP file to update the course.");
        return;
      }
      
      // Process the course update
      alert(`Updating ${selectedCourse} with file: ${file.name}`);
      
      // Close the modal after submission
      const editModalEl = document.getElementById('editModal');
      const editModal = bootstrap.Modal.getInstance(editModalEl);
      editModal.hide();
    });

    // Clear form submission state so that refreshing does not trigger resubmission confirmation.
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
    }
  </script>

  <script>
    $(document).ready(function () {

      $('.header_thumb_link').click(function(event){
          event.stopPropagation();
          //$(".header_menu_dropdown").slideToggle();
          $(this).parent().toggleClass("openMenupanel");
          
      });

      $(document).on('click', function (e) {
          if ($(e.target).closest(".menu_list").length === 0) {
              $(".header_thumb_link").parent().removeClass("openMenupanel");
          }
      });
    });
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  {{-- <script>
    const openTabs = {}; // Stores opened tab references by course ID

    function openOrFocusTab(courseId) {
        const tabKey = `comment-${courseId}`;
        console.log(tabKey);
        if (openTabs[tabKey] && !openTabs[tabKey].closed) {
            openTabs[tabKey].focus();
        } else {
            const url = `/reviewer/view_comments/${courseId}`;
            const newTab = window.open(url, '_blank');
            openTabs[tabKey] = newTab;
        }
    }

    // Attach event listeners to all "View Comments" buttons
    document.addEventListener('DOMContentLoaded', function () {
        const buttons = document.querySelectorAll('.btn-gradient');

        buttons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const url = new URL(button.href, window.location.origin);
                const pathParts = url.pathname.split('/');
                const courseId = pathParts[pathParts.length - 1];

                openOrFocusTab(courseId);
            });
        });
    });

    // Close all child tabs on window unload
    window.addEventListener('beforeunload', function () {
        for (const tabKey in openTabs) {
            if (openTabs[tabKey] && !openTabs[tabKey].closed) {
                openTabs[tabKey].close();
            }
        }
    });
  </script> --}}
  <script>
    let childTab = null;
    let heartbeatInterval = null;
    const channel = new BroadcastChannel('comment_channel');

    function openOrFocusTab() {
        const url = "{{ route('reviewer.view_comments', ['id' => $course->id]) }}";
        const tabName = "viewCommentsTab";

        childTab = window.open(url, tabName);

        if (childTab) {
            childTab.focus();

            // Send heartbeat every 1 second
            heartbeatInterval = setInterval(() => {
                channel.postMessage({ type: 'heartbeat' });
            }, 1000);
        }
    }

    window.addEventListener("beforeunload", () => {
        clearInterval(heartbeatInterval);
    });
  </script>
</body>
</html>

