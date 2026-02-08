/**
 * Form validation helpers
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRequiredField = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d+\-\s()]+$/;
  return phone.length > 0 ? phoneRegex.test(phone) : true;
};

export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateCV = (cv: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate personal section
  const personalSection = cv.sections?.find((s: any) => s.type === 'personal');
  if (personalSection) {
    const personal = personalSection.content;
    if (!validateRequiredField(personal?.firstName)) {
      errors.push({ field: 'firstName', message: 'First name is required' });
    }
    if (!validateRequiredField(personal?.lastName)) {
      errors.push({ field: 'lastName', message: 'Last name is required' });
    }
    if (personal?.email && !validateEmail(personal.email)) {
      errors.push({ field: 'email', message: 'Invalid email address' });
    }
  }

  return errors;
};
