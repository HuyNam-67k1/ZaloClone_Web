import React from 'react'
import EmojiPicker from 'emoji-picker-react'
export default function Emoji(props) {
  return (
    <div>
            <EmojiPicker 
             autoFocusSearch={false}
             width="100%"
             onEmojiClick={props.pickEmoji}
            />
    </div>
  )
}
