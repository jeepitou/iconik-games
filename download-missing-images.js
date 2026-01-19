const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkdz_Y29E-HBzwgdDvKlInQITlAfgM5I07AH-MfxnbH2qVV07XNfeE5KTjLCcq1XCwe5Sa5Tsb32TrHMwtUn_ZE3QZUMEB9XR56bNI74nVJ54btoN_Le6QrOhvnqCAFUjlP_KdSSliMip2JMXKpuzGZkLjc17yX3vxgjPzJCPPg_SISPaeKvr8Umt4TE3B87R7xzl2HLIyTA3NlIuCKzX34Ngpro42sYfGVeUjk=w1280',
    filename: 'gameplay-deck.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkfwgrdmaqIyu3tRswvWPGTOfWPhoJZrIuFRlEjSKlrdpRdxmfQe_KmH0s7a__7ISjF3Q-JF87LnwBL0YOgMsHvGI2PYV1G1kKsY93wmcxUD0kNNyN9hsTAcTwbhX3FodPPvOk-7eWIrvWF8XtwDxbNjtLzP2anYDtcBuT5njImfIVOinxTkdoG02S515oYCk4gUZJvIWLH1AwVWUDHoEK5FSyBOE7BWC5Wp=w1280',
    filename: 'gameplay-board.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkepZpJ4zXYd1ByZ0_cZNGNeBP0rgOArzSzcTu6bV_dCPvFPthMHc9LQDZ1iW06pZJh9T8axgE4Z-042diPDGOZe7WfUUP1dJBpW1XbxkbR2RRkithXy0_1FvFacN2lQ_M5JWEEOV71N-ISn_Ro9WPmiYSZ90MaLFHnKxlzyOPM3mdSNBP-0cK5ENL8PvnqXTjJcZhwosn_If2JqvqmcRmLmur-S1hnQ4gZg=w1280',
    filename: 'team-eric.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkeQr3xeePCm0BUceaz5da_xgivxCGsSugUchCxgUUjd8yEQ_HT6yPcDwdlL1CjuiW3g_cG262C_TWSf69_C9jSuYVEjG781CMkgeXvRWD2kIal2tQvxXcCJIUfG90A8-1KuKupAAlpLl0RE_Z2Bikl7SdIz0WEAGwHfwTD5ElM_pmhRFdwT1g1Fl2t-mwrSNIE4QYyF6X1ZPZLS2z1TnT9HG0jpfDoNcNVX4qo=w1280',
    filename: 'team-julien.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/sitesv/AAzXCkelBKK2oQ4MCuu5UkWzTOs0oCPER01vGQjIZWuWtacaop1P_p8u2lgE1-ePkBUn2B8LmXLGFNSmCXS3YmbKJzftuV38P0PZCOyMarJfZprePSOzJCODNhEOXw3nsESQUEVJS2a_F7zNwHMPoVhTI493et38PDye8gJ5KXpz32BLUugBKJfEbwHKDtF43FHjglnxFXsYuKRpPJKH32BE5BeVfhH27AfFn4U9=w1280',
    filename: 'team-charles.jpg'
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
