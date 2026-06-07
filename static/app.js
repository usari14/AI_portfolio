const bootGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const modules = [
    {
        title: "Personal Info",
        panels: [
            ["Identity", "Usama. Frontend systems, austere interfaces, precise motion."],
            ["Focus", "High-end web experiences with deliberate state and clean geometry."],
            ["Location", "Available for remote collaborations and product-facing builds."],
            ["Stack", "Rust, JavaScript, CSS architecture, interactive motion systems."],
            ["Signal", "Minimal surface. Strong rhythm. Fast transitions."],
            ["Contact", "Purpose-driven access through the portfolio workspace."]
        ]
    },
    {
        title: "Habits",
        panels: [
            ["Daily System", "Plan, build, verify, refine. Repeat until the interface feels exact."],
            ["Learning", "Study UI mechanics, motion timing, backend fundamentals, and product taste."],
            ["Craft", "Small commits, clear folders, measured interactions."],
            ["Health", "Sustainable pace, focused blocks, deliberate reset time."],
            ["Review", "Inspect details before declaring a screen complete."],
            ["Principle", "Precision is a habit, not a pass at the end."]
        ]
    },
    {
        title: "Digital Footprint",
        panels: [
            ["Profile", "Curated presence across engineering, design, and product experiments."],
            ["GitHub", "Implementation notes, prototypes, and production-minded code."],
            ["LinkedIn", "Professional summary, experience, and collaboration context."],
            ["Writing", "Short-form thinking around interfaces and technical execution."],
            ["Proof", "Screens, repos, deployments, and measurable product work."],
            ["Reach", "Focused channels, low noise, clear intent."]
        ]
    },
    {
        title: "Shopify",
        panels: [
            ["Storefront", "Conversion-aware layouts with exact product hierarchy."],
            ["Theme Work", "Liquid sections, custom blocks, and maintainable styling."],
            ["Performance", "Lean assets, responsive media, measurable loading behavior."],
            ["Checkout Path", "Reduced friction through clear product and cart states."],
            ["Integrations", "Apps, tracking, inventory, and operational details."],
            ["Result", "Commerce surfaces that feel premium and stay practical."]
        ]
    },
    {
        title: "Websites",
        panels: [
            ["Portfolio", "Interactive personal presence with a controlled terminal entry."],
            ["Landing Pages", "Direct first viewport, strong visual signal, clean calls to action."],
            ["Dashboards", "Dense but readable layouts for repeated use."],
            ["Animation", "Purposeful motion tied to state, not decorative noise."],
            ["Responsive", "Stable geometry from mobile to wide desktop."],
            ["Delivery", "Clean structure, tested paths, deployable static surfaces."]
        ]
    },
    {
        title: "Rust",
        panels: [
            ["Server", "Actix host serving a fast static portfolio shell."],
            ["Systems", "Interest in safe, predictable backend foundations."],
            ["Tools", "Cargo workflows, clear modules, explicit data flow."],
            ["Interop", "Rust-backed services with frontend orchestration."],
            ["Reliability", "Small surface area, understandable behavior."],
            ["Next", "More service logic and typed APIs as the portfolio grows."]
        ]
    }
];

const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const terminalView = document.querySelector("#terminalView");
const workspaceView = document.querySelector("#workspaceView");
const terminalCopy = document.querySelector("#terminalCopy");
const terminalCaret = document.querySelector("#terminalCaret");
const inputLine = document.querySelector("#inputLine");
const systemInput = document.querySelector("#systemInput");
const workspaceGrid = document.querySelector("#workspaceGrid");
const detailView = document.querySelector("#detailView");
const schematicGrid = document.querySelector("#schematicGrid");
const backButton = document.querySelector("#backButton");

let activeModule = null;
let terminalMode = "boot";

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
    terminalCopy.className = "terminal-copy";
    terminalCopy.textContent = "";
    setGuideLine("460px");
    terminalCaret.className = "terminal-caret is-breathing";
    systemInput.value = "";
    systemInput.focus();
}

async function handleSystemSubmit() {
    if (terminalMode !== "input") {
        return;
    }

    const value = systemInput.value.trim();
    terminalMode = "processing";
    systemInput.blur();
    terminalCopy.textContent = value.toUpperCase();

    if (value.toLowerCase() !== "visit") {
        systemInput.value = "";
        terminalCopy.classList.add("is-processing");
        hideGuideLine();
        await sleep(320);
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
    schematicGrid.innerHTML = module.panels.map(([title, body], index) => {
        return `
            <article class="schematic-panel" style="--from-x: 0px; --from-y: 0px; --delay: ${index * 80}ms">
                <h2 class="panel-title">${title}</h2>
                <p class="panel-body">${body}</p>
            </article>
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
    detailView.classList.add("is-collapsing");
    detailView.classList.remove("is-active", "is-settled");

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
    }, 760);
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
        handleSystemSubmit();
    }
});

document.addEventListener("pointerdown", () => {
    if (terminalMode === "input") {
        systemInput.focus();
    }
});

systemInput.addEventListener("input", () => {
    if (terminalMode === "input") {
        terminalCopy.textContent = systemInput.value.toUpperCase();
    }
});

backButton.addEventListener("click", closeModule);

runTerminalIntro();
