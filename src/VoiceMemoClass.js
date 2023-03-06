import { Audio } from "expo-av";
import FirebaseConfig from "./FirebaseConfig";

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

      console.log("Recording stopped");
    } catch (error) {
      console.log(error);
    }
  }

  static async playbackRecording() {
    try {
      if (this.recording != null) {
        console.log("Playing back recording...");

        const { sound } = await this.recording.createNewLoadedSoundAsync();
        await sound.playAsync();
        this.sound = sound;

        console.log("Played back recording");
      } else {
        console.log("There is no recording to playback.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async pausePlaybackRecording() {
    try {
      console.log("Pausing playback recording...");
      await this.sound.pauseAsync();
      console.log("Playback recording paused");
    } catch (error) {
      console.log(error);
    }
  }

  static async resumePlaybackRecording() {
    try {
      console.log("Resuming playback recording...");
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

  static async uploadToFirebase() {
    try {
      console.log("Uploading to Firebase...");

      const uri = this.recording.getURI();
      const fileName = uri.split("/").pop();

      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = FirebaseConfig.getStorageRef(fileName);
      FirebaseConfig.upload(storageRef, blob);

      console.log("Successfully Uploaded");
    } catch (error) {
      console.log("Unable to upload to Firebase", error);
    }
  }
}

export default VoiceMemo;
