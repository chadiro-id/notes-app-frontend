import "./styles/global.css";
import "./components";
import "./icons";
import home from "./view/home";

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Notes App] DOM Loaded");
  home();
});
