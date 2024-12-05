import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Check for duplicate _id
      const idExists = state.pastes.find((item) => item._id === paste._id);

      // Check for duplicate title
      const titleExists = state.pastes.find((item) => item.title === paste.title);

      if (idExists) {
        toast.error("Paste already exists with the same ID");
        return;
      }

      if (titleExists) {
        toast.error("Paste with this title already exists");
        return;
      }

      // Add the paste
      state.pastes.push(paste);

      // Update localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // Show success toast
      toast.success("Paste added");
    },

    updatePastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        // Update localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Show success toast
        toast.success("Paste updated");
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        // Update localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Show success toast
        toast.success("Paste deleted");
      }
    },

    resetPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

export const { addToPastes, removeFromPastes, updatePastes } = pasteSlice.actions;

export default pasteSlice.reducer;
