import 'bootstrap';
import {User} from "../../functions/src/shared/user";
import {config} from "../../functions/src/shared/config/config";

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", config.baseURL.serviceAPI + "hello");
    xhr1.onload = () => xhr1.readyState === 4 ? xhr1.status === 200 ? console.log(xhr1.responseText) : console.error(xhr1.statusText) : console.warn(xhr1.readyState);
    xhr1.onerror = console.error;
    xhr1.send(null);

    const xhr2 = new XMLHttpRequest();
    xhr2.open("POST", config.baseURL.serviceAPI + "user");
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.onload = () => xhr2.readyState === 4 ? xhr2.status === 200 ? console.log(xhr2.responseText) : console.error(xhr2.statusText) : console.warn(xhr2.readyState);
    xhr2.onerror = console.error;
    xhr2.send(new User(1, "Nick").toString());
  });
})();
