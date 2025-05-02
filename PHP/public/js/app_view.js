function init() {
  // Request data from parent
  window.parent.postMessage({ type: 'getData', text: '' }, '*');

  // Listen for the response
  window.addEventListener('message', (event) => {
      try {
          const data = event.data.text;
          const dataObj = typeof data === 'string' ? JSON.parse(data) : data;

          // console.log('Received Data:', dataObj);

          // Set hidden input values
          document.getElementById('access_token').value = dataObj.access_token || '';
          document.getElementById('course_uuid').value = dataObj.course_uuid || '';
          document.getElementById('pageNo').value = dataObj.pageNo || '';
          document.getElementById('moduleName').value = dataObj.moduleName || '';


          // Show loader before form submit
          document.getElementById('loader').style.display = 'flex';

          // Small delay ensures DOM updates before submission
          setTimeout(() => {
              document.getElementById('autoSubmitForm').submit();
          }, 100);
      } catch (error) {
          console.error('Error parsing message data:', error);
      }
  });
}

window.addEventListener('load', init);
