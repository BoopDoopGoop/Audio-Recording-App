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

  const playRecording = () => {
    setIsPlaying(true);
    VoiceMemo.playRecording();
  };

  const pauseRecording = () => {
    setIsPlaying(false);
    VoiceMemo.pauseRecording();
  };

  const resumeRecording = () => {
    setIsPlaying(true);
    VoiceMemo.resumeRecording();
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
        <Button title="Play Recording" onPress={playRecording} />
      )}
      {isPlaying && <Button title="Pause Recording" onPress={pauseRecording} />}
      {!isRecording && !isPlaying && (
        <Button title="Resume Recording" onPress={resumeRecording} />
      )}
      {!isRecording && !isPlaying && (
        <Button title="Upload to Firebase" onPress={uploadToFirebase} />
      )}
    </View>
  );
}

export default MainScreen;
