"use strict";
new Vue({
    el: "#app",
    data: function () {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: !1,
            tracks: [{
                id: 1,
                name: "邱有句",
                artist: "一个深爱的人",
                cover: "http://p2.music.126.net/kauB64ZLYieCE_ptXhhzRQ==/109951163047363324.jpg",
                source: "https://music.163.com/song/media/outer/url?id=513661525",
                url: "https://music.163.com/#/song?id=513661525",
                favorited: !0
            }],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        }
    },
    mounted: function () {
        this.getPlayList()
    },
    methods: {
        getPlayList: function getPlayList() {
            var url = "https://music-api.miraitowa.cc/playlist/detail?id=3778678",
                xhr = new XMLHttpRequest;
            xhr.open("GET", url, !0), xhr.send();
            var self = this;
            xhr.onreadystatechange = function () {
                var json, obj;
                4 == xhr.readyState && 200 == xhr.status && (json = xhr.responseText, obj = eval("(" + json + ")"), obj.playlist.tracks.forEach(function (t) {
                    self.tracks.push({
                        id: t.al.id,
                        name: t.ar[0].name,
                        artist: t.al.name,
                        cover: t.al.picUrl,
                        source: "https://music.163.com/song/media/outer/url?id=" + t.id,
                        url: "https://music.163.com/#/song?id=" + t.id,
                        favorited: !1
                    })
                }))
            }
        },
        play: function () {
            this.audio.paused ? (this.audio.play(), this.isTimerPlaying = !0) : (this.audio.pause(), this.isTimerPlaying = !1)
        },
        generateTime: function () {
            var t = 100 / this.audio.duration * this.audio.currentTime;
            this.barWidth = t + "%", this.circleLeft = t + "%";
            var i = Math.floor(this.audio.duration / 60),
                r = Math.floor(this.audio.duration - 60 * i),
                e = Math.floor(this.audio.currentTime / 60),
                t = Math.floor(this.audio.currentTime - 60 * e);
            e < 10 && (e = "0" + e), t < 10 && (t = "0" + t), this.duration = (i = i < 10 ? "0" + i : i) + ":" + (r = r < 10 ? "0" + r : r), this.currentTime = e + ":" + t
        },
        updateBar: function (t) {
            var i = this.$refs.progress_fm,
                r = this.audio.duration,
                i = 100 * (t - i.offsetLeft) / i.offsetWidth;
            this.barWidth = (i = (i = 100 < i ? 100 : i) < 0 ? 0 : i) + "%", this.circleLeft = i + "%", this.audio.currentTime = r * i / 100, this.audio.play()
        },
        clickProgress: function (t) {
            this.isTimerPlaying = !0, this.audio.pause(), this.updateBar(t.pageX)
        },
        prevTrack: function () {
            this.transitionName = "scale-in", this.isShowCover = !1, 0 < this.currentTrackIndex ? this.currentTrackIndex-- : this.currentTrackIndex = this.tracks.length - 1, this.currentTrack = this.tracks[this.currentTrackIndex], this.resetPlayer()
        },
        nextTrack: function () {
            this.transitionName = "scale-out", this.isShowCover = !1, this.currentTrackIndex < this.tracks.length - 1 ? this.currentTrackIndex++ : this.currentTrackIndex = 0, this.currentTrack = this.tracks[this.currentTrackIndex], this.resetPlayer()
        },
        resetPlayer: function () {
            var t = this;
            this.barWidth = 0, this.circleLeft = 0, this.audio.currentTime = 0, this.audio.src = this.currentTrack.source, setTimeout(function () {
                t.isTimerPlaying ? t.audio.play() : t.audio.pause()
            }, 300)
        },
        favorite: function () {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited
        }
    },
    created: function () {
        var t = this;
        this.currentTrack = this.tracks[0], this.audio = new Audio, this.audio.src = this.currentTrack.source, this.audio.ontimeupdate = function () {
            t.generateTime()
        }, this.audio.onloadedmetadata = function () {
            t.generateTime()
        }, this.audio.onended = function () {
            t.nextTrack(), this.isTimerPlaying = !0
        };
        for (var i = 0; i < this.tracks.length; i++) {
            var r = this.tracks[i],
                e = document.createElement("link");
            e.rel = "prefetch", e.href = r.cover, e.as = "image", document.head.appendChild(e)
        }
    }
});