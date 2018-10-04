 function updateOnlineStatus(event) {
    debugger;
    var connected = navigator.onLine ? "online" : "offline";
    const legend = document.getElementById("network-aware");
    if (connected == 'offline'){
      legend.innerHTML = "disconnected";
      legend.setAttribute('aria-label',"currently diconnected from internet");
      legend.className = 'disconnected';
      legend.focus();
      DBHelper.network = false;
    }else{
      legend.innerHTML = "connected";
      legend.className = "connected";
      legend.setAttribute('aria-label',"currently connected to internet");      
      DBHelper.network = true;
      legend.focus();      
      DBHelper.pendingReview();
    }
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);