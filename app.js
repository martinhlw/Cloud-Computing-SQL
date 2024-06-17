document.getElementById('imageUpload').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    // Display selected image
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    document.body.appendChild(img);

    // Load the TFLite model from local path
    const modelPath = 'best_model.tflite';
    try {
        const model = await tflite.loadTFLiteModel(modelPath);
        console.log('Model loaded successfully');
        
        // Preprocess the image
        const tensor = await preprocessImage(img, 224, 224);
        console.log('Image preprocessed successfully');

        // Run inference
        const outputTensor = model.predict(tensor);
        const outputData = outputTensor.dataSync();
        const predictedIndex = outputData.indexOf(Math.max(...outputData));

        // Map index to label
        const labels = [
            'ayam bakar', 'ayam goreng', 'bakso', 'bakwan', 'batagor',
            'bihun', 'capcay', 'gado-gado', 'ikan goreng', 'kerupuk',
            'martabak telur', 'mie', 'nasi goreng', 'nasi putih',
            'nugget', 'opor ayam', 'pempek', 'rendang', 'roti',
            'sate', 'sosis', 'soto', 'steak', 'tahu', 'telur',
            'tempe', 'terong balado', 'tumis kangkung', 'udang'
        ];
        const predictedLabel = labels[predictedIndex];

        // Display result
        document.getElementById('result').innerText = `Predicted label: ${predictedLabel}`;
        console.log(`Predicted label: ${predictedLabel}`);
    } catch (error) {
        console.error('Error loading or running the model:', error);
    }
});

async function preprocessImage(img, targetWidth, targetHeight) {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const tensor = tf.browser.fromPixels(imageData).toFloat().expandDims(0);
    console.log('Tensor:', tensor);
    return tensor;
}
