import { Audio } from "expo-av";
// import * as firebase from 'firebase';

class VoiceMemo {
  static recording = null;
  static sound = null;

  static async startRecording() {
    try {
      console.log("Requesting permissions...");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      this.recording = recording;
      console.log("Recording started");
    } catch (error) {
      console.log("Failed to start recording", error);
    }
  }

  static async stopRecording() {
    try {
      console.log("Stopping recording...");
      await this.recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = this.recording.getURI();
      console.log("Recording stopped and stored at", uri);
    } catch (error) {
      console.log(error);
    }
  }

  static async playbackRecording() {
    try {
      if (this.recording != null) {
        console.log("Playing recording...");
        const { sound } = await this.recording.createNewLoadedSoundAsync();
        await sound.playAsync();
        this.sound = sound;
        console.log("Recording played");
      } else {
        console.log("There is no recording to playback.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async pausePlaybackRecording() {
    try {
      await this.sound.pauseAsync();
      console.log("Recording paused");
    } catch (error) {
      console.log(error);
    }
  }

  static async resumePlaybackRecording() {
    try {
      await this.sound.playAsync();
      console.log("Recording resumed");
    } catch (error) {
      console.log(error);
    }
  }

  static deleteRecording() {
    this.recording = null;
    this.sound = null;
    console.log("Recording deleted");
  }

  //     async uploadToFirebase() {
  //       try {
  //           const { uri } = await this.recording.createNewLoadedSoundAsync();
  //           const storage = firebase.storage();
  //           const storageRef = storage.ref();
  //           const audioRef = storageRef.child('audio/audio.aac');
  //           const snapshot = await audioRef.putFile(uri);
  //           console.log('Uploaded audio with metadata:', snapshot.metadata);
  //       } catch (error) {
  //           console.log(error);
  //       }
  //   }
}

export default VoiceMemo;
