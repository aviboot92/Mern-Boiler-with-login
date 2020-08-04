function validateResponse(response, customValidator) {
  if (customValidator && !customValidator(response)) {
    return false;
  }

  switch (response.status) {
    case 200:
      return true;

    default:
      return false;
  }
}

export { validateResponse };

