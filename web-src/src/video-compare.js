
function getDeviceSpecificVideoUrl(videoUrl) {
    // const { userAgent } = navigator;
    // const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    // const isSafari = (/Safari/i).test(userAgent) && !(/Chrome/i).test(userAgent) && !(/CriOs/i).test(userAgent) && !(/Android/i).test(userAgent) && !(/Edg/i).test(userAgent);

    // const manifest = (isIOS || isSafari) ? 'manifest.m3u8' : 'manifest.mpd';
    const manifest = 'manifest.mpd'; // Always use DASH for now
    return videoUrl.replace(/manifest\.mpd|manifest\.m3u8|play/, manifest);
}

function setupVJS(manifestUrl) {
    if (document.getElementsByTagName('video-js').length > 0) {
        document.getElementsByTagName('video-js')[0].remove();
    }
    const videojsManifestPlayer = document.createElement('video-js');
    const rand = Math.floor(Math.random() * 1000);
    videojsManifestPlayer.id = `videojs-manifest-player-${rand}`;
    const manifestPlayerPanel = document.getElementById('manifestPlayerPanel');
    manifestPlayerPanel.appendChild(videojsManifestPlayer);
    const videojsManifestPlayerObj = videojs(`videojs-manifest-player-${rand}`, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        muted: true,
        html5: {
            dash: {
                limitRenditionByPlayerDimensions: true
            }
        }
    });

    videojsManifestPlayerObj.ready(function() {
        videojsManifestPlayerObj.src({
            src: manifestUrl,
            type: 'application/dash+xml'
        });
    });
    videojsManifestPlayerObj.on('loadedmetadata', function() {
        var tracks = videojsManifestPlayerObj.dash.mediaPlayer.getTracksFor('video');
        var bestTrack = tracks.reduce((prev, current) => (prev.bandwidth > current.bandwidth) ? prev : current);
        if (bestTrack) {
            videojsManifestPlayerObj.dash.mediaPlayer.setInitialMediaSettingsFor('video', {
                id: bestTrack.id
            });
        }
    });

    return videojsManifestPlayerObj;
}

function setupProgressivePlayer(mp4Url) {
    if (document.getElementsByTagName('video').length > 0) {
        document.getElementsByTagName('video')[0].remove();
    }
    const progressivePlayer = document.createElement('video');
    progressivePlayer.controls = true;
    progressivePlayer.preload = 'auto';
    progressivePlayer.muted = true;
    const source = document.createElement('source');
    source.setAttribute('src', mp4Url);
    source.setAttribute('type', 'video/mp4');
    progressivePlayer.appendChild(source);
    const progressivePlayerPanel = document.getElementById('progressivePlayerPanel');
    progressivePlayerPanel.appendChild(progressivePlayer);
    return progressivePlayer;
}

window.addEventListener('DOMContentLoaded', () => {
    // Read video urls from request params
    const urlParams = new URLSearchParams(window.location.search);
    const manifestUrlParam = urlParams.get('manifestUrl');
    const mp4UrlParam = urlParams.get('mp4Url');
    if (manifestUrlParam) {
        document.getElementById('manifestUrl').value = manifestUrlParam;
    }
    if (mp4UrlParam) {
        document.getElementById('mp4Url').value = mp4UrlParam;
    }

    document.getElementById('playButton').addEventListener('click', () => {
        const progressivePlayer = setupProgressivePlayer(document.getElementById('mp4Url').value);
        const videojsManifestPlayerObj = setupVJS(getDeviceSpecificVideoUrl(document.getElementById('manifestUrl').value));
        setTimeout(() => {
            videojsManifestPlayerObj.play();
            progressivePlayer.play();
        }, 1000);
    });

});
