import { createApiClient } from "../libs/api";
import { jsonHandler } from "../libs/api/response-handler";

class NotesService {
  constructor() {
    this._client = createApiClient({
      baseUrl: 'https://notes-api.dicoding.dev/v2',
    });
  }
}

export default NotesService;