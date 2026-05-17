# SkillForge - Portal de Certificaciones Técnicas

Aplicación web educativa para preparar certificaciones técnicas mediante repaso de preguntas tipo test, simulacros de examen, escenarios prácticos y revisión de conceptos clave.

---

## Certificaciones soportadas

| Proveedor | Certificación | Contenido |
|-----------|---------------|-----------|
| 🔴 Red Hat | **EX200** - Red Hat Certified System Administrator | 100 preguntas, 17 conceptos, 20 escenarios, práctica en vivo, consola interactiva |
| 🔷 Microsoft | **AI-900** - Azure AI Fundamentals | 100 preguntas, 15 conceptos clave |

---

## ¿Qué hace la aplicación?

### Portal de certificaciones
- Selecciona el **proveedor** (Red Hat, Microsoft...)
- Elige la **certificación** que quieres preparar
- Accede al menú de estudio con todas las opciones disponibles

### Modos de estudio (por certificación)
- **Modo Test**: Practica pregunta por pregunta con feedback inmediato, explicaciones detalladas y contador de aciertos y errores.
- **Simulacro de examen**: Responde todas las preguntas de golpe como en un examen real y obtén una valoración final con nota, mensaje motivador y listado de fallos.
- **Escenarios prácticos** (EX200): Practica paso a paso escenarios reales del examen (recuperar root, configurar red, crear LVM, SELinux, firewall, etc.) con comandos y pistas.
- **Práctica en vivo** (EX200): Simula un terminal Linux con animación de escritura de comandos reales del examen. Incluye ejemplos de uso y páginas **man** simuladas de cada comando.
- **Consola Viva** (EX200): Terminal interactivo donde **tú escribes los comandos**. Recibes una misión, escribes el comando en el terminal, y la app te dice si es correcto o incorrecto. Puedes usar `man <comando>` dentro del terminal para consultar ayuda.
- **Conceptos clave**: Consulta tarjetas con procedimientos prácticos y puntos clave de cada certificación.
- **Resumen final**: Al terminar cualquier modo, visualiza tu porcentaje de aciertos, preguntas falladas con la respuesta correcta y su explicación.
- **Revisión de Q&A**: Vista de solo lectura de todas las preguntas organizadas por categoría.
- **Revisión con IA**: Envía todas las preguntas a un modelo de IA (Ollama, OpenAI o Claude) para que verifique si las respuestas correctas son realmente correctas. La IA devuelve un informe con posibles errores y correcciones.

### Configuración de IA
- Accede al panel de configuración desde el botón ⚙️ en la parte superior derecha.
- Configura **Ollama** (local), **OpenAI** o **Claude (Anthropic)**.
- Cada proveedor tiene su propio formulario con test de conexión incluido.
- La configuración se guarda automáticamente en `localStorage`.
- Una vez configurado, ve a "Revisión QA" dentro de cualquier certificación y pulsa **"🤖 Revisar con IA"**.

---

## Cómo abrirla

No necesitas servidor ni dependencias externas. Solo necesitas un navegador moderno.

1. Descarga o clona esta carpeta.
2. Abre el archivo `index.html` directamente en tu navegador (doble clic o arrastrar a una pestaña).
3. ¡Listo! La aplicación funciona de inmediato.

---

## Estructura de datos

Todas las certificaciones se definen en el archivo `data/certifications.js` dentro del objeto `certifications`:

```javascript
const certifications = {
  redhat: {
    id: 'redhat',
    name: 'Red Hat',
    icon: '🔴',
    certifications: {
      ex200: {
        id: 'ex200',
        name: 'EX200 - Red Hat Certified System Administrator',
        shortName: 'EX200',
        description: '...',
        hasPractice: true,
        hasScenarios: true,
        hasConsole: true,
        hasLivePractice: true,
        questions: [...],
        concepts: [...],
        scenarios: [...],
        practiceCommands: [...],
        consoleMissions: [...],
        livePracticeTasks: [...]
      }
    }
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '🔷',
    certifications: {
      ai900: {
        id: 'ai900',
        name: 'AI-900 - Azure AI Fundamentals',
        shortName: 'AI-900',
        displayName: 'AI-900 / I900',
        description: '...',
        hasPractice: false,
        hasScenarios: false,
        hasConsole: false,
        hasLivePractice: false,
        questions: [...],
        concepts: [...]
      }
    }
  }
};
```

### Formato de preguntas

```javascript
{
  id: 1,
  category: "Tema X",
  level: "básico",           // o difficulty: "Fácil"
  question: "Texto de la pregunta",
  options: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correctAnswer: 0,
  explanation: "Explicación breve",
  command: "comando opcional"  // solo para EX200
}
```

### Formato de conceptos (EX200)

```javascript
{
  title: "Título del concepto",
  description: "Descripción del concepto.",
  commands: ["comando1", "comando2"],
  typicalError: "Error típico cometido.",
  checklist: ["Paso 1", "Paso 2", "Paso 3"]
}
```

### Formato de conceptos (AI-900)

```javascript
{
  title: "Título del concepto",
  description: "Descripción del concepto.",
  keyPoints: ["Punto clave 1", "Punto clave 2"]
}
```

---

## Cómo añadir una nueva certificación

1. Abre `data/certifications.js`.
2. Añade un nuevo proveedor o una nueva certificación bajo un proveedor existente.
3. Sigue la estructura del ejemplo anterior.
4. Asegúrate de incluir:
   - `questions`: array de preguntas tipo test
   - `concepts`: array de conceptos clave
   - `hasPractice`, `hasScenarios`, `hasConsole`, `hasLivePractice`: booleanos que indican qué modos están disponibles
5. Guarda el archivo y recarga `index.html`.

---

## Estructura de archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Estructura base de la aplicación. Carga los estilos y scripts. |
| `styles.css` | Estilos completos: diseño responsive, variables CSS, estados de respuesta, animaciones, portal, certificaciones, panel de configuración y revisión. |
| `script.js` | Lógica de la app: portal, menú de certificación, test, simulacro, conceptos, resumen y navegación. |
| `ai-config.js` | **Panel de configuración de IA y revisión con IA.** Gestiona Ollama, OpenAI, Claude y la vista de revisión de Q&A. |
| `data/certifications.js` | **Datos unificados de todas las certificaciones.** Contiene preguntas, conceptos, escenarios, prácticas y misiones. |
| `assets/icons/` | Carpeta reservada para futuros iconos. |
| `assets/images/` | Carpeta reservada para futuras imágenes. |

---

## Requisitos

- Navegador moderno con soporte para ES6 y CSS variables (Chrome, Firefox, Edge, Safari).
- No requiere conexión a internet.
- No requiere servidor web.
- Sin dependencias ni frameworks externos.

---

## Notas

- El orden de carga de scripts en `index.html` es importante: primero `certifications.js`, luego `ai-config.js` y finalmente `script.js`.
- Para usar la **revisión con IA**, configura al menos un proveedor en el panel ⚙️ y ve a "Revisión QA" dentro de cualquier certificación.
- Las preguntas del modo test se presentan en orden aleatorio cada vez que inicias una sesión.
- El simulacro exige responder todas las preguntas antes de poder finalizar.
- El progreso se guarda en `localStorage` por certificación, de forma independiente.
- La aplicación está preparada para añadir nuevos proveedores y certificaciones sin modificar la lógica de presentación.
