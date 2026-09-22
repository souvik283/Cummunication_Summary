import React from 'react'
import { useChannelStore } from '../../store/useChannelStore'

const ChannelMember = () => {
    const {selectedChannel, toggleAddChannelMember} = useChannelStore()

    

  return (
    <div className="hidden sm:flex -space-x-2">
          {selectedChannel.members.map((member, i) => (
            <span
              key={i}
              title={member.fullName}
              onClick={()=>{
                toggleAddChannelMember()
              }}
              className="flex items-center cursor-pointer justify-center w-7 h-7 rounded-full text-xs font-semibold border-2"
              style={{ background: "#773567", color: "#FFFFFF", borderColor: "#FFFFFF" }}
            >
              {member.fullName?.[0].toUpperCase()}
              
            </span>
          ))}
        </div>
  )
}

export default ChannelMember
