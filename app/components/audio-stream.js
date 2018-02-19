import Ember from 'ember';
import ENV from '../config/environment';
import fetch from 'fetch';
import dashjs from 'npm:dashjs';

export default Ember.Component.extend({
  stream: Ember.computed('params.[]', function(){
    return this.get('params')[0];
  }),
  player: null,
  mediaSourceSupported: true,
  init() {
    this._super(...arguments);
    this.set('player', dashjs.MediaPlayer().create());
    this.get('player').getDebug().setLogToBrowserConsole(ENV.APP.MEDIA_PLAYER_DEBUG);
    this.get('player').on(dashjs.MediaPlayer.events.ERROR, payload => {
      console.error(payload);
      if (payload.error === 'capability' && payload.event === 'mediasource') {
        this.set('mediaSourceSupported', false);
      }
    }, this);
  },
  didInsertElement() {
    let hasWebKit = ('WebKitMediaSource' in window);
    let hasMediaSource = ('MediaSource' in window);
    let isSafari = navigator.userAgent.search("Safari") > 0 && navigator.userAgent.search("Chrome") < 0;
    this.set('mediaSourceSupported', (hasWebKit || hasMediaSource) && !isSafari);

    this.set('playerElement', document.getElementById('audio-player-'+this.get('stream')));
    if (this.get('mediaSourceSupported')) {
      this.get('player').initialize(this.get('playerElement'));
      this.get('player').attachSource('https://audio.crimeisdown.com/streaming/dash/' + this.get('stream') + '/');
    } else {
      this.get('playerElement').src = 'https://audio.crimeisdown.com/streaming/hls/' + this.get('stream') + '/index.m3u8';
      console.error('Sorry, your browser does not support our live streaming functionality.');
    }

    let audioContext = new (window.AudioContext || window.webkitAudioContext);

    let scene = new window.ResonanceAudio(audioContext, {
      ambisonicOrder: 1,
    });
    let dimensions = {
      width: 3, height: 3, depth: 3,
    };
    let materials = {
      left: 'brick-bare', right: 'brick-bare',
      up: 'brick-bare', down: 'wood-panel',
      front: 'brick-bare', back: 'brick-bare',
    };
    scene.setRoomProperties(dimensions, materials);

    let audioElementSource = audioContext.createMediaElementSource(this.get('playerElement'));

    let soundSource = scene.createSource();
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    soundSource.setPosition(getRandomInt(dimensions.width), 0, getRandomInt(dimensions.depth));
    audioElementSource.connect(soundSource.input);
    scene.output.connect(audioContext.destination);
  },
  actions: {
    seek(time) {
      if (this.get('mediaSourceSupported')) {
        this.get('player').seek(time);
      } else {
        this.get('playerElement').fastSeek(time);
      }
    }
  }
});