<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>View Comments</title>

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />

    <style>
      @font-face {
        font-family: "Proxima Nova";
        src: url("fonts/proximanova.woff2") format("woff2"),
          url("fonts/proximanova.woff") format("woff"),
          url("fonts/proximanova.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      * {
        font-family: "Proxima Nova", sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
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
      .navbar-gradient {
        background: linear-gradient(to right, #1DAA58, #193661);
      }
      .navbar-gradient .nav-link,
      .navbar-gradient .navbar-toggler-icon,
      .navbar-gradient .btn {
        color: #fff !important;
      }
      .navbar-brand {
        color: #dcdee4 !important;
        cursor: default;
        font-size: 1.5rem;
        font-weight: bold;
      }
      .btn-green-gradient {
        background: linear-gradient(to right, #1b9d71, #3c7e83);
        color: #fff !important;
        border: none;
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

      .export-btn{
        margin-top: 1rem;
      }
      .btn-return:hover {
        background: linear-gradient(to right, #17a14e, #1a3159);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      /* Highlight active filter button */
      .active-filter {
        opacity: 0.8;
      }
      /* Enhanced table design */
      .table-container {
        margin: 2rem auto;
      }
      .table td,
      .table th {
        vertical-align: middle;
      }
      .update-info {
        font-size: 0.85rem;
        color: #6c757d;
        margin-bottom: 0.3rem;
      }
      /* Comment History styles */
      #commentHistoryList li {
        margin-bottom: 0.5rem;
      }
      .reply-btn {
        font-size: 0.75rem;
        margin-left: 1rem;
      }

      /*comment history section*/
      .comment_history {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        text-align: left;
        background: #fff;
        padding-bottom: 5px;
      }
      .comment_history > div:first-child p {
          margin: 0;
      }
      .comment_history > div:first-child p:first-child {
          font-weight: 700;
      }
      .comment_btn_pop + .comment_btn_pop {
        margin-left: 10px;
      }
      #commentHistoryList li {
        background: #e5e5e5;
        padding: 0 0 8px 0;
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

      /* Responsive adjustments for smaller screens */
      @media (max-width: 768px) {
        .navbar-brand {
          font-size: 1.2rem;
          cursor: default;
        }
        .ms-auto {
          margin-left: auto !important;
        }
        .btn {
          margin-bottom: 0.5rem;
          display: block;
          width: 100%;
        }
      }

      .input-no-border {
        border: none !important;
        box-shadow: none !important;
      }
      .fixed-width {
        width: 350px;
      }

      .btn-gradient {
          background: linear-gradient(to right, #1b9d71, #3c7e83);
          color: white;
          border: none;
      }

      .btn-gradient:hover {
          opacity: 0.9;
      }
    </style>
  </head>

  <body>
    <!-- Logo Bar -->
    <div class="logo-bar">
      <div class="container-fluid">
        <img src="{{ asset('images/Logo.png') }}" alt="Client Logo" />
      </div>
    </div>

    <!-- Navbar with Logout, Return to Course, and Filter Buttons -->
    <nav class="navbar navbar-expand-lg navbar-gradient">
      <div class="container-fluid">
        <!-- Logout Button on the Left Corner -->
        <!-- <button onclick="location.href='login.html'" type="button" class="btn btn-outline-light me-2">
          Logout
        </button> -->
        <!-- Enhanced Return to Course button -->
        {{-- <button onclick="location.href='{{ route('reviewer.detailcourse', ['id' => $course_id]) }}'" type="button" class="btn btn-return me-2">
          Return to Course
        </button> --}}
        <a class="navbar-brand" href="#">View Comments</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto navb_r">
            <!-- <li class="nav-item">
              <button type="button" class="btn btn-green-gradient me-2">
                All Comments
              </button>
            </li>
            <li class="nav-item">
              <button type="button" class="btn btn-green-gradient me-2">
                Page
              </button>
            </li>
            <li class="nav-item">
              <button type="button" class="btn btn-green-gradient me-2">
                Module
              </button>
            </li>
            <li class="nav-item">
              <button type="button" class="btn btn-green-gradient me-2">
                Course
              </button>
            </li> -->
            <!-- Profile Logo Button added as the last list item -->
            <li class="nav-item">
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
                 <ul class="header_menu_dropdown">
                     <li><a href="{{ route('admin.userprofile') }}">User Profile</a></li>
                     <li><a href="{{ route('admin.logout') }}">Log Out</a></li>
                 </ul>
               </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {{-- Export to Excel button and course name --}}
    <div class="container d-flex justify-content-between align-items-center mb-3">
      <span class="fw-bold fs-4 text-success mt-3">Course Name: {{ $course_name }}</span>
      <a href="{{ route('export.excel', ['course_id' => $course_id]) }}" class="btn btn-return export-btn" id="exportExcelBtn">
        Export to Excel
      </a>
    </div>

    <!-- Enhanced Comments Table -->
    <div class="container table-container">
      <form method="GET" action="{{ route('admin.view_comments', ['id' => $course_id]) }}">
        @csrf
        <!-- Status Filter Dropdown -->
        <div class="d-flex gap-3 flex-wrap align-items-end">
          <!-- Filter by Status -->
          <div class="mb-3 fixed-width">
              <label for="statusFilter" class="form-label fw-semibold">Filter by Status</label>
              <select id="statusFilter" name="status" class="form-select">
                  <option value="all">All</option>
                  <option value="Open">Open</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="Re-Open">Re-Open</option>
                  <option value="Closed - No Action">Closed - No Action</option>
              </select>
          </div>
      
          <!-- Filter by Module -->
          <div class="mb-3 fixed-width">
              <label for="moduleFilter" class="form-label fw-semibold">Filter by Module</label>
              <select id="moduleFilter" name="module_no" class="form-select">
                  <option value="all">All</option>
              </select>
          </div>
      
          <!-- Filter by Screen -->
          <div class="mb-3 fixed-width">
              <label for="screenFilter" class="form-label fw-semibold">Filter by Screen</label>
              <select id="screenFilter" name="page_no" class="form-select">
                  <option value="all">All</option>
              </select>
          </div>
      
          <!-- Filter Button -->
          <div class="mb-3">
              <button type="submit" class="btn btn-gradient w-100 mt-2">Filter</button>
          </div>
        </div>
      </form>

        <table class="table table-bordered table-striped table-hover">
          <thead class="table-light">
              <tr>
                  <th>#</th>
                  <th>Severity</th>
                  <th>Date</th>
                  <th>Reviewer Comments</th>
                  <th>Status</th>
                  <th>Update Comment</th>
              </tr>
          </thead>
          <tbody id="commentsTableBody">
              @php $serial = 1; @endphp

              @foreach ($groupedComments as $moduleNo => $pages)
                  {{-- Module Row --}}
                  <tr class="table-secondary fw-bold text-start">
                      <td colspan="6">Module Name: {{ $moduleNo }}</td>
                  </tr>

                  @foreach ($pages as $pageNo => $comments)
                      {{-- Page Row --}}
                      <tr class="table-primary fw-bold text-start ps-5">
                          <td colspan="6" style="padding-left: 40px;">Screen Number: {{ $pageNo }}</td>
                      </tr>

                      {{-- Comments under page --}}
                      @foreach ($comments as $comment)
                          <tr class="comment-row" data-status="{{ $comment->status }}">
                              <td>{{ $serial++ }}</td>
                              <td>{{ $comment->severity ?? 'N/A' }}</td>
                              <td>{{ date('Y-m-d', strtotime($comment->created_at)) }}</td>
                              <td>{{ $comment->comment ?? 'No comment available' }}</td>
                              <td class="status-cell">{{ $comment->status ?? 'N/A' }}</td>
                              <td>
                                  <div class="update-info">
                                      Last Updated: {{ isset($comment->updated_at) ? date('Y-m-d H:i A', strtotime($comment->updated_at)) : 'N/A' }}
                                  </div>
                                  <button class="btn btn-sm btn-green-gradient update-btn"
                                      data-course-id="{{ $comment->course_id }}"
                                      data-comment-id="{{ $comment->id }}">
                                      Update Comment
                                  </button>
                              </td>
                          </tr>
                      @endforeach
                  @endforeach
              @endforeach
          </tbody>
        </table>
    </div>

    <!-- Modal (Card) for Updating/Replying/Editing Comments -->
    <div
      class="modal fade"
      id="updateCommentModal"
      tabindex="-1"
      aria-labelledby="updateCommentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateCommentModalLabel">
              Update Comment
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form id="editcommentform" method="POST">
              @csrf
              @method('PUT')
              <!-- Row 1: Course Name, Reviewer Name -->
              <input type="hidden" id="comment_history_data" name="comment_history_data">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="courseName" class="form-label fw-semibold">
                    Course Name
                  </label>
                  <input
                    type="text"
                    class="form-control input-no-border"
                    id="courseName"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label for="timestampDetail" class="form-label fw-semibold">
                    Timestamp &amp; Location
                  </label>
                  <input
                    type="text"
                    class="form-control input-no-border"
                    id="timestampDetail"
                    readonly
                  />
                </div>
              </div>

              <!-- Row 2: Timestamp (Location) -->
              {{-- <div class="mb-3">
                <label for="timestampDetail" class="form-label fw-semibold">
                  Timestamp &amp; Location
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="timestampDetail"
                  readonly
                />
              </div> --}}

              <!-- Row 3: Review Details (Review Type, Severity, Category, Comment Type) -->
              <div class="row mb-3">
                <div class="col-md-3">
                  <label for="reviewType" class="form-label fw-semibold">Review Type</label>
                  <div id="reviewType" class="form-control-plaintext"></div>
                </div>
                <div class="col-md-3">
                  <label for="severity" class="form-label fw-semibold">Severity</label>
                  <div id="severity" class="form-control-plaintext"></div>
                </div>
                <div class="col-md-3">
                  <label for="commentType" class="form-label fw-semibold">Comment Type</label>
                  <div id="commentType" class="form-control-plaintext"></div>
                </div>
                <div class="col-md-3">
                  <label for="category" class="form-label fw-semibold">Category</label>
                  <div id="category" class="form-control-plaintext text-wrap"
                    style="white-space: normal; word-break: break-word; overflow-wrap: break-word;">
                  </div>
                </div>
              </div>

              <!-- Comment History with Reply and Edit Options -->
              <div class="mb-3">
                <label class="form-label fw-semibold">
                  Comment History
                </label>
                <ul
                  id="commentHistoryList"
                  name="commentHistoryList"
                  class="list-unstyled border rounded p-2"
                  
                >
                  <!-- Dynamically filled with each comment and Reply/Edit buttons -->
                </ul>
                <!-- style="height: 100px; overflow-y: auto;" -->
              </div>

              <!-- New/Edited Comment -->
              <div class="mb-3">
                <label for="newComment" class="form-label fw-semibold">
                  Reply Comments (max 10000 Characters)
                </label>
                <textarea
                  class="form-control"
                  id="newComment"
                  name="new_comment"
                  rows="3"
                  maxlength="10000"
                ></textarea>
                <p class="rm_ch">Remaining Characters <strong id="charCount">10000</strong></p>
              </div>

              <!-- Status -->
              {{-- <div class="mb-3">
                <label for="statusSelect" class="form-label fw-semibold">
                  Status
                </label>
                <select class="form-select" name="status_select" id="statusSelect">
                  <option value="Open">Open</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Re-Opened">Re-Opened</option>
                  <option value="Closed">Closed</option>
                </select>
              </div> --}}

              <div class="mb-3">
                <div class="row mb-2">
                  <div class="col">
                    <label class="form-label fw-semibold">Current Status</label>
                  </div>
                  <div class="col">
                    <label class="form-label fw-semibold">Update Status</label>
                  </div>
                </div>
                <div class="row gx-3">
                  <!-- Display Current Status (Styled as Input) -->
                  <div class="col">
                    <input type="text" class="form-control fw-bold" id="statusSelect" readonly>
                  </div>
                  <!-- Dropdown for Changing Status -->
                  <div class="col">
                    <select class="form-select" name="status_select" id="statusSelect">
                      <option value="" disabled selected hidden>Select Status</option>
                      <option value="Open">Open</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Re-Opened">Re-Opened</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-return me-2"
                  id="modalUpdateBtn"
                >
                  Update Comment
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="replyModal" tabindex="-1" aria-labelledby="replyModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="replyModalLabel">Edit Comment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <input type="hidden" id="edit_comment_id">
                <div class="modal-body">
                    <textarea id="newReplyTextarea" class="form-control" rows="3" placeholder="Write your reply..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="submitReply">Add Reply</button>
                </div>
            </div>
        </div>
    </div>


    <script src=" https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Bootstrap JS (with Popper) and Updated Script -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {

        let courseId = "{{ $course_id }}";
        let baseUrl = "{{ url('/') }}";

        // 1) FILTERING
        const buttons = document.querySelectorAll(".navbar-nav .btn");
        const rows = document.querySelectorAll("#commentsTableBody tr");

        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            // Highlight the active filter button
            buttons.forEach((btn) => btn.classList.remove("active-filter"));
            this.classList.add("active-filter");

            const filter = this.textContent.trim();
            rows.forEach((row) => {
              if (filter === "All Comments") {
                row.style.display = "";
              } else {
                const commentType = row.getAttribute("data-comment");
                row.style.display = commentType === filter ? "" : "none";
              }
            });
          });
        });

        // 2) UPDATE/REPLY/EDIT COMMENT MODAL
        const updateCommentModalEl = document.getElementById("updateCommentModal");
        const updateCommentModal = new bootstrap.Modal(updateCommentModalEl);

        // Fields in the modal
        const courseNameInput = document.getElementById("courseName");
        // const reviewerNameInput = document.getElementById("reviewerName");
        const timestampDetailInput = document.getElementById("timestampDetail");
        const reviewTypeInput = document.getElementById("reviewType");
        const severityInput = document.getElementById("severity");
        const categoryInput = document.getElementById("category");
        const commentTypeInput = document.getElementById("commentType");
        const commentHistoryList = document.getElementById("commentHistoryList");
        const newCommentTextarea = document.getElementById("newComment");
        const statusSelect = document.getElementById("statusSelect");
        const updateButtons = document.querySelectorAll(".update-btn");
        const modalUpdateBtn = document.getElementById("modalUpdateBtn");

        // Variables to keep track of current row and modal action
        let currentRow = null;
        let currentHistoryData = [];
        // currentAction can be "new" (default)
        let currentAction = "new";
        // Get current user
        const currentAuthUserId = {{ auth()->id() }};
        const currentAuthUserName = "{{ auth()->user()->name }}";

        // Populate & show modal on "Update Comment" click (from table row)
        updateButtons.forEach((btn) => {
          btn.addEventListener("click", function () {

            const courseId = this.getAttribute("data-course-id");
            const commentId = this.getAttribute("data-comment-id");

            if (!courseId) {
                alert("Course ID not found!");
                return;
            }

            fetch(baseUrl+`/admin/get-comment-record/${courseId}/${commentId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const comment = data;
                        // console.log(comment);debugger;

                        courseNameInput.value = comment.course_name || "";
                        // reviewerNameInput.value = comment.reviewer_name || "";
                        timestampDetailInput.value = comment.comment.timestamp || "";
                        reviewTypeInput.textContent = comment.comment.review_type || "";
                        severityInput.textContent = comment.comment.severity || "";
                        // categoryInput.textContent = comment.comment.category || "";
                        commentTypeInput.textContent = comment.comment.comment_type || "";
                        statusSelect.value = comment.comment.status || "Open";
                        newCommentTextarea.value = "";
                        let rawCategory = comment.comment.category || "";

                        try {
                            // If it's a JSON array string, parse and join with commas
                            const parsed = JSON.parse(rawCategory);
                            categoryInput.textContent = Array.isArray(parsed) ? parsed.join(", ") : rawCategory;
                        } catch (e) {
                            // If it's not JSON, just use it as-is
                            categoryInput.textContent = rawCategory;
                        }

                        try {
                            currentHistoryData = data.comment_history || [];
                            let maincomment = data.comment;
                            maincomment['all_children'] = [];
                            delete maincomment['course'];
                            currentHistoryData = [maincomment, ...currentHistoryData];
                        } catch (e) {
                            currentHistoryData = [];
                        }

                        buildCommentHistoryList();
                        let baseUrl = "{{ url('/') }}";
                        document.getElementById("editcommentform").action = `${baseUrl}/admin/editcomment/${comment.comment.id}/${courseId}`;
                        updateCommentModal.show();
                    } else {
                        alert("Error fetching comment data!");
                    }
                })
                .catch(error => console.error("Error:", error));

          });
        });

        // Function to build the comment history list with non-functional reply/edit buttons
        function buildCommentHistoryList() {
            commentHistoryList.innerHTML = "";

            if (!currentHistoryData || currentHistoryData.length === 0) {
                commentHistoryList.innerHTML = "<li>No previous comments.</li>";
                return;
            }

            // Recursive function to build the comment tree using "all_children"
            function createCommentItem(comment) {
                const li = document.createElement("li");

                // Container for comment text
                const commentDiv = document.createElement("div");
                commentDiv.innerHTML = `
                    <div class="comment-content">
                        <strong>${comment.reviewer.name || 'Anonymous'}</strong>
                        <p>${comment.comment}</p>
                        <small>${formatTimestamp(comment.created_at)}</small>
                    </div>
                `;
                commentDiv.className = "comment_history";
                li.appendChild(commentDiv);

                // If the comment belongs to the current user, add an Edit button
                if (comment.reviewer.id === currentAuthUserId) {
                    const editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";
                    editBtn.className = "btn btn-sm btn-green-gradient edit-btn";
                    editBtn.style.marginLeft = "5px";
                    editBtn.setAttribute("type", "button");
                    editBtn.addEventListener("click", function () {
                      openReplyModal(comment.comment, comment.id);
                    });
                    li.appendChild(editBtn);
                }

                // Handle nested comments based on "all_children"
                if (comment.all_children && comment.all_children.length > 0) {
                    const nestedUl = document.createElement("ul");
                    comment.all_children.forEach(childComment => {
                        nestedUl.appendChild(createCommentItem(childComment)); // Recursion
                    });
                    li.appendChild(nestedUl);
                }

                return li;
            }

            post_data_for_comment_history = [];

            // Build the comment tree from the root comments
            currentHistoryData.forEach(comment => {
                commentHistoryList.appendChild(createCommentItem(comment));
                if(comment.hasOwnProperty('id')){
                    post_data_for_comment_history.push({
                        id: comment.id,
                        message: comment.comment
                    });
                }else{
                    post_data_for_comment_history.push({
                        message: comment.comment
                    });
                }
            });



            // console.log(post_data_for_comment_history);
            document.getElementById("comment_history_data").value = JSON.stringify(post_data_for_comment_history);
        }

        const formatTimestamp = (timestamp) => {
            if (!timestamp) return 'No timestamp available';
            return timestamp.replace('T', ' ').split('.')[0]; // Remove 'T' and everything after '.'
        };

        // Function to open the reply modal
        function openReplyModal(text = '', edit_comment_id = null) {
            const replyModal = new bootstrap.Modal(document.getElementById("replyModal"));
            document.getElementById("newReplyTextarea").value = text;
            if(edit_comment_id != null){
              document.getElementById('submitReply').innerHTML = 'Edit Comment';
              document.getElementById('edit_comment_id').value = edit_comment_id;
            }else{
              document.getElementById('submitReply').innerHTML = 'Add Reply';
              document.getElementById('edit_comment_id').value = '';
            }
            replyModal.show();
        }

        // Process the new/edited comment when the modal update button is clicked
        document.getElementById('submitReply').addEventListener("click", function () {
          const newreply = document.getElementById("newReplyTextarea");

          const newText = newreply.value.trim();
          if (newText === "") {
            alert("Comment text cannot be empty.");
            return;
          }
          const now = new Date();
          const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

          let edit_comment_id = document.getElementById('edit_comment_id').value;
          if(edit_comment_id == ''){
              // Append as a new comment (standalone)
              const newComment = {
                timestamp: formattedDate,
                reviewer: {id: currentAuthUserId, name: currentAuthUserName},
                comment: newText,
              };
              currentHistoryData.push(newComment);
          }else{
            edit_comment_id = parseInt(edit_comment_id);

            currentHistoryData.forEach((value, index, array) => {
              if(value.id == edit_comment_id){
                value.comment = newText;
                array[index] = value;
              }

            });
          }

          // Rebuild the comment history list to show updates
          buildCommentHistoryList();

          // Clear the textarea and reset action to new
          newreply.value = "";
          currentAction = "new";
          
          document.getElementById("replyModal").style = 'display:none';

        });

        // 3) Export to Excel Button (placeholder functionality)
        const exportExcelBtn = document.getElementById("exportExcelBtn");
        // if (exportExcelBtn) {
        //   exportExcelBtn.addEventListener("click", function () {
        //     alert("Export to Excel functionality not implemented.");
        //   });
        // }
      });
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

    <script>
      document.addEventListener("DOMContentLoaded", function () {
          const textarea = document.getElementById("newComment");
          const charCount = document.getElementById("charCount");
          const maxLength = 10000; // Set the max character limit

          textarea.addEventListener("input", function () {
              const remaining = maxLength - this.value.length;
              charCount.textContent = remaining; // Update remaining characters
          });

          document.getElementById('statusFilter').value =  "{{ $filter_status }}";

          const moduleNos = @json($moduleNos);
          const pageNos = @json($pageNos);

          let availableModuleNames = '<option value="all">All</option>';
          let availablePageNames = '<option value="all">All</option>';

          for (const moduleNo of moduleNos) {
              availableModuleNames += '<option value="'+moduleNo+'">'+moduleNo+'</option>';
          }

          for (const pageNo of pageNos) {
            availablePageNames += '<option value="'+pageNo+'">'+pageNo+'</option>';
          }

          const module_elm  = document.getElementById('moduleFilter');
          const page_elm    = document.getElementById('screenFilter');

          module_elm.innerHTML = availableModuleNames;
          module_elm.value =   "{{ $filter_module_no }}";
          page_elm.innerHTML = availablePageNames;
          page_elm.value = "{{ $filter_page_no }}";
      });
    </script>

    {{-- <script>
      document.addEventListener("DOMContentLoaded", function () {
          const statusFilter = document.getElementById("statusFilter");
          const rows = document.querySelectorAll(".comment-row");

          statusFilter.addEventListener("change", function () {
              const selectedStatus = this.value;

              rows.forEach(row => {
                  const rowStatus = row.getAttribute("data-status");

                  if (selectedStatus === "all" || rowStatus === selectedStatus) {
                      row.style.display = "";
                  } else {
                      row.style.display = "none";
                  }
              });
          });
      });
    </script> --}}

  </body>
</html>

