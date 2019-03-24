function askForPermission() {
  window.addEventListener("load", function() {
    // At first, let's check if we have permission for notification
    // If not, let's ask for it
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
          createNotification(
            "Todolist",
            "You can now receive notifications on your device"
          );
        }
      });
    }
  });
}

// function for creating the notification
function createNotification(title, message) {
  // Let's check if the browser supports notifications

  // Let's check if the user is okay to get some notification
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification

    var img = "/assets/icons/apple-touch-icon.png";
    var text = message;
    var notification = new Notification(title, {
      body: text,
      icon: img,
      badge: "/assets/icons/android-chrome-512x512.png",
      timestamp: Date.now()
      // actions: [
      //   {
      //     action: "coffee-action",
      //     title: "Coffee",
      //     icon: "/images/demos/action-1-128x128.png"
      //   },
      //   {
      //     action: "doughnut-action",
      //     title: "Doughnut",
      //     icon: "/images/demos/action-2-128x128.png"
      //   }
      // ]
    });

    window.navigator.vibrate(500);
  }

  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if (!("permission" in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var img = "/assets/icons/apple-touch-icon.png";
        var text = message;
        var notification = new Notification("Todolist", {
          body: text,
          icon: img
        });

        window.navigator.vibrate(500);
      }
    });
  }
}

export { askForPermission, createNotification };
