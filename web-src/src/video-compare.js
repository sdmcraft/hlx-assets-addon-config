
function getDeviceSpecificVideoUrl(videoUrl) {
    const { userAgent } = navigator;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isSafari = (/Safari/i).test(userAgent) && !(/Chrome/i).test(userAgent) && !(/CriOs/i).test(userAgent) && !(/Android/i).test(userAgent) && !(/Edg/i).test(userAgent);

    const manifest = (isIOS || isSafari) ? 'manifest.m3u8' : 'manifest.mpd';
    return videoUrl.replace(/manifest\.mpd|manifest\.m3u8|play/, manifest);
}

window.addEventListener('DOMContentLoaded', () => {

    // Read video urls from request params
    const urlParams = new URLSearchParams(window.location.search);
    const manifestUrl = urlParams.get('manifestUrl');
    const mp4Url = urlParams.get('mp4Url');
    if (manifestUrl) {
        document.getElementById('manifestUrl').value = manifestUrl;
    }
    if (mp4Url) {
        document.getElementById('mp4Url').value = mp4Url;
    }


    document.getElementById('playButton').addEventListener('click', () => {

        if (document.getElementsByTagName('video-js').length > 0) {
            document.getElementsByTagName('video-js')[0].remove();
        }
        if (document.getElementsByTagName('video').length > 0) {
            document.getElementsByTagName('video')[0].remove();
        }

        const videojsManifestPlayer = document.createElement('video-js');
        const rand = Math.floor(Math.random() * 1000);
        videojsManifestPlayer.id = `videojs-manifest-player-${rand}`;
        const source = document.createElement('source');
        const manifestUrl = getDeviceSpecificVideoUrl(document.getElementById('manifestUrl').value);
        source.setAttribute('src', manifestUrl);
        videojsManifestPlayer.appendChild(source);
        manifestPlayerPanel.appendChild(videojsManifestPlayer);
        const videojsManifestPlayerObj = videojs(`videojs-manifest-player-${rand}`, {
            controls: true,
            autoplay: false,
            preload: 'auto',
        });


        const progressivePlayer = document.createElement('video');
        progressivePlayer.controls = true;
        progressivePlayer.preload = 'auto';
        const source2 = document.createElement('source');
        source2.setAttribute('src', document.getElementById('mp4Url').value);
        source2.setAttribute('type', 'video/mp4');
        progressivePlayer.appendChild(source2);
        progressivePlayerPanel.appendChild(progressivePlayer);

        setTimeout(() => {
            videojsManifestPlayerObj.play();
            progressivePlayer.play();
        }, 1000);
    });

});
