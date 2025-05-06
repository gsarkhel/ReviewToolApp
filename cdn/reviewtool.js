function reviewToolClass(access_token, course_uuid, add_comment) {
  let commentWindow = null;
  // ================================
  if (add_comment === 'true') {
    const revTool = document.getElementById('revTool');
    revTool.replaceChildren();
    const pencil = document.createElement('div');
    pencil.classList.add('pencilbutton');
    pencil.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    revTool.append(pencil);
    revTool.style.visibility = 'visible';
    revTool.addEventListener('click', openComment);
  }
  // ================================
  // EVENTS
  // ================================
  function openComment(event) {
    fnAudioVideoPause(true); // Pause the video when opening the comment box
    const channel = new BroadcastChannel('my_channel');
    commentWindow = window.open(
      'https://mlcoursereviewtool.mediantlabs.com/public/reviewer/add_comment',
      'viewCommentsTab'
    );
    sendDataToFrame();
  }
  // ================================
  window.addEventListener('message', (event) => {
    if (event.data.type === 'getData') {
      sendDataToFrame();
    } else if (event.data.type === 'closewin') {
      closeComment();
    }
  });
  // ================================
  function sendDataToFrame() {
    const pageNo = currPageNum;
    const moduleName = document.querySelector('.moduleName').innerHTML;
    console.log(
      'sendDataToFrame',
      `{"access_token": "${access_token}", "course_uuid": "${course_uuid}", "moduleNo":"${currModule}", "moduleName":"${moduleName}", "pageNo": "${pageNo}"}`
    );
    commentWindow &&
      commentWindow.postMessage(
        {
          type: 'fromCourse',
          text: `{"access_token": "${access_token}", "course_uuid": "${course_uuid}", "moduleNo":"${currModule}", "moduleName":"${moduleName}", "pageNo": "${pageNo}"}`,
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
  if (params.access_token !== null) {
    reviewToolClass(
      params.access_token,
      params.course_uuid,
      params.add_comment
    );
  }

  // // OPEN THE BELOW SECTION ONLY FOR DEV PURPOSE
  // reviewToolClass(
  //   '9|Ckhb6IXr2o9fV48QU3IIiQVDWXUdzHYD49f2uc9O31a30f92',
  //   'yNPDnOPkgJxJqjwF',
  //   'true'
  // );
  // ========================
}
window.addEventListener('load', connector);
