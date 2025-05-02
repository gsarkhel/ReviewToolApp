<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reviewer View Course</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />

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

        .comment_history>div:first-child p {
            margin: 0;
        }

        .comment_history>div:first-child p:first-child {
            font-weight: 700;
        }

        .comment_btn_pop+.comment_btn_pop {
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

        .header_user_thumb>a {
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

        ul.header_menu_dropdown li+li {
            margin-top: 4px;
            border-top: 1px solid #a6d2b8;
            padding-top: 4px;
        }

        ul.header_menu_dropdown li a {
            text-decoration: none;
            color: var(--color-olive);
        }

        .openMenupanel .header_menu_dropdown {
            display: block;
        }

        /* ===========end of user and logout--------------- */

        .tbl_control {
            display: flex;
            align-items: center;
            gap: 10px;
        }

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
            <!--  <button onclick="location.href='Course.html'" type="button" class="btn btn-return me-2">
          Return to Course
        </button> -->
            <a class="navbar-brand" href="#">View Courses</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
            </li> -->
                    <li class="nav-item">
                        <!-- <button type="button" class="btn btn-green-gradient me-2">
                Upload Course
              </button> -->
                        {{-- <a href="#" class="btn btn-green-gradient me-2" data-bs-toggle="modal"
                            data-bs-target="#uploadModal">Upload Course</a> --}}
                    </li>
                    <!-- Profile Logo Button added as the last list item -->
                    <li class="nav-item">
                        <div class="header_user_thumb">
                            <a href="#" class="header_thumb_link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40"
                                    height="40">
                                    <!-- Outer Circle -->
                                    <circle cx="50" cy="50" r="48" fill="#1DAA58" stroke="#193661"
                                        stroke-width="2" />
                                    <!-- User Head -->
                                    <circle cx="50" cy="40" r="15" fill="#ffffff" />
                                    <!-- User Shoulders -->
                                    <path d="M50 55c-15 0-22 8-22 15v5h44v-5c0-7-7-15-22-15z" fill="#ffffff" />
                                </svg>
                            </a>
                            <ul class="header_menu_dropdown" href="#">
                                <li><a href="{{ route('reviewer.userprofile') }}">User Profile</a></li>
                                <li><a href="{{ route('logout') }}">Log Out</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Enhanced Comments Table -->
    <div class="container table-container">
        <table class="table table-bordered table-striped table-hover">
            <thead class="table-light">
                <tr>
                    <th style="width: 10%;">S.NO</th>
                    <th>Course Name</th>
                    <th style="width: 18%;">Controls</th>
                </tr>
            </thead>
            <tbody id="">
                @forelse ($courses as $index => $course)
                    <!-- EXAMPLE ROW 1 -->
                    <tr data-comment="Page" data-course="Sample Course A" data-reviewer="John Doe"
                        data-timestamp="Page 5 at 02:15" data-reviewtype="SME" data-severity="High"
                        data-category="Content" data-commenttype="Defect"
                        data-commenthistory='[
                            {"date":"2025-02-21 09:00 AM","reviewer":"John Doe","text":"Layout issue noted"},
                            {"date":"2025-02-21 09:30 AM","reviewer":"Jane Smith","text":"Recommended a fix"}
                        ]'
                        data-status="Open">
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $course->name }}</td>

                        <td>
                            <div class="tbl_control">
                                <a href="{{ route('reviewer.detailcourse', ['id' => $course->uuid]) }}" class="detailcourse-btn" id="courseLink">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="#198754" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="text-center">No courses available</td>
                    </tr>
                @endforelse

            </tbody>
        </table>
    </div>

    <!-- Modal (Card) for Updating/Replying/Editing Comments -->
    <div class="modal fade" id="updateCommentModal" tabindex="-1" aria-labelledby="updateCommentModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateCommentModalLabel">
                        Update Comment
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form>
                        <!-- Row 1: Course Name, Reviewer Name -->
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="courseName" class="form-label fw-semibold">
                                    Course Name
                                </label>
                                <input type="text" class="form-control" id="courseName" name="courseName" />
                            </div>
                            <div class="col-md-6">
                                <label for="reviewerName" class="form-label fw-semibold">
                                    Reviewer Name
                                </label>
                                <input type="text" class="form-control" id="reviewerName" name="reviewerName" />
                            </div>
                        </div>

                        <!-- Row 2: Timestamp (Location) -->
                        <div class="mb-3">
                            <label for="timestampDetail" class="form-label fw-semibold">
                                Timestamp &amp; Location
                            </label>
                            <input type="text" class="form-control" id="timestampDetail" name="timestampDetail" />
                        </div>

                        <!-- Row 3: Review Details (Review Type, Severity, Category, Comment Type) -->
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <label for="reviewType" class="form-label fw-semibold">
                                    Review Type
                                </label>
                                <input type="text" class="form-control" id="reviewType" name="reviewType" />
                            </div>
                            <div class="col-md-3">
                                <label for="severity" class="form-label fw-semibold">
                                    Severity
                                </label>
                                <input type="text" class="form-control" id="severity" name="severity" />
                            </div>
                            <div class="col-md-3">
                                <label for="category" class="form-label fw-semibold">
                                    Category
                                </label>
                                <input type="text" class="form-control" id="category" name="category" />
                            </div>
                            <div class="col-md-3">
                                <label for="commentType" class="form-label fw-semibold">
                                    Comment Type
                                </label>
                                <input type="text" class="form-control" id="commentType" name="commentType" />
                            </div>
                        </div>

                        <!-- Comment History with Reply and Edit Options -->
                        <div class="mb-3">
                            <label class="form-label fw-semibold">
                                Comment History
                            </label>
                            <ul id="commentHistoryList" class="list-unstyled border rounded p-2">
                                <!-- Dynamically filled with each comment and Reply/Edit buttons -->
                            </ul>
                            <!-- style="height: 100px; overflow-y: auto;" -->
                        </div>

                        <!-- New/Edited Comment -->
                        <div class="mb-3">
                            <label for="newComment" class="form-label fw-semibold">
                                Author Comments (max 500 chars)
                            </label>
                            <textarea class="form-control" id="newComment" name="newComment" rows="3" maxlength="500"></textarea>
                        </div>

                        <!-- Status -->
                        <div class="mb-3">
                            <label for="statusSelect" class="form-label fw-semibold">
                                Status
                            </label>
                            <select class="form-select" id="statusSelect" name="statusSelect">
                                <option value="Open">Open</option>
                                <option value="Fixed">Fixed</option>
                                <option value="Re-Opened">Re-Opened</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <!-- Buttons -->
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-return me-2" id="modalUpdateBtn">
                                Update Comment
                            </button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    {{-- Update Course Model --}}
    <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="uploadCourseForm" action="{{ route('courses.upload') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="uploadModalLabel">Upload Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <label for="courseSelect" class="form-label">Course Name <span style="color: red;">*</span> </label>
                            <input type="text" class="form-control" name="course_name" id="course_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="courseSelect" class="form-label">Course Description</label>
                            <textarea class="form-control" name="course_description" id="course_description" rows="3" maxlength=""></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="courseSelect" class="form-label">Reviewer Name</label>
                            <select class="form-select" id="reviewerSelect" name="reviewer_id">
                                <option value="" selected="selected">Select Reviewer</option>
                                @foreach ($reviewers as $reviewer)
                                    <option value="{{ $reviewer->id }}">{{ $reviewer->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="courseFile" class="form-label">Select file (Upload ZIP File) <span style="color: red;">*</span> </label>
                            <input class="form-control" type="file" id="scorm_file" name="scorm_file" required
                                accept=".zip, .js, .html, .css, .json">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-green-gradient">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

     {{-- Edit Course Model --}}
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="editCourseForm" action="{{ route('courses.edit') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="courseid" id="courseid">
                        <div class="row mb-3">
                            <label for="courseSelect" class="form-label">Edit Course Name</label>
                            <input type="text" class="form-control" name="edit_course_name" id="edit_course_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="courseSelect" class="form-label">Edit Course Description</label>
                            <textarea class="form-control" name="edit_course_description" id="edit_course_description" rows="3" maxlength=""></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="courseSelect" class="form-label">Reviewer Name</label>
                            <select class="form-select" id="edit_reviewerSelect" name="reviewer_id">
                                <option value="" selected="selected">Select Reviewer</option>
                                @foreach ($reviewers as $reviewer)
                                    <option value="{{ $reviewer->id }}">{{ $reviewer->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="courseFile" class="form-label">Select file (Upload ZIP File)</label>
                            <input class="form-control" type="file" id="scorm_file" name="scorm_file"
                                accept=".zip, .js, .html, .css, .json">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-green-gradient">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src=" https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Bootstrap JS (with Popper) and Updated Script -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // 1) FILTERING
            const buttons = document.querySelectorAll(".navbar-nav .btn");
            const rows = document.querySelectorAll("#commentsTableBody tr");

            buttons.forEach((button) => {
                button.addEventListener("click", function() {
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
            const reviewerNameInput = document.getElementById("reviewerName");
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

            // Populate & show modal on "Update Comment" click (from table row)
            updateButtons.forEach((btn) => {
                btn.addEventListener("click", function() {
                    currentRow = this.closest("tr");
                    // Get row data
                    const course = currentRow.dataset.course;
                    const reviewer = currentRow.dataset.reviewer;
                    const timestamp = currentRow.dataset.timestamp;
                    const reviewType = currentRow.dataset.reviewtype;
                    const severity = currentRow.dataset.severity;
                    const category = currentRow.dataset.category;
                    const commentType = currentRow.dataset.commenttype;
                    const status = currentRow.dataset.status;

                    // Parse comment history JSON
                    try {
                        currentHistoryData = JSON.parse(currentRow.dataset.commenthistory);
                    } catch (e) {
                        currentHistoryData = [];
                    }

                    // Populate modal fields
                    courseNameInput.value = course || "";
                    reviewerNameInput.value = reviewer || "";
                    timestampDetailInput.value = timestamp || "";
                    reviewTypeInput.value = reviewType || "";
                    severityInput.value = severity || "";
                    categoryInput.value = category || "";
                    commentTypeInput.value = commentType || "";
                    statusSelect.value = status || "Open";
                    newCommentTextarea.value = "";
                    // Reset action to new comment mode
                    currentAction = "new";

                    // Build comment history list with Reply and Edit buttons (non-functional)
                    buildCommentHistoryList();

                    // Show modal
                    updateCommentModal.show();
                });
            });

            // Function to build the comment history list with non-functional reply/edit buttons
            function buildCommentHistoryList() {
                commentHistoryList.innerHTML = "";
                if (currentHistoryData.length === 0) {
                    commentHistoryList.innerHTML = "<li>No previous comments.</li>";
                } else {
                    currentHistoryData.forEach((item) => {
                        const li = document.createElement("li");
                        // Container for comment text
                        const commentDiv = document.createElement("div");
                        commentDiv.innerHTML =
                            `<div><p>${item.reviewer}</p><p>${item.text}</p></div><div>${item.date}</div>`;
                        commentDiv.className = "comment_history";
                        li.appendChild(commentDiv);

                        // Create non-functional Reply button
                        const replyBtn = document.createElement("button");
                        replyBtn.textContent = "Reply";
                        replyBtn.className = "btn btn-sm btn-green-gradient reply-btn comment_btn_pop";
                        replyBtn.style.marginLeft = "10px";
                        replyBtn.setAttribute("type", "button");
                        // No event listener attached, so it does nothing
                        li.appendChild(replyBtn);

                        // If the comment belongs to the current reviewer, add a non-functional Edit button
                        if (item.reviewer === reviewerNameInput.value) {
                            const editBtn = document.createElement("button");
                            editBtn.textContent = "Edit";
                            editBtn.className = "btn btn-sm btn-green-gradient reply-btn";
                            editBtn.style.marginLeft = "5px";
                            editBtn.setAttribute("type", "button");
                            // No event listener attached, so it does nothing
                            li.appendChild(editBtn);
                        }

                        commentHistoryList.appendChild(li);
                    });
                }
            }

            // Process the new/edited comment when the modal update button is clicked
            modalUpdateBtn.addEventListener("click", function() {
                const newText = newCommentTextarea.value.trim();
                if (newText === "") {
                    alert("Comment text cannot be empty.");
                    return;
                }
                const now = new Date();
                const formattedDate = now.toLocaleString();
                const currentUser = reviewerNameInput.value;

                // Append as a new comment (standalone)
                const newComment = {
                    date: formattedDate,
                    reviewer: currentUser,
                    text: newText,
                };
                currentHistoryData.push(newComment);

                // Update the row's dataset with the new comment history
                currentRow.dataset.commenthistory = JSON.stringify(currentHistoryData);

                // Update the table row's update-info fields
                const updateInfoDivs = currentRow.querySelectorAll(".update-info");
                if (updateInfoDivs.length >= 2) {
                    updateInfoDivs[0].textContent = "Last Updated on: " + formattedDate;
                    const lastCommentText = currentHistoryData[currentHistoryData.length - 1].text;
                    updateInfoDivs[1].textContent = "Last Comment: " + lastCommentText;
                }

                // Rebuild the comment history list to show updates
                buildCommentHistoryList();

                // Clear the textarea and reset action to new
                newCommentTextarea.value = "";
                currentAction = "new";

                // Close the modal (or keep it open if further updates are desired)
                updateCommentModal.hide();
            });

            // 3) Export to Excel Button (placeholder functionality)
            const exportExcelBtn = document.getElementById("exportExcelBtn");
            if (exportExcelBtn) {
                exportExcelBtn.addEventListener("click", function() {
                    alert("Export to Excel functionality not implemented.");
                });
            }
        });
    </script>
    <script>
        $(document).ready(function() {

            $('.header_thumb_link').click(function(event) {
                event.stopPropagation();
                //$(".header_menu_dropdown").slideToggle();
                $(this).parent().toggleClass("openMenupanel");

            });

            $(document).on('click', function(e) {
                if ($(e.target).closest(".menu_list").length === 0) {
                    $(".header_thumb_link").parent().removeClass("openMenupanel");
                }
            });
        });
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let courseId = this.getAttribute("data-id");
                    let courseName = this.getAttribute("data-name");
                    let courseDescription = this.getAttribute("data-description");
                    let reviewerId = this.getAttribute("data-reviewer");

                    // Set values in modal
                    document.getElementById("edit_course_name").value = courseName;
                    document.getElementById("edit_course_description").value = courseDescription;
                    document.getElementById("courseid").value = courseId;

                    // Select correct reviewer
                    let reviewerSelect = document.getElementById("edit_reviewerSelect");
                    for (let option of reviewerSelect.options) {
                        if (option.value == reviewerId) {
                            option.selected = true;
                            break;
                        }
                    }
                });
            });
        });

    </script>

    {{-- to copy the link of course --}}
    <script>
        function copyToClipboard(event) {
            event.preventDefault(); // Prevents default anchor behavior
            const linkElement = document.getElementById("courseLink");

            if (linkElement) { // Check if the element exists
                const modifiedLink = linkElement.href.replace("/author/", "/reviewer/"); // Replace "author" with "reviewer"

                navigator.clipboard.writeText(modifiedLink).then(() => {
                    alert("Link copied to clipboard");
                }).catch(err => {
                    console.error("Failed to copy: ", err);
                });
            } else {
                console.error("Error: Element with ID 'courseLink' not found.");
            }
        }
    </script>
</body>

</html>
