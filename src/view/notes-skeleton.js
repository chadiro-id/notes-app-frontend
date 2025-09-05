const NotesSkeleton = () => {
  const el = document.getElementById("notes-skeleton");
  const skeletons = el.querySelectorAll(".skeleton");

  const play = () => {
    if (el.hidden) {
      el.hidden = false;
    }

    skeletons.forEach((item) => {
      item.classList.add("skeleton--animate");
    });
  };

  const stop = () => {
    skeletons.forEach((item) => {
      item.classList.remove("skeleton--animate");
    });
  };

  const hide = () => {
    el.hidden = true;
  };

  return {
    play,
    stop,
    hide,
  };
};

export default NotesSkeleton;
