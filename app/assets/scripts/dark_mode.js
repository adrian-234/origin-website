document.addEventListener("DOMContentLoaded", () => {
  const themeForms = document.querySelectorAll('[data-form="themeForm"]');
  if (themeForms.length === 0) {
    console.error("No forms found!");
    return;
  }

  themeForms.forEach((form) => {
    form.addEventListener("submit", themeSubmitForm);
  });
});

function themeSubmitForm(event) {
  event.preventDefault();
  const form = event.target;
  const url = "/api/change";
  const formData = new FormData(form);
  const body = JSON.stringify(Object.fromEntries(formData.entries()));

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.errors) {
        console.error(result.errors);
      } else {
        changeTheme(result.theme);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function changeTheme(current_theme) {
  const htmlEl = document.documentElement;
  let lightButton = Array.from(document.getElementsByClassName("light-mode-btn"));
  let darkButton = Array.from(document.getElementsByClassName("dark-mode-btn"));

  htmlEl.classList.remove("theme-light", "theme-dark");

  if (current_theme === "dark") {
    htmlEl.classList.add("theme-dark");
    lightButton.forEach((el) => {
      el.parentElement.disabled = false;
    });
    darkButton.forEach((el) => {
      el.parentElement.disabled = true;
    });
  } else if (current_theme === "light") {
    htmlEl.classList.add("theme-light");
    darkButton.forEach((el) => {
      el.parentElement.disabled = false;
    });
    lightButton.forEach((el) => {
      el.parentElement.disabled = true;
    });
  }
  imageChange(current_theme);
}

function imageChange(current_theme) {
  const contactUsBg = document.getElementById("contactUsBg");

  const images = [
    contactUsBg,
  ].filter(Boolean);

  if (current_theme === "dark") {
    images.forEach((image) => {
      if (image && image.src) {
        const src = image.src;
        const dotIndex = src.lastIndexOf(".");
        if (dotIndex !== -1 && !src.includes("_dark")) {
          const newSrc = src.slice(0, dotIndex) + "_dark" + src.slice(dotIndex);
          const versionedSrc = newSrc + "?v=" + Date.now();
          image.src = versionedSrc;
          image.srcset = versionedSrc;

          const picture = image.closest("picture");
          if (picture) {
            const sources = picture.querySelectorAll("source");
            sources.forEach((source) => {
              if (source.srcset && !source.srcset.includes("_dark")) {
                source.srcset = source.srcset
                  .split(",")
                  .map((srcItem) => {
                    const [url, descriptor] = srcItem.trim().split(" ");
                    const dot = url.lastIndexOf(".");
                    if (dot !== -1) {
                      const darkUrl =
                        url.slice(0, dot) + "_dark" + url.slice(dot);
                      return (
                        darkUrl +
                        "?v=" +
                        Date.now() +
                        (descriptor ? " " + descriptor : "")
                      );
                    }
                    return srcItem.trim();
                  })
                  .join(", ");
              }
            });
          }
        }
      }
    });
  } else {
    images.forEach((image) => {
      if (image && image.src) {
        const cleanSrc =
          image.src.replace("_dark", "").split("?")[0] + "?v=" + Date.now();
        image.src = cleanSrc;
        image.srcset = cleanSrc;

        const picture = image.closest("picture");
        if (picture) {
          const sources = picture.querySelectorAll("source");
          sources.forEach((source) => {
            if (source.srcset && source.srcset.includes("_dark")) {
              source.srcset = source.srcset
                .split(",")
                .map((srcItem) => {
                  const [url, descriptor] = srcItem.trim().split(" ");
                  const cleanUrl =
                    url.replace("_dark", "").split("?")[0] + "?v=" + Date.now();
                  return cleanUrl + (descriptor ? " " + descriptor : "");
                })
                .join(", ");
            }
          });
        }
      }
    });
  }
}
