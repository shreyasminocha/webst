const iframe = document.querySelector("iframe");

const html = document.querySelector('[name = "html"]');
const css = document.querySelector('[name = "css"]');
const js = document.querySelector('[name = "js"]');

html.addEventListener("input", () => {
    iframe.contentDocument.body.innerHTML = "";
    iframe.contentDocument.body.innerHTML = html.value;
});

css.addEventListener("input", () => {
    const oldStyle = iframe.contentDocument.querySelector("style");
    if (oldStyle) oldStyle.parentNode.removeChild(oldStyle);

    const style = document.createElement("style");
    style.innerHTML = css.value;
    iframe.contentDocument.head.appendChild(style);
});

js.addEventListener("input", () => {
    const oldScript = iframe.contentDocument.querySelector("script");
    if (oldScript) oldScript.parentNode.removeChild(oldScript);

    const script = document.createElement("script");
    script.innerHTML = js.value;
    iframe.contentDocument.head.appendChild(script);
});

html.dispatchEvent(new Event("input"));
css.dispatchEvent(new Event("input"));
js.dispatchEvent(new Event("input"));
