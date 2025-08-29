const jsonHandler = async (response) => {
  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.error(e);
    }

    const errorMessage =
      errorData.message || `Http error! status: ${response.status}`;
    return [new Error(errorMessage), null];
  }

  try {
    const responseJson = await response.json();
    return [null, responseJson];
  } catch (err) {
    console.error(err);
    const error = new Error("Failed to parse JSON response.");
    return [error, null];
  }
};

export { jsonHandler };
