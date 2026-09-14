
const CURRENT_USER_KEY = "sigili_current_user";

const DEFAULT_ADMIN = {
  id: "admin-1",
  username: "admin",
  password: "1234",
  role: "admin",
  name: "مدير المحل",
};

export const getCurrentUser = () => {
  try {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Error loading current user:", error);
    return null;
  }
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getDefaultAdmin = () => {
  return DEFAULT_ADMIN;
};

