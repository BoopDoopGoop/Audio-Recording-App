import VoiceMemo from "./VoiceMemoClass";
import { useState } from "react";
import { View, Button } from "react-native";

function MainScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    VoiceMemo.startRecording();
  };

  const stopRecording = () => {
    setIsRecording(false);
    VoiceMemo.stopRecording();
  };

  const playbackRecording = () => {
    setIsPlaying(true);
    VoiceMemo.playbackRecording();
  };

  const pausePlaybackRecording = () => {
    setIsPlaying(false);
    VoiceMemo.pausePlaybackRecording();
  };

  const resumePlaybackRecording = () => {
    setIsPlaying(true);
    VoiceMemo.resumePlaybackRecording();
  };

  const deleteRecording = () => {
    VoiceMemo.deleteRecording();
  };

  const uploadToFirebase = () => {
    VoiceMemo.uploadToFirebase();
  };

  return (
    <View>
      {!isRecording && !isPlaying && (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      {isRecording && <Button title="Stop Recording" onPress={stopRecording} />}
      {!isRecording && !isPlaying && (
        <Button title="Playback Recording" onPress={playbackRecording} />
      )}
      {isPlaying && (
        <Button
          title="Pause Playback Recording"
          onPress={pausePlaybackRecording}
        />
      )}
      {!isRecording && !isPlaying && (
        <Button
          title="Resume Playback Recording"
          onPress={resumePlaybackRecording}
        />
      )}
      {!isRecording && !isPlaying && (
        <Button title="Delete Recording" onPress={deleteRecording} />
      )}
      {!isRecording && !isPlaying && (
        <Button title="Upload to Firebase" onPress={uploadToFirebase} />
      )}
    </View>
  );
}

export default MainScreen;
