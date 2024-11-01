export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub; // Adjust based on your token's structure
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
};