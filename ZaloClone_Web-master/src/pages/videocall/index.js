import Iframe from "react-iframe";
import React from "react";
function VideoCall() {
  return (
    <div>
      <Iframe
        allowusermedia
        allow="microphone *; camera *; autoplay;"
        width="100%"
        height="750px"
        url="https://go.meetingrooms.net/live/cnm/room1?auth=1"
      ></Iframe>
    </div>
  );
}

export default VideoCall;
