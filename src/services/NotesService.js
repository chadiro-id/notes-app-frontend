import { createApiClient } from '../libs/api';
import { jsonHandler } from '../libs/api/response-handler';

class NotesService {
  constructor() {
    this._client = createApiClient({
      baseUrl: 'https://notes-api.dicoding.dev/v2',
    });
  }

  async addNote(note) {
    const endpoint = '/notes';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    };

    const [error, response] = await this._client.request(endpoint, options);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }
}

export default NotesService;