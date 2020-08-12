function validateResponse(response) {

  switch (response.status) {
    case 200:
      return true;

    default:
      return false;
  }
}

export { validateResponse };

