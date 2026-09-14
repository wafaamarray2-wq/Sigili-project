
const EMPLOYEES_KEY = "sigili_employees";

export const getEmployees = () => {
  try {
    const savedEmployees = localStorage.getItem(EMPLOYEES_KEY);

    if (!savedEmployees) {
      return [];
    }

    return JSON.parse(savedEmployees);
  } catch (error) {
    console.error("Error loading employees:", error);
    return [];
  }
};

export const saveEmployees = (employees) => {
  try {
    localStorage.setItem(
      EMPLOYEES_KEY,
      JSON.stringify(employees)
    );
  } catch (error) {
    console.error("Error saving employees:", error);
  }
};

export const clearEmployees = () => {
  localStorage.removeItem(EMPLOYEES_KEY);

}