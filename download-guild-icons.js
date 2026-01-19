const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkcR7T-yWGic7AUh7ug936ov2ghpj3wLGUKYJxz7hlOErawt98xtvYW055lgFhoG9F9nmdWgjJMPzfi8Ju1i_HJybVFQwNK2YmFaJ5ypc-ifu2gxXqat66drhoEOrH7O7QKLKNY5zSfI5bZsymzzZeLJU2b-4Wgc6yJFCvNSMM-sXbtkTQKHk9N-u1k=w1280',
    filename: 'guild-druids.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkfdTsoj0hyfPaT_kGp-MreRMVbK5RG2KBHJovcPn0E0GpK1dw2_Ajuo_Jv8Qq-aK779McM70XrRJ9DiKX6-eEsK501rMXVxyEJkR0gs_o5ax30J4HMdoKGDWgOySyjnek6E_aAo78I2SAvCQJaS0tpix9MYOtQeUQz-b0Ipm4TP_HkXWHTMGZ7R4Jo=w1280',
    filename: 'guild-engineers.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkcTHn43uOziTlSLVqCvjxh94qvBk9twJ-XzDOCIPk97NxWPQP8eDh0PXn43p2_xgWLVWFAiMQXONUJ7kiaMPoYf8Idr5_atlfhct-mkYzofWm3RJ2Mo8OtpXITAEWNTZxRx89L1oicUvkLO09u1-_nLsLzUxSQx4kxtvmJmm4na9q4QSiA-hubtIFA=w1280',
    filename: 'guild-thieves.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkd3d8USRda8sFc0WHVIx0uQixgdJGxVKyZYBgZDE1ql-DLyHLI4dyhH5IWbmKkj4aTFnLp9sqZu-dpKOI-6rvGLombUgss_Y8QagD_32qApvnumEw0PPAGeFhxKGt2oOHpZeT2OuDzExaRmrcK2f7eLurHJcndTM6jvOzLk7us-irho-Ptt-jBO=w1280',
    filename: 'guild-wizards.png'
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${path.basename(filepath)}`);
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadAll() {
  for (const image of images) {
    const filepath = path.join(__dirname, 'assets', 'images', image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
}

downloadAll();
