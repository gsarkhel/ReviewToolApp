function reviewToolClass(access_token, course_uuid, add_comment) {
  let currentSelectedButton = '';
  // ================================
  const reviewToolLightBox = document.createElement('div');
  reviewToolLightBox.setAttribute('class', 'reviewToolLightBox');
  document.querySelector('body').append(reviewToolLightBox);
  // ================================
  const reviewToolWrapper = document.createElement('div');
  reviewToolWrapper.setAttribute('class', 'reviewToolWrapper');
  document.querySelector('body').append(reviewToolWrapper);
  // ================================
  function createButton(text, id, holder) {
    const button = document.createElement('div');
    button.setAttribute('id', id);
    button.setAttribute('class', 'commbutton');
    holder.append(button);
    button.addEventListener('click', butnEvent);
    // -----------
    const buttonTxt = document.createElement('div');
    buttonTxt.innerText = text;
    buttonTxt.setAttribute('class', 'commbuttontext');
    button.append(buttonTxt);
    return button;
  }
  // ================================
  const closeBtn = createButton('X', 'closeBtn', reviewToolWrapper);
  if (add_comment === 'true') {
    const addComBtn = createButton(
      'Add Comment',
      'addComBtn',
      reviewToolWrapper
    );
  }
  const viewComBtn = createButton(
    'View Comment',
    'viewComBtn',
    reviewToolWrapper
  );
  // ================================
  // ================================
  const framePanel = document.createElement('div');
  framePanel.setAttribute('class', 'framePanel');
  reviewToolWrapper.append(framePanel);
  // ================================
  // ================================
  const iframePanel = document.createElement('iframe');
  iframePanel.setAttribute('class', 'iframePanel');
  framePanel.append(iframePanel);
  // ================================
  // EVENTS
  // ================================
  function butnEvent(event) {
    currentSelectedButton = event.currentTarget.getAttribute('id');

    const elements = document.querySelectorAll('.commbutton');
    elements.forEach((element) => {
      element.classList.remove('selected');
    });

    if (currentSelectedButton === 'closeBtn') {
      reviewToolLightBox.classList.remove('show');
      reviewToolWrapper.classList.remove('opened');
      closeBtn.classList.remove('show');
    } else {
      if (currentSelectedButton === 'addComBtn') {
        iframePanel.setAttribute(
          'src',
          //'http://reviewtool.aqbstaging.com/course_upload/ReviewToolApp/index.html'
          'https://mlcoursereviewtool.mediantlabs.com/public/api/add_comment'
        );
      } else {
        iframePanel.setAttribute(
          'src',
          //'http://reviewtool.aqbstaging.com/course_upload/ReviewToolApp/index.html'
          'https://mlcoursereviewtool.mediantlabs.com/public/api/view_comment'
        );
      }
      reviewToolLightBox.classList.add('show');
      reviewToolWrapper.classList.add('opened');
      closeBtn.classList.add('show');
      const target = event.currentTarget;
      target.classList.add('selected');
    }
    // ================================
    sendDataToFrame();
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
    const pageNo = `Page ${
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
  // const access_token = params.access_token;
  // const course_uuid = params.course_uuid;
  if (params.access_token !== null) {
    reviewToolClass(
      params.access_token,
      params.course_uuid,
      params.add_comment
    );
  }
}
window.addEventListener('load', connector);
