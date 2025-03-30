function init() {
  // const commentlist = document.getElementById("commentlist");
  const gtd = document.getElementById('gtd');
  // gtd.innerHTML = '';
  gtd.addEventListener('click', () => {
    window.parent.postMessage(
      { type: 'getData', text: '' }, // Message data
      '*' // Allowed domain (use "*" to allow all, but it's unsafe)
    );
  });
  // ===================================
  window.addEventListener('message', (event) => {
    // if (event.origin !== 'https://parent-site.com') {
    //   console.warn('Blocked message from untrusted origin:', event.origin);
    //   return;
    // }
    console.log('Received message child:', JSON.parse(event.data.text)); // Process the message
  });
}

window.addEventListener('load', init);
