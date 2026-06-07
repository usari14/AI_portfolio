const bootGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const modules = [
    {
        title: "Personal Info",
        panels: [
            ["CV", "Resume, profile summary, role fit, and capability snapshot.", "https://www.linkedin.com/"],
            ["Identity", "Usama. Frontend systems, austere interfaces, precise motion.", "https://github.com/"],
            ["Focus", "High-end web experiences with deliberate state and clean geometry.", "https://developer.mozilla.org/"],
            ["Location", "Available for remote collaborations and product-facing builds.", "https://www.linkedin.com/"],
            ["Stack", "Rust, JavaScript, CSS architecture, interactive motion systems.", "https://www.rust-lang.org/"],
            ["Signal", "Minimal surface. Strong rhythm. Fast transitions.", "https://web.dev/"],
            ["Contact", "Purpose-driven access through the portfolio workspace.", "mailto:hello@example.com"],
            ["Timeline", "Career notes, learning arc, and active direction.", "https://github.com/"],
            ["Availability", "Collaboration status, preferred project types, and response path.", "https://www.linkedin.com/"]
        ]
    },
    {
        title: "Habits",
        panels: [
            ["Daily System", "Plan, build, verify, refine. Repeat until the interface feels exact.", "https://todoist.com/"],
            ["Learning", "Study UI mechanics, motion timing, backend fundamentals, and product taste.", "https://frontendmasters.com/"],
            ["Craft", "Small commits, clear folders, measured interactions.", "https://git-scm.com/"],
            ["Health", "Sustainable pace, focused blocks, deliberate reset time.", "https://www.notion.so/"],
            ["Review", "Inspect details before declaring a screen complete.", "https://web.dev/measure/"],
            ["Principle", "Precision is a habit, not a pass at the end.", "https://pragprog.com/"],
            ["Deep Work", "Focused blocks for execution-heavy interface work.", "https://www.notion.so/"],
            ["Reading", "Technical references, design notes, and implementation logs.", "https://developer.mozilla.org/"],
            ["Retrospective", "Weekly review of decisions, bugs, and improvements.", "https://github.com/"]
        ]
    },
    {
        title: "Digital Footprint",
        panels: [
            ["Profile", "Curated presence across engineering, design, and product experiments.", "https://www.linkedin.com/"],
            ["GitHub", "Implementation notes, prototypes, and production-minded code.", "https://github.com/"],
            ["LinkedIn", "Professional summary, experience, and collaboration context.", "https://www.linkedin.com/"],
            ["Writing", "Short-form thinking around interfaces and technical execution.", "https://medium.com/"],
            ["Proof", "Screens, repos, deployments, and measurable product work.", "https://vercel.com/"],
            ["Reach", "Focused channels, low noise, clear intent.", "mailto:hello@example.com"],
            ["Experiments", "Interactive prototypes and interface motion studies.", "https://codepen.io/"],
            ["Notes", "Design references and technical annotations.", "https://www.notion.so/"],
            ["Public Work", "Selected public-facing builds and code samples.", "https://github.com/"]
        ]
    },
    {
        title: "Shopify",
        panels: [
            ["Storefront", "Conversion-aware layouts with exact product hierarchy.", "https://www.shopify.com/"],
            ["Theme Work", "Liquid sections, custom blocks, and maintainable styling.", "https://shopify.dev/docs/storefronts/themes"],
            ["Performance", "Lean assets, responsive media, measurable loading behavior.", "https://web.dev/"],
            ["Checkout Path", "Reduced friction through clear product and cart states.", "https://www.shopify.com/checkout"],
            ["Integrations", "Apps, tracking, inventory, and operational details.", "https://apps.shopify.com/"],
            ["Result", "Commerce surfaces that feel premium and stay practical.", "https://www.shopify.com/partners"],
            ["Product Pages", "Focused product storytelling and variant clarity.", "https://shopify.dev/docs/storefronts/themes/product-merchandising"],
            ["Sections", "Reusable theme sections with merchant-friendly settings.", "https://shopify.dev/docs/storefronts/themes/architecture/sections"],
            ["Analytics", "Tracking-ready events for product and funnel inspection.", "https://help.shopify.com/"]
        ]
    },
    {
        title: "Websites",
        panels: [
            ["Portfolio", "Interactive personal presence with a controlled terminal entry.", "https://vercel.com/"],
            ["Landing Pages", "Direct first viewport, strong visual signal, clean calls to action.", "https://web.dev/"],
            ["Dashboards", "Dense but readable layouts for repeated use.", "https://www.figma.com/"],
            ["Animation", "Purposeful motion tied to state, not decorative noise.", "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API"],
            ["Responsive", "Stable geometry from mobile to wide desktop.", "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design"],
            ["Delivery", "Clean structure, tested paths, deployable static surfaces.", "https://pages.github.com/"],
            ["Accessibility", "Keyboard-friendly, semantic interfaces with readable contrast.", "https://www.w3.org/WAI/"],
            ["Performance", "Fast loading, constrained assets, and measured interaction.", "https://pagespeed.web.dev/"],
            ["Systems", "Reusable layout rules and maintainable visual language.", "https://developer.mozilla.org/"]
        ]
    },
    {
        title: "Rust",
        panels: [
            ["Server", "Actix host serving a fast static portfolio shell.", "https://actix.rs/"],
            ["Systems", "Interest in safe, predictable backend foundations.", "https://www.rust-lang.org/"],
            ["Tools", "Cargo workflows, clear modules, explicit data flow.", "https://doc.rust-lang.org/cargo/"],
            ["Interop", "Rust-backed services with frontend orchestration.", "https://wasm-bindgen.github.io/wasm-bindgen/"],
            ["Reliability", "Small surface area, understandable behavior.", "https://doc.rust-lang.org/book/"],
            ["Next", "More service logic and typed APIs as the portfolio grows.", "https://tokio.rs/"],
            ["Actix Routes", "Explicit route handling for portfolio assets and pages.", "https://docs.rs/actix-web/latest/actix_web/"],
            ["Static Assets", "Clean serving model for HTML, CSS, and JavaScript.", "https://docs.rs/actix-files/latest/actix_files/"],
            ["Type Safety", "Using compiler feedback to keep server behavior predictable.", "https://doc.rust-lang.org/rust-by-example/"]
        ]
    }
];

const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const terminalView = document.querySelector("#terminalView");
const workspaceView = document.querySelector("#workspaceView");
const terminalCopy = document.querySelector("#terminalCopy");
const terminalCaret = document.querySelector("#terminalCaret");
const inputLine = document.querySelector("#inputLine");
const terminalStage = document.querySelector("#terminalStage");
const systemInput = document.querySelector("#systemInput");
const workspaceGrid = document.querySelector("#workspaceGrid");
const detailView = document.querySelector("#detailView");
const schematicGrid = document.querySelector("#schematicGrid");
const backButton = document.querySelector("#backButton");
const searchToggle = document.querySelector("#searchToggle");
const themeToggle = document.querySelector("#themeToggle");
const commandOverlay = document.querySelector("#commandOverlay");
const commandCopy = document.querySelector("#commandCopy");
const commandInput = document.querySelector("#commandInput");

let activeModule = null;
let terminalMode = "boot";
let commandMode = false;
let terminalBuffer = "";
let commandBuffer = "";

const moduleAliases = [
    ["personal", "info", "cv", "resume", "about", "identity", "contact", "profile"],
    ["habit", "routine", "daily", "health", "review", "principle"],
    ["digital", "footprint", "github", "linkedin", "social", "online", "proof"],
    ["shopify", "store", "commerce", "ecommerce", "theme", "liquid"],
    ["website", "websites", "site", "portfolio", "landing", "dashboard", "animation"],
    ["rust", "server", "actix", "backend", "systems", "api"]
];

function randomBootText(length = 12) {
    return Array.from({ length }, (_, index) => {
        const randomOffset = Math.floor(Math.random() * bootGlyphs.length);
        return bootGlyphs[(index + randomOffset) % bootGlyphs.length];
    }).join("");
}

function setGuideLine(width) {
    inputLine.style.setProperty("--line-width", width);
    inputLine.classList.add("is-active");
}

function hideGuideLine() {
    inputLine.classList.remove("is-active");
}

async function typeText(text, speed = 72) {
    terminalCopy.textContent = "";
    for (const character of text) {
        terminalCopy.textContent += character;
        await sleep(speed);
    }
}

function clearTerminalClasses() {
    terminalCopy.className = "terminal-copy";
    terminalCaret.className = "terminal-caret";
    inputLine.className = "input-line";
}

function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("theme-light", isLight);
    themeToggle.setAttribute("aria-pressed", String(!isLight));
    window.localStorage.setItem("portfolio-theme", theme);
}

async function runTerminalIntro() {
    terminalMode = "boot";
    clearTerminalClasses();
    terminalCopy.classList.add("is-boot");
    terminalCaret.classList.add("is-booting");
    hideGuideLine();

    for (const glyph of bootGlyphs) {
        terminalCopy.textContent = glyph;
        await sleep(54);
    }

    clearTerminalClasses();
    setGuideLine("190px");
    await typeText("WELCOME", 92);
    terminalCopy.classList.add("is-underlined");

    await sleep(900);
    terminalCopy.classList.add("is-lifting");
    await sleep(320);

    terminalCopy.className = "terminal-copy";
    setGuideLine("520px");
    await typeText("PLEASE STATE YOUR PURPOSE", 78);
    terminalCopy.classList.add("is-underlined");

    await sleep(520);
    activateInput();
}

function activateInput() {
    terminalMode = "input";
    terminalBuffer = "";
    terminalCopy.className = "terminal-copy";
    terminalCopy.textContent = "";
    terminalStage.classList.remove("is-error");
    inputLine.classList.remove("is-error");
    setGuideLine("460px");
    terminalCaret.className = "terminal-caret is-breathing";
    systemInput.value = "";
    systemInput.focus();
}

async function handleSystemSubmit() {
    if (terminalMode !== "input") {
        return;
    }

    const value = (terminalBuffer || systemInput.value).trim();
    terminalMode = "processing";
    systemInput.blur();
    terminalCopy.textContent = value.toUpperCase();

    if (value.toLowerCase() !== "visit") {
        systemInput.value = "";
        terminalBuffer = "";
        terminalCopy.classList.add("is-processing");
        terminalStage.classList.add("is-error");
        inputLine.classList.add("is-error");
        setGuideLine("460px");
        terminalCaret.className = "terminal-caret is-breathing";
        await sleep(680);
        hideGuideLine();
        inputLine.classList.remove("is-error");
        terminalStage.classList.remove("is-error");
        await sleep(160);
        activateInput();
        return;
    }

    terminalCopy.classList.add("is-processing");
    terminalCaret.className = "terminal-caret is-processing";
    await sleep(430);

    hideGuideLine();
    terminalCopy.className = "terminal-copy";
    terminalCopy.textContent = "ACCESS GRANTED";
    await sleep(500);

    terminalView.classList.remove("is-active");
    workspaceView.classList.add("is-active");
    renderFolders();
}

function renderFolders() {
    workspaceGrid.innerHTML = modules.map((module, index) => `
        <button class="folder" style="--delay: ${index * 90}ms" type="button" data-index="${index}">
            <span class="folder-layer layer-three" aria-hidden="true"></span>
            <span class="folder-layer layer-two" aria-hidden="true"></span>
            <span class="folder-face">
                <span class="folder-label">${module.title}</span>
            </span>
        </button>
    `).join("");
}

function getPanelOffset(index) {
    const col = index % 3;
    const row = Math.floor(index / 3);
    return {
        x: `${(1 - col) * 120}px`,
        y: `${(0.5 - row) * 96}px`
    };
}

function renderSchematic(module) {
    schematicGrid.innerHTML = module.panels.map(([title, body, url], index) => {
        return `
            <a class="schematic-panel" href="${url}" target="_blank" rel="noopener noreferrer" style="--from-x: 0px; --from-y: 0px; --delay: ${index * 80}ms">
                <h2 class="panel-title">${title}</h2>
                <p class="panel-body">${body}</p>
                <span class="panel-url">${url.replace(/^mailto:/, "").replace(/^https?:\/\//, "")}</span>
            </a>
        `;
    }).join("");
}

function renderDetailGhost(folder) {
    const folderRect = folder.getBoundingClientRect();
    const detailRect = detailView.getBoundingClientRect();

    detailView.style.setProperty("--ghost-left", `${folderRect.left - detailRect.left}px`);
    detailView.style.setProperty("--ghost-top", `${folderRect.top - detailRect.top}px`);
    detailView.style.setProperty("--ghost-width", `${folderRect.width}px`);
    detailView.style.setProperty("--ghost-height", `${folderRect.height}px`);

    const existingGhost = detailView.querySelector(".detail-ghost");
    if (existingGhost) {
        existingGhost.remove();
    }

    const ghost = document.createElement("div");
    ghost.className = "detail-ghost";
    ghost.innerHTML = `
        <span class="folder-layer layer-three" aria-hidden="true"></span>
        <span class="folder-layer layer-two" aria-hidden="true"></span>
        <span class="folder-face" aria-hidden="true"></span>
    `;
    detailView.insertBefore(ghost, schematicGrid);
}

function setPanelOrigins(folder) {
    const folderRect = folder.getBoundingClientRect();
    const originX = folderRect.left + folderRect.width / 2;
    const originY = folderRect.top + folderRect.height / 2;

    schematicGrid.querySelectorAll(".schematic-panel").forEach((panel) => {
        const panelRect = panel.getBoundingClientRect();
        const panelX = panelRect.left + panelRect.width / 2;
        const panelY = panelRect.top + panelRect.height / 2;

        panel.style.setProperty("--from-x", `${originX - panelX}px`);
        panel.style.setProperty("--from-y", `${originY - panelY}px`);
    });
}

function openModule(index) {
    if (activeModule) {
        return;
    }

    activeModule = modules[index];
    const folders = [...workspaceGrid.querySelectorAll(".folder")];
    const selectedFolder = folders[index];

    folders.forEach((folder, folderIndex) => {
        if (folderIndex === index) {
            folder.classList.add("is-selected");
            return;
        }
        folder.classList.add("is-vanishing");
    });

    renderSchematic(activeModule);
    renderDetailGhost(selectedFolder);
    setPanelOrigins(selectedFolder);

    window.setTimeout(() => {
        workspaceView.classList.add("is-detail-open");
        detailView.classList.add("is-active");
        detailView.setAttribute("aria-hidden", "false");
    }, 320);

    window.setTimeout(() => {
        detailView.classList.add("is-settled");
    }, 1180);
}

function closeModule() {
    if (!activeModule) {
        return Promise.resolve();
    }

    detailView.classList.add("is-collapsing");
    detailView.classList.remove("is-active", "is-settled");

    return new Promise((resolve) => {
        window.setTimeout(() => {
        workspaceView.classList.remove("is-detail-open");
        detailView.classList.remove("is-collapsing");
        detailView.setAttribute("aria-hidden", "true");
        schematicGrid.innerHTML = "";
        detailView.querySelector(".detail-ghost")?.remove();
        activeModule = null;

        workspaceGrid.querySelectorAll(".folder").forEach((folder) => {
            folder.classList.remove("is-vanishing", "is-selected");
        });
            resolve();
        }, 760);
    });
}

function findModuleIndex(query) {
    const normalized = query.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
    const words = normalized.split(/\s+/).filter(Boolean);

    if (!words.length) {
        return -1;
    }

    return moduleAliases.findIndex((aliases, index) => {
        const title = modules[index].title.toLowerCase();
        return words.some((word) => title.includes(word) || aliases.some((alias) => alias.includes(word) || word.includes(alias)));
    });
}

async function typeCommandText(text, speed = 48) {
    commandCopy.textContent = "";
    for (const character of text) {
        commandCopy.textContent += character;
        await sleep(speed);
    }
}

function openCommandOverlay() {
    commandMode = true;
    commandOverlay.classList.add("is-active");
    commandOverlay.setAttribute("aria-hidden", "false");
    commandInput.value = "";
    commandBuffer = "";
    commandCopy.textContent = "STATE TARGET";
    window.setTimeout(() => commandInput.focus(), 80);
}

function closeCommandOverlay() {
    commandMode = false;
    commandOverlay.classList.remove("is-active");
    commandOverlay.setAttribute("aria-hidden", "true");
    commandInput.value = "";
    commandBuffer = "";
}

async function submitCommand() {
    if (!commandMode) {
        return;
    }

    const query = (commandBuffer || commandInput.value).trim();
    const index = findModuleIndex(query);

    if (index === -1) {
        commandInput.value = "";
        commandBuffer = "";
        await typeCommandText("NO MATCH", 42);
        await sleep(420);
        commandCopy.textContent = "STATE TARGET";
        commandInput.focus();
        return;
    }

    commandCopy.textContent = `OPEN ${modules[index].title}`;
    await sleep(280);
    closeCommandOverlay();
    await closeModule();
    window.setTimeout(() => openModule(index), 120);
}

document.addEventListener("click", (event) => {
    const folder = event.target.closest(".folder");
    if (!folder || activeModule) {
        return;
    }
    openModule(Number(folder.dataset.index));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (commandMode) {
            submitCommand();
            return;
        }
        handleSystemSubmit();
        event.preventDefault();
        return;
    }

    if (event.key === "Escape" && commandMode) {
        closeCommandOverlay();
        return;
    }

    if (commandMode) {
        if (event.key === "Backspace") {
            commandBuffer = commandBuffer.slice(0, -1);
            commandInput.value = commandBuffer;
            commandCopy.textContent = commandBuffer.toUpperCase() || "STATE TARGET";
            commandInput.focus();
            event.preventDefault();
            return;
        }

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            commandBuffer += event.key;
            commandInput.value = commandBuffer;
            commandCopy.textContent = commandBuffer.toUpperCase();
            commandInput.focus();
            event.preventDefault();
            return;
        }
    }

    if (terminalMode === "input" && !commandMode) {
        if (event.key === "Backspace") {
            terminalBuffer = terminalBuffer.slice(0, -1);
            terminalCopy.textContent = terminalBuffer.toUpperCase();
            systemInput.value = terminalBuffer;
            event.preventDefault();
            return;
        }

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            terminalBuffer += event.key;
            terminalCopy.textContent = terminalBuffer.toUpperCase();
            systemInput.value = terminalBuffer;
            systemInput.focus();
            event.preventDefault();
        }
    }
});

document.addEventListener("pointerdown", () => {
    if (commandMode) {
        commandInput.focus();
        return;
    }

    if (terminalMode === "input") {
        systemInput.focus();
    }
});

systemInput.addEventListener("input", () => {
    if (terminalMode === "input") {
        terminalBuffer = systemInput.value;
        terminalCopy.textContent = terminalBuffer.toUpperCase();
    }
});

backButton.addEventListener("click", closeModule);
searchToggle.addEventListener("click", openCommandOverlay);
themeToggle.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("theme-light") ? "dark" : "light");
});
commandInput.addEventListener("input", () => {
    if (commandMode) {
        commandBuffer = commandInput.value;
        commandCopy.textContent = commandBuffer.toUpperCase() || "STATE TARGET";
    }
});

applyTheme(window.localStorage.getItem("portfolio-theme") || "dark");
runTerminalIntro();
