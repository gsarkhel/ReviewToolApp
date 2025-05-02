function init() {
  const pageNo = document.getElementById('pageNo');
  const moduleName = document.getElementById('moduleName');
  const access_token = document.getElementById('access_token');
  const course_uuid = document.getElementById('course_uuid');
  window.opener.postMessage(
    { type: 'getData', text: '' }, // Message data
    '*' // Allowed domain (use "*" to allow all, but it's unsafe)
  );
  // ===================================
  window.addEventListener('message', (event) => {
    // if (event.origin !== 'https://parent-site.com') {
    //   console.warn('Blocked message from untrusted origin:', event.origin);
    //   return;
    // }
    console.log('Received message child:', event.data); // Process the message
    const dataObj = JSON.parse(event.data.text);
    console.log(dataObj);
    pageNo.innerText = dataObj.pageNo;
    moduleName.innerText = dataObj.moduleName;
    document.getElementById('view_comments').setAttribute('href',"http://reviewtool.aqbstaging.com/reviewtool-olive/public/reviewer/view_comments/"+dataObj.course_uuid+"?_token="+dataObj.access_token+"9&show=screen&status=all&module_no="+dataObj.moduleName.replace('/\s/g',"+")+"&page_no="+dataObj.pageNo+"");


    // Set hidden inputs for access_token and course_uuid
    if (dataObj.access_token) access_token.value = dataObj.access_token;
    if (dataObj.course_uuid) course_uuid.value = dataObj.course_uuid;
  });
}

window.addEventListener('load', init);

function validateForm(event) {
  const checkboxes = document.querySelectorAll(
    'input[name="category"]:checked'
  );
  if (checkboxes.length === 0) {
    alert('Please select at least one category.');
    event.preventDefault();
  }
}