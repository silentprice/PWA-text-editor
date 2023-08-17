// Import the button element
const installButton = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior of the event
  event.preventDefault();
  
  // Store the event for later use
  deferredPrompt = event;
  
  // Show the "Install" button
  installButton.style.display = 'block';
});

// Implement a click event handler on the `installButton` element
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    
    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    // Check the user's choice
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferred prompt
    deferredPrompt = null;
    
    // Hide the "Install" button
    installButton.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed!', event);
  alert('Thank you for installing our App!');
});
