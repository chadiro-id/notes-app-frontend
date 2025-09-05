import { createApiClient } from "../libs/api";
import { jsonHandler } from "../libs/api/response-handler";
// import { waitForSecond } from "../utils/util";

class NotesService {
  constructor() {
    this._client = createApiClient({
      baseUrl: "https://notes-api.dicoding.dev/v2",
    });
  }

  async addNote(note) {
    const endpoint = "/notes";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const [error, response] = await this._client.request(endpoint, options);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }

  async getNotes() {
    const endpoint = "/notes";

    const [error, response] = await this._client.request(endpoint);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }

  async getArchivedNotes() {
    const endpoint = "/notes/archived";

    const [error, response] = await this._client.request(endpoint);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }

  async getNoteById(noteId) {
    const endpoint = `/notes/${noteId}`;

    const [error, response] = await this._client.request(endpoint);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }

  async archiveNote(noteId) {
    const endpoint = `/notes/${noteId}/archive`;
    const options = {
      method: "POST",
    };

    const [error, response] = await this._client.request(endpoint, options);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }

  async unarchiveNote(noteId) {
    const endpoint = `/notes/${noteId}/unarchive`;
    const options = {
      method: "POST",
    };

    const [error, response] = await this._client.request(endpoint, options);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }

  async deleteNote(noteId) {
    const endpoint = `/notes/${noteId}`;
    const options = {
      method: "DELETE",
    };

    const [error, response] = await this._client.request(endpoint, options);

    if (error) {
      return [error, null];
    }

    return jsonHandler(response);
  }
}

export default NotesService;
