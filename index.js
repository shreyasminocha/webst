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

[html, css, js].forEach((input) => {
    input.addEventListener("keydown", (event) => {
        const tab = 9;
        const indent = " ".repeat(4);

        const start = input.selectionStart;
        const end = input.selectionEnd;

        if (event.keyCode === tab) {
            event.preventDefault(); // prevent tabbing to next input

            input.value =
                input.value.substring(0, start) +
                indent +
                input.value.substring(start, end) +
                input.value.substring(end);

            input.selectionStart = start + indent.length;
            input.selectionEnd = end + indent.length;
        }
    });
});
