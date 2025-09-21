import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of file objects with metadata
  isUploading: false,
  totalFiles: 0,
  completedFiles: 0,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    // Add new files to the store (metadata only, no File objects)
    addFiles: (state, action) => {
      console.log('Redux addFiles reducer called with:', action.payload.length, 'files');

      const newFiles = action.payload.map(file => ({
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Unique string ID
        // Store only essential file metadata, not the File object itself
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        progress: 0,
        status: 'pending', // pending, uploading, completed, failed
        timeLeft: null,
        uploadStartTime: null,
        // LLM analysis relevant data
        metadata: {
          fileExtension: file.name.split('.').pop()?.toLowerCase(),
          isCADFile: /\.(dwg|dxf|step|stp|iges|igs|stl|obj|3dm|sat|x_t|x_b)$/i.test(file.name),
          isBOMFile: /\.(xlsx|xls|csv|txt|pdf)$/i.test(file.name),
          readableSize: formatFileSize(file.size),
          uploadedAt: new Date().toISOString(),
        }
      }));

      console.log('Created new files for Redux:', newFiles.map(f => f.name));

      state.items.push(...newFiles);
      state.totalFiles = state.items.length;
      state.isUploading = true;

      console.log('Redux state after adding files:', state.items.length, 'total files');
    },

    // Remove a file by ID
    removeFile: (state, action) => {
      const fileId = action.payload;
      state.items = state.items.filter(file => file.id !== fileId);
      state.totalFiles = state.items.length;
      state.completedFiles = state.items.filter(file => file.status === 'completed').length;

      // If no files left, stop uploading
      if (state.items.length === 0) {
        state.isUploading = false;
        state.completedFiles = 0;
      }
    },

    // Update file progress during upload
    updateFileProgress: (state, action) => {
      const { fileId, progress, timeLeft, status } = action.payload;
      const file = state.items.find(f => f.id === fileId);

      if (file) {
        file.progress = progress;
        file.timeLeft = timeLeft;
        file.status = status;

        if (status === 'uploading' && !file.uploadStartTime) {
          file.uploadStartTime = new Date().toISOString();
        }

        if (status === 'completed') {
          file.metadata.completedAt = new Date().toISOString();
        }
      }

      // Update completed count
      state.completedFiles = state.items.filter(file => file.status === 'completed').length;

      // Keep isUploading true even when all files are completed
      // This ensures the upload UI stays visible to show completed files
    },

    // Clear all files
    clearAllFiles: (state) => {
      state.items = [];
      state.isUploading = false;
      state.totalFiles = 0;
      state.completedFiles = 0;
    },

    // Set uploading status
    setUploadingStatus: (state, action) => {
      state.isUploading = action.payload;
    },
  },
});

// Helper function for readable file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Export actions
export const {
  addFiles,
  removeFile,
  updateFileProgress,
  clearAllFiles,
  setUploadingStatus,
} = filesSlice.actions;

// Export selectors
export const selectAllFiles = (state) => state.files.items;
export const selectIsUploading = (state) => state.files.isUploading;
export const selectTotalFiles = (state) => state.files.totalFiles;
export const selectCompletedFiles = (state) => state.files.completedFiles;
export const selectUploadProgress = (state) => {
  const { items } = state.files;
  if (items.length === 0) return 0;
  const totalProgress = items.reduce((sum, file) => sum + file.progress, 0);
  return Math.round(totalProgress / items.length);
};
export const selectUploadingFiles = (state) => state.files.items.filter(file => file.status === 'uploading');
export const selectMaxTimeLeft = (state) => {
  const uploadingFiles = state.files.items.filter(file => file.status === 'uploading');
  if (uploadingFiles.length === 0) return 0;
  return Math.max(...uploadingFiles.map(file => file.timeLeft || 0));
};

// Export reducer
export default filesSlice.reducer;