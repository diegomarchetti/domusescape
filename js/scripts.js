// Funzione per generare particelle cyberpunk
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        // Variazioni di colore per le particelle
        const colors = ['#00ff88', '#00ccff', '#ff0040', '#ffff00'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Effetto glitch occasionale sul contenuto
function glitchEffect() {
    const content = document.querySelector('.content');
    if (!content) return;
    
    content.style.transform = 'translateX(' + (Math.random() * 4 - 2) + 'px)';
    content.style.filter = 'hue-rotate(' + (Math.random() * 10) + 'deg)';
    
    setTimeout(() => {
        content.style.transform = 'translateX(0)';
        content.style.filter = 'hue-rotate(0deg)';
    }, 100);
}

// Effetto glitch per il titolo (per la pagina premessa)
function glitchTitle() {
    const title = document.querySelector('.title');
    if (!title) return;
    
    title.style.transform = 'translateX(' + (Math.random() * 4 - 2) + 'px)';
    title.style.filter = 'hue-rotate(' + (Math.random() * 20) + 'deg)';
    
    setTimeout(() => {
        title.style.transform = 'translateX(0)';
        title.style.filter = 'hue-rotate(0deg)';
    }, 150);
}

// Effetto typing per il testo (opzionale)
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Effetto di comparsa graduale per gli elementi
function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Suoni cyberpunk simulati con vibrazione (mobile)
function cyberpunkVibration(pattern = [50]) {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

// Effetto hover sui pulsanti con feedback
function initializeButtonEffects() {
    document.querySelectorAll('.choice-button, .start-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            cyberpunkVibration([30]);
        });
        
        button.addEventListener('click', function() {
            cyberpunkVibration([50, 30, 50]);
        });
    });
}

// Sistema di salvataggio progressi
function saveProgress(sectionNumber) {
    localStorage.setItem('domusProgress', JSON.stringify({
        section: sectionNumber,
        timestamp: Date.now(),
        playerName: 'Paziente 2847'
    }));
}

function getSavedProgress() {
    const saved = localStorage.getItem('domusProgress');
    return saved ? JSON.parse(saved) : null;
}

function clearProgress() {
    localStorage.removeItem('domusProgress');
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('it-IT') + ' alle ' + date.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'});
}

// Rileva automaticamente il numero della sezione dalla pagina corrente
function getCurrentSectionNumber() {
    const path = window.location.pathname;
    const match = path.match(/sezione-(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

// Salva automaticamente quando si visita una sezione
function autoSaveProgress() {
    const sectionNumber = getCurrentSectionNumber();
    if (sectionNumber) {
        saveProgress(sectionNumber);
        console.log(`Progresso salvato: Sezione ${sectionNumber}`);
    }
}

// Mostra il popup di ripresa nella pagina principale
function showResumeOption() {
    const savedProgress = getSavedProgress();
    if (!savedProgress) return;
    
    // Controlla se siamo nella pagina principale
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const resumePopup = document.createElement('div');
        resumePopup.className = 'resume-popup';
        resumePopup.innerHTML = `
            <div class="resume-content">
                <h3>SESSIONE TROVATA</h3>
                <p>È stata rilevata una sessione precedente:</p>
                <div class="progress-info">
                    <span class="progress-section">SEZIONE ${savedProgress.section}</span>
                    <span class="progress-time">Salvata il ${formatTimestamp(savedProgress.timestamp)}</span>
                </div>
                <div class="resume-buttons">
                    <button onclick="resumeGame()" class="resume-btn">RIPRENDI AVVENTURA</button>
                    <button onclick="startNewGame()" class="new-game-btn">NUOVA AVVENTURA</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(resumePopup);
        
        // Nascondi il pulsante start normale
        const startButton = document.querySelector('.start-button');
        if (startButton) {
            startButton.style.display = 'none';
        }
    }
}

// Funzioni per i pulsanti del popup
function resumeGame() {
    const savedProgress = getSavedProgress();
    if (savedProgress) {
        window.location.href = `sezione-${savedProgress.section}.html`;
    }
}

function startNewGame() {
    clearProgress();
    const popup = document.querySelector('.resume-popup');
    if (popup) {
        popup.remove();
    }
    
    // Mostra di nuovo il pulsante start
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.style.display = 'inline-block';
    }
}

// Funzione per simulare il typing di comandi (per sezioni speciali)
function simulateTerminal(elementId, commands, delay = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let commandIndex = 0;
    
    function executeCommand() {
        if (commandIndex < commands.length) {
            const command = commands[commandIndex];
            typeWriter(element, command.text, command.speed || 30);
            
            setTimeout(() => {
                commandIndex++;
                executeCommand();
            }, delay);
        }
    }
    
    executeCommand();
}

// Effetto di scanline intensificato per momenti di tensione
function intensifyScanlines() {
    const body = document.body;
    body.style.setProperty('--scanline-intensity', '0.08');
    
    setTimeout(() => {
        body.style.setProperty('--scanline-intensity', '0.03');
    }, 3000);
}

// Monitor del battito cardiaco simulato (per sezioni mediche)
function simulateHeartbeat(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    setInterval(() => {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }, 1000);
}

// Effetto di allarme rosso per situazioni di emergenza
function activateRedAlert() {
    const body = document.body;
    body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
        body.style.filter = 'hue-rotate(0deg)';
    }, 200);
    
    setTimeout(() => {
        body.style.filter = 'hue-rotate(180deg)';
    }, 400);
    
    setTimeout(() => {
        body.style.filter = 'hue-rotate(0deg)';
    }, 600);
}

// Sistema di notifiche cyberpunk
function showCyberpunkNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `cyberpunk-notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 136, 0.9);
        color: #000;
        padding: 1rem;
        border-radius: 5px;
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = 'rgba(255, 0, 64, 0.9)';
        notification.style.color = '#fff';
    } else if (type === 'warning') {
        notification.style.background = 'rgba(255, 255, 0, 0.9)';
        notification.style.color = '#000';
    }
    
    document.body.appendChild(notification);
    
    // Animazione di entrata
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Rimozione automatica
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Preloader per le transizioni tra pagine
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loading-text">CARICAMENTO...</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        font-family: 'Orbitron', monospace;
        color: #00ff88;
    `;
    
    document.body.appendChild(preloader);
    
    // Rimuovi dopo 2 secondi
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }, 2000);
}

// Esporta funzioni per uso globale
window.cyberpunkEffects = {
    createParticles,
    glitchEffect,
    glitchTitle,
    typeWriter,
    simulateTerminal,
    intensifyScanlines,
    simulateHeartbeat,
    activateRedAlert,
    showCyberpunkNotification,
    showPreloader
};

// ============================================================================
// SISTEMA MODALITÀ IMMERSIVA CON TABLET MEDiOS
// ============================================================================

class ImmersiveModeSystem {
    constructor() {
        this.isFullscreen = false;
        this.konamiCode = [];
        this.konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.easterEggs = {
            activated: false,
            found: JSON.parse(localStorage.getItem('domusEasterEggs') || '[]')
        };
        this.init();
    }

    init() {
        this.createImmersiveControls();
        this.setupEasterEggs();
    }

    // 📱 CONTROLLI IMMERSIVI
    createImmersiveControls() {
        // Rimuovi controlli esistenti se presenti
        const existing = document.getElementById('immersive-controls');
        if (existing) existing.remove();

        const controlPanel = document.createElement('div');
        controlPanel.id = 'immersive-controls';
        controlPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9998;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff88;
            border-radius: 5px;
            padding: 0.5rem;
            font-family: 'Orbitron', monospace;
            font-size: 0.7rem;
            color: #00ff88;
            opacity: 0.3;
            transform: scale(0.8);
            transition: all 0.3s ease;
            max-width: 200px;
        `;

        // Fullscreen button
        const fullscreenBtn = document.createElement('div');
        fullscreenBtn.style.cssText = `
            cursor: pointer;
            padding: 0.3rem;
            margin: 0.2rem 0;
            border: 1px solid transparent;
            border-radius: 3px;
            transition: all 0.2s ease;
        `;
        fullscreenBtn.textContent = '🖥️ MODALITÀ IMMERSIVA';
        
        fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        fullscreenBtn.addEventListener('mouseenter', () => {
            fullscreenBtn.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
            fullscreenBtn.style.borderColor = '#00ff88';
        });
        fullscreenBtn.addEventListener('mouseleave', () => {
            fullscreenBtn.style.backgroundColor = 'transparent';
            fullscreenBtn.style.borderColor = 'transparent';
        });

        // Tablet button
        const tabletBtn = document.createElement('div');
        tabletBtn.style.cssText = fullscreenBtn.style.cssText;
        tabletBtn.textContent = '📱 USA TABLET';
        
        tabletBtn.addEventListener('click', () => this.openTablet());
        tabletBtn.addEventListener('mouseenter', () => {
            tabletBtn.style.backgroundColor = 'rgba(0, 204, 255, 0.2)';
            tabletBtn.style.borderColor = '#00ccff';
        });
        tabletBtn.addEventListener('mouseleave', () => {
            tabletBtn.style.backgroundColor = 'transparent';
            tabletBtn.style.borderColor = 'transparent';
        });

        // Easter eggs counter
        const eggCounter = document.createElement('div');
        eggCounter.style.cssText = `
            font-size: 0.6rem;
            color: #ffff00;
            margin-top: 0.5rem;
            text-align: center;
        `;
        eggCounter.textContent = `🥚 SEGRETI: ${this.easterEggs.found.length}/10`;

        controlPanel.appendChild(fullscreenBtn);
        controlPanel.appendChild(tabletBtn);
        controlPanel.appendChild(eggCounter);
        document.body.appendChild(controlPanel);

        // Show on hover
        controlPanel.addEventListener('mouseenter', () => {
            controlPanel.style.opacity = '1';
            controlPanel.style.transform = 'scale(1)';
        });
        controlPanel.addEventListener('mouseleave', () => {
            controlPanel.style.opacity = '0.3';
            controlPanel.style.transform = 'scale(0.8)';
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                this.isFullscreen = true;
                this.activateImmersiveEffects();
                this.showNotification('MODALITÀ IMMERSIVA ATTIVATA', 'success');
            }).catch(err => {
                console.log('Errore fullscreen:', err);
                this.showNotification('FULLSCREEN NON SUPPORTATO', 'error');
            });
        } else {
            document.exitFullscreen().then(() => {
                this.isFullscreen = false;
                this.deactivateImmersiveEffects();
                this.showNotification('MODALITÀ NORMALE RIPRISTINATA', 'info');
            });
        }
    }

    activateImmersiveEffects() {
        document.body.style.setProperty('--scanline-intensity', '0.08');
        
        const overlay = document.createElement('div');
        overlay.id = 'immersive-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1001;
            background: radial-gradient(circle at center, transparent 40%, rgba(0, 255, 136, 0.05) 100%);
            animation: immersive-pulse 4s ease-in-out infinite;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes immersive-pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(overlay);

        const audioControl = document.getElementById('audio-control');
        if (audioControl) audioControl.style.display = 'none';
    }

    deactivateImmersiveEffects() {
        document.body.style.setProperty('--scanline-intensity', '0.03');
        
        const overlay = document.getElementById('immersive-overlay');
        if (overlay) overlay.remove();

        const audioControl = document.getElementById('audio-control');
        if (audioControl) audioControl.style.display = 'block';
    }

    // 📱 SISTEMA TABLET MEDiOS
    openTablet() {
        const tabletOverlay = document.createElement('div');
        tabletOverlay.id = 'tablet-overlay';
        tabletOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            background-image: url('images/tablet-background.jpg');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-blend-mode: normal;
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const tablet = document.createElement('div');
        tablet.id = 'medios-tablet';
        tablet.style.cssText = `
            width: 800px;
            height: 600px;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            border-radius: 20px;
            border: 4px solid #34495e;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
            position: relative;
            overflow: hidden;
        `;

        const screen = document.createElement('div');
        screen.style.cssText = `
            width: calc(100% - 40px);
            height: calc(100% - 40px);
            margin: 20px;
            background: #000;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
        `;

        const terminal = document.createElement('div');
        terminal.id = 'medios-terminal';
        terminal.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #001122, #002244);
            color: #00ff88;
            font-family: 'Roboto Mono', monospace;
            font-size: 14px;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
            position: relative;
            display: flex;
            flex-direction: column;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            color: #00ccff;
            font-weight: bold;
            margin-bottom: 20px;
            border-bottom: 1px solid #00ff88;
            padding-bottom: 10px;
            flex-shrink: 0;
        `;
        header.innerHTML = `
            MEDiOS Terminal v2.1 - DOMUS SALUTIS<br>
            Sistema Operativo: MEDiOS-Core 2045.7.A<br>
            Utente: medios\\paziente_2847<br>
            <span style="color: #ffff00;">ATTENZIONE: Accesso limitato - Solo comandi autorizzati</span>
        `;

        const content = document.createElement('div');
        content.id = 'terminal-content';
        content.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding-bottom: 10px;
        `;

        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            flex-shrink: 0;
            margin-top: 10px;
        `;

        const inputLine = document.createElement('div');
        inputLine.style.cssText = `
            display: flex;
            align-items: center;
        `;

        const prompt = document.createElement('span');
        prompt.textContent = 'C:\\MEDIOS> ';
        prompt.style.color = '#00ff88';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'terminal-input';
        input.style.cssText = `
            background: transparent;
            border: none;
            outline: none;
            color: #00ff88;
            font-family: 'Roboto Mono', monospace;
            font-size: 14px;
            flex: 1;
            margin-left: 5px;
        `;

        const cursor = document.createElement('span');
        cursor.style.cssText = `
            background: #00ff88;
            color: #000;
            animation: cursor-blink 1s infinite;
            margin-left: 2px;
            width: 8px;
            height: 16px;
            display: inline-block;
        `;
        cursor.textContent = ' ';
 
        inputLine.appendChild(prompt);
        inputLine.appendChild(input);
        inputLine.appendChild(cursor);
        inputContainer.appendChild(inputLine);

        terminal.appendChild(header);
        terminal.appendChild(content);
        terminal.appendChild(inputContainer);
        screen.appendChild(terminal);
        tablet.appendChild(screen);
        tabletOverlay.appendChild(tablet);
        document.body.appendChild(tabletOverlay);

        this.initTabletCommands(input, content);
        input.focus();

        const exitHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeTablet();
                document.removeEventListener('keydown', exitHandler);
            }
        };
        document.addEventListener('keydown', exitHandler);

        // Messaggio di benvenuto
        this.addTerminalLine(content, 'Tablet MEDiOS connesso. Digita "help" o "exit" per uscire.');
        this.addTerminalLine(content, ''); // Linea vuota per separazione
        
        // Scroll automatico in basso
        setTimeout(() => {
            content.scrollTop = content.scrollHeight;
        }, 100);
    }

    closeTablet() {
        const overlay = document.getElementById('tablet-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    initTabletCommands(input, content) {
        const commands = {
            'help': () => {
                return `Comandi disponibili:
help        - Mostra questo elenco
ls / dir    - Elenca directory
cd          - Cambia directory
whoami      - Mostra utente corrente
cls / clear - Pulisce schermo
sysinfo     - Informazioni sistema
patients    - Database pazienti
exit        - Chiudi tablet`;
            },

            'ls': () => this.getDirectoryListing(),
            'dir': () => this.getDirectoryListing(),
            'whoami': () => 'medios\\paziente_2847',
            'cls': () => 'CLEAR',
            'clear': () => 'CLEAR',

            'cd': (args) => {
                if (args.length === 0) return 'Directory corrente: C:\\MEDIOS';
                return `Directory cambiata: ${args[0]}`;
            },

            'sysinfo': () => {
                return `Sistema MEDiOS v2.1
Processore: Neural-Core i9-2045
RAM: 64GB DDR6-Neural
Storage: 2TB SSD-Quantum
Rete: MEDiOS-Net Secure
Status: OPERATIVO
Protocollo: Emergenza 7-A ATTIVO`;
            },

            'patients': () => {
                return `DATABASE PAZIENTI - Accesso Limitato
ID: 2847 - Status: ANOMALIA RILEVATA
ID: 1124 - Status: STABILIZZATO  
ID: 0093 - Status: IN TERAPIA
ID: 2156 - Status: TRASFERITO
[ACCESSO NEGATO - Privileggi insufficienti]`;
            },

            // CHEAT CODES (nascosti dall'help)
            'konami': () => {
                this.unlockEasterEgg('konami_code');
                this.activateGodMode();
                return '🎮 CODICE KONAMI ATTIVATO! God Mode abilitato.';
            },

            'medios': () => {
                this.unlockEasterEgg('medios_typed');
                this.showSecretMessage('MEDiOS: "Qualcuno mi ha chiamato?"');
                return '🤖 MEDiOS: "Hai invocato il mio nome, paziente 2847."';
            },

            'domus': () => {
                this.unlockEasterEgg('domus_typed');
                this.showSecretMessage('🏥 SISTEMA: Glitch rilevato nel nome struttura.');
                return '🏥 SISTEMA: Glitch rilevato nel nome struttura.';
            },

            'hippocrates': () => {
                this.unlockEasterEgg('doctor_code');
                return '⚕️ GIURAMENTO DI IPPOCRATE: "Primum non nocere" - Accesso medico abilitato.';
            },

            '2847': () => {
                this.unlockEasterEgg('patient_number');
                this.activatePatientMode();
                return '🆔 IDENTIFICATIVO PAZIENTE: Riconoscimento biometrico completato.';
            },

            'unlock': () => {
                this.unlockEasterEgg('tablet_master');
                return '🔓 FUNZIONI AVANZATE: Alcune restrizioni sono state rimosse.';
            },

            'exit': () => {
                this.closeTablet();
                return '';
            }
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim().toLowerCase();
                const args = command.split(' ').slice(1);
                const cmd = command.split(' ')[0];

                // Aggiungi comando digitato al terminale
                this.addTerminalLine(content, `C:\\MEDIOS> ${input.value}`, '#00ccff');

                if (commands[cmd]) {
                    const result = commands[cmd](args);
                    if (result === 'CLEAR') {
                        content.innerHTML = '';
                    } else if (result) {
                        this.addTerminalLine(content, result);
                    }
                } else if (cmd) { // Solo se è stato digitato qualcosa
                    this.addTerminalLine(content, `'${cmd}' non è riconosciuto come comando interno o esterno.`, '#ff0040');
                }

                // Aggiungi linea vuota per separazione
                this.addTerminalLine(content, '');

                input.value = '';
                
                // Scroll automatico verso il basso per mantenere sempre visibile l'ultimo comando
                setTimeout(() => {
                    content.scrollTop = content.scrollHeight;
                }, 50);
            }
        });
    }

    getDirectoryListing() {
        return `Directory di C:\\MEDIOS

<DIR>          PATIENTS
<DIR>          SYSTEM  
<DIR>          LOGS
<DIR>          CONFIG
               MEDIOS.EXE       2,847 KB
               PROTOCOL.DAT     1,024 KB
               EMERGENCY.LOG      512 KB
               PATIENT_2847.TXT   256 KB

4 directory    4 file`;
    }

    addTerminalLine(content, text, color = '#00ff88') {
        const line = document.createElement('div');
        line.style.color = color;
        line.style.marginBottom = '5px';
        line.style.whiteSpace = 'pre-wrap';
        line.textContent = text;
        content.appendChild(line);
    }

    // 🥚 EASTER EGGS SYSTEM
    setupEasterEggs() {
        this.setupClickEasterEggs();
        this.injectCodeEasterEggs();
    }

    setupClickEasterEggs() {
        let headerClickCount = 0;
        let headerLastClick = 0;
        
        document.addEventListener('click', (e) => {
            const header = e.target.closest('.medical-header, .finale-header');
            if (header) {
                const now = Date.now();
                if (now - headerLastClick < 500) {
                    headerClickCount++;
                    console.log(`Header clicks: ${headerClickCount}/3`);
                    if (headerClickCount >= 3) {
                        this.unlockEasterEgg('header_secret');
                        this.showSecretMessage('🏥 ACCESSO AMMINISTRATORE CONCESSO!');
                        headerClickCount = 0;
                    }
                } else {
                    headerClickCount = 1;
                }
                headerLastClick = now;
            }
        });

        // Combinazione tasti speciale
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyH') {
                e.preventDefault();
                this.unlockEasterEgg('key_combo');
                this.showSecretMessage('🔑 COMBINAZIONE SEGRETA ATTIVATA!');
                this.activateHiddenMode();
            }
        });
    }

    injectCodeEasterEggs() {
        const hiddenComment = document.createComment(`
            🥚 EASTER EGG TROVATO! 🥚
            Se stai leggendo questo, sei un vero detective!
            Codice segreto: PAZIENTE_2847_LIBERO
            Hai trovato il segreto nascosto nel codice!
        `);
        document.head.appendChild(hiddenComment);

        const hiddenDiv = document.createElement('div');
        hiddenDiv.id = 'secret-code-2847';
        hiddenDiv.style.display = 'none';
        hiddenDiv.setAttribute('data-secret', 'PAZIENTE_2847_LIBERO');
        hiddenDiv.textContent = 'Easter Egg: Se vedi questo nel codice, hai trovato il segreto!';
        document.body.appendChild(hiddenDiv);

        let sourceViewed = false;
        
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'u') {
                console.log('🔍 View Source rilevato!');
                setTimeout(() => {
                    if (!sourceViewed) {
                        sourceViewed = true;
                        this.unlockEasterEgg('source_code');
                        this.showSecretMessage('📄 CODICE SORGENTE ESPLORATO!');
                        console.log('📄 SOURCE CODE EASTER EGG ATTIVATO!');
                    }
                }, 500);
            }
        });

        let devtools = {open: false};
        const threshold = 160;

        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.unlockEasterEgg('devtools_detective');
                    console.log('%c🔍 DETECTIVE DIGITALE RILEVATO!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
                    console.log('%c💡 SUGGERIMENTO: Cerca l\'elemento con id="secret-code-2847" nel DOM!', 'color: #00ccff;');
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }

    unlockEasterEgg(eggId) {
        if (!this.easterEggs.found.includes(eggId)) {
            this.easterEggs.found.push(eggId);
            localStorage.setItem('domusEasterEggs', JSON.stringify(this.easterEggs.found));
            
            const messages = {
                'konami_code': '🎮 CHEAT CODE ATTIVATO!',
                'medios_typed': '🤖 MEDiOS HA SENTITO IL SUO NOME!',
                'domus_typed': '🏥 GLITCH NEL SISTEMA!',
                'devtools_detective': '🔍 DETECTIVE DEL CODICE!',
                'source_code': '📄 ESPLORATORE DEL CODICE!',
                'patient_number': '🆔 NUMERO PAZIENTE RICONOSCIUTO!',
                'doctor_code': '⚕️ CODICE MEDICO ATTIVATO!',
                'key_combo': '🔑 COMBINAZIONE SEGRETA!',
                'header_secret': '🏥 ACCESSO AMMINISTRATORE!',
                'tablet_master': '📱 MASTER DEL TABLET!'
            };
            
            this.showNotification(messages[eggId] || '🥚 SEGRETO SBLOCCATO!', 'easter-egg');
            this.updateEasterEggCounter();
            
            if (window.cyberpunkAudio) {
                window.cyberpunkAudio.playAlertSound();
            }
        }
    }

    updateEasterEggCounter() {
        const counter = document.querySelector('#immersive-controls div:last-child');
        if (counter) {
            counter.textContent = `🥚 SEGRETI: ${this.easterEggs.found.length}/10`;
            
            if (this.easterEggs.found.length === 10) {
                counter.style.color = '#ff0040';
                counter.textContent = '🏆 MASTER HACKER!';
                this.unlockMasterAchievement();
            }
        }
    }

    // EFFETTI SPECIALI
    activateGodMode() {
        document.body.style.filter = 'hue-rotate(180deg) saturate(150%)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        this.showNotification('GOD MODE ATTIVATO PER 3 SECONDI!', 'success');
    }

    activatePatientMode() {
        document.body.style.filter = 'sepia(0.3) hue-rotate(120deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    }

    activateHiddenMode() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            if (Math.random() < 0.1) {
                el.style.opacity = '0.5';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 1000);
            }
        });
    }

    showGlitchEffect() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                document.body.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
                setTimeout(() => {
                    document.body.style.transform = 'translateX(0)';
                }, 100);
            }, i * 200);
        }
    }

    showSecretMessage(message) {
        const secretDiv = document.createElement('div');
        secretDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #00ff88;
            padding: 2rem;
            border: 2px solid #00ff88;
            border-radius: 10px;
            font-family: 'Orbitron', monospace;
            z-index: 10001;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        secretDiv.textContent = message;
        document.body.appendChild(secretDiv);
        
        setTimeout(() => secretDiv.remove(), 3000);
    }

    unlockMasterAchievement() {
        this.showNotification('🏆 ACHIEVEMENT: MASTER HACKER UNLOCKED!', 'master');
        
        document.body.style.background = 'linear-gradient(45deg, #0a0a0a, #1a1a2e, #16213e, #ff0040)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'master-gradient 10s ease infinite';
        
        const masterStyle = document.createElement('style');
        masterStyle.textContent = `
            @keyframes master-gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes cursor-blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(masterStyle);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            'info': '#00ff88',
            'success': '#00ccff',
            'error': '#ff0040',
            'easter-egg': '#ffff00',
            'master': '#ff0040'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: ${colors[type]};
            padding: 1rem;
            border: 2px solid ${colors[type]};
            border-radius: 5px;
            font-family: 'Orbitron', monospace;
            z-index: 10002;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ============================================================================
// INIZIALIZZAZIONE
// ============================================================================

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    // Crea le particelle
    createParticles();
    
    // Inizializza effetti sui pulsanti
    initializeButtonEffects();
    
    // Effetto di comparsa graduale
    fadeInElements();
    
    // Sistema di salvataggio automatico
    autoSaveProgress();
    
    // Mostra opzione di ripresa nella pagina principale
    showResumeOption();
    
    // Glitch casuale ogni 10-30 secondi per il contenuto
    setInterval(() => {
        if (Math.random() < 0.3) {
            glitchEffect();
        }
    }, Math.random() * 20000 + 10000);
    
    // Glitch casuale per il titolo (solo nella pagina premessa)
    setInterval(() => {
        if (Math.random() < 0.3) {
            glitchTitle();
        }
    }, Math.random() * 15000 + 15000);
});

// Inizializza il sistema immersivo
if (!window.immersiveSystem) {
    window.immersiveSystem = new ImmersiveModeSystem();
}

// Reinizializza su ogni pagina
document.addEventListener('DOMContentLoaded', function() {
    if (!window.immersiveSystem) {
        window.immersiveSystem = new ImmersiveModeSystem();
    } else {
        const existing = document.getElementById('immersive-controls');
        if (existing) existing.remove();
        window.immersiveSystem.createImmersiveControls();
        window.immersiveSystem.updateEasterEggCounter();
    }
});

// Esporta per uso globale
if (window.cyberpunkEffects) {
    window.cyberpunkEffects.immersive = () => window.immersiveSystem;
}