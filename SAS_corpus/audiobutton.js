// This script replace all <audio> tags by play/pause buttons
// NOTES:
// 1. This script assumes that all the audio files are .wav files, so it always checks if the browser can play.wav file first.
// 2. Only one file can be played at the same time: starting one file will stop all others.

$(function () {
    var playButton = 'play.png';
    var stopButton = 'stop.png';

    var myAudio = document.createElement('audio');
    myAudio.onended = function () {
        $('a.audio').each(function (index, item) {
            $(item).html('<img class="imgButton" src="' + playButton + '" />');
        });
    };
    if (!myAudio.canPlayType('audio/wav')) {
        // Browser does not support playing .wav file => Replace by download text
        $('audio').each(function (index, item) {
            $(item).replaceWith('<a href="' + item.src + '" target="_blank"><img class="imgButton" src="' + playButton + '" /></a>');
        });
    } else {
        // Browser supports playing .wav file => Add working play buttons
        $('audio').each(function (index, item) {
            $(item).replaceWith('<a class="audio" href="' + item.src + '" target="_blank"><img class="imgButton" src="' + playButton + '" /></a>');
        });

        $('a.audio').click(function (e) {
            e.preventDefault();

            var tag = eval('this');
            var jtag = $(tag);
            console.log(jtag.html());
            if (jtag.html().indexOf(playButton) >= 0) {
                $('a.audio').each(function (index, item) {
                    $(item).html('<img class="imgButton" src="' + playButton + '" />');
                });
                jtag.html('<img class="imgButton" src="' + stopButton + '" />');

                myAudio.src = tag.href;
                myAudio.play();
            } else {
                jtag.html('<img class="imgButton" src="' + playButton + '" />');
                myAudio.pause();
            }
        });
    }
});
