import React, { useState } from "react";
import { useChannelStore } from "../../store/useChannelStore";
import { X } from "lucide-react";
import LoaderIcon from "../loading/LoaderIcon";

const CreateChannelPopuup = () => {

    const [formData, setFormData] = useState({name: ""})

    const {toggleAddChannel,isCreatingChannel, createChannel, getChannels} = useChannelStore()

    async function handleCreateChannel(e) {
        e.preventDefault()
        toggleAddChannel()
        await createChannel(formData)
      setFormData({name: ""})
        await getChannels()
    }
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => (toggleAddChannel())}
    >
      <div
        className="relative w-full max-w-[550px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
        style={{
          background: "#F4F1EC",
          color: "#1A0F0B",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-7 py-5 border-b"
          style={{
            background: "#F4F1EC",
            borderColor: "#D8D0C7",
          }}
        >
          <div>
            <p
              className="text-[11px] font-semibold tracking-[2px]"
              style={{ color: "#A85D19" }}
            >
              CHANNEL CREATION
            </p>

            <h2 className="text-xl font-semibold mt-1">Create a new channel</h2>
          </div>

          <button
            type="button"
            onClick={() => toggleAddChannel()}
            className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-black/5"
            style={{
              borderColor: "#8E877F",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-7 py-6">
          <form className="flex flex-col gap-5" onSubmit={handleCreateChannel}>
            {/* Project Name */}
            <div>
              <label className="block text-xs font-semibold mb-2">
                CHANNEL NAME
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter the name of channel"
                required
                className="w-full rounded-lg px-4 py-3 text-sm outline-none border transition-colors"
                style={{
                  background: "#FFFFFF",
                  color: "#1A0F0B",
                  borderColor: "#D8D0C7",
                }}
              />
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={isCreatingChannel}
              className="w-full h-12 flex items-center justify-center rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-70 cursor-pointer"
              style={{
                background: "#1A0F0B",
                color: "#F4F1EC",
              }}
            >
              {isCreatingChannel ? (
                <LoaderIcon className="w-5 h-5 animate-spin" />
              ) : (
                "Create Channel"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelPopuup;
