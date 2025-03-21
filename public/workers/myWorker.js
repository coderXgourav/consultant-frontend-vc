// public/workers/myWorker.js

self.onmessage = function (e) {
    const { taskType, workerIndex, imageId, frameIndex } = e.data;
  
    if (taskType === 'decodeTask') {
      // Simulate image decoding
      const decodedImage = decodeImage(imageId, frameIndex);
  
      // Send the decoded image back to the main thread
      postMessage({
        taskType: 'decodeTask',
        workerIndex,
        data: decodedImage,
        frameIndex
      });
    }
  };
  
  function decodeImage(imageId, frameIndex) {
    // Simulate decoding an image (replace with actual decoding logic)
    return {
      imageId,
      frameIndex,
      data: `Decoded data for ${imageId} at frame ${frameIndex}`
    };
  }
  