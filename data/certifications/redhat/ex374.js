module.exports = {
  ex374: {
    id: 'ex374',
    name: 'EX374 - Red Hat Certified Specialist in Developing Automation with Ansible Automation Platform',
    shortName: 'EX374',
    displayName: 'EX374',
    description: 'Developing Automation with AAP: Automation Controller, Execution Environments, Collections, Workflows, RBAC y gestión avanzada de Ansible Automation Platform.',
    hasPractice: true,
    hasScenarios: true,
    hasConsole: true,
    hasLivePractice: true,
    questions: [
      { id: 1, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Cuál es el componente central de Ansible Automation Platform que gestiona y ejecuta jobs de Ansible?", options: ["Automation Hub", "Automation Controller", "Private Hub", "Execution Environment"], correctAnswer: 1, explanation: "Automation Controller (antes llamado AWX/Tower) es el componente que gestiona inventarios, credenciales, proyectos y la ejecución de playbooks en AAP." },
      { id: 2, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Qué es un Job Template en Automation Controller?", options: ["Una plantilla de inventario", "Una definición reutilizable de cómo ejecutar un playbook con su inventario, credenciales y configuración", "Un script de Python", "Un archivo de roles"], correctAnswer: 1, explanation: "Un Job Template define todos los parámetros necesarios para ejecutar un playbook: proyecto, playbook, inventario, credenciales, variables extra y opciones de ejecución." },
      { id: 3, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Qué es una Organización en Automation Controller?", options: ["Un grupo de usuarios del sistema operativo", "Una unidad lógica que agrupa usuarios, equipos, proyectos e inventarios para administración y RBAC", "Un tipo de credencial", "Un nodo de ejecución"], correctAnswer: 1, explanation: "Las organizaciones permiten aislar y administrar recursos (proyectos, inventarios, credenciales, job templates) y aplicar permisos basados en roles (RBAC) a grupos de usuarios." },
      { id: 4, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Qué tipo de inventario en Automation Controller se sincroniza automáticamente desde una fuente externa como un repositorio Git?", options: ["Inventario estático", "Inventario dinámico con script", "Inventario de proyecto", "Inventario construido"], correctAnswer: 2, explanation: "Un inventario de proyecto (Smart o construido) puede sincronizarse automáticamente desde un repositorio de Git gestionado como un proyecto en Automation Controller." },
      { id: 5, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué son los Workflow Job Templates en Automation Controller?", options: ["Plantillas que solo ejecutan scripts de shell", "Plantillas que encadenan múltiples Job Templates con lógica condicional de éxito, fallo o siempre", "Plantillas sin inventario asignado", "Plantillas exclusivas para actualizar colecciones"], correctAnswer: 1, explanation: "Los Workflow Job Templates permiten encadenar Job Templates en un flujo de trabajo donde cada nodo se ejecuta según el resultado del anterior: success, failure o always." },
      { id: 6, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué es una Survey en un Job Template de Automation Controller?", options: ["Un cuestionario que recoge variables extra del usuario antes de ejecutar el job", "Un tipo de inventario dinámico", "Una herramienta de análisis de logs", "Un método de sincronización de proyectos"], correctAnswer: 0, explanation: "Las Surveys permiten definir un formulario interactivo que solicita variables al usuario al lanzar un job, sin que este necesite conocer la sintaxis YAML o los playbooks." },
      { id: 7, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Cuál es la función de las credenciales en Automation Controller?", options: ["Almacenar secretos como contraseñas, claves SSH y tokens de API de forma segura para su uso en jobs", "Definir la estructura del inventario", "Gestionar roles de Ansible Galaxy", "Configurar la red del nodo de ejecución"], correctAnswer: 0, explanation: "Las credenciales almacenan de forma cifrada contraseñas, claves privadas SSH, tokens de API, certificados y otros secretos necesarios para que los jobs accedan a hosts o servicios externos." },
      { id: 8, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué permite configurar la opción 'Privilege Escalation' en las credenciales de máquina?", options: ["La contraseña de sudo o become para la escalada de privilegios durante la ejecución del playbook", "La clave API de un proveedor cloud", "El nivel de logging del job", "El número máximo de hosts del inventario"], correctAnswer: 0, explanation: "La opción Privilege Escalation (become) en las credenciales de máquina almacena la contraseña de sudo o equivalente, necesaria cuando las tareas del playbook requieren escalado de privilegios." },
      { id: 9, certification: "ex374", category: "Automation Controller", difficulty: "Avanzado", question: "¿Qué es RBAC en el contexto de Automation Controller?", options: ["Un lenguaje de scripting", "Un sistema de control de acceso basado en roles que asigna permisos específicos a usuarios o equipos sobre los recursos", "Un tipo de credencial", "Un método de actualización automática"], correctAnswer: 1, explanation: "RBAC (Role-Based Access Control) permite asignar roles como Admin, Execute, Use, Read o Update a usuarios o equipos sobre recursos concretos (organizaciones, proyectos, inventarios, job templates)." },
      { id: 10, certification: "ex374", category: "Automation Controller", difficulty: "Avanzado", question: "¿Qué es un Instance Group en Automation Controller?", options: ["Un grupo de hosts del inventario", "Un conjunto de nodos de ejecución que puede asignarse a organizaciones o job templates para controlar dónde se ejecutan los jobs", "Un grupo de credenciales", "Una agrupación lógica de usuarios"], correctAnswer: 1, explanation: "Los Instance Groups permiten agrupar nodos de ejecución y asignarlos a organizaciones, inventarios o job templates específicos, controlando así la infraestructura de ejecución." },
      { id: 11, certification: "ex374", category: "Execution Environments", difficulty: "Fácil", question: "¿Qué es un Execution Environment (EE) en Ansible Automation Platform?", options: ["Un host remoto donde se ejecutan las tareas", "Un contenedor OCI que incluye Ansible, colecciones, dependencias Python y del sistema necesarias para ejecutar playbooks", "Un tipo de inventario", "Un nodo del Controller"], correctAnswer: 1, explanation: "Un Execution Environment es una imagen de contenedor que encapsula Ansible, las colecciones necesarias y sus dependencias, garantizando entornos de ejecución consistentes y portables." },
      { id: 12, certification: "ex374", category: "Execution Environments", difficulty: "Fácil", question: "¿Qué herramienta se utiliza para construir Execution Environments?", options: ["ansible-playbook", "ansible-builder", "podman build", "ansible-galaxy"], correctAnswer: 1, explanation: "ansible-builder es la herramienta oficial para crear Execution Environments a partir de un archivo de definición (execution-environment.yml) que especifica colecciones, dependencias Python y del sistema." },
      { id: 13, certification: "ex374", category: "Execution Environments", difficulty: "Fácil", question: "¿Cuál es el archivo de definición que utiliza ansible-builder para construir un EE?", options: ["requirements.yml", "execution-environment.yml", "Dockerfile", "ansible.cfg"], correctAnswer: 1, explanation: "ansible-builder usa execution-environment.yml como archivo de definición principal, donde se especifica la imagen base, las colecciones requeridas, las dependencias Python y del sistema." },
      { id: 14, certification: "ex374", category: "Execution Environments", difficulty: "Medio", question: "¿Cuáles son las secciones principales del archivo execution-environment.yml?", options: ["hosts, tasks, vars", "version, build_arg_defaults, ansible_config, dependencies, additional_build_steps", "collections, roles, modules", "image, run, cmd"], correctAnswer: 1, explanation: "execution-environment.yml puede contener: version (formato), build_arg_defaults, ansible_config, dependencies (galaxy, python, system) y additional_build_steps para personalización." },
      { id: 15, certification: "ex374", category: "Execution Environments", difficulty: "Medio", question: "¿Qué sección de execution-environment.yml especifica las colecciones de Galaxy necesarias para el EE?", options: ["dependencies.python", "dependencies.galaxy", "additional_build_steps", "build_arg_defaults"], correctAnswer: 1, explanation: "La sección dependencies.galaxy apunta a un archivo requirements.yml que lista las colecciones de Ansible Galaxy o Automation Hub que se instalarán en el EE." },
      { id: 16, certification: "ex374", category: "Execution Environments", difficulty: "Medio", question: "¿Qué herramienta permite ejecutar playbooks con Execution Environments desde la línea de comandos?", options: ["ansible-playbook", "ansible-navigator", "ansible-runner", "podman run"], correctAnswer: 1, explanation: "ansible-navigator es la herramienta de línea de comandos que reemplaza a ansible-playbook para ejecutar playbooks dentro de Execution Environments, con una interfaz TUI avanzada." },
      { id: 17, certification: "ex374", category: "Execution Environments", difficulty: "Avanzado", question: "¿Qué hace el comando 'ansible-builder create' a diferencia de 'ansible-builder build'?", options: ["create instala las colecciones; build actualiza el inventario", "create genera el contexto de construcción (Containerfile y archivos) sin construir la imagen; build construye la imagen completa", "create solo genera requirements.txt; build ejecuta el playbook", "create y build son equivalentes"], correctAnswer: 1, explanation: "ansible-builder create genera el directorio context con el Containerfile y archivos necesarios pero no construye la imagen. ansible-builder build realiza ambos pasos: genera el contexto y construye la imagen." },
      { id: 18, certification: "ex374", category: "Automation Hub", difficulty: "Fácil", question: "¿Qué es Automation Hub en Ansible Automation Platform?", options: ["Un componente de red", "El repositorio centralizado para publicar, distribuir y consumir colecciones certificadas y privadas", "Un tipo de credencial", "Un nodo de ejecución"], correctAnswer: 1, explanation: "Automation Hub es el servicio que permite gestionar colecciones de Ansible: las Red Hat Certified Collections (en console.redhat.com) y colecciones privadas en una instancia local." },
      { id: 19, certification: "ex374", category: "Automation Hub", difficulty: "Fácil", question: "¿Qué es una colección de Ansible?", options: ["Un directorio con roles únicamente", "Un paquete de distribución que puede incluir playbooks, roles, módulos, plugins y documentación", "Un inventario de hosts", "Un tipo de credencial"], correctAnswer: 1, explanation: "Una colección es el formato de distribución estándar de Ansible que puede contener roles, módulos, plugins de conexión/lookup/filter, playbooks y documentación, agrupados bajo un namespace." },
      { id: 20, certification: "ex374", category: "Automation Hub", difficulty: "Medio", question: "¿Qué archivo define los metadatos de una colección de Ansible?", options: ["requirements.yml", "galaxy.yml", "meta/main.yml", "ansible.cfg"], correctAnswer: 1, explanation: "galaxy.yml (en la raíz de la colección) contiene los metadatos: namespace, nombre, versión, autores, licencia, dependencias y otra información necesaria para publicar la colección." },
      { id: 21, certification: "ex374", category: "Automation Hub", difficulty: "Medio", question: "¿Cómo se referencia un módulo de una colección en un playbook?", options: ["Solo por el nombre del módulo", "Usando el FQCN (Fully Qualified Collection Name): namespace.collection.module", "Importando la colección con import_collection", "Instalando el módulo con ansible-galaxy"], correctAnswer: 1, explanation: "El FQCN (namespace.colección.módulo) permite referencia inequívoca a módulos de colecciones, por ejemplo: community.general.git_config o ansible.builtin.copy." },
      { id: 22, certification: "ex374", category: "Automation Hub", difficulty: "Medio", question: "¿Qué sección de ansible.cfg o de qué manera se configura Automation Hub como servidor de colecciones?", options: ["En el bloque [galaxy] con la opción server_list", "En el inventario", "En el execution-environment.yml", "En el Job Template"], correctAnswer: 0, explanation: "En ansible.cfg, la sección [galaxy] con server_list y las secciones [galaxy_server.<nombre>] definen los servidores de Automation Hub o Galaxy para descargar colecciones." },
      { id: 23, certification: "ex374", category: "Automation Hub", difficulty: "Avanzado", question: "¿Qué estructura de directorios se requiere al crear una colección con 'ansible-galaxy collection init'?", options: ["roles/, playbooks/, tasks/", "namespace/collection_name/ con subdirectorios docs/, galaxy.yml, plugins/, roles/, playbooks/, etc.", "collections/requirements.yml", "solo un archivo galaxy.yml en el directorio raíz"], correctAnswer: 1, explanation: "ansible-galaxy collection init crea la estructura estándar: namespace/nombre/galaxy.yml, README.md y directorios como docs/, plugins/, roles/, playbooks/ según la especificación de colecciones." },
      { id: 24, certification: "ex374", category: "Proyectos y SCM", difficulty: "Fácil", question: "¿Qué es un Proyecto en Automation Controller?", options: ["Un conjunto de credenciales", "Una representación de un repositorio de código fuente (Git, SVN, etc.) que contiene playbooks de Ansible", "Un tipo de inventario", "Una organización de usuarios"], correctAnswer: 1, explanation: "Un Proyecto en Automation Controller apunta a un repositorio SCM (normalmente Git) y se sincroniza periódicamente para obtener los playbooks, roles y archivos de configuración más recientes." },
      { id: 25, certification: "ex374", category: "Proyectos y SCM", difficulty: "Fácil", question: "¿Cuál es la ventaja de habilitar 'Clean' y 'Delete on update' en la configuración de SCM de un proyecto?", options: ["Guardar el historial de versiones en el Controller", "Asegurar que el proyecto siempre tiene una copia limpia del repositorio sin archivos locales no rastreados", "Aumentar el rendimiento de red", "Sincronizar el inventario automáticamente"], correctAnswer: 1, explanation: "Clean elimina archivos locales no rastreados en el proyecto antes de la actualización. Delete on update descarta toda la copia local y la vuelve a descargar desde el SCM." },
      { id: 26, certification: "ex374", category: "Proyectos y SCM", difficulty: "Medio", question: "¿Qué archivo en un proyecto de Automation Controller puede definir el Execution Environment y otros valores por defecto para Job Templates?", options: ["ansible.cfg", "defaults/main.yml", "project/ee.yml", "execution-environment.yml en la raíz del repositorio"], correctAnswer: 3, explanation: "Cuando existe un execution-environment.yml en la raíz del repositorio de un proyecto, Automation Controller puede usarlo para configurar automáticamente el EE de los Job Templates de ese proyecto." },
      { id: 27, certification: "ex374", category: "Proyectos y SCM", difficulty: "Medio", question: "¿Cómo se puede hacer que un proyecto en Automation Controller se actualice automáticamente antes de cada ejecución de job?", options: ["Marcando 'Update Revision on Launch' en la configuración del proyecto", "Programando un cron job externo", "Usando una webhook externo", "Solo manualmente"], correctAnswer: 0, explanation: "La opción 'Update Revision on Launch' en la configuración del proyecto garantiza que se descargue el código más reciente del SCM antes de cada ejecución de job." },
      { id: 28, certification: "ex374", category: "Notificaciones y Programación", difficulty: "Fácil", question: "¿Qué son las Notifications en Automation Controller?", options: ["Alertas enviadas a sistemas externos (email, Slack, webhook, etc.) cuando ocurre un evento en un job", "Logs del sistema del Controller", "Alertas de capacidad del inventario", "Mensajes internos entre usuarios"], correctAnswer: 0, explanation: "Las Notifications permiten configurar envío de mensajes a sistemas externos como email, Slack, PagerDuty, MS Teams o webhooks cuando un job inicia, termina con éxito o falla." },
      { id: 29, certification: "ex374", category: "Notificaciones y Programación", difficulty: "Fácil", question: "¿Qué permite hacer la función de Schedules en Job Templates y Workflow Job Templates?", options: ["Bloquear la ejecución manual de un job", "Programar ejecuciones automáticas periódicas de un job template según una expresión de cron o frecuencia", "Crear copias de seguridad del Controller", "Sincronizar credenciales automáticamente"], correctAnswer: 1, explanation: "Los Schedules permiten configurar ejecuciones automáticas con frecuencia definida (cada hora, diaria, semanal, etc.) usando expresiones de tipo cron, sin intervención manual." },
      { id: 30, certification: "ex374", category: "Notificaciones y Programación", difficulty: "Medio", question: "¿En qué niveles se pueden adjuntar Notification Templates en Automation Controller?", options: ["Solo a nivel de Job Template", "A nivel de organización, proyecto, job template e inventario", "Solo a nivel de organización", "Solo cuando el job falla"], correctAnswer: 1, explanation: "Los Notification Templates pueden adjuntarse a organizaciones, proyectos, job templates e inventarios, tanto para eventos de inicio (start), éxito (success) como fallo (failure)." },
      { id: 31, certification: "ex374", category: "API de AAP", difficulty: "Fácil", question: "¿Cuál es la URL base de la API REST de Automation Controller para explorar sus endpoints?", options: ["/api/v1/", "/api/v2/", "/rest/api/", "/v2/jobs/"], correctAnswer: 1, explanation: "La API REST de Automation Controller se expone en /api/v2/ y proporciona acceso programático a todos los recursos: jobs, inventarios, credenciales, proyectos, etc." },
      { id: 32, certification: "ex374", category: "API de AAP", difficulty: "Fácil", question: "¿Cómo se autentica una llamada a la API REST de Automation Controller?", options: ["Solo con usuario y contraseña en la URL", "Mediante Basic Auth, tokens de sesión o tokens de aplicación (personal access tokens)", "Solo con certificados de cliente", "Solo con claves SSH"], correctAnswer: 1, explanation: "La API admite varios métodos de autenticación: Basic Auth (usuario/contraseña), tokens de sesión y tokens de aplicación (personal access tokens, más seguros para automatización)." },
      { id: 33, certification: "ex374", category: "API de AAP", difficulty: "Medio", question: "¿Qué endpoint de la API de Automation Controller se usa para lanzar un Job Template?", options: ["POST /api/v2/jobs/", "POST /api/v2/job_templates/<id>/launch/", "GET /api/v2/job_templates/", "PUT /api/v2/jobs/<id>/start/"], correctAnswer: 1, explanation: "Para lanzar un Job Template se hace una petición POST a /api/v2/job_templates/<id>/launch/ con el cuerpo JSON que puede incluir variables extra, límites de hosts u otros parámetros." },
      { id: 34, certification: "ex374", category: "API de AAP", difficulty: "Medio", question: "¿Qué módulo de Ansible permite interactuar con la API de Automation Controller de forma nativa?", options: ["ansible.builtin.uri", "awx.awx collection", "community.general.tower", "redhat.aap.controller"], correctAnswer: 1, explanation: "La colección awx.awx (o ansible.controller en versiones más recientes) proporciona módulos para gestionar todos los recursos de Automation Controller como job_templates, inventories, credentials, etc." },
      { id: 35, certification: "ex374", category: "API de AAP", difficulty: "Avanzado", question: "¿Qué es 'Configuration as Code' en el contexto de Automation Controller?", options: ["Almacenar los logs del Controller en Git", "Gestionar la configuración del Controller (job templates, inventarios, credenciales) mediante playbooks y la colección awx.awx/ansible.controller", "Usar scripts bash para administrar el Controller", "Solo exportar e importar backups YAML del Controller"], correctAnswer: 1, explanation: "Configuration as Code permite definir y gestionar toda la configuración del Controller en repositorios Git usando la colección awx.awx, facilitando versionado, revisión y despliegue reproducible." },
      { id: 36, certification: "ex374", category: "ansible-navigator", difficulty: "Fácil", question: "¿Qué archivo de configuración usa ansible-navigator por defecto?", options: ["ansible.cfg", "navigator.cfg", "ansible-navigator.yml", ".navigator.cfg"], correctAnswer: 2, explanation: "ansible-navigator busca ansible-navigator.yml (o .ansible-navigator.yml) en el directorio actual o en el directorio home del usuario para su configuración." },
      { id: 37, certification: "ex374", category: "ansible-navigator", difficulty: "Fácil", question: "¿Qué opción de ansible-navigator permite especificar el Execution Environment a utilizar?", options: ["--playbook-artifact-enable", "--execution-environment-image", "--eei (--ee-image)", "--pull-policy"], correctAnswer: 2, explanation: "La opción --eei (o --execution-environment-image) permite especificar la imagen de contenedor del Execution Environment que ansible-navigator usará para ejecutar el playbook." },
      { id: 38, certification: "ex374", category: "ansible-navigator", difficulty: "Medio", question: "¿Qué modo de salida permite a ansible-navigator mostrar la salida directamente en la terminal sin la interfaz TUI?", options: ["--mode interactive", "--mode stdout", "--output text", "--no-tui"], correctAnswer: 1, explanation: "Con --mode stdout (o -m stdout), ansible-navigator muestra la salida del playbook directamente en la terminal, similar a ansible-playbook, útil en pipelines CI/CD." },
      { id: 39, certification: "ex374", category: "ansible-navigator", difficulty: "Medio", question: "¿Qué comando de ansible-navigator permite explorar la documentación de módulos disponibles en un EE?", options: ["ansible-navigator doc <modulo>", "ansible-navigator modules <modulo>", "ansible-navigator inspect <modulo>", "ansible-navigator help <modulo>"], correctAnswer: 0, explanation: "ansible-navigator doc <modulo> muestra la documentación del módulo especificado, accediendo a los módulos disponibles dentro del Execution Environment configurado." },
      { id: 40, certification: "ex374", category: "ansible-navigator", difficulty: "Avanzado", question: "¿Qué información proporciona 'ansible-navigator images'?", options: ["Lista los hosts del inventario", "Muestra los Execution Environments disponibles localmente con detalles sobre colecciones, versión de Ansible y dependencias incluidas", "Lista las imágenes de los nodos gestionados", "Muestra el registro de ejecuciones anteriores"], correctAnswer: 1, explanation: "ansible-navigator images lista las imágenes de EE disponibles localmente y permite inspeccionar su contenido: versión de Ansible, colecciones instaladas, dependencias Python y del sistema." }
    ],
    concepts: [
      {
        title: "Automation Controller (AAP)",
        description: "Componente central de Ansible Automation Platform que gestiona la ejecución de automatización, inventarios, credenciales, proyectos y control de acceso.",
        commands: [
          "# Acceso a la UI del Controller",
          "https://<controller-fqdn>",
          "# API REST",
          "curl -k -u admin:password https://<controller>/api/v2/",
          "# awx CLI",
          "awx login --conf.host https://<controller> --conf.username admin --conf.password password"
        ],
        typicalError: "Error de credenciales o permisos insuficientes al lanzar jobs — verificar el rol asignado al usuario sobre el Job Template.",
        checklist: [
          "Crear organización y asignar roles de administrador",
          "Configurar credenciales de máquina (SSH key + become password)",
          "Crear proyecto apuntando al repositorio Git",
          "Sincronizar proyecto para obtener los playbooks",
          "Crear inventario y añadir hosts o grupos",
          "Crear Job Template asociando proyecto, playbook, inventario y credenciales",
          "Lanzar job y revisar output y logs"
        ]
      },
      {
        title: "Execution Environments (EE)",
        description: "Contenedores OCI que encapsulan Ansible, colecciones y dependencias para garantizar ejecuciones reproducibles y portables.",
        commands: [
          "# Construir EE",
          "ansible-builder build -t myee:latest -f execution-environment.yml",
          "# Solo generar el contexto",
          "ansible-builder create -f execution-environment.yml",
          "# Ver imagen construida",
          "podman images | grep myee",
          "# Publicar en un registry",
          "podman push myee:latest registry.example.com/myee:latest"
        ],
        typicalError: "Colección no encontrada durante el build — verificar que galaxy.yml o requirements.yml apunta al servidor correcto y que las credenciales de Automation Hub están configuradas.",
        checklist: [
          "Crear execution-environment.yml con imagen base, dependencias de colecciones y Python",
          "Definir requirements.yml con colecciones necesarias",
          "Ejecutar ansible-builder build",
          "Probar EE localmente con ansible-navigator",
          "Publicar imagen en Automation Hub o registry interno",
          "Configurar EE en Automation Controller para uso en jobs"
        ]
      },
      {
        title: "Colecciones de Ansible",
        description: "Formato de distribución estándar que empaqueta roles, módulos, plugins, playbooks y documentación bajo un namespace único.",
        commands: [
          "# Inicializar estructura de colección",
          "ansible-galaxy collection init mynamespace.mycollection",
          "# Instalar colección desde Galaxy",
          "ansible-galaxy collection install community.general",
          "# Instalar desde requirements.yml",
          "ansible-galaxy collection install -r collections/requirements.yml",
          "# Construir artefacto de colección",
          "ansible-galaxy collection build",
          "# Publicar colección",
          "ansible-galaxy collection publish mynamespace-mycollection-1.0.0.tar.gz --server automation_hub"
        ],
        typicalError: "ModuleNotFoundError al usar FQCN — la colección no está instalada en el EE o la ruta de colecciones no está configurada correctamente.",
        checklist: [
          "Inicializar colección con ansible-galaxy collection init",
          "Definir metadatos en galaxy.yml (namespace, name, version)",
          "Desarrollar contenido: roles, módulos, plugins",
          "Crear README.md y documentación",
          "Construir artefacto con ansible-galaxy collection build",
          "Publicar en Automation Hub privado o Galaxy",
          "Referenciar con FQCN en playbooks"
        ]
      },
      {
        title: "RBAC en Automation Controller",
        description: "Sistema de control de acceso basado en roles que permite asignar permisos granulares a usuarios y equipos sobre recursos del Controller.",
        commands: [
          "# Via awx CLI: asignar rol",
          "awx role grant --type execute --job_template 'My Template' --user myuser",
          "# Via API",
          "curl -X POST /api/v2/roles/<role_id>/users/ -d '{\"id\": <user_id>}'",
          "# Listar roles disponibles",
          "awx role list"
        ],
        typicalError: "Usuario puede ver el Job Template pero no ejecutarlo — asignarle el rol Execute sobre el template o Use sobre las credenciales/inventario.",
        checklist: [
          "Crear organización y definir administradores",
          "Crear equipos (teams) y añadir usuarios",
          "Asignar rol Admin, Execute, Use, Read o Update según necesidad",
          "Los roles se asignan sobre: organizaciones, proyectos, inventarios, job templates, credenciales",
          "Verificar acceso mínimo necesario (principio de mínimo privilegio)"
        ]
      },
      {
        title: "Workflow Job Templates",
        description: "Plantillas de flujo de trabajo que encadenan múltiples Job Templates con lógica condicional basada en resultados de éxito, fallo o always.",
        commands: [
          "# Lanzar workflow via API",
          "curl -X POST /api/v2/workflow_job_templates/<id>/launch/",
          "# Via awx CLI",
          "awx workflow_job_template launch --id <id>"
        ],
        typicalError: "Nodo del workflow no ejecutado — revisar la condición del enlace (success/failure/always) y si el nodo anterior completó con el estado esperado.",
        checklist: [
          "Crear Workflow Job Template en el Controller",
          "Añadir nodos con Job Templates o aprobaciones manuales",
          "Configurar enlaces: on-success, on-failure, always",
          "Añadir nodo de convergencia si múltiples ramas deben terminar antes de continuar",
          "Configurar notificaciones y surveys en el workflow",
          "Probar todos los caminos del flujo (éxito y fallo)"
        ]
      },
      {
        title: "Inventarios en Automation Controller",
        description: "Colecciones de hosts y grupos gestionados centralmente en el Controller, con soporte para inventarios estáticos, dinámicos y de proyecto.",
        commands: [
          "# Crear inventario via awx CLI",
          "awx inventory create --name 'Production' --organization 'Default'",
          "# Añadir host",
          "awx host create --name 'server1.example.com' --inventory 'Production'",
          "# Sincronizar inventario dinámico",
          "awx inventory_source update --id <source_id>"
        ],
        typicalError: "Hosts sin grupo asignado al usar inventario dinámico — revisar la plantilla del plugin de inventario y los filtros de grupos.",
        checklist: [
          "Crear inventario en la organización correcta",
          "Añadir hosts individuales o grupos con variables",
          "Para inventario dinámico: crear inventory source con plugin adecuado",
          "Sincronizar y verificar hosts descubiertos",
          "Asignar inventario a Job Templates",
          "Verificar variables de host e inventario disponibles en playbooks"
        ]
      },
      {
        title: "Automation Hub Privado",
        description: "Instancia local de Automation Hub que permite hospedar colecciones certificadas y privadas dentro de la organización.",
        commands: [
          "# Configurar servidor en ansible.cfg",
          "[galaxy]",
          "server_list = automation_hub, galaxy",
          "",
          "[galaxy_server.automation_hub]",
          "url=https://hub.example.com/api/galaxy/content/rh-certified/",
          "auth_url=https://sso.example.com/auth/realms/redhat-external/protocol/openid-connect/token",
          "token=<token>",
          "",
          "# Subir colección a hub privado",
          "ansible-galaxy collection publish --server automation_hub collection.tar.gz"
        ],
        typicalError: "Token de autenticación expirado al intentar descargar colecciones — regenerar token en la UI del Automation Hub.",
        checklist: [
          "Obtener token de autenticación desde Automation Hub UI",
          "Configurar ansible.cfg con server_list y detalles del servidor",
          "Sincronizar colecciones certificadas desde console.redhat.com",
          "Aprobar colecciones de la comunidad si se usa namespace privado",
          "Publicar colecciones privadas desarrolladas internamente"
        ]
      },
      {
        title: "ansible-navigator",
        description: "Herramienta de CLI y TUI que reemplaza a ansible-playbook para ejecutar automatización dentro de Execution Environments.",
        commands: [
          "# Ejecutar playbook con EE",
          "ansible-navigator run site.yml -i inventory --eei quay.io/ansible/ee-supported-rhel8:latest",
          "# Modo stdout (sin TUI)",
          "ansible-navigator run site.yml --mode stdout",
          "# Ver documentación de módulo",
          "ansible-navigator doc ansible.builtin.user",
          "# Listar EE disponibles",
          "ansible-navigator images",
          "# Explorar inventario",
          "ansible-navigator inventory -i inventory --list",
          "# Replay de ejecución anterior",
          "ansible-navigator replay playbook-artifact.json"
        ],
        typicalError: "Imagen de EE no encontrada localmente — ejecutar con --pull-policy always o hacer pull manual con podman pull <imagen>.",
        checklist: [
          "Instalar ansible-navigator con pip install ansible-navigator",
          "Crear ansible-navigator.yml con configuración del EE y opciones por defecto",
          "Verificar que podman o docker están disponibles",
          "Especificar EE con --eei o en la configuración",
          "Usar --mode stdout para integración con CI/CD",
          "Revisar artifacts de playbook para debugging"
        ]
      },
      {
        title: "API REST de Automation Controller",
        description: "Interfaz programática para gestionar todos los recursos del Controller, útil para automatización e integración con otros sistemas.",
        commands: [
          "# Explorar API en el navegador",
          "https://<controller>/api/v2/",
          "# Lanzar Job Template",
          "curl -k -u admin:password -X POST https://<ctrl>/api/v2/job_templates/<id>/launch/ \\",
          "     -H 'Content-Type: application/json' \\",
          "     -d '{\"extra_vars\": {\"key\": \"value\"}}'",
          "# Obtener estado de job",
          "curl -k -u admin:password https://<ctrl>/api/v2/jobs/<job_id>/",
          "# Usando la colección ansible.controller",
          "- ansible.controller.job_template:",
          "    name: Deploy App",
          "    project: My Project",
          "    playbook: deploy.yml"
        ],
        typicalError: "HTTP 403 al llamar a la API — el usuario no tiene permisos sobre el recurso o el token ha expirado.",
        checklist: [
          "Explorar /api/v2/ para descubrir endpoints disponibles",
          "Crear token de aplicación para autenticación segura",
          "Usar curl o httpie para pruebas rápidas de la API",
          "Usar la colección awx.awx o ansible.controller para gestión as-code",
          "Verificar credenciales y permisos del usuario o token usado"
        ]
      },
      {
        title: "Surveys y Variables Extra",
        description: "Mecanismo para capturar input del usuario al lanzar jobs, combinando formularios interactivos con variables extra definidas.",
        commands: [
          "# Las surveys se configuran en la UI o via API",
          "curl -X POST /api/v2/job_templates/<id>/survey_spec/ \\",
          "     -d @survey.json",
          "# Ejemplo de survey_spec JSON:",
          "{ 'name': 'User Survey',",
          "  'spec': [",
          "    { 'question_name': 'Target environment',",
          "      'variable': 'env',",
          "      'type': 'multiplechoice',",
          "      'choices': 'dev\\nprod' }",
          "  ]",
          "}"
        ],
        typicalError: "Variable de survey no disponible en el playbook — verificar que el nombre de variable en la survey coincide exactamente con la variable esperada en el playbook.",
        checklist: [
          "Activar 'Enable Survey' en el Job Template",
          "Definir preguntas con tipo, variable, requerido/opcional y valores por defecto",
          "Tipos disponibles: text, textarea, password, integer, float, multiplechoice, multiselect",
          "Las variables de survey tienen precedencia sobre extra vars del template",
          "Usar passwords para enmascarar valores sensibles como contraseñas"
        ]
      },
      {
        title: "Credenciales y Gestión de Secretos",
        description: "Sistema centralizado para almacenar y gestionar secretos de forma segura, con integración con vaults externos como HashiCorp Vault.",
        commands: [
          "# Tipos de credencial comunes:",
          "# - Machine: SSH key, usuario, contraseña, become",
          "# - Source Control: para clonar repositorios privados",
          "# - Vault: contraseña de ansible-vault",
          "# - Network: para dispositivos de red",
          "# - Container Registry: para acceder a registries privados",
          "# - Custom: definidas por el administrador",
          "# Crear credencial via awx CLI",
          "awx credential create --name 'SSH Key' --credential_type 'Machine' \\",
          "                      --organization Default \\",
          "                      --inputs '{\"username\": \"ansible\", \"ssh_key_data\": \"...\"}'"
        ],
        typicalError: "Credencial de vault no encontrada — el playbook usa ansible-vault pero el Job Template no tiene asociada la credencial de tipo Vault correspondiente.",
        checklist: [
          "Seleccionar el tipo de credencial adecuado para cada uso",
          "Las credenciales SSH se pueden crear con clave privada o contraseña",
          "Las credenciales Vault requieren la contraseña del vault de ansible-vault",
          "Las credenciales se pueden compartir entre job templates de la misma organización",
          "Integración con HashiCorp Vault disponible mediante CyberArk/HashiCorp credential lookups"
        ]
      },
      {
        title: "Nodos de Ejecución y Escalabilidad",
        description: "Arquitectura distribuida de Automation Controller con nodos de control, ejecución y salto para escalar y aislar cargas de trabajo.",
        commands: [
          "# Ver estado de nodos en la UI: Infrastructure > Instance Groups",
          "# Via API",
          "curl /api/v2/instances/",
          "curl /api/v2/instance_groups/",
          "# Asignar instance group a un job template",
          "awx job_template modify --id <id> --instance_groups 'production-group'"
        ],
        typicalError: "Job en cola sin ejecutar — todos los nodos del instance group asignado están offline o con capacidad agotada.",
        checklist: [
          "Crear Instance Groups para aislar cargas de trabajo por entorno o cliente",
          "Asignar nodos de ejecución a los instance groups",
          "Asignar Instance Groups a organizaciones o job templates",
          "Monitorizar la capacidad de cada nodo (forks disponibles)",
          "Los nodos hop/salto permiten acceso a redes aisladas sin exponer el Controller"
        ]
      },
      {
        title: "Desarrollo de Roles para AAP",
        description: "Creación de roles de Ansible reutilizables con estructura estándar, documentación y pruebas compatibles con AAP y colecciones.",
        commands: [
          "# Crear estructura de rol",
          "ansible-galaxy role init myrole",
          "# Estructura generada:",
          "myrole/",
          "  defaults/main.yml  # variables con menor precedencia",
          "  vars/main.yml      # variables con mayor precedencia",
          "  tasks/main.yml     # tareas del rol",
          "  handlers/main.yml  # handlers",
          "  templates/         # plantillas Jinja2",
          "  files/             # archivos estáticos",
          "  meta/main.yml      # metadatos del rol"
        ],
        typicalError: "Variables del rol sobrescritas inesperadamente — revisar precedencia: defaults/main.yml tiene la prioridad más baja, vars/main.yml la más alta dentro del rol.",
        checklist: [
          "Usar ansible-galaxy role init para crear la estructura estándar",
          "Definir valores por defecto en defaults/main.yml",
          "Documentar variables en README.md y meta/main.yml",
          "Incluir el rol en colecciones para distribución via Automation Hub",
          "Probar roles con molecule o con playbooks de test"
        ]
      },
      {
        title: "Notificaciones y Eventos del Controller",
        description: "Sistema para enviar alertas a sistemas externos cuando ocurren eventos en la plataforma de automatización.",
        commands: [
          "# Tipos de notificación disponibles:",
          "# Email, Slack, Mattermost, RocketChat, IRC, PagerDuty,",
          "# Grafana, Webhook, Twilio, MS Teams",
          "# Crear notificación via awx CLI",
          "awx notification_template create \\",
          "  --name 'Slack Alerts' \\",
          "  --notification_type slack \\",
          "  --notification_configuration '{\"token\": \"...\", \"channels\": [\"#alerts\"]}'"
        ],
        typicalError: "Notificación no enviada — verificar conectividad desde el Controller al servicio externo y que el token/webhook URL es correcto.",
        checklist: [
          "Crear Notification Template del tipo adecuado",
          "Probar la notificación con el botón 'Test' en la UI",
          "Adjuntar notificaciones a job templates (start/success/failure)",
          "También se pueden adjuntar a nivel de organización para alertas globales",
          "Las notificaciones de workflow se configuran en el workflow, no en los job templates individuales"
        ]
      },
      {
        title: "Configuration as Code con ansible.controller",
        description: "Gestión de la configuración de Automation Controller mediante playbooks de Ansible, versionada en Git.",
        commands: [
          "# Instalar colección",
          "ansible-galaxy collection install awx.awx",
          "# o para AAP:",
          "ansible-galaxy collection install ansible.controller",
          "# Ejemplo: crear job template",
          "- name: Configure job template",
          "  ansible.controller.job_template:",
          "    name: Deploy Application",
          "    project: My Project",
          "    playbook: deploy.yml",
          "    inventory: Production",
          "    credentials:",
          "      - SSH Key",
          "    controller_host: https://controller.example.com",
          "    controller_username: admin",
          "    controller_password: '{{ vault_password }}'"
        ],
        typicalError: "Módulo no encuentra el objeto a actualizar — verificar que el nombre del recurso coincide exactamente con el nombre en el Controller (case sensitive).",
        checklist: [
          "Instalar la colección awx.awx o ansible.controller",
          "Almacenar credenciales del Controller en ansible-vault o variables cifradas",
          "Crear playbooks para cada tipo de recurso: organizaciones, inventarios, proyectos, credenciales, job templates",
          "Versionar los playbooks de configuración en Git",
          "Ejecutar los playbooks de configuración desde CI/CD o desde el propio Controller (bootstrap)"
        ]
      }
    ],
    scenarios: [
      {
        id: "ex374-s1",
        title: "Configurar Job Template con Execution Environment personalizado",
        category: "Automation Controller",
        difficulty: "Medio",
        context: "Tu equipo ha desarrollado un Execution Environment personalizado que incluye la colección community.general v7 y dependencias Python adicionales. Necesitas configurar un Job Template que use este EE para desplegar una aplicación web.",
        objective: "Crear y configurar un Job Template en Automation Controller que use un EE personalizado publicado en el registry interno.",
        steps: [
          "Verificar que la imagen del EE está publicada en el registry interno: podman pull registry.internal/myee:1.0",
          "En Automation Controller, navegar a Administration > Execution Environments y crear un nuevo EE con la URL de la imagen",
          "Crear o verificar el proyecto apuntando al repositorio Git con los playbooks de despliegue",
          "Crear un Job Template: seleccionar proyecto, playbook, inventario y credenciales",
          "En el campo Execution Environment del Job Template, seleccionar el EE personalizado recién creado",
          "Lanzar el job y verificar en el output que usa el EE correcto (la imagen aparece en los primeros logs)"
        ],
        recommendedCommands: [
          "ansible-navigator run deploy.yml --eei registry.internal/myee:1.0 --mode stdout",
          "podman pull registry.internal/myee:1.0",
          "curl -X POST /api/v2/job_templates/<id>/launch/"
        ],
        validation: "El job se ejecuta correctamente usando el EE personalizado y las tareas que requieren módulos de community.general v7 funcionan sin errores.",
        commonErrors: [
          "EE no configurado en el Controller — el job usa el EE por defecto que no tiene las colecciones necesarias",
          "Credencial de Container Registry no asociada — el Controller no puede hacer pull de la imagen del registry privado",
          "Versión del EE incompatible con la versión de Ansible del Controller"
        ]
      },
      {
        id: "ex374-s2",
        title: "Construir un Execution Environment con ansible-builder",
        category: "Execution Environments",
        difficulty: "Medio",
        context: "Debes crear un Execution Environment que incluya la colección redhat.rhel_system_roles, dependencias Python específicas (boto3, botocore para módulos AWS) y librerías del sistema. El EE debe funcionar con ansible-navigator.",
        objective: "Construir y probar un EE personalizado usando ansible-builder.",
        steps: [
          "Crear execution-environment.yml con imagen base ee-minimal-rhel8, colecciones y dependencias",
          "Crear collections/requirements.yml listando redhat.rhel_system_roles y amazon.aws",
          "Crear requirements.txt con boto3 y botocore",
          "Crear bindep.txt si hay dependencias del sistema necesarias",
          "Ejecutar: ansible-builder build -t myee:latest -f execution-environment.yml --verbosity 2",
          "Verificar la imagen: podman images y ansible-navigator images",
          "Probar el EE con un playbook sencillo: ansible-navigator run test.yml --eei myee:latest --mode stdout"
        ],
        recommendedCommands: [
          "ansible-builder build -t myee:latest -f execution-environment.yml",
          "ansible-builder create -f execution-environment.yml",
          "podman images | grep myee",
          "ansible-navigator images",
          "ansible-navigator run test.yml --eei myee:latest --mode stdout"
        ],
        validation: "La imagen se construye sin errores, aparece en podman images y ansible-navigator images muestra las colecciones instaladas correctamente.",
        commonErrors: [
          "Token de Automation Hub no configurado — error 401 al intentar instalar colecciones certificadas",
          "Imagen base no disponible — hacer pull manual de la imagen base antes de build",
          "Error en requirements.txt — versión incompatible de una dependencia Python con otra"
        ]
      },
      {
        id: "ex374-s3",
        title: "Implementar RBAC para equipos de desarrollo y operaciones",
        category: "RBAC",
        difficulty: "Avanzado",
        context: "Tu organización tiene dos equipos: 'Developers' que debe poder ver y ejecutar jobs en el entorno de desarrollo, y 'Operations' que administra todo. Debes configurar el acceso apropiado sin que los developers puedan modificar la configuración.",
        objective: "Configurar RBAC en Automation Controller para separar permisos entre equipos de desarrollo y operaciones.",
        steps: [
          "Crear la organización 'MyOrg' y asignar al usuario admin como Organization Admin",
          "Crear dos teams: 'Developers' y 'Operations' en la organización",
          "Añadir los usuarios correspondientes a cada team",
          "Asignar al team 'Operations' el rol Admin en la organización",
          "Para el team 'Developers': asignar rol 'Execute' en los Job Templates de desarrollo y rol 'Use' en el inventario de desarrollo",
          "Verificar que un usuario del team Developers puede lanzar jobs pero no modificar la configuración",
          "Verificar que no puede acceder a los recursos de producción"
        ],
        recommendedCommands: [
          "awx team create --name Developers --organization MyOrg",
          "awx role grant --type execute --job_template 'Dev Deploy' --team Developers",
          "awx role grant --type use --inventory 'Dev Inventory' --team Developers"
        ],
        validation: "Los usuarios de Developers pueden lanzar jobs de desarrollo pero reciben error 403 al intentar modificar job templates o acceder a recursos de producción.",
        commonErrors: [
          "Rol Use en inventario olvidado — el usuario tiene Execute en el JT pero no puede usarlo porque le falta acceso al inventario",
          "Rol Use en credencial olvidado — igual que con el inventario",
          "Team mal configurado — usuario añadido directamente en lugar de al team"
        ]
      },
      {
        id: "ex374-s4",
        title: "Crear y publicar una colección personalizada",
        category: "Colecciones",
        difficulty: "Avanzado",
        context: "Tu equipo ha desarrollado módulos y roles reutilizables para gestionar la infraestructura interna. Debes empaquetar todo como una colección de Ansible y publicarla en el Automation Hub privado.",
        objective: "Crear una colección, construir el artefacto y publicarla en Automation Hub.",
        steps: [
          "Inicializar la colección: ansible-galaxy collection init mycompany.infrastructure",
          "Añadir los roles existentes en el directorio roles/ de la colección",
          "Completar galaxy.yml: namespace, name, version, description, authors, license",
          "Crear README.md y documentar los roles y módulos",
          "Construir el artefacto: ansible-galaxy collection build mycompany/infrastructure/",
          "Obtener el token de la API del Automation Hub privado",
          "Publicar: ansible-galaxy collection publish mycompany-infrastructure-1.0.0.tar.gz --server automation_hub",
          "Verificar que la colección aparece en Automation Hub y aprobarla si es necesario"
        ],
        recommendedCommands: [
          "ansible-galaxy collection init mycompany.infrastructure",
          "ansible-galaxy collection build",
          "ansible-galaxy collection publish mycompany-infrastructure-1.0.0.tar.gz --server automation_hub",
          "ansible-galaxy collection install mycompany.infrastructure --server automation_hub"
        ],
        validation: "La colección aparece en el Automation Hub privado y puede instalarse con ansible-galaxy collection install mycompany.infrastructure.",
        commonErrors: [
          "Error de versión en galaxy.yml — la versión debe seguir semver (x.y.z)",
          "Token de Automation Hub incorrecto o expirado",
          "La colección aparece pero en estado 'Needs Review' — un administrador del Hub debe aprobarla"
        ]
      },
      {
        id: "ex374-s5",
        title: "Configurar Workflow Job Template con nodos condicionales",
        category: "Workflows",
        difficulty: "Medio",
        context: "Necesitas crear un flujo de trabajo que: 1) ejecute los tests de la aplicación, 2) si pasan, despliegue en staging, 3) si el despliegue en staging tiene éxito, despliegue en producción, 4) si algo falla en cualquier punto, ejecute un job de rollback.",
        objective: "Crear un Workflow Job Template con lógica condicional de éxito y fallo.",
        steps: [
          "Crear los Job Templates individuales: run-tests, deploy-staging, deploy-prod, rollback",
          "Crear un nuevo Workflow Job Template en el Controller",
          "Añadir el nodo inicial: run-tests",
          "Añadir deploy-staging conectado a run-tests con enlace 'on success'",
          "Añadir deploy-prod conectado a deploy-staging con enlace 'on success'",
          "Añadir rollback conectado a run-tests con enlace 'on failure'",
          "Conectar también rollback a deploy-staging con enlace 'on failure'",
          "Probar el workflow lanzándolo manualmente y verificando el flujo"
        ],
        recommendedCommands: [
          "curl -X POST /api/v2/workflow_job_templates/<id>/launch/",
          "awx workflow_job_template launch --id <id>"
        ],
        validation: "El workflow ejecuta los pasos en el orden correcto según el resultado de cada job. Al forzar un fallo en run-tests, se ejecuta el rollback en lugar de los deploys.",
        commonErrors: [
          "Enlace 'always' en lugar de 'on success' — el nodo siguiente se ejecuta incluso cuando falla el anterior",
          "Nodo de rollback no conectado a todos los posibles puntos de fallo",
          "Job Templates sin inventario asignado — el workflow no puede lanzarlos"
        ]
      },
      {
        id: "ex374-s6",
        title: "Gestionar Configuration as Code del Controller",
        category: "API y CaC",
        difficulty: "Avanzado",
        context: "Tu empresa quiere versionar toda la configuración de Automation Controller en Git, de forma que al restaurar o crear un nuevo Controller, pueda reconfigurarse automáticamente ejecutando playbooks.",
        objective: "Crear playbooks usando la colección ansible.controller para gestionar la configuración del Controller como código.",
        steps: [
          "Instalar la colección: ansible-galaxy collection install ansible.controller",
          "Crear un inventario con el host del Controller y sus credenciales en ansible-vault",
          "Crear playbook configure_controller.yml con tareas para: crear organización, crear credenciales, crear proyecto, crear inventario y crear job templates",
          "Usar variables cifradas con ansible-vault para las contraseñas del Controller",
          "Probar el playbook en un entorno de test",
          "Guardar el playbook en Git y crear un Job Template en el propio Controller para ejecutarlo (bootstrap)"
        ],
        recommendedCommands: [
          "ansible-galaxy collection install ansible.controller",
          "ansible-navigator run configure_controller.yml --eei ee-supported:latest --mode stdout",
          "ansible-vault encrypt_string 'mypassword' --name 'controller_password'"
        ],
        validation: "Después de ejecutar el playbook en un Controller vacío, todos los recursos (organización, credenciales, proyecto, inventario, job templates) se crean correctamente.",
        commonErrors: [
          "Orden de creación incorrecto — un job template referencia un proyecto que aún no existe",
          "Nombre del recurso no coincide — case sensitive en los nombres de los recursos",
          "Variables extra del job template que contengan secretos deben marcarse como 'sensitive'"
        ]
      },
      {
        id: "ex374-s7",
        title: "Configurar inventario dinámico desde AWS",
        category: "Inventarios",
        difficulty: "Medio",
        context: "Tu infraestructura está en AWS y necesitas que el inventario del Controller se actualice automáticamente con las instancias EC2 activas, agrupadas por tag de entorno.",
        objective: "Crear un inventario dinámico en Automation Controller que use el plugin de AWS EC2.",
        steps: [
          "Crear credencial de tipo 'Amazon Web Services' con las claves de acceso AWS",
          "Crear un inventario en el Controller llamado 'AWS Production'",
          "Añadir una Inventory Source de tipo 'Amazon EC2' asociada al inventario",
          "Configurar el source: seleccionar la credencial AWS y la región",
          "Opcionalmente, añadir un archivo de variables de fuente (aws_ec2.yml) en el proyecto para personalizar agrupaciones",
          "Sincronizar el inventario y verificar que los hosts aparecen agrupados por tag",
          "Asociar el inventario a un Job Template y lanzar un job"
        ],
        recommendedCommands: [
          "awx inventory_source update --id <source_id>",
          "# Ejemplo aws_ec2.yml en el proyecto:",
          "plugin: amazon.aws.aws_ec2",
          "regions: [eu-west-1]",
          "keyed_groups:",
          "  - key: tags.Environment",
          "    prefix: env"
        ],
        validation: "El inventario muestra los hosts de AWS agrupados por tag de entorno y se actualiza automáticamente al sincronizar.",
        commonErrors: [
          "Credencial AWS con permisos insuficientes — necesita al menos ec2:DescribeInstances",
          "La colección amazon.aws no está instalada en el EE usado — no puede usar el plugin",
          "Hosts sin tag Environment — no aparecen en los grupos esperados"
        ]
      },
      {
        id: "ex374-s8",
        title: "Usar la API para automatizar el lanzamiento de jobs",
        category: "API de AAP",
        difficulty: "Medio",
        context: "Un pipeline de CI/CD externo (Jenkins, GitLab CI) necesita lanzar un Job Template de Automation Controller y esperar el resultado antes de continuar.",
        objective: "Usar la API REST del Controller para lanzar un job, monitorizar su estado y obtener el resultado.",
        steps: [
          "Crear un token de aplicación en el Controller para el pipeline CI/CD",
          "Hacer POST a /api/v2/job_templates/<id>/launch/ con el token en el header",
          "Extraer el job_id de la respuesta JSON",
          "Hacer polling a /api/v2/jobs/<job_id>/ hasta que el campo 'status' sea 'successful' o 'failed'",
          "Verificar el campo 'failed' para determinar el resultado",
          "Opcionalmente, obtener el output del job en /api/v2/jobs/<job_id>/stdout/?format=txt"
        ],
        recommendedCommands: [
          "curl -k -H 'Authorization: Bearer <token>' -X POST https://controller/api/v2/job_templates/5/launch/ -H 'Content-Type: application/json' -d '{}'",
          "curl -k -H 'Authorization: Bearer <token>' https://controller/api/v2/jobs/<id>/",
          "curl -k -H 'Authorization: Bearer <token>' https://controller/api/v2/jobs/<id>/stdout/?format=txt"
        ],
        validation: "El script/pipeline puede lanzar el job, esperar su finalización y determinar si fue exitoso o fallido para continuar o abortar el pipeline.",
        commonErrors: [
          "Token sin permisos Execute en el Job Template — HTTP 403",
          "Polling demasiado agresivo — implementar backoff exponencial o sleep entre peticiones",
          "No manejar el estado 'canceled' o 'error' — el job puede terminar en estados distintos a 'successful' o 'failed'"
        ]
      },
      {
        id: "ex374-s9",
        title: "Configurar Survey con validación de variables",
        category: "Surveys",
        difficulty: "Fácil",
        context: "Quieres que los usuarios puedan lanzar un job de despliegue eligiendo el entorno (dev, staging, prod) y proporcionando el número de versión a desplegar, sin necesidad de editar el Job Template.",
        objective: "Crear una Survey en un Job Template con distintos tipos de preguntas.",
        steps: [
          "Abrir el Job Template en Automation Controller y activar 'Enable Survey'",
          "Añadir pregunta 1: 'Target Environment', tipo: multiplechoice, variable: target_env, opciones: dev, staging, prod, requerido",
          "Añadir pregunta 2: 'Application Version', tipo: text, variable: app_version, requerido, validar con regex si es posible",
          "Guardar la survey",
          "Lanzar el job y verificar que aparece el formulario antes de ejecutarse",
          "Verificar en el playbook que las variables target_env y app_version están disponibles",
          "Comprobar que las variables de la survey aparecen en los 'Extra Variables' del job lanzado"
        ],
        recommendedCommands: [
          "# Las surveys se configuran principalmente desde la UI del Controller",
          "# Verificación via API:",
          "curl /api/v2/job_templates/<id>/survey_spec/"
        ],
        validation: "Al lanzar el job se presenta el formulario, el usuario puede seleccionar entorno y versión, y el playbook recibe las variables correctas.",
        commonErrors: [
          "Variable en la survey con nombre diferente al usado en el playbook",
          "Survey no activada — el job se lanza sin preguntar aunque esté configurada",
          "Contraseñas definidas como tipo 'text' en lugar de 'password' — se muestran en claro en los logs"
        ]
      },
      {
        id: "ex374-s10",
        title: "Crear y registrar un Notification Template de Slack",
        category: "Notificaciones",
        difficulty: "Fácil",
        context: "Tu equipo usa Slack y quiere recibir notificaciones en el canal #deployments cuando un Job Template de despliegue termina, tanto si tiene éxito como si falla.",
        objective: "Configurar un Notification Template de Slack y adjuntarlo a un Job Template.",
        steps: [
          "Crear un Incoming Webhook en Slack para el canal #deployments",
          "En Automation Controller, ir a Administration > Notification Templates",
          "Crear nuevo Notification Template: nombre 'Slack Deployments', tipo Slack",
          "Introducir el token del bot o el webhook URL según el tipo seleccionado",
          "Especificar el canal: #deployments",
          "Probar la notificación con el botón 'Test' y verificar que llega al canal",
          "Navegar al Job Template de despliegue y en la sección 'Notifications' adjuntar el template para Success y Failure",
          "Lanzar un job y verificar que llega la notificación a Slack"
        ],
        recommendedCommands: [
          "# Crear notification template via awx CLI",
          "awx notification_template create --name 'Slack Deployments' --notification_type slack \\",
          "  --notification_configuration '{\"token\": \"xoxb-...\", \"channels\": [\"#deployments\"]}'"
        ],
        validation: "Al finalizar el job (tanto con éxito como con fallo) llega un mensaje al canal #deployments de Slack con el nombre del job, el estado y el enlace al output.",
        commonErrors: [
          "Token de Slack sin permisos para escribir en el canal",
          "Notification Template creado pero no adjuntado al Job Template",
          "Firewall bloqueando las conexiones salientes del Controller hacia la API de Slack"
        ]
      }
    ],
    practiceCommands: [
      {
        id: "pc-ex374-1",
        category: "ansible-builder",
        title: "Construir un Execution Environment",
        command: "ansible-builder build",
        prompt: "ansible-builder build",
        description: "Construye una imagen de Execution Environment a partir del archivo execution-environment.yml",
        usage: "ansible-builder build [-t <tag>] [-f <definition-file>] [--verbosity <0-3>] [--container-runtime <podman|docker>]",
        examples: [
          "ansible-builder build -t myee:1.0",
          "ansible-builder build -t myee:latest -f ee-custom.yml --verbosity 2",
          "ansible-builder build --container-runtime docker -t myee:dev"
        ],
        simulatedOutput: `Running command:
  podman build -f context/Containerfile --no-cache -t myee:1.0 context
[1/2] STEP 1/5: FROM registry.redhat.io/ansible-automation-platform-22/ee-minimal-rhel8:latest
[1/2] STEP 2/5: RUN pip3 install --upgrade pip setuptools
[1/2] STEP 3/5: RUN ansible-galaxy collection install -r /build/requirements.yml --collections-path /usr/share/ansible/collections
[2/2] STEP 1/3: FROM localhost/ansible-builder-builder:latest
[2/2] STEP 2/3: COPY --from=0 /usr/share/ansible/collections /usr/share/ansible/collections
[2/2] STEP 3/3: COMMIT myee:1.0
Successfully tagged localhost/myee:1.0`,
        manPage: `ansible-builder build [OPTIONS]

Build an Execution Environment image.

Options:
  -t, --tag TAG                 Name and optionally tag the image (name:tag)
  -f, --file FILE               Name of definition file (default: execution-environment.yml)
  --container-runtime RUNTIME   Container runtime to use: podman (default) or docker
  --verbosity LEVEL             Verbosity level: 0-3
  --no-cache                    Do not use cache when building
  --build-arg ARG=VALUE         Set build-time variables`
      },
      {
        id: "pc-ex374-2",
        category: "ansible-navigator",
        title: "Ejecutar playbook con EE",
        command: "ansible-navigator run",
        prompt: "ansible-navigator run",
        description: "Ejecuta un playbook de Ansible dentro de un Execution Environment",
        usage: "ansible-navigator run <playbook> [-i <inventory>] [--eei <image>] [-m stdout|interactive] [--mode <mode>]",
        examples: [
          "ansible-navigator run site.yml -i inventory/hosts --mode stdout",
          "ansible-navigator run deploy.yml --eei quay.io/ansible/ee-supported-rhel8:latest -m stdout",
          "ansible-navigator run site.yml --eei myee:latest --pull-policy missing"
        ],
        simulatedOutput: `PLAY [Configure web servers] **********************************************

TASK [Gathering Facts] ****************************************************
ok: [web1.example.com]
ok: [web2.example.com]

TASK [Install httpd] ******************************************************
changed: [web1.example.com]
changed: [web2.example.com]

TASK [Start and enable httpd] *********************************************
changed: [web1.example.com]
changed: [web2.example.com]

PLAY RECAP ****************************************************************
web1.example.com           : ok=3    changed=2    unreachable=0    failed=0
web2.example.com           : ok=3    changed=2    unreachable=0    failed=0`,
        manPage: `ansible-navigator run [OPTIONS] PLAYBOOK

Run a playbook using an Execution Environment.

Options:
  -i, --inventory INVENTORY     Specify inventory
  --eei, --ee-image IMAGE       Execution Environment image to use
  -m, --mode MODE               Output mode: stdout or interactive (default: interactive)
  --pull-policy POLICY          Image pull policy: always, missing, never, tag
  --ce, --container-engine ENG  Container engine: auto, podman, docker
  -e, --extra-vars VARS         Set additional variables
  --limit HOSTS                 Limit to specific hosts
  --tags TAGS                   Only run plays/tasks tagged with these values`
      },
      {
        id: "pc-ex374-3",
        category: "ansible-navigator",
        title: "Ver Execution Environments disponibles",
        command: "ansible-navigator images",
        prompt: "ansible-navigator images",
        description: "Lista y permite inspeccionar los Execution Environments disponibles localmente",
        usage: "ansible-navigator images [--eei <image>] [--mode stdout|interactive]",
        examples: [
          "ansible-navigator images",
          "ansible-navigator images --mode stdout",
          "ansible-navigator images --eei myee:latest --mode stdout"
        ],
        simulatedOutput: `  Image                                          Tag       Execution environment  Created         Size
0│ee-supported-rhel8                             latest    True                   3 weeks ago     1.5 GB
1│myee                                           1.0       True                   2 days ago      987 MB
2│ee-minimal-rhel8                               latest    True                   3 weeks ago     312 MB`,
        manPage: `ansible-navigator images [OPTIONS]

List available Execution Environment images.

Options:
  --eei IMAGE        Specify image to inspect
  --mode MODE        Output mode: stdout or interactive
  --ce ENGINE        Container engine: auto, podman, docker`
      },
      {
        id: "pc-ex374-4",
        category: "ansible-galaxy",
        title: "Gestionar colecciones",
        command: "ansible-galaxy collection",
        prompt: "ansible-galaxy collection",
        description: "Gestiona colecciones de Ansible: instalar, construir, publicar, inicializar",
        usage: "ansible-galaxy collection <subcommand> [OPTIONS]",
        examples: [
          "ansible-galaxy collection install community.general",
          "ansible-galaxy collection install -r collections/requirements.yml",
          "ansible-galaxy collection init myns.mycol",
          "ansible-galaxy collection build",
          "ansible-galaxy collection publish myns-mycol-1.0.0.tar.gz --server automation_hub",
          "ansible-galaxy collection list"
        ],
        simulatedOutput: `Starting galaxy collection install process
Process install dependency map
Starting collection install process
Downloading https://galaxy.ansible.com/download/community-general-7.5.0.tar.gz
Installing 'community.general:7.5.0' to '/home/user/.ansible/collections/ansible_collections/community/general'
community.general:7.5.0 was installed successfully`,
        manPage: `ansible-galaxy collection SUBCOMMAND [OPTIONS]

Subcommands:
  install    Install collection(s) from Galaxy, Hub, or file
  init       Initialize new collection structure
  build      Build a collection archive
  publish    Publish a collection to Galaxy or Automation Hub
  list       Show installed collections
  verify     Verify installed collection against server

Options (install):
  -r, --requirements-file FILE   Install from requirements file
  -p, --collections-path PATH    Path to install collections
  --server SERVER                Galaxy server to use
  --force                        Force overwrite of existing`
      },
      {
        id: "pc-ex374-5",
        category: "awx",
        title: "CLI de AWX/Controller",
        command: "awx",
        prompt: "awx",
        description: "Herramienta CLI para interactuar con la API de Automation Controller desde la terminal",
        usage: "awx [--conf.host HOST] [--conf.username USER] [--conf.password PASS] <resource> <action> [OPTIONS]",
        examples: [
          "awx job_template list",
          "awx job_template launch --id 5 --extra_vars '{\"env\": \"prod\"}'",
          "awx inventory list --organization Default",
          "awx job list --status failed",
          "awx credential create --name 'SSH Key' --credential_type Machine --organization Default"
        ],
        simulatedOutput: `== ============ ============== =========
id name          status         started
== ============ ============== =========
42 Deploy App    successful     2024-01-15
41 Deploy App    failed         2024-01-14
40 Deploy App    successful     2024-01-13
== ============ ============== =========`,
        manPage: `awx [OPTIONS] RESOURCE ACTION [ARGS]

A command-line interface for Ansible Automation Platform Controller.

Common resources: job_template, workflow_job_template, job, inventory,
  credential, project, organization, team, user, notification_template,
  schedule, instance_group

Common actions: list, get, create, modify, delete, launch, copy

Global Options:
  --conf.host HOST        Controller host URL
  --conf.username USER    Username for authentication
  --conf.password PASS    Password for authentication
  --conf.token TOKEN      OAuth2 token
  -f, --conf.format FMT   Output format: human, json, yaml, jq`
      },
      {
        id: "pc-ex374-6",
        category: "ansible-builder",
        title: "Generar contexto de construcción",
        command: "ansible-builder create",
        prompt: "ansible-builder create",
        description: "Genera el directorio context con el Containerfile sin construir la imagen",
        usage: "ansible-builder create [-f <definition-file>] [--output-filename <name>]",
        examples: [
          "ansible-builder create",
          "ansible-builder create -f execution-environment.yml",
          "ansible-builder create --output-filename MyContainerfile"
        ],
        simulatedOutput: `Complete! The build context can be found at: /home/user/myproject/context
The Containerfile can be found at: /home/user/myproject/context/Containerfile`,
        manPage: `ansible-builder create [OPTIONS]

Generate a build context (Containerfile and supporting files)
without building the image. Useful for inspection or custom builds.

Options:
  -f, --file FILE               Definition file (default: execution-environment.yml)
  --output-filename NAME        Name of the output file (default: Containerfile)
  --context PATH                Path to write the build context`
      },
      {
        id: "pc-ex374-7",
        category: "ansible-navigator",
        title: "Documentación de módulos en EE",
        command: "ansible-navigator doc",
        prompt: "ansible-navigator doc",
        description: "Muestra la documentación de un módulo disponible dentro del Execution Environment",
        usage: "ansible-navigator doc <module> [--eei <image>] [-m stdout|interactive]",
        examples: [
          "ansible-navigator doc ansible.builtin.user",
          "ansible-navigator doc community.general.git_config -m stdout",
          "ansible-navigator doc amazon.aws.ec2_instance --eei myee:latest -m stdout"
        ],
        simulatedOutput: `> ANSIBLE.BUILTIN.USER    (built-in)

SYNOPSIS
  Manage user accounts and user attributes.
  For Windows targets, use the ansible.windows.win_user module instead.

PARAMETERS
  name (required)
      Name of the user to create, remove or modify.
      type: str

  state
      Whether the account should exist or not.
      Choices: absent, present (default: present)
      type: str

  password
      Optionally set the user's password to this crypted value.
      type: str`,
        manPage: `ansible-navigator doc [OPTIONS] PLUGIN_NAME

Show documentation for a plugin or module.

Options:
  --eei IMAGE        Execution Environment image
  -m, --mode MODE    Output mode: stdout or interactive
  -t, --type TYPE    Plugin type: become, cache, callback, cliconf,
                     connection, filter, httpapi, inventory, lookup,
                     module (default), netconf, role, strategy, test,
                     vars`
      },
      {
        id: "pc-ex374-8",
        category: "ansible-navigator",
        title: "Inspeccionar inventario con navigator",
        command: "ansible-navigator inventory",
        prompt: "ansible-navigator inventory",
        description: "Explora y verifica el inventario de Ansible usando ansible-navigator",
        usage: "ansible-navigator inventory -i <inventory> [--list] [--host <host>] [-m stdout]",
        examples: [
          "ansible-navigator inventory -i inventory/ --list -m stdout",
          "ansible-navigator inventory -i inventory/hosts --host web1.example.com -m stdout",
          "ansible-navigator inventory -i inventory/ -m interactive"
        ],
        simulatedOutput: `{
    "_meta": {
        "hostvars": {
            "web1.example.com": {
                "ansible_user": "ansible",
                "http_port": 80
            },
            "db1.example.com": {
                "ansible_user": "ansible",
                "db_port": 5432
            }
        }
    },
    "all": {
        "children": ["webservers", "databases"]
    },
    "webservers": {
        "hosts": ["web1.example.com", "web2.example.com"]
    },
    "databases": {
        "hosts": ["db1.example.com"]
    }
}`,
        manPage: `ansible-navigator inventory [OPTIONS]

Explore and verify Ansible inventory.

Options:
  -i, --inventory INVENTORY     Inventory source (file, directory, script)
  --list                        Output all hosts info
  --host HOST                   Output specific host info
  --graph                       Show inventory graph
  -m, --mode MODE               Output mode: stdout or interactive
  --eei IMAGE                   Execution Environment image`
      }
    ],
    consoleMissions: [
      {
        id: "cm-ex374-1",
        title: "Inicializar una colección de Ansible",
        category: "Colecciones",
        prompt: "$ ",
        mission: "Inicializa la estructura de una nueva colección llamada 'mycompany.network' usando ansible-galaxy.",
        hints: [
          "El comando para inicializar colecciones es ansible-galaxy collection init",
          "El formato del nombre es namespace.collection_name",
          "Esto crea la estructura de directorios estándar"
        ],
        validCommands: [
          "ansible-galaxy collection init mycompany.network",
          "ansible-galaxy collection init mycompany/network"
        ],
        manPages: {
          "ansible-galaxy": "ansible-galaxy collection init NAMESPACE.COLLECTION_NAME\n\nInitialize a collection skeleton."
        },
        successMessage: "¡Correcto! La estructura mycompany/network/ ha sido creada con galaxy.yml, README.md y los directorios estándar.",
        simulatedOutput: `- Collection mycompany.network was created successfully`
      },
      {
        id: "cm-ex374-2",
        title: "Construir artefacto de colección",
        category: "Colecciones",
        prompt: "$ ",
        mission: "Construye el artefacto (.tar.gz) de la colección que está en el directorio mycompany/network/",
        hints: [
          "El comando para construir colecciones es ansible-galaxy collection build",
          "Se ejecuta desde el directorio padre de la colección o especificando la ruta",
          "Genera un archivo .tar.gz con el formato namespace-name-version.tar.gz"
        ],
        validCommands: [
          "ansible-galaxy collection build mycompany/network",
          "ansible-galaxy collection build mycompany/network/",
          "cd mycompany/network && ansible-galaxy collection build"
        ],
        manPages: {
          "ansible-galaxy": "ansible-galaxy collection build [COLLECTION_PATH]\n\nBuild a collection archive."
        },
        successMessage: "¡Bien! Se ha creado el archivo mycompany-network-1.0.0.tar.gz listo para publicar.",
        simulatedOutput: `Created collection for mycompany.network at /home/user/mycompany-network-1.0.0.tar.gz`
      },
      {
        id: "cm-ex374-3",
        title: "Instalar colecciones desde requirements.yml",
        category: "Colecciones",
        prompt: "$ ",
        mission: "Instala todas las colecciones definidas en el archivo collections/requirements.yml",
        hints: [
          "Usa ansible-galaxy collection install con la opción -r para requirements",
          "La opción -r especifica el archivo de requirements",
          "El archivo requirements.yml tiene formato YAML con una clave 'collections'"
        ],
        validCommands: [
          "ansible-galaxy collection install -r collections/requirements.yml",
          "ansible-galaxy collection install -r requirements.yml"
        ],
        manPages: {
          "ansible-galaxy": "ansible-galaxy collection install -r requirements.yml\n\nInstall collections from a requirements file."
        },
        successMessage: "¡Correcto! Todas las colecciones del requirements.yml han sido instaladas.",
        simulatedOutput: `Starting galaxy collection install process
Process install dependency map
Starting collection install process
Installing 'community.general:7.5.0' to '/home/user/.ansible/collections'
Installing 'ansible.posix:1.5.4' to '/home/user/.ansible/collections'
community.general:7.5.0 was installed successfully
ansible.posix:1.5.4 was installed successfully`
      },
      {
        id: "cm-ex374-4",
        title: "Ejecutar playbook en modo stdout con EE",
        category: "ansible-navigator",
        prompt: "$ ",
        mission: "Ejecuta el playbook site.yml con el inventario inventory/hosts usando ansible-navigator en modo stdout con el EE 'ee-supported-rhel8:latest'.",
        hints: [
          "Usa ansible-navigator run con --mode stdout o -m stdout",
          "Especifica el EE con --eei (execution environment image)",
          "Especifica el inventario con -i"
        ],
        validCommands: [
          "ansible-navigator run site.yml -i inventory/hosts -m stdout --eei ee-supported-rhel8:latest",
          "ansible-navigator run site.yml -i inventory/hosts --mode stdout --eei ee-supported-rhel8:latest",
          "ansible-navigator run site.yml --eei ee-supported-rhel8:latest -m stdout -i inventory/hosts"
        ],
        manPages: {
          "ansible-navigator": "ansible-navigator run PLAYBOOK [OPTIONS]\n\n-m, --mode MODE: stdout or interactive\n--eei IMAGE: Execution Environment image"
        },
        successMessage: "¡Perfecto! El playbook se ha ejecutado dentro del EE ee-supported-rhel8:latest mostrando la salida en la terminal.",
        simulatedOutput: `PLAY [All servers] ****************************************************

TASK [Gathering Facts] ************************************************
ok: [server1.example.com]

TASK [Ensure NTP is configured] ***************************************
changed: [server1.example.com]

PLAY RECAP ************************************************************
server1.example.com  : ok=2  changed=1  unreachable=0  failed=0`
      },
      {
        id: "cm-ex374-5",
        title: "Generar contexto de EE sin construir imagen",
        category: "Execution Environments",
        prompt: "$ ",
        mission: "Genera el contexto de construcción del EE definido en execution-environment.yml sin construir la imagen todavía.",
        hints: [
          "El subcomando para generar solo el contexto es 'create', no 'build'",
          "ansible-builder create genera el Containerfile y archivos de soporte",
          "Útil para inspeccionar o modificar el Containerfile antes de construir"
        ],
        validCommands: [
          "ansible-builder create",
          "ansible-builder create -f execution-environment.yml"
        ],
        manPages: {
          "ansible-builder": "ansible-builder create [-f FILE]\n\nGenerate build context without building the image."
        },
        successMessage: "¡Bien! El directorio context/ ha sido creado con el Containerfile y los archivos de soporte.",
        simulatedOutput: `Complete! The build context can be found at: /home/user/project/context
The Containerfile can be found at: /home/user/project/context/Containerfile`
      },
      {
        id: "cm-ex374-6",
        title: "Listar colecciones instaladas",
        category: "Colecciones",
        prompt: "$ ",
        mission: "Lista todas las colecciones de Ansible instaladas en el sistema.",
        hints: [
          "Usa ansible-galaxy collection con el subcomando list",
          "Muestra el namespace, nombre y versión de cada colección instalada",
          "También se puede usar con ansible-navigator dentro de un EE"
        ],
        validCommands: [
          "ansible-galaxy collection list",
          "ansible-galaxy collection list --collections-path ~/.ansible/collections"
        ],
        manPages: {
          "ansible-galaxy": "ansible-galaxy collection list [OPTIONS]\n\nShow installed collections."
        },
        successMessage: "¡Correcto! Se muestran todas las colecciones instaladas con su namespace, nombre y versión.",
        simulatedOutput: `# /home/user/.ansible/collections/ansible_collections
Collection               Version
------------------------ -------
ansible.posix            1.5.4
community.general        7.5.0
redhat.rhel_system_roles 1.23.0`
      },
      {
        id: "cm-ex374-7",
        title: "Ver imágenes de EE disponibles",
        category: "ansible-navigator",
        prompt: "$ ",
        mission: "Lista las imágenes de Execution Environment disponibles localmente en modo stdout.",
        hints: [
          "El subcomando de ansible-navigator para ver imágenes es 'images'",
          "Usa --mode stdout para ver la salida en la terminal",
          "Muestra las imágenes disponibles con sus tags y si son EE"
        ],
        validCommands: [
          "ansible-navigator images --mode stdout",
          "ansible-navigator images -m stdout"
        ],
        manPages: {
          "ansible-navigator": "ansible-navigator images [OPTIONS]\n\nList available Execution Environment images.\n\n--mode MODE: stdout or interactive"
        },
        successMessage: "¡Perfecto! Se muestran las imágenes EE disponibles localmente con su tag y fecha de creación.",
        simulatedOutput: `  Image                       Tag     Execution environment  Created       Size
0│ee-supported-rhel8           latest  True                   3 weeks ago   1.5 GB
1│myee                         1.0     True                   2 days ago    987 MB`
      },
      {
        id: "cm-ex374-8",
        title: "Consultar documentación de módulo en EE",
        category: "ansible-navigator",
        prompt: "$ ",
        mission: "Consulta la documentación del módulo 'ansible.builtin.template' en modo stdout usando ansible-navigator.",
        hints: [
          "El subcomando para ver documentación es 'doc'",
          "Especifica el módulo con su FQCN: ansible.builtin.template",
          "Usa -m stdout para ver la salida en la terminal"
        ],
        validCommands: [
          "ansible-navigator doc ansible.builtin.template -m stdout",
          "ansible-navigator doc ansible.builtin.template --mode stdout"
        ],
        manPages: {
          "ansible-navigator": "ansible-navigator doc PLUGIN [OPTIONS]\n\nShow documentation for a plugin.\n\n-m, --mode MODE: stdout or interactive"
        },
        successMessage: "¡Correcto! La documentación del módulo template se muestra con sus parámetros, opciones y ejemplos.",
        simulatedOutput: `> ANSIBLE.BUILTIN.TEMPLATE    (built-in)

SYNOPSIS
  Templates a file out to a target host.
  When used with a loop, if you want the src file to be unique for
  each loop entry, use the template name with a loop var.

PARAMETERS
  src (required)
      Path of a Jinja2 formatted template on the Ansible controller.
      type: path

  dest (required)
      Location to render the template to on the remote machine.
      type: path`
      }
    ],
    livePracticeTasks: [
      {
        id: "lpt-ex374-1",
        title: "Crear execution-environment.yml básico",
        category: "Execution Environments",
        task: "Crea un archivo execution-environment.yml que defina: versión 1, imagen base 'ee-minimal-rhel8:latest', y que instale la colección 'community.general:>=7.0' a través de un requirements.yml en collections/requirements.yml.",
        hints: [
          "La estructura tiene las claves: version, build_arg_defaults, dependencies",
          "La clave dependencies.galaxy apunta a la ruta del requirements.yml",
          "La versión del formato es la versión del esquema de execution-environment.yml"
        ],
        validCommands: ["ansible-builder build", "ansible-builder create", "cat execution-environment.yml"],
        solution: `# execution-environment.yml
version: 1

build_arg_defaults:
  EE_BASE_IMAGE: 'registry.redhat.io/ansible-automation-platform-22/ee-minimal-rhel8:latest'

dependencies:
  galaxy: collections/requirements.yml

# collections/requirements.yml
collections:
  - name: community.general
    version: '>=7.0'`
      },
      {
        id: "lpt-ex374-2",
        title: "Crear un playbook que use FQCN de colección",
        category: "Colecciones",
        task: "Escribe un playbook que use el módulo community.general.git_config (FQCN) para configurar el nombre de usuario y email de git de forma global en los hosts del inventario.",
        hints: [
          "El FQCN es namespace.collection.module",
          "git_config tiene los parámetros: name, value, scope",
          "Para configuración global usar scope: global"
        ],
        validCommands: ["ansible-playbook configure_git.yml", "ansible-navigator run configure_git.yml -m stdout"],
        solution: `---
- name: Configure git global settings
  hosts: all
  become: false
  tasks:
    - name: Set git global user name
      community.general.git_config:
        name: user.name
        value: "Ansible User"
        scope: global

    - name: Set git global user email
      community.general.git_config:
        name: user.email
        value: "ansible@example.com"
        scope: global`
      },
      {
        id: "lpt-ex374-3",
        title: "Crear ansible-navigator.yml de configuración",
        category: "ansible-navigator",
        task: "Crea un archivo ansible-navigator.yml que configure: EE por defecto 'quay.io/ansible/ee-supported-rhel8:latest', modo de salida stdout por defecto, política de pull 'missing', y habilite el registro de artifacts de playbook en el directorio ./artifacts/.",
        hints: [
          "La clave raíz del archivo es 'ansible-navigator'",
          "La imagen EE se configura bajo execution-environment.image",
          "El modo se configura bajo mode",
          "Los artifacts bajo playbook-artifact"
        ],
        validCommands: ["ansible-navigator run site.yml", "cat ansible-navigator.yml"],
        solution: `---
ansible-navigator:
  execution-environment:
    image: quay.io/ansible/ee-supported-rhel8:latest
    pull:
      policy: missing
  mode: stdout
  playbook-artifact:
    enable: true
    save-as: artifacts/{playbook_name}-{time_stamp}.json`
      },
      {
        id: "lpt-ex374-4",
        title: "Usar la colección ansible.controller en un playbook",
        category: "API y CaC",
        task: "Escribe un playbook que use la colección ansible.controller para crear un inventario llamado 'Production' en la organización 'Default' del Automation Controller. El Controller está en https://controller.example.com con usuario admin y contraseña almacenada en la variable vault_controller_password.",
        hints: [
          "El módulo es ansible.controller.inventory",
          "Necesitas los parámetros: name, organization, controller_host, controller_username, controller_password",
          "Usa validate_certs: false si el Controller usa un certificado autofirmado"
        ],
        validCommands: ["ansible-playbook create_inventory.yml --ask-vault-pass", "ansible-navigator run create_inventory.yml -m stdout"],
        solution: `---
- name: Configure Automation Controller inventory
  hosts: localhost
  gather_facts: false
  vars:
    controller_host: https://controller.example.com
    controller_username: admin
  tasks:
    - name: Create Production inventory
      ansible.controller.inventory:
        name: Production
        organization: Default
        description: Production environment hosts
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false
        state: present`
      },
      {
        id: "lpt-ex374-5",
        title: "Crear galaxy.yml para una nueva colección",
        category: "Colecciones",
        task: "Crea el archivo galaxy.yml para una colección llamada 'infrastructure' en el namespace 'mycompany', versión 1.0.0, con descripción, nombre del autor y lista de dependencias que incluya 'ansible.posix:>=1.5'.",
        hints: [
          "Los campos obligatorios son: namespace, name, version",
          "Las dependencias se especifican como un diccionario en la clave 'dependencies'",
          "El formato de versión debe seguir semver"
        ],
        validCommands: ["ansible-galaxy collection build", "cat galaxy.yml"],
        solution: `namespace: mycompany
name: infrastructure
version: 1.0.0
readme: README.md
description: "Internal infrastructure automation collection"
authors:
  - "Your Name <your.email@example.com>"
license:
  - GPL-2.0-or-later
tags:
  - infrastructure
  - automation
dependencies:
  "ansible.posix": ">=1.5.0"
repository: https://github.com/mycompany/ansible-collection-infrastructure
documentation: https://mycompany.github.io/ansible-collection-infrastructure
issues: https://github.com/mycompany/ansible-collection-infrastructure/issues`
      },
      {
        id: "lpt-ex374-6",
        title: "Crear Job Template via API REST",
        category: "API de AAP",
        task: "Escribe el comando curl para crear un Job Template llamado 'Deploy App' en el Controller (https://controller.example.com), asociado al proyecto ID 5, playbook deploy.yml, inventario ID 3 y credencial ID 2. Usa autenticación con token Bearer.",
        hints: [
          "El endpoint es POST /api/v2/job_templates/",
          "El cuerpo debe ser JSON con los campos name, project, playbook, inventory, credentials",
          "El header de autenticación es 'Authorization: Bearer <token>'"
        ],
        validCommands: ["curl -X POST", "curl --request POST"],
        solution: `curl -k -X POST https://controller.example.com/api/v2/job_templates/ \\
  -H "Authorization: Bearer <your-token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Deploy App",
    "project": 5,
    "playbook": "deploy.yml",
    "inventory": 3,
    "credentials": [2],
    "ask_variables_on_launch": false,
    "survey_enabled": false
  }'`
      },
      {
        id: "lpt-ex374-7",
        title: "Definir variables en ansible.cfg para Automation Hub",
        category: "Automation Hub",
        task: "Configura el archivo ansible.cfg para que ansible-galaxy use Automation Hub privado (https://hub.example.com) como primera fuente de colecciones (server_list: automation_hub, galaxy), con el token de autenticación almacenado en la variable de entorno ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_TOKEN.",
        hints: [
          "La configuración de Galaxy está en la sección [galaxy]",
          "server_list define el orden de preferencia de servidores",
          "Cada servidor tiene su sección [galaxy_server.<name>]",
          "Para referir a variables de entorno usar %(ENV_VAR)s en valores o definir el token directamente"
        ],
        validCommands: ["ansible-galaxy collection install community.general", "cat ansible.cfg"],
        solution: `[galaxy]
server_list = automation_hub, galaxy

[galaxy_server.automation_hub]
url=https://hub.example.com/api/galaxy/content/rh-certified/
auth_url=https://sso.example.com/auth/realms/redhat-external/protocol/openid-connect/token
token={{ lookup('env', 'AUTOMATION_HUB_TOKEN') }}

[galaxy_server.galaxy]
url=https://galaxy.ansible.com/

# Para usar variable de entorno directamente:
# export ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_TOKEN=<token>
# O definir en ansible.cfg con token=<valor>`
      },
      {
        id: "lpt-ex374-8",
        title: "Workflow Job Template con nodos condicionales",
        category: "Workflows",
        task: "Usando la colección ansible.controller, escribe las tareas necesarias para crear un Workflow Job Template llamado 'Full Deploy Pipeline' que encadene tres nodos: run-tests (nodo raíz), deploy-staging (on_success de run-tests) y rollback (on_failure de run-tests). Asume que los Job Templates ya existen.",
        hints: [
          "El módulo para crear el workflow es ansible.controller.workflow_job_template",
          "Los nodos se definen en la propiedad schema del workflow",
          "Cada nodo tiene: unified_job_template, success_nodes, failure_nodes, always_nodes"
        ],
        validCommands: ["ansible-playbook create_workflow.yml", "ansible-navigator run create_workflow.yml -m stdout"],
        solution: `- name: Create Full Deploy Pipeline workflow
  ansible.controller.workflow_job_template:
    name: Full Deploy Pipeline
    organization: Default
    schema:
      - unified_job_template:
          name: run-tests
          type: job_template
        identifier: run-tests-node
        success_nodes:
          - identifier: deploy-staging-node
        failure_nodes:
          - identifier: rollback-node
      - unified_job_template:
          name: deploy-staging
          type: job_template
        identifier: deploy-staging-node
      - unified_job_template:
          name: rollback
          type: job_template
        identifier: rollback-node
    controller_host: https://controller.example.com
    controller_username: admin
    controller_password: "{{ vault_controller_password }}"
    validate_certs: false
    state: present`
      },
      {
        id: "lpt-ex374-9",
        title: "Script de lanzamiento y monitorización de job via API",
        category: "API de AAP",
        task: "Escribe un script de shell que: 1) lance el Job Template ID 10, 2) extraiga el job_id de la respuesta, 3) espere en un bucle hasta que el status sea 'successful' o 'failed', y 4) salga con código 0 si fue exitoso o 1 si falló.",
        hints: [
          "Usa curl para las llamadas a la API",
          "Usa jq para parsear el JSON de respuesta",
          "El endpoint de lanzamiento es POST /api/v2/job_templates/10/launch/",
          "El endpoint de estado es GET /api/v2/jobs/<id>/"
        ],
        validCommands: ["bash launch_job.sh", "chmod +x launch_job.sh && ./launch_job.sh"],
        solution: `#!/bin/bash
CONTROLLER="https://controller.example.com"
TOKEN="<your-token>"
JT_ID=10

# Launch the job
RESPONSE=$(curl -sk -X POST "$CONTROLLER/api/v2/job_templates/$JT_ID/launch/" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" -d '{}')

JOB_ID=$(echo "$RESPONSE" | jq -r '.id')
echo "Job launched with ID: $JOB_ID"

# Poll until finished
while true; do
  STATUS=$(curl -sk "$CONTROLLER/api/v2/jobs/$JOB_ID/" \\
    -H "Authorization: Bearer $TOKEN" | jq -r '.status')
  echo "Current status: $STATUS"
  case "$STATUS" in
    successful)
      echo "Job completed successfully."
      exit 0 ;;
    failed|canceled|error)
      echo "Job failed with status: $STATUS"
      exit 1 ;;
    *)
      sleep 10 ;;
  esac
done`
      },
      {
        id: "lpt-ex374-10",
        title: "Crear credencial de tipo Machine via awx CLI",
        category: "Automation Controller",
        task: "Usa el comando awx para crear una credencial de tipo 'Machine' llamada 'Prod SSH Key' en la organización 'Default', con usuario ansible y la clave privada SSH almacenada en el archivo ~/.ssh/ansible_key.",
        hints: [
          "El tipo de credencial es 'Machine'",
          "Los inputs incluyen: username y ssh_key_data",
          "Usa $(cat ~/.ssh/ansible_key) para leer la clave privada",
          "Necesitarás configurar previamente las credenciales de acceso al Controller con awx login"
        ],
        validCommands: ["awx credential create", "awx login"],
        solution: `# Primero hacer login
awx login --conf.host https://controller.example.com \\
           --conf.username admin \\
           --conf.password mypassword

# Crear la credencial
awx credential create \\
  --name "Prod SSH Key" \\
  --organization Default \\
  --credential_type "Machine" \\
  --inputs "{
    \"username\": \"ansible\",
    \"ssh_key_data\": \"$(cat ~/.ssh/ansible_key)\"
  }"

# Verificar que se creó correctamente
awx credential list --name "Prod SSH Key"`
      }
    ]
  }
};
