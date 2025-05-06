const video = document.getElementById('video');
const canvas = document.createElement('canvas');  // Create canvas programmatically
const context = canvas.getContext('2d');
const filterSelect = document.getElementById('filter');
const captureBtn = document.getElementById('capture');
const downloadLink = document.getElementById('download');
const capturedPhoto = document.getElementById('captured-photo');

// Set up webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      // Update the canvas dimensions to match the video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };
  })
  .catch(err => {
    console.error('Error accessing webcam: ', err);
    alert("Webcam access denied or not available.");
  });

// Apply filter
filterSelect.addEventListener('change', () => {
  const value = filterSelect.value;
  video.style.filter = value;
});

// Capture image
captureBtn.addEventListener('click', () => {
  // Apply the filter to the canvas
  context.filter = filterSelect.value;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Set the captured photo to the image element
  capturedPhoto.src = canvas.toDataURL('image/png');

  // Enable the download link
  downloadLink.href = canvas.toDataURL('image/png');
});
