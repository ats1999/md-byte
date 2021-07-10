// import { toggleFullScreen,previewStyleButton } from "./customButtons";

export const items = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock']
]


export function toggleFullScreen(editorRef) {
    const imageUrl = "https://res.cloudinary.com/dsabyte/image/upload/v1625072659/toast/fullscreen-svgrepo-com_y4avfz.svg";

    const button = document.createElement('button');
    button.className = `toastui-editor-toolbar-icons ${'full-screen'}`;
    button.style.backgroundImage = 'none';
    button.style.margin = '0';
    button.innerHTML = `<img src=${imageUrl} alt='full screen  button'></img>`;

    button.addEventListener('click', (_) => {
        if (!editorRef || !editorRef.current)
            return;

        const el = editorRef.current.getRootElement();

        if (el.style.height != "100vh")
            el.style = "height:100vh; width:100vw; position:fixed;z-index:100000;top:0px;left:0px;background-color:white;";
        else el.style = "height:400px;"
    });

    return button;
}

export function previewStyleButton(handleClick) {
    const imageUrl = "https://res.cloudinary.com/dsabyte/image/upload/v1625105428/toast/preview-style_vevyy6.svg";

    const button = document.createElement('button');
    button.className = `toastui-editor-toolbar-icons ${'preview-style-button'}`;
    button.style.backgroundImage = 'none';
    button.style.margin = '0';
    button.innerHTML = `<img src=${imageUrl} alt='preview-style-button'></img>`;

    button.addEventListener('click',handleClick);

    return button;
}

export function darkMode(handleClick) {
    const imageUrl = "https://res.cloudinary.com/dsabyte/image/upload/v1625109031/toast/moon-svgrepo-com_xmuyw5.svg";

    const button = document.createElement('button');
    button.className = `toastui-editor-toolbar-icons ${'dark-mode-button'}`;
    button.style.backgroundImage = 'none';
    button.style.margin = '0';
    button.innerHTML = `<img src=${imageUrl} alt='dark-mode-button'></img>`;

    button.addEventListener('click',handleClick);

    return button;
}