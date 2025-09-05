import addNoteModalDialog from "./add-note-modal";
import noteDetailsModalDialog from "./note-details-modal";
import NotesService from "../services/NotesService";
import NotesEmpty from "./notes-empty";
import NotesSkeleton from "./notes-skeleton";
import SnackbarProvider from "./snackbar-provider";

const home = () => {
  const notesService = new NotesService();
  const notesEmpty = NotesEmpty();
  const notesSkeleton = NotesSkeleton();
  const snackbarProvider = SnackbarProvider();

  const actionPanel = document.querySelector(".action-panel");
  const addNoteBtn = document.getElementById("add-button");
  const noteList = document.getElementById("note-list");

  const buttonGroups = document.querySelector("button-groups");

  const addNoteModal = addNoteModalDialog((closeAction, data) => {
    if (closeAction === "submit") {
      addNewNote(data);
    }
  });

  const noteDetailsModal = noteDetailsModalDialog((closeAction, data) => {
    console.log(`[Note Details Modal] closed -> action: ${closeAction}`);
    if (closeAction === "archive") {
      if (data.archived) {
        unarchiveNote(data.id);
      } else {
        archiveNote(data.id);
      }
    }

    if (closeAction === "delete") {
      deleteNote(data.id);
    }
  });

  const actionPanelObserver = new IntersectionObserver(
    ([entry]) => {
      entry.target.classList.toggle(
        "action-panel--with-shadow",
        entry.intersectionRatio < 1,
      );
    },
    {
      threshold: [1],
    },
  );

  buttonGroups.addEventListener("select", (evt) => {
    const { selectedValue } = evt.detail;

    if (selectedValue === "all") {
      fetchAllNotes();
    } else if (selectedValue === "archived") {
      fetchArchivedNotes();
    } else {
      fetchNotes();
    }
  });

  addNoteBtn.addEventListener("click", () => {
    addNoteModal.show();
  });

  noteList.addEventListener("itemAdded", (evt) => {
    const { node } = evt.detail;
    console.log(`[On Item Added] node: ${node}`);
    node.addEventListener("clicked", handleNoteItemClick);
  });

  noteList.addEventListener("itemRemoved", (evt) => {
    const { node } = evt.detail;
    console.log(`[On Item Removed] node: ${node}`);
    node.removeEventListener("clicked", handleNoteItemClick);
  });

  function handleNoteItemClick(evt) {
    const { action, data } = evt.detail;
    if (action === "archive") {
      console.log("archive");
    } else if (action === "delete") {
      console.log("delete");
    } else {
      noteDetailsModal.show(data);
    }
  }

  function displayNotes(notes) {
    notesSkeleton.hide();

    if (!notes.length) {
      notesEmpty.show("Empty Notes!");
      return;
    }

    const noteItems = notes.map((item) => {
      const noteItemEl = document.createElement("note-item");
      noteItemEl.setAttribute("slot", "list-item");
      noteItemEl.className = "note-item";
      noteItemEl.note = item;
      return noteItemEl;
    });

    noteList.append(...noteItems);
  }

  function fetchAllNotes() {
    notesSkeleton.play();
    notesEmpty.hide();
    noteList.clearItems();

    setTimeout(() => {
      Promise.all([notesService.getNotes(), notesService.getArchivedNotes()])
        .then((results) => {
          const [, data1] = results[0];
          const [, data2] = results[1];
          const notes = [...data1.data, ...data2.data];
          displayNotes(notes);
        })
        .catch((error) => {
          notesSkeleton.stop();
          snackbarProvider.make("Failed to load all notes.", {
            actions: ["retry"],
            onDismiss: (reason) => {
              if (reason === "retry") {
                fetchAllNotes();
              }
            },
          }).show();
          console.log(error);
        });
    }, 3000);
  }

  async function fetchNotes() {
    notesEmpty.hide();
    noteList.clearItems();
    notesSkeleton.play();

    const [error, data] = await notesService.getNotes();
    if (error) {
      console.log(error.message);
      notesSkeleton.stop();
      snackbarProvider.make("Failed to load notes.", {
        actions: ["retry"],
        onDismiss: (reason) => {
          if (reason === "retry") {
            fetchNotes();
          }
        },
      }).show();
      return;
    }
    displayNotes(data.data);
  }

  async function fetchArchivedNotes() {
    noteList.clearItems();
    notesEmpty.hide();
    notesSkeleton.play();

    const [error, data] = await notesService.getArchivedNotes();
    if (error) {
      console.log(error.message);
      notesSkeleton.stop();
      snackbarProvider.make("Failed to load archived notes.", {
        actions: ["retry"],
        onDismiss: (reason) => {
          if (reason === "retry") {
            fetchArchivedNotes();
          }
        },
      }).show();
      return;
    }
    displayNotes(data.data);
  }

  async function addNewNote(note) {
    const [error, data] = await notesService.addNote(note);
    if (error) {
      console.log(error);
      snackbarProvider.make("Failed to add new notes.", {
        actions: ["retry"],
        onDismiss: (reason) => {
          if (reason === "retry") {
            addNewNote(note);
          }
        },
      }).show();
      return;
    }
    const noteItemEl = document.createElement("note-item");
    noteItemEl.setAttribute("slot", "list-item");
    noteItemEl.className = "note-item";
    noteItemEl.note = data.data;
    noteList.prepend(noteItemEl);
    snackbarProvider.make(`New note added: ${note.title}`, {
      duration: 20000,
      actions: ["ok"]
    }).show();
  }

  async function archiveNote(noteId) {
    const [error, data] = await notesService.archiveNote(noteId);

    if (error) {
      snackbarProvider.make("Failed to archive notes.", {
        actions: ["retry"],
        onDismiss: (reason) => {
          if (reason === "retry") {
            archiveNote(noteId);
          }
        },
      }).show();
      console.log(error);
    }

    console.info(data?.message);
  }

  async function unarchiveNote(noteId) {
    const [error, data] = await notesService.unarchiveNote(noteId);
    if (error) {
      console.log(error);
      snackbarProvider.make("Failed to unarchive notes.", {
        actions: ["retry"],
        onDismiss: (reason) => {
          if (reason === "retry") {
            unarchiveNote(noteId);
          }
        },
      }).show();
    }

    console.info(data?.message);
  }

  async function deleteNote(noteId) {
    const [error, data] = await notesService.deleteNote(noteId);

    if (error) {
      console.log(error);
    }

    console.info(data?.message);
  }

  actionPanelObserver.observe(actionPanel);
  fetchAllNotes();
};

export default home;
