 function updateOnlineStatus(event) {
    debugger;
    var connected = navigator.onLine ? "online" : "offline";
    const legend = document.getElementById("network-aware");
    if (connected == 'offline'){
      legend.innerHTML = "disconnected";
      legend.setAttribute('aria-label',"currently diconnected from internet");
      legend.className = 'disconnected';false
      alert('currently diconnected from internet');
      DBHelper.network = false;
    }else{
      legend.innerHTML = "connected";
      legend.className = "connected";true
      legend.setAttribute('aria-label',"currently connected to internet");5
      DBHelper.network = true;4
      alert("currently connected to internet");3
      debugger;
      DBHelper.pendingReview(addReviewToExistingList);2
    }
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);