
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Review Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-size: 14px;
            background-color: #ffffff;
            margin: 0;
            padding: 5px;
        }
        .form-control,
        .form-select,
        .form-check-label {
            font-size: 14px;
        }
        .container {
            border: 5px solid #eaf7f5;
            max-width: 550px;
        }
        .form-container {
            background-color: #eaf7f5;
            padding: 15px;
            border: none;
        }
        .btn {
            padding: 6px 12px;
            font-size: 14px;
        }
        .form-check {
            margin-bottom: 4px;
        }
        .required-star {
            color: red;
        }
        .category-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
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
        .submitBtn{
            width: 150px;
            background: linear-gradient(to top, #1b9d71, #3c7e83);
        }
        .form-control, .form-select {
            width: 100% !important;
        }
        label.form-label.me-2 {
            width: 100px;
        }
        .btn-gradient {
            background: linear-gradient(to right, #1b9d71, #3c7e83);
            color: #DCDEE4 !important;
            border: none;
            font-size: 14px;
            padding: 8px 10px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            transition: opacity 0.3s ease-in-out;
            text-align: center;
            width: 200px; /* Fixed width for uniform size */
            margin: 0 12px;
    }
    .btn-gradient:hover {
      background: linear-gradient(to right, #1DAA58, #00669B);
      opacity: 0.9;
    }

    </style>
</head>
<body>
    <div class="container p-0 rounded">
        <div class="logo-bar d-flex">
            <div class="container-fluid">
            <img src="{{ asset('images/Logo.png') }}" alt="Client Logo" />
            </div>
            {{-- {{ route('reviewer.view_comments', ['id' => $course->id]) }} --}}
            <a id="view_comments" href="" class="btn btn-gradient" style="width: 200px;">View Comments</a>
        </div>
        <div class="form-container">
            <h5 class="mb-3">Add Comment</h5>
            <form id="commentForm" enctype="multipart/form-data">
                @csrf
                <input type="hidden" id="access_token" name="access_token" value="{{ $accessToken ?? '' }}">
                <input type="hidden" id="course_uuid" name="course_uuid" value="{{ $courseUuid ?? '' }}">

                <div class="mb-2 d-flex align-items-center">
                    <label class="form-label me-2">Screen No.:</label>
                    <span id="pageNo" name="pageNo" class="form-label w-auto">1</span>
                </div>

                <div class="mb-2 d-flex align-items-center">
                    <label class="form-label me-2">Module Name:</label>
                    <span id="moduleName" name="moduleName" class="form-label w-auto">1</span>
                </div>

                <div class="mb-2 d-flex align-items-center">
                    <label for="timestamp" class="form-label me-2">Time Stamp:</label>
                    <input type="text" class="form-control w-auto" id="timestamp" name="timestamp" placeholder="00:00">
                </div>

                <div class="mb-2 d-flex align-items-center">
                    <label for="review-type" class="form-label me-2">Review Type:</label>
                    <select class="form-select w-auto" id="review-type">
                        <option>Learning Manager</option>
                        <option selected>PM</option>
                        <option>SME</option>
                        <option>Technical</option>
                    </select>
                </div>

                <div class="mb-2 d-flex align-items-center">
                    <label for="severity" class="form-label me-2">Severity:</label>
                    <select class="form-select w-auto" id="severity">
                        <option>Low</option>
                        <option>Medium</option>
                        <option selected>High</option>
                    </select>
                </div>

                <hr>

                <div class="mb-2">
                    <label class="form-label">Category: <span class="required-star">*</span></label>
                    <div class="category-grid">
                        @foreach(['Audio', 'Content', 'Edit', 'Functionality', 'Graphics', 'ID', 'Video'] as $cat)
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="category[]" value="{{ $cat }}" id="{{ strtolower($cat) }}">
                                <label class="form-check-label" for="{{ strtolower($cat) }}">{{ $cat }}</label>
                            </div>
                        @endforeach
                    </div>
                </div>

                <hr>

                <div class="mb-2 row g-2 d-flex align-items-center">
                    <div class="col d-flex align-items-center">
                        <label for="comment-type" class="form-label me-2">Comment Type:</label>
                        <select class="form-select w-auto" id="comment-type">
                            <option>Change</option>
                            <option>Defect</option>
                            <option>Question</option>
                            <option>Suggestion</option>
                        </select>
                    </div>
                    <div class="col d-flex align-items-center">
                        <label for="comment-status" class="form-label me-2">Comment Status:</label>
                        <span class="form-label w-auto">Open</span>
                    </div>
                </div>            

                <div class="mb-2">
                    <label for="comment" class="form-label">Comment: <span style="color: red">*</span></label>
                    <textarea class="form-control" id="comment" name="comment" rows="4" maxlength="10000" required></textarea>
                    <small id="wordCount">10000 characters left</small>
                </div>

                <div class="mb-2">
                    <label for="document" class="form-label">Upload Document:</label>
                    <input type="file" class="form-control" id="document" name="document">
                </div>

            </form>
            <div class="d-flex mt-3">
                <button type="button" class="btn btn-primary mx-auto submitBtn" id="submitBtn">Save</button>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>

        function refreshPageB(courseUUID,module,page) {
            window.open("http://reviewtool.aqbstaging.com/reviewtool-olive/public/reviewer/view_comments/"+courseUUID+"?_token={{csrf_token()}}9&show=screen&status=all&module_no="+module.replace('/\s/g',"+")+"&page_no="+page+"","_self");
        }

        document.addEventListener("DOMContentLoaded", function () {

            const textarea = document.getElementById("comment");
            const wordCount = document.getElementById("wordCount");

            // Word counter update
            textarea.addEventListener("input", function () {
                wordCount.textContent = `${10000 - textarea.value.length} characters left`;
            });

            // $('#view_comments').attr('href','asdf')

            document.getElementById("submitBtn").addEventListener("click", function () {
                const accessToken = document.getElementById("access_token").value;
                const courseUUID = document.getElementById("course_uuid").value;
                const pageNo = document.getElementById("pageNo").innerText;
                const moduleName = document.getElementById("moduleName").innerText;
                const timestamp = document.getElementById("timestamp").value;
                const reviewType = document.getElementById("review-type").value;
                const severity = document.getElementById("severity").value;
                const commentType = document.getElementById("comment-type").value;
                // const commentStatus = document.getElementById("comment-status").value;
                const comment = document.getElementById("comment").value;
                const documentFile = document.getElementById("document").files[0];

                // Get selected categories
                let categories = [];
                document.querySelectorAll('input[name="category[]"]:checked').forEach((checkbox) => {
                    categories.push(checkbox.value);
                });

                // Validate
                if (categories.length === 0) {
                    alert("Please select at least one category.");
                    return;
                }

                if (comment === "") {
                    alert("Comment is required.");
                    return;
                }

                let formData = new FormData();
                formData.append("access_token", accessToken);
                formData.append("course_uuid", courseUUID);
                formData.append("page_no", pageNo);
                formData.append("module_name", moduleName);
                formData.append("timestamp", timestamp);
                formData.append("review_type", reviewType);
                formData.append("severity", severity);
                formData.append("comment_type", commentType);
                // formData.append("status", commentStatus);
                formData.append("comment", comment);
                // Append each category to formData
                categories.forEach((cat, index) => {
                    formData.append("category[]", cat); // <-- this is important!
                });

                if (documentFile) {
                    formData.append("document", documentFile);
                }

                fetch("{{ url('api/submit-comment') }}", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // If you're using token-based auth
                    },
                })
                .then(response => response.json())
                .then(data => {
                    alert("Comment submitted successfully!");
                    window.parent.postMessage({ type: 'closewin', text: '' }, '*');
                    document.getElementById("commentForm").reset();
                    wordCount.textContent = "10000 characters left";
                    refreshPageB(courseUUID,moduleName,pageNo);
                })
                .catch(error => {
                    console.error("Error submitting form:", error);
                    alert("Failed to submit comment.");
                });
            });
        });
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>