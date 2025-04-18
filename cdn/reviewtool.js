function reviewToolClass(access_token, course_uuid, add_comment) {
  // ================================
  const reviewToolLightBox = document.createElement('div');
  reviewToolLightBox.setAttribute('class', 'reviewToolLightBox');
  document.querySelector('body').append(reviewToolLightBox);
  // ================================
  const reviewToolWrapper = document.createElement('div');
  reviewToolWrapper.setAttribute('class', 'reviewToolWrapper');
  document.querySelector('body').append(reviewToolWrapper);

  // function createButton(text, id, holder) {
  //   const button = document.createElement('div');
  //   button.setAttribute('id', id);
  //   button.setAttribute('class', 'commbutton');
  //   holder.append(button);
  //   button.addEventListener('click', butnEvent);
  //   // -----------
  //   const buttonTxt = document.createElement('div');
  //   buttonTxt.innerText = text;
  //   buttonTxt.setAttribute('class', 'commbuttontext');
  //   button.append(buttonTxt);
  //   return button;
  // }
  // // ================================
  if (add_comment === 'true') {
    const revTool = document.getElementById('revTool');
    revTool.style.visibility = 'visible';
    revTool.addEventListener('click', openComment);
  }
  // ================================
  // ================================
  const framePanel = document.createElement('div');
  framePanel.setAttribute('class', 'framePanel');
  reviewToolWrapper.append(framePanel);
  // ================================
  const iframePanel = document.createElement('iframe');
  iframePanel.setAttribute('class', 'iframePanel');
  iframePanel.setAttribute('src', 'https://mlcoursereviewtool.mediantlabs.com/public/api/add_comment');
  framePanel.append(iframePanel);
  // ================================
  const closeBtn = document.createElement('div');
  closeBtn.setAttribute('id', 'closebtn');
  closeBtn.innerText = 'X';
  reviewToolWrapper.append(closeBtn);
  closeBtn.addEventListener('click', closeComment);
  // ================================
  // EVENTS
  // ================================
  function openComment(event) {
    reviewToolLightBox.classList.add('show');
    reviewToolWrapper.classList.add('show');
  }
  // ================================
  function closeComment(event) {
    reviewToolLightBox.classList.remove('show');
    reviewToolWrapper.classList.remove('show');
  }
  // ================================
  // ================================
  window.addEventListener('message', (event) => {
    if (('Received message parent:', event.data.type === 'getData')) {
      sendDataToFrame();
    }
  });
  // ================================
  function sendDataToFrame() {
    const pageNo = `${
      document.querySelector('.pgNum').innerHTML.split('/')[0].split(':')[1]
    }`;
    const moduleName = document.querySelector('.moduleName').innerHTML;
    iframePanel.contentWindow.postMessage(
      {
        type: 'fromCourse',
        text: `{"access_token": "${access_token}", "course_uuid": "${course_uuid}", "moduleName":"${moduleName}", "pageNo": "${pageNo}", "selected": "${currentSelectedButton}"}`,
      }, // Message data
      '*' // Allowed domain (use "*" to allow all, but it's unsafe)
    );
  }
}

function connector() {
  const params = new Proxy(
    new URLSearchParams(window.top.opener.location.search),
    {
      get: (searchParams, prop) => searchParams.get(prop),
    }
  );
  // if (params.access_token !== null) {
  //   reviewToolClass(
  //     params.access_token,
  //     params.course_uuid,
  //     params.add_comment
  //   );
  // }

  // OPEN THE BELOW SECTION ONLY FOR DEV PURPOSE
  reviewToolClass(
    '9|Ckhb6IXr2o9fV48QU3IIiQVDWXUdzHYD49f2uc9O31a30f92',
    'yNPDnOPkgJxJqjwF',
    'true'
  );
  // ========================
}
window.addEventListener('load', connector);
