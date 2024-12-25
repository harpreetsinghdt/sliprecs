import { toast } from "react-toastify";

const toastConfig = {
  // position: toast.POSITION.TOP_RIGHT, // Correct enum usage
  autoClose: 2000, // Close the toast after 3 seconds
  hideProgressBar: false, // Optional to show progress bar
  pauseOnHover: true, // Pause the auto-close when hovering over the toast
};
export const notifySuccess = (msg) => {
  toast.success(msg, toastConfig);
};

// Function to show error notification
export const notifyError = (msg) => toast.error(msg, toastConfig);

// Function to show info notification
export const notifyInfo = (msg) => toast.info(msg, toastConfig);

// Function to show warning notification
export const notifyWarning = (msg) => toast.warning(msg, toastConfig);
