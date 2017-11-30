var PlayQueue = function () {
	var songs = [];
	var currentIndex = -1;
	this.getSong = function (index) {	// zero is the first to be popped
		return songs[index];
	}
	this.getLength = function () {
		return songs.length;
	}

	this.addToEnd = function (newSong) {
		songs.push(newSong);
		if (currentIndex == -1) {
			currentIndex = 0;
			player.loadNewSong(songs[currentIndex]);
		}
		rebuildHTML();
	}
	this.addNext = function (newSong) {
		songs.splice(currentIndex + 1, 0, newSong);
		if (currentIndex == -1) {
			currentIndex = 0;
			player.loadNewSong(songs[currentIndex]);
		}
		rebuildHTML();
	}

	this.remove = function (index) {
		// if (index < currentIndex) {
		// 	currentIndex--;
		// }
		// else if (index == currentIndex && currentIndex != songs.length - 1) {
		// 	songs.splice(index, 1);
		// }
		new NotImplemented();
	}
	this.skipBackward = function () {
		if (currentIndex > 0) {
			currentIndex--;
			player.loadNewSong(songs[currentIndex]);
		}
		rebuildHTML();
	}
	this.skipForward = function () {
		if (currentIndex < songs.length - 1) {
			currentIndex++;
			player.loadNewSong(songs[currentIndex]);
		}
		else {
			currentIndex = 0;
			player.stop();
		}
		rebuildHTML();
	}

	var rebuildHTML = function () {
		var songListJQ = $("#song-list");
		songListJQ.html('');
		for (var x = 0; x < songs.length; x++) {
			var newJQComponent = RatWorks.appendNewComponent('song-entry', songs[x], $("#song-list"));
			songListJQ.append(newJQComponent);
			if (x == currentIndex) {
				newJQComponent.addClass('player-active');
			}
		}
	}
}