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
      { id: 40, certification: "ex374", category: "ansible-navigator", difficulty: "Avanzado", question: "¿Qué información proporciona 'ansible-navigator images'?", options: ["Lista los hosts del inventario", "Muestra los Execution Environments disponibles localmente con detalles sobre colecciones, versión de Ansible y dependencias incluidas", "Lista las imágenes de los nodos gestionados", "Muestra el registro de ejecuciones anteriores"], correctAnswer: 1, explanation: "ansible-navigator images lista las imágenes de EE disponibles localmente y permite inspeccionar su contenido: versión de Ansible, colecciones instaladas, dependencias Python y del sistema." },
      { id: 41, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Qué es un Team en Automation Controller?", options: ["Un conjunto de nodos de ejecución", "Un grupo de usuarios dentro de una organización al que se pueden asignar roles colectivamente", "Un tipo de credencial compartida", "Un inventario con múltiples grupos"], correctAnswer: 1, explanation: "Los Teams agrupan usuarios de una organización y permiten asignar permisos RBAC de forma colectiva, simplificando la gestión de acceso en entornos con muchos usuarios." },
      { id: 42, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Cuál es el propósito de los Labels en Automation Controller?", options: ["Etiquetar jobs, plantillas e inventarios para facilitar su búsqueda y organización", "Definir credenciales de acceso", "Configurar el sistema de notificaciones", "Controlar el flujo de ejecución de workflows"], correctAnswer: 0, explanation: "Los Labels son etiquetas que se pueden aplicar a Job Templates, Workflow Templates e Inventarios para organizarlos y filtrarlos fácilmente en la interfaz del Controller." },
      { id: 43, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué significa la opción 'Verbosity' en un Job Template de Automation Controller?", options: ["El nivel de detalle de los logs del job, equivalente al parámetro -v de ansible-playbook", "El número máximo de hosts que puede gestionar el job", "El tiempo máximo de ejecución del job", "El número de reintentos en caso de fallo"], correctAnswer: 0, explanation: "Verbosity controla el nivel de detalle de la salida del job: 0=Normal, 1=-v, 2=-vv, 3=-vvv, 4=-vvvv, 5=-vvvvv. Niveles más altos son útiles para depuración." },
      { id: 44, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué hace la opción 'Allow Simultaneous' en un Job Template?", options: ["Permite que el mismo Job Template se ejecute en varios hosts a la vez", "Permite que múltiples instancias del mismo Job Template se ejecuten simultáneamente", "Permite que el job use múltiples credenciales al mismo tiempo", "Habilita la ejecución en paralelo de los plays del playbook"], correctAnswer: 1, explanation: "Por defecto, un Job Template no puede tener dos instancias en ejecución simultánea. La opción 'Allow Simultaneous' desactiva esta restricción para permitir ejecuciones paralelas." },
      { id: 45, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué es un Smart Inventory en Automation Controller?", options: ["Un inventario que se sincroniza automáticamente con una fuente dinámica", "Un inventario virtual que agrega hosts de varios inventarios usando filtros", "Un inventario con variables cifradas automáticamente", "Un inventario de solo lectura importado desde Git"], correctAnswer: 1, explanation: "Un Smart Inventory es un inventario virtual que filtra y combina hosts de otros inventarios del Controller usando expresiones de búsqueda, sin necesidad de mantener una lista estática." },
      { id: 46, certification: "ex374", category: "Automation Controller", difficulty: "Avanzado", question: "¿Qué es el 'job slicing' (slice jobs) en Automation Controller?", options: ["Dividir un playbook en múltiples archivos para su ejecución secuencial", "Distribuir la ejecución de un job entre múltiples nodos dividiendo el inventario", "Ejecutar solo un subconjunto de tareas de un playbook mediante tags", "Partir el inventario en grupos iguales para balancear la carga de red"], correctAnswer: 1, explanation: "Job slicing divide el inventario entre varios jobs hijos que se ejecutan en paralelo, distribuyendo la carga. Es útil para playbooks que gestionan cientos de hosts simultáneamente." },
      { id: 47, certification: "ex374", category: "Automation Controller", difficulty: "Avanzado", question: "¿Cuál es la diferencia entre un 'approval node' y un 'job node' en un Workflow?", options: ["El approval node requiere que un usuario autorice manualmente antes de continuar; el job node ejecuta un Job Template", "El approval node ejecuta scripts de validación; el job node ejecuta roles", "No hay diferencia funcional, solo cambia el icono en la UI", "El approval node es para entornos de producción; el job node para desarrollo"], correctAnswer: 0, explanation: "Un approval node pausa el workflow y espera que un usuario autorizado lo apruebe (o rechace) antes de continuar. Un job node ejecuta directamente un Job Template o Workflow Template." },
      { id: 48, certification: "ex374", category: "Execution Environments", difficulty: "Fácil", question: "¿Cuál es la imagen base recomendada por Red Hat para construir Execution Environments en AAP 2.x?", options: ["ubi8/python39", "ee-minimal-rhel8 o ee-supported-rhel8 de registry.redhat.io", "ansible/ansible:latest de Docker Hub", "fedora:latest"], correctAnswer: 1, explanation: "Red Hat proporciona imágenes base para EE en registry.redhat.io: ee-minimal-rhel8 (ligera) y ee-supported-rhel8 (con colecciones de Red Hat preinstaladas), que son las recomendadas para AAP 2.x." },
      { id: 49, certification: "ex374", category: "Execution Environments", difficulty: "Medio", question: "¿Qué formato de archivo usa ansible-builder para las instrucciones adicionales de construcción de la imagen?", options: ["Dockerfile", "Containerfile", "Los additional_build_steps en execution-environment.yml con prepend/append", "Un archivo build.sh"], correctAnswer: 2, explanation: "En execution-environment.yml, la sección additional_build_steps permite añadir instrucciones de imagen con prepend (antes de instalar dependencias) y append (después), usando la sintaxis de Containerfile/Dockerfile." },
      { id: 50, certification: "ex374", category: "Execution Environments", difficulty: "Medio", question: "¿Qué archivo se usa en execution-environment.yml para especificar dependencias de sistema (paquetes RPM) del EE?", options: ["requirements.txt", "galaxy.yml", "bindep.txt", "system-requirements.yml"], correctAnswer: 2, explanation: "bindep.txt (usando el formato de bindep) lista las dependencias de paquetes del sistema operativo que deben instalarse en el EE durante su construcción." },
      { id: 51, certification: "ex374", category: "Execution Environments", difficulty: "Avanzado", question: "¿Cómo se puede reducir el tamaño de un Execution Environment personalizado?", options: ["Usando la imagen base ee-minimal en lugar de ee-supported y solo añadiendo las colecciones estrictamente necesarias", "Eliminando el archivo galaxy.yml", "Usando solo módulos builtin sin colecciones", "Configurando --compress en ansible-builder build"], correctAnswer: 0, explanation: "Partir de ee-minimal-rhel8 (la imagen base más pequeña) e instalar solo las colecciones imprescindibles minimiza el tamaño del EE, mejorando los tiempos de descarga y uso de almacenamiento." },
      { id: 52, certification: "ex374", category: "Automation Hub", difficulty: "Medio", question: "¿Qué son las 'namespaces' en Automation Hub?", options: ["Espacios de nombres que agrupan colecciones bajo un identificador de autor u organización", "Grupos de usuarios del Hub", "Tipos de credenciales del Hub", "Ramas de un repositorio Git"], correctAnswer: 0, explanation: "Los namespaces en Automation Hub agrupan colecciones bajo un identificador único (normalmente el nombre del autor u organización), por ejemplo: 'ansible', 'community', 'redhat'." },
      { id: 53, certification: "ex374", category: "Automation Hub", difficulty: "Medio", question: "¿Cuál es la diferencia entre Red Hat Certified Content y community content en Automation Hub?", options: ["No hay diferencia técnica", "Las colecciones certificadas están probadas y soportadas por Red Hat; las de comunidad son de terceros sin soporte oficial", "Las certificadas solo funcionan en RHEL; las de comunidad en cualquier OS", "Las certificadas no pueden usarse en EE"], correctAnswer: 1, explanation: "Red Hat Certified Content (en console.redhat.com) está probado, mantenido y soportado por Red Hat. El contenido de comunidad proviene de la comunidad Ansible Galaxy sin soporte oficial de Red Hat." },
      { id: 54, certification: "ex374", category: "Automation Hub", difficulty: "Avanzado", question: "¿Cómo se configura Automation Hub privado para requerir aprobación antes de que una colección sea usable?", options: ["Activando 'Require approval' en la configuración del namespace o colección del Hub", "Configurando un webhook en el Controller", "Usando RBAC para bloquear descargas", "Editando el archivo galaxy.yml de la colección"], correctAnswer: 0, explanation: "En el Private Automation Hub, se puede configurar que las colecciones enviadas requieran aprobación explícita de un administrador antes de estar disponibles para su instalación." },
      { id: 55, certification: "ex374", category: "Proyectos y SCM", difficulty: "Medio", question: "¿Qué ventaja tiene usar la opción 'Branch/Tag/Commit' en la configuración de un proyecto en lugar de la rama por defecto?", options: ["Permite fijar el proyecto a una versión específica del código (tag o commit hash), garantizando reproducibilidad", "Aumenta la velocidad de sincronización", "Permite usar múltiples playbooks al mismo tiempo", "Elimina la necesidad de credenciales SCM"], correctAnswer: 0, explanation: "Especificar un tag o commit hash concreto en el proyecto fija la versión del código que se usa, evitando que actualizaciones inesperadas del repositorio afecten a los jobs en producción." },
      { id: 56, certification: "ex374", category: "Proyectos y SCM", difficulty: "Avanzado", question: "¿Qué es un 'project sync job' en Automation Controller?", options: ["Un job especial que actualiza el código del proyecto desde el repositorio SCM", "Un job que sincroniza el inventario con una fuente dinámica", "Un job que replica el Controller a otro nodo", "Un job que actualiza las credenciales desde HashiCorp Vault"], correctAnswer: 0, explanation: "Un project sync job es el proceso interno que clona o actualiza el repositorio SCM del proyecto. Se puede lanzar manualmente, automáticamente antes de cada job o según un schedule." },
      { id: 57, certification: "ex374", category: "API de AAP", difficulty: "Medio", question: "¿Qué endpoint de la API REST devuelve el output en texto de un job terminado?", options: ["/api/v2/jobs/<id>/", "/api/v2/jobs/<id>/stdout/?format=txt", "/api/v2/jobs/<id>/events/", "/api/v2/jobs/<id>/output/"], correctAnswer: 1, explanation: "El endpoint /api/v2/jobs/<id>/stdout/ devuelve el output del job en diferentes formatos: txt (texto plano), json (eventos estructurados), html o ansi, útil para integrar en pipelines CI/CD." },
      { id: 58, certification: "ex374", category: "API de AAP", difficulty: "Medio", question: "¿Cómo se crea un Personal Access Token (PAT) en Automation Controller para uso en la API?", options: ["Desde la configuración de usuario en la UI: Users > Tokens > Add", "Desde Administration > Credentials", "Ejecutando un comando en el servidor del Controller", "Desde el portal de Red Hat Customer Portal"], correctAnswer: 0, explanation: "Los Personal Access Tokens se crean desde la UI en el perfil de usuario (Users > <username> > Tokens > Add), o desde /api/v2/users/<id>/personal_tokens/. Son la forma recomendada de autenticarse en la API." },
      { id: 59, certification: "ex374", category: "API de AAP", difficulty: "Avanzado", question: "¿Cuál es el endpoint para obtener la lista de eventos detallados de un job en ejecución?", options: ["/api/v2/jobs/<id>/events/", "/api/v2/jobs/<id>/stdout/", "/api/v2/job_events/?job=<id>", "Ambas /api/v2/jobs/<id>/events/ y /api/v2/job_events/?job=<id> son equivalentes"], correctAnswer: 0, explanation: "El endpoint /api/v2/jobs/<id>/events/ devuelve los eventos individuales del job en formato JSON, incluyendo el resultado de cada tarea, útil para análisis programático detallado." },
      { id: 60, certification: "ex374", category: "ansible-navigator", difficulty: "Avanzado", question: "¿Qué son los 'playbook artifacts' de ansible-navigator y para qué sirven?", options: ["Archivos de variables extra que se pasan al playbook", "Archivos JSON generados tras la ejecución que permiten repetir o analizar la ejecución posterior", "Logs de errores del Execution Environment", "Metadatos de la imagen EE usada"], correctAnswer: 1, explanation: "Los playbook artifacts son archivos JSON que ansible-navigator genera al finalizar una ejecución. Permiten reproducir la ejecución, analizar resultados detallados o verlos interactivamente con 'ansible-navigator replay'." },
      { id: 61, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Qué tipo de credencial se usa en Automation Controller para clonar repositorios Git privados?", options: ["Machine credential", "Source Control credential", "Vault credential", "Container Registry credential"], correctAnswer: 1, explanation: "Las credenciales de tipo 'Source Control' almacenan usuario/contraseña o clave SSH para acceder a repositorios Git privados al sincronizar proyectos en el Controller." },
      { id: 62, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué permite la opción 'Prompt on launch' en los campos de un Job Template?", options: ["Mostrar un prompt en la terminal al lanzar el job", "Permitir que el usuario sobrescriba ese campo (inventario, credenciales, variables, etc.) en el momento de lanzar el job", "Solicitar aprobación de administrador antes de ejecutar", "Habilitar el modo de depuración automáticamente"], correctAnswer: 1, explanation: "'Prompt on launch' en un campo del Job Template permite que al lanzar el job (desde UI, API o schedule) se pueda proporcionar un valor diferente para ese campo sin modificar el template." },
      { id: 63, certification: "ex374", category: "Notificaciones y Programación", difficulty: "Medio", question: "¿Qué formato de expresión utiliza Automation Controller para definir schedules periódicos?", options: ["Formato cron estándar (5 campos)", "Formato iCalendar (RRULE)", "Formato cron con 6 campos", "Solo intervalos predefinidos: hourly, daily, weekly"], correctAnswer: 1, explanation: "Automation Controller usa el formato iCalendar RRULE para definir schedules, lo que permite patrones complejos como 'cada martes y jueves a las 9am' o 'el último día del mes'." },
      { id: 64, certification: "ex374", category: "Notificaciones y Programación", difficulty: "Avanzado", question: "¿Qué campos personalizables tiene un Notification Template de tipo webhook en Automation Controller?", options: ["Solo URL y método HTTP", "URL, método HTTP, cabeceras personalizadas y cuerpo del mensaje (con variables de contexto)", "Solo URL", "URL, autenticación básica y timeout"], correctAnswer: 1, explanation: "Los webhooks en Automation Controller permiten configurar URL, método HTTP (GET/POST), cabeceras personalizadas y el cuerpo del mensaje, que puede incluir variables de contexto como el nombre del job, estado, URL, etc." },
      { id: 65, certification: "ex374", category: "Colecciones", difficulty: "Fácil", question: "¿Dónde se colocan los módulos personalizados dentro de una colección de Ansible?", options: ["En el directorio raíz de la colección", "En plugins/modules/ dentro de la colección", "En el directorio roles/", "En playbooks/"], correctAnswer: 1, explanation: "Los módulos personalizados se colocan en plugins/modules/ dentro de la estructura de la colección. Se referencian con el FQCN: namespace.collection.module_name." },
      { id: 66, certification: "ex374", category: "Colecciones", difficulty: "Fácil", question: "¿Qué tipo de plugins puede contener una colección además de módulos?", options: ["Solo módulos y roles", "Módulos, roles, plugins de conexión, lookup, filter, callback, inventory y otros", "Solo módulos, roles y playbooks", "Solo plugins de conexión y filter"], correctAnswer: 1, explanation: "Una colección puede contener: módulos, roles, playbooks, plugins de conexión, lookup, filter, callback, inventory, become, cache, vars, etc., agrupados bajo un namespace." },
      { id: 67, certification: "ex374", category: "Colecciones", difficulty: "Medio", question: "¿Cómo se especifica que una colección depende de otra en galaxy.yml?", options: ["En la sección requirements:", "En la clave dependencies: con namespace.collection: version", "En el archivo requirements.yml de la colección", "No es posible definir dependencias entre colecciones"], correctAnswer: 1, explanation: "En galaxy.yml, la clave 'dependencies' acepta un diccionario donde las claves son FQCNs de colecciones y los valores son restricciones de versión. Galaxy/Hub instala las dependencias automáticamente." },
      { id: 68, certification: "ex374", category: "Colecciones", difficulty: "Avanzado", question: "¿Qué es un 'filter plugin' en una colección de Ansible y cómo se usa en un playbook?", options: ["Un plugin que filtra el inventario", "Una función Python disponible en plantillas Jinja2 y expresiones con la sintaxis: valor | namespace.collection.filter_name", "Un módulo para filtrar datos de una API", "Un callback que filtra la salida del log"], correctAnswer: 1, explanation: "Un filter plugin es una función Python que se usa en expresiones Jinja2 con la sintaxis de pipe (|). Al estar en una colección se referencia con FQCN: {{ mylist | myns.mycol.my_filter }}." },
      { id: 69, certification: "ex374", category: "Execution Environments", difficulty: "Avanzado", question: "¿Qué es 'version 3' del formato de execution-environment.yml introducido en ansible-builder 3.x?", options: ["Una versión que elimina la necesidad de imagen base", "Una versión con nueva sintaxis que usa 'images' en lugar de 'build_arg_defaults' y separa la imagen base en 'base_image'", "Una versión solo compatible con Docker", "Una versión que solo soporta colecciones certificadas"], correctAnswer: 1, explanation: "La versión 3 del esquema de execution-environment.yml (ansible-builder 3.x) introduce cambios de sintaxis: usa la sección 'images' con 'base_image' y 'builder_image' en lugar de 'build_arg_defaults'." },
      { id: 70, certification: "ex374", category: "ansible-navigator", difficulty: "Medio", question: "¿Qué política de pull de imágenes usa ansible-navigator por defecto y cómo se cambia?", options: ["always (siempre descarga la imagen), se cambia con --pull-policy tag", "tag (descarga solo si el tag no existe localmente), se cambia con --pull-policy o en ansible-navigator.yml", "never (nunca descarga), se cambia con --pull-policy always", "missing (solo si no está localmente), no se puede cambiar"], correctAnswer: 1, explanation: "La política de pull por defecto es 'tag': descarga la imagen si el tag no existe localmente. Se puede cambiar con --pull-policy (always, missing, never, tag) o en ansible-navigator.yml." },
      { id: 71, certification: "ex374", category: "Automation Controller", difficulty: "Fácil", question: "¿Qué muestra el 'Activity Stream' en Automation Controller?", options: ["Los logs de ejecución de los jobs", "Un registro histórico de todas las acciones realizadas en el Controller (creaciones, modificaciones, eliminaciones)", "El estado actual de los nodos de ejecución", "Las notificaciones pendientes de enviar"], correctAnswer: 1, explanation: "Activity Stream registra todas las acciones de administración realizadas en el Controller: quién creó, modificó o eliminó cada recurso y cuándo, útil para auditoría." },
      { id: 72, certification: "ex374", category: "Automation Controller", difficulty: "Medio", question: "¿Qué permite hacer la integración de Automation Controller con un proveedor de identidad externo (LDAP, SAML, OAuth2)?", options: ["Usar las credenciales corporativas para autenticarse en el Controller sin crear usuarios locales", "Importar inventarios desde el directorio corporativo", "Sincronizar colecciones desde el repositorio corporativo", "Cifrar las credenciales del Controller con claves del directorio corporativo"], correctAnswer: 0, explanation: "La integración con proveedores de identidad (LDAP, SAML, Azure AD, GitHub, Google OAuth2) permite autenticarse en el Controller con las credenciales corporativas y mapear grupos a organizaciones/equipos." },
      { id: 73, certification: "ex374", category: "Automation Controller", difficulty: "Avanzado", question: "¿Qué es el 'Container Groups' en Automation Controller?", options: ["Un grupo de nodos físicos", "Un Instance Group que ejecuta jobs en pods de Kubernetes/OpenShift en lugar de nodos de ejecución tradicionales", "Un grupo de imágenes de contenedor disponibles en el Hub", "Un tipo de inventario para hosts containerizados"], correctAnswer: 1, explanation: "Container Groups son Instance Groups que ejecutan jobs dentro de pods efímeros en un cluster Kubernetes u OpenShift, usando credenciales de tipo 'OpenShift or Kubernetes API Bearer Token'." },
      { id: 74, certification: "ex374", category: "Automation Hub", difficulty: "Fácil", question: "¿Qué comando se usa para verificar la firma de una colección instalada?", options: ["ansible-galaxy collection verify", "ansible-galaxy collection check", "ansible-galaxy collection validate", "ansible-galaxy collection audit"], correctAnswer: 0, explanation: "ansible-galaxy collection verify compara la colección instalada localmente con la versión publicada en el servidor Galaxy/Hub, verificando su integridad mediante checksums." },
      { id: 75, certification: "ex374", category: "Automation Hub", difficulty: "Medio", question: "¿Qué es 'Sync from Red Hat' en el Private Automation Hub?", options: ["Sincronizar colecciones certificadas de Red Hat desde console.redhat.com al hub privado local", "Sincronizar usuarios desde Red Hat SSO", "Actualizar el firmware del hub", "Importar jobs del Controller en el hub"], correctAnswer: 0, explanation: "La función de sincronización permite al Private Automation Hub descargar y mantener actualizado un subconjunto de colecciones certificadas de Red Hat desde console.redhat.com, facilitando el acceso offline." },
      { id: 76, certification: "ex374", category: "Proyectos y SCM", difficulty: "Fácil", question: "¿Qué tipo de SCM soporta Automation Controller además de Git?", options: ["Solo Git", "Git, Subversion (SVN) e Insights", "Git, SVN, Mercurial y FTP", "Git y GitHub únicamente"], correctAnswer: 1, explanation: "Automation Controller soporta Git, Subversion (SVN) y Red Hat Insights como fuentes SCM para los proyectos, aunque Git es por lejos el más utilizado." },
      { id: 77, certification: "ex374", category: "API de AAP", difficulty: "Fácil", question: "¿Cómo se pueden descubrir los endpoints disponibles en la API REST de Automation Controller?", options: ["Solo consultando la documentación oficial", "Navegando a /api/v2/ que devuelve un directorio navegable de todos los endpoints disponibles", "Ejecutando awx api list en la CLI", "Solo con acceso SSH al servidor del Controller"], correctAnswer: 1, explanation: "La API de Automation Controller es auto-descriptiva: el endpoint raíz /api/v2/ devuelve un objeto JSON con todos los endpoints disponibles y es navegable desde el navegador como una API browseable." },
      { id: 78, certification: "ex374", category: "API de AAP", difficulty: "Avanzado", question: "¿Qué es una 'Application' (OAuth2 Application) en Automation Controller y para qué se usa?", options: ["Una app de Power BI integrada en el Controller", "Un registro de aplicación cliente OAuth2 que permite a sistemas externos obtener tokens para acceder a la API del Controller", "Una aplicación móvil oficial de Red Hat", "Una categoría de credenciales para aplicaciones web"], correctAnswer: 1, explanation: "Las Applications OAuth2 permiten registrar clientes (scripts, sistemas CI/CD, herramientas) que necesitan tokens de acceso a la API del Controller, gestionando el ciclo de vida de tokens con mayor control que los PATs." },
      { id: 79, certification: "ex374", category: "Execution Environments", difficulty: "Fácil", question: "¿Dónde se almacenan por defecto las colecciones instaladas dentro de un Execution Environment?", options: ["/root/.ansible/collections", "/usr/share/ansible/collections", "/etc/ansible/collections", "/opt/ansible/collections"], correctAnswer: 1, explanation: "En los Execution Environments, las colecciones se instalan en /usr/share/ansible/collections durante el proceso de build, siguiendo la ruta estándar de colecciones del sistema." },
      { id: 80, certification: "ex374", category: "ansible-navigator", difficulty: "Fácil", question: "¿Cuál es el equivalente de 'ansible-playbook --check' usando ansible-navigator?", options: ["ansible-navigator run site.yml --check", "ansible-navigator run site.yml --dry-run", "ansible-navigator check site.yml", "ansible-navigator run site.yml --mode check"], correctAnswer: 0, explanation: "ansible-navigator run site.yml --check ejecuta el playbook en modo de comprobación (dry-run), igual que --check en ansible-playbook, pero dentro del Execution Environment configurado." }
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
      },
      {
        title: "Job Slicing y Escalabilidad",
        description: "Técnica para distribuir la ejecución de un playbook entre múltiples jobs que procesan subconjuntos del inventario en paralelo.",
        commands: [
          "# Activar job slicing en Job Template (campo 'Job Slicing' en la UI)",
          "# Via API al lanzar:",
          "curl -X POST /api/v2/job_templates/<id>/launch/ \\",
          "     -d '{\"job_slice_count\": 4}'",
          "# Via awx CLI:",
          "awx job_template launch --id <id> --job_slice_count 4"
        ],
        typicalError: "El inventario tiene pocos hosts y el slicing no mejora el rendimiento — el slicing es útil cuando hay decenas o cientos de hosts que se benefician de la distribución.",
        checklist: [
          "Definir el número de slices según el tamaño del inventario y capacidad del cluster",
          "Verificar que todos los nodos del instance group tienen capacidad disponible",
          "El job padre coordina los jobs hijos; el estado del padre refleja el resultado de todos",
          "Las variables de grupos pueden no ser accesibles en todos los slices — usar hostvars",
          "No usar slicing con playbooks que requieren gather_facts de todos los hosts antes de ejecutar"
        ]
      },
      {
        title: "Smart Inventories",
        description: "Inventarios virtuales en Automation Controller que filtran y agregan hosts de múltiples inventarios usando expresiones de búsqueda.",
        commands: [
          "# Crear Smart Inventory via API",
          "curl -X POST /api/v2/inventories/ -d '{",
          "  \"name\": \"Production Linux\",",
          "  \"kind\": \"smart\",",
          "  \"host_filter\": \"name__icontains=rhel and groups__name=production\",",
          "  \"organization\": 1",
          "}'",
          "# Via awx CLI",
          "awx inventory create --name 'Production Linux' --kind smart \\",
          "  --host_filter 'ansible_distribution=RedHat'"
        ],
        typicalError: "Smart Inventory vacío — la expresión del filtro no coincide con ningún host; revisar la sintaxis del host_filter y comparar con los valores reales de los hosts.",
        checklist: [
          "Definir el filtro usando campos de host: nombre, variables, grupos",
          "Los Smart Inventories son de solo lectura — no se pueden añadir hosts manualmente",
          "Se actualizan dinámicamente cuando cambian los inventarios de origen",
          "Útiles para crear vistas de segmentos de infraestructura sin duplicar hosts",
          "El host_filter soporta operadores Django ORM: __icontains, __exact, __startswith, etc."
        ]
      },
      {
        title: "Tokens de API y Autenticación",
        description: "Métodos de autenticación en la API REST de Automation Controller para integración segura con sistemas externos.",
        commands: [
          "# Crear token personal via API",
          "curl -X POST /api/v2/users/<id>/personal_tokens/ \\",
          "  -u admin:password \\",
          "  -d '{\"description\": \"CI/CD token\", \"application\": null, \"scope\": \"write\"}'",
          "# Usar token en peticiones",
          "curl -H 'Authorization: Bearer <token>' /api/v2/job_templates/",
          "# Crear token via awx CLI",
          "awx token create --description 'Pipeline token'"
        ],
        typicalError: "Token expirado — los tokens tienen un tiempo de vida configurable. Configurar 'TOKEN_EXPIRY' en los ajustes del Controller o renovar el token periódicamente.",
        checklist: [
          "Crear tokens específicos por sistema/pipeline con descripción clara",
          "Asignar al usuario del token solo los permisos RBAC mínimos necesarios",
          "Para aplicaciones OAuth2 usar Application tokens en lugar de PATs",
          "Rotar los tokens periódicamente siguiendo la política de seguridad",
          "No almacenar tokens en texto plano — usar secretos del gestor de CI/CD"
        ]
      },
      {
        title: "Aprobaciones en Workflows",
        description: "Nodos de aprobación manual en Workflow Job Templates que pausan la ejecución hasta que un usuario autorizado aprueba o rechaza.",
        commands: [
          "# Ver jobs de workflow pendientes de aprobación via API",
          "curl /api/v2/workflow_approvals/?status=pending",
          "# Aprobar via API",
          "curl -X POST /api/v2/workflow_approvals/<id>/approve/",
          "# Rechazar via API",
          "curl -X POST /api/v2/workflow_approvals/<id>/deny/",
          "# Via awx CLI",
          "awx workflow_approval approve --id <id>"
        ],
        typicalError: "Aprobación no notificada — configurar un Notification Template en el Workflow Job Template para el evento 'Approval' y asegurarse de que los aprobadores reciben la alerta.",
        checklist: [
          "Añadir nodo de aprobación en el Workflow Job Template",
          "Configurar tiempo de expiración de la aprobación (timeout)",
          "Asignar qué usuarios o equipos pueden aprobar (rol Approve en el workflow)",
          "Configurar notificaciones para alertar a los aprobadores cuando se necesita su acción",
          "Documentar el proceso de aprobación para los operadores"
        ]
      },
      {
        title: "Container Groups y Kubernetes",
        description: "Ejecución de jobs de Ansible en pods efímeros de Kubernetes u OpenShift, usando Container Groups como Instance Groups especiales.",
        commands: [
          "# Configurar credencial de tipo 'OpenShift or Kubernetes API Bearer Token'",
          "# Crear Container Group en la UI: Infrastructure > Instance Groups > Add Container Group",
          "# Personalizar el pod spec (opcional) en YAML:",
          "apiVersion: v1",
          "kind: Pod",
          "metadata:",
          "  namespace: ansible-automation",
          "spec:",
          "  serviceAccountName: awx",
          "  automountServiceAccountToken: false",
          "  containers:",
          "    - image: quay.io/ansible/ee-supported-rhel8:latest",
          "      name: worker"
        ],
        typicalError: "Pod no arranca — verificar que la ServiceAccount tiene permisos para crear pods en el namespace y que la imagen del EE es accesible desde el cluster.",
        checklist: [
          "Crear credencial de tipo Kubernetes/OpenShift con token de ServiceAccount",
          "Crear Container Group asociado a la credencial del cluster",
          "Personalizar el pod spec si se necesitan recursos específicos (CPU, memoria, tolerations)",
          "Asignar el Container Group a organizaciones o job templates",
          "Los pods son efímeros: se crean al inicio del job y se destruyen al terminar"
        ]
      },
      {
        title: "Variables Extra y Precedencia en AAP",
        description: "Gestión de variables en Automation Controller según la jerarquía de precedencia de Ansible y las fuentes disponibles en AAP.",
        commands: [
          "# Fuentes de variables en orden de precedencia (menor a mayor):",
          "# 1. Variables de rol (defaults/main.yml)",
          "# 2. Variables de inventario (host/grupo)",
          "# 3. Variables extra del Job Template",
          "# 4. Variables de Survey",
          "# 5. Variables extra al lanzar el job (prompt/API)",
          "",
          "# Variables extra en launch via API:",
          "curl -X POST /api/v2/job_templates/<id>/launch/ \\",
          "  -d '{\"extra_vars\": {\"deploy_version\": \"2.0\", \"env\": \"prod\"}}'"
        ],
        typicalError: "Variable de Survey sobrescrita por variables extra del Job Template — recordar que Survey tiene mayor precedencia que las extra_vars fijas del template.",
        checklist: [
          "Entender la jerarquía: Survey > extra_vars al lanzar > extra_vars del JT > inventario > rol defaults",
          "Marcar como 'sensitive' las variables extra que contengan secretos",
          "Usar 'Ask at launch' para permitir variables extra dinámicas",
          "Las variables de Survey siempre sobreescriben las extra_vars del template con el mismo nombre",
          "Verificar variables disponibles revisando el JSON de 'Extra Variables' en el detalle del job"
        ]
      },
      {
        title: "Integración con HashiCorp Vault",
        description: "Integración de Automation Controller con HashiCorp Vault para obtener secretos dinámicos en tiempo de ejecución.",
        commands: [
          "# Configurar credencial de tipo 'HashiCorp Vault Secret Lookup'",
          "# Campos: Vault Address, Token, API Version (v1/v2)",
          "",
          "# Crear credencial personalizada con lookup desde Vault:",
          "# En 'Credential Type', definir injector con:",
          "extra_vars:",
          "  db_password: '{{ lookup(\"community.hashi_vault.hashi_vault\",",
          "    \"secret=secret/data/prod/db:password\") }}'"
        ],
        typicalError: "Vault token expirado durante la ejecución — usar un token con TTL suficiente o configurar un AppRole para renovación automática.",
        checklist: [
          "Crear credencial de tipo 'HashiCorp Vault Secret Lookup' con la URL y token del Vault",
          "Las credenciales de Vault se pueden usar como fuente de lookup para otras credenciales",
          "También se puede usar la colección community.hashi_vault directamente en playbooks",
          "Verificar política de Vault que permite al token leer las rutas necesarias",
          "En producción preferir AppRole sobre tokens estáticos"
        ]
      },
      {
        title: "Módulos de Red Hat en Colecciones Certificadas",
        description: "Uso de módulos y roles de las colecciones certificadas de Red Hat disponibles en Automation Hub.",
        commands: [
          "# Instalar colección de RHEL System Roles",
          "ansible-galaxy collection install redhat.rhel_system_roles",
          "# Ejemplo: configurar SELinux con el rol de la colección",
          "- name: Configure SELinux",
          "  hosts: all",
          "  roles:",
          "    - role: redhat.rhel_system_roles.selinux",
          "      vars:",
          "        selinux_state: enforcing",
          "        selinux_policy: targeted",
          "",
          "# Instalar certificadas desde Automation Hub:",
          "ansible-galaxy collection install redhat.satellite",
          "ansible-galaxy collection install ansible.netcommon"
        ],
        typicalError: "Módulo FQCN no encontrado — la colección no está instalada en el EE; añadirla al requirements.yml del EE y reconstruirlo.",
        checklist: [
          "Identificar las colecciones certificadas necesarias en console.redhat.com/ansible/automation-hub",
          "Añadirlas al requirements.yml del Execution Environment",
          "Referenciar roles y módulos siempre con FQCN para evitar ambigüedad",
          "Las colecciones certificadas requieren suscripción activa de Red Hat para descargarse",
          "Sincronizar al Private Automation Hub para acceso offline o sin suscripción directa"
        ]
      },
      {
        title: "Ansible Lint y Buenas Prácticas",
        description: "Herramienta de análisis estático para verificar que los playbooks siguen las mejores prácticas antes de publicarlos en el Controller.",
        commands: [
          "# Instalar ansible-lint",
          "pip install ansible-lint",
          "# Analizar un playbook",
          "ansible-lint site.yml",
          "# Analizar toda la colección o rol",
          "ansible-lint",
          "# Ignorar reglas específicas",
          "ansible-lint --skip-list no-free-form site.yml",
          "# Generar reporte en formato JSON",
          "ansible-lint -f json site.yml > lint-report.json",
          "# Ejecutar ansible-lint dentro de un EE",
          "ansible-navigator lint site.yml"
        ],
        typicalError: "ansible-lint falla en CI/CD bloqueando el merge — revisar las reglas activadas, añadir .ansible-lint con skip_list para reglas no aplicables al proyecto.",
        checklist: [
          "Integrar ansible-lint en el pipeline CI/CD antes de publicar cambios",
          "Crear .ansible-lint con configuración del proyecto (skip_list, warn_list)",
          "Priorizar resolver errores antes que warnings",
          "Usar 'fqcn' como regla obligatoria para garantizar FQCN en todos los módulos",
          "Ansible-navigator lint permite ejecutar el análisis dentro del EE de producción"
        ]
      },
      {
        title: "Molecule para Testing de Roles",
        description: "Framework de testing para roles y colecciones de Ansible que permite verificar el comportamiento del código antes de desplegarlo.",
        commands: [
          "# Instalar molecule",
          "pip install molecule molecule-plugins[docker]",
          "# Inicializar escenario de test en un rol",
          "cd roles/myrole && molecule init scenario",
          "# Ejecutar todos los pasos del test",
          "molecule test",
          "# Solo ejecutar el playbook sin destruir",
          "molecule converge",
          "# Verificar con los tests",
          "molecule verify",
          "# Abrir shell en el contenedor de test",
          "molecule login"
        ],
        typicalError: "Fallo en 'idempotency check' — el rol produce cambios en la segunda ejecución; revisar que todas las tareas son idempotentes.",
        checklist: [
          "Crear escenarios de test para cada caso de uso del rol",
          "Definir el driver (docker, podman, vagrant) según el entorno disponible",
          "Escribir tests de verificación en molecule/default/verify.yml",
          "Integrar molecule en CI/CD para testing automático en cada cambio",
          "Probar el rol contra múltiples distribuciones usando matrices de plataformas"
        ]
      },
      {
        title: "Variables y Precedencia en AAP",
        description: "Comprensión de la jerarquía de precedencia de variables en Ansible y cómo interactúa con las fuentes de variables de Automation Controller.",
        commands: [
          "# Orden de precedencia (de menor a mayor):",
          "# 1. defaults/main.yml del rol",
          "# 2. Variables de inventario (grupo, host)",
          "# 3. Extra vars del Job Template (fijas)",
          "# 4. Variables de Survey",
          "# 5. Extra vars al lanzar (prompt/API)",
          "",
          "# Ver extra_vars efectivas de un job:",
          "curl /api/v2/jobs/<id>/ | python3 -m json.tool | grep extra_vars"
        ],
        typicalError: "Variable de Survey no sobrescribe la del Job Template — verificar que el nombre de la variable en la Survey coincide exactamente (case sensitive) con el usado en el playbook.",
        checklist: [
          "Survey siempre tiene más precedencia que extra_vars fijas del Job Template",
          "Usar 'Ask at launch' para permitir override dinámico en el momento de lanzar",
          "Las variables sensibles (contraseñas) deben declararse como tipo 'password' en Survey",
          "Las extra_vars del Job Template pueden marcarse como 'sensitive' en el panel de variables",
          "Revisar el panel de 'Extra Variables' en el detalle de un job para ver los valores efectivos"
        ]
      },
      {
        title: "Auditoría y Activity Stream",
        description: "Mecanismos de auditoría y registro de actividad en Automation Controller para cumplimiento y seguimiento de cambios.",
        commands: [
          "# Ver Activity Stream via API",
          "curl /api/v2/activity_stream/",
          "# Filtrar por tipo de objeto",
          "curl '/api/v2/activity_stream/?object1=job_template'",
          "# Filtrar por usuario",
          "curl '/api/v2/activity_stream/?actor__username=admin'",
          "# Via awx CLI",
          "awx activity_stream list --limit 20"
        ],
        typicalError: "Activity Stream no muestra cambios de configuración esperados — verificar que el usuario tiene permisos para ver el Activity Stream y que los cambios se hicieron a través del Controller, no directamente en la base de datos.",
        checklist: [
          "Activity Stream registra: creaciones, modificaciones y eliminaciones de todos los recursos",
          "Cada entrada tiene: usuario que realizó la acción, timestamp, tipo de objeto y cambios",
          "Accesible desde la UI en el icono de campana o desde /api/v2/activity_stream/",
          "Útil para auditoría de cumplimiento y análisis de incidentes",
          "Los logs de ejecución de jobs se almacenan por separado en los job events"
        ]
      },
      {
        title: "Gestión de Capacidad y Rendimiento",
        description: "Monitorización y optimización de la capacidad de los nodos de ejecución en Automation Controller para gestionar la carga de trabajo.",
        commands: [
          "# Ver capacidad de los nodos",
          "curl /api/v2/instances/",
          "# Ver usage de instance groups",
          "curl /api/v2/instance_groups/",
          "# Ajustar fork capacity de un nodo",
          "curl -X PATCH /api/v2/instances/<id>/ -d '{\"capacity_adjustment\": 0.5}'",
          "# capacity_adjustment: 0.0-1.0 (porcentaje de los forks del sistema a usar)"
        ],
        typicalError: "Jobs en cola permanente — todos los nodos del instance group están al 100% de capacidad. Soluciones: añadir más nodos, usar Container Groups, o reducir el forks del Job Template.",
        checklist: [
          "Monitorizar la métrica 'consumed_capacity' de cada nodo regularmente",
          "Cada nodo tiene un límite de forks basado en su CPU (aproximadamente 5 forks por CPU)",
          "Usar capacity_adjustment para reservar capacidad para trabajos urgentes",
          "Instance Groups permiten priorizar cargas de trabajo críticas",
          "Los Job Templates con muchos forks consumen más capacidad del nodo"
        ]
      },
      {
        title: "Integración con CI/CD y GitOps",
        description: "Patrones para integrar Automation Controller en pipelines de CI/CD y flujos de trabajo GitOps.",
        commands: [
          "# Webhook de GitHub/GitLab para trigger automático",
          "# En el Controller: Projects > Edit > Enable Webhook",
          "# Copiar la URL del webhook y el secreto",
          "",
          "# Lanzar job desde GitLab CI:",
          "deploy:",
          "  script:",
          "    - |",
          "      JOB_ID=$(curl -s -X POST $CTRL/api/v2/job_templates/$JT_ID/launch/",
          "        -H \"Authorization: Bearer $TOKEN\"",
          "        -H \"Content-Type: application/json\" | jq -r '.id')",
          "    - while true; do",
          "        STATUS=$(curl -s -H \"Authorization: Bearer $TOKEN\"",
          "          $CTRL/api/v2/jobs/$JOB_ID/ | jq -r '.status');",
          "        [ \"$STATUS\" = 'successful' ] && exit 0;",
          "        [ \"$STATUS\" = 'failed' ] && exit 1;",
          "        sleep 10; done"
        ],
        typicalError: "Webhook no dispara el sync del proyecto — verificar que el secreto del webhook coincide entre GitHub/GitLab y el Controller, y que la URL del webhook es accesible desde Internet.",
        checklist: [
          "Configurar webhooks en proyectos para sincronización automática al hacer push",
          "Configurar webhooks en Job Templates para lanzado automático desde el SCM",
          "Usar tokens de API dedicados para el pipeline CI/CD, no credenciales de usuario",
          "Implementar polling del estado del job hasta que termine (no asumir que terminó enseguida)",
          "Usar el endpoint /api/v2/jobs/<id>/stdout/ para obtener logs en el pipeline"
        ]
      },
      {
        title: "Seguridad en AAP: Credenciales y Cifrado",
        description: "Mejores prácticas de seguridad para la gestión de credenciales, cifrado de secretos y protección de datos sensibles en Automation Controller.",
        commands: [
          "# Tipos de credencial de seguridad avanzada:",
          "# - CyberArk AIM Credential Provider Lookup",
          "# - HashiCorp Vault Secret Lookup",
          "# - HashiCorp Vault Signed SSH",
          "# - Thycotic DevOps Secrets Vault",
          "# - Azure Key Vault",
          "",
          "# Ver credenciales disponibles",
          "awx credential list --organization Default",
          "# Credential Types personalizados",
          "awx credential_type list"
        ],
        typicalError: "Secreto expuesto en los logs del job — usar 'no_log: true' en las tareas que manejen datos sensibles, y marcar las variables extra como 'sensitive' en el Job Template.",
        checklist: [
          "Usar lookup credentials (Vault, CyberArk) para secretos de corta duración",
          "Nunca almacenar secretos en variables de inventario en texto plano",
          "Usar ansible-vault para cifrar archivos de variables antes de subirlos al repositorio",
          "Marcar las variables extra sensibles con el flag 'sensitive' en el Job Template",
          "Revisar los logs de jobs para asegurarse de que no aparecen valores de credenciales",
          "Rotar periódicamente todos los tokens de API del Controller"
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
      },
      {
        id: "ex374-s11",
        title: "Implementar aprobación manual en un Workflow de despliegue a producción",
        category: "Workflows",
        difficulty: "Avanzado",
        context: "Tu empresa exige que cualquier despliegue a producción sea aprobado manualmente por un responsable antes de ejecutarse. El pipeline ya despliega automáticamente en staging; solo el paso a producción necesita aprobación.",
        objective: "Añadir un nodo de aprobación en el Workflow entre el despliegue a staging y el despliegue a producción.",
        steps: [
          "Editar el Workflow Job Template existente en Automation Controller",
          "Añadir un nodo de tipo 'Approval' entre deploy-staging y deploy-prod, con el nombre 'Approve Production Deploy'",
          "Configurar un timeout de 24 horas para la aprobación (si nadie aprueba en 24h, el workflow falla)",
          "Asignar el rol 'Approve' en el Workflow Job Template al equipo de responsables de producción",
          "Configurar un Notification Template de email para que los responsables reciban un aviso cuando se requiera aprobación",
          "Probar el flujo completo: lanzar el workflow, verificar que se detiene en el nodo de aprobación, aprobar desde la UI y confirmar que el despliegue a producción continúa"
        ],
        recommendedCommands: [
          "curl /api/v2/workflow_approvals/?status=pending",
          "curl -X POST /api/v2/workflow_approvals/<id>/approve/",
          "awx workflow_approval list --status pending"
        ],
        validation: "El workflow se pausa en el nodo de aprobación, el equipo responsable recibe la notificación, puede aprobar desde UI o API, y el despliegue a producción solo ocurre tras la aprobación.",
        commonErrors: [
          "Rol 'Approve' no asignado al equipo — los responsables ven el workflow pero no pueden aprobar",
          "Notificación de aprobación no configurada — los responsables no se enteran de que hay una aprobación pendiente",
          "Timeout demasiado corto — el workflow expira antes de que el responsable tenga tiempo de revisar y aprobar"
        ]
      },
      {
        id: "ex374-s12",
        title: "Crear Execution Environment con dependencias Python y sistema",
        category: "Execution Environments",
        difficulty: "Avanzado",
        context: "Necesitas un EE que incluya: la colección amazon.aws (requiere boto3/botocore), la colección community.postgresql (requiere psycopg2), y el paquete del sistema 'libpq-devel' necesario para compilar psycopg2.",
        objective: "Construir un EE con dependencias mixtas: colecciones, Python packages y paquetes del sistema.",
        steps: [
          "Crear execution-environment.yml con imagen base ee-minimal-rhel8",
          "Crear collections/requirements.yml con amazon.aws y community.postgresql",
          "Crear requirements.txt con boto3>=1.20, botocore>=1.23, psycopg2-binary",
          "Crear bindep.txt con 'libpq-devel [platform:rpm]' para la dependencia del sistema",
          "Referenciar los tres archivos desde la sección dependencies del execution-environment.yml",
          "Ejecutar ansible-builder build -t myee:aws-pg --verbosity 2",
          "Verificar con ansible-navigator images que la imagen tiene las colecciones instaladas",
          "Probar con un playbook que use amazon.aws.ec2_instance y community.postgresql.postgresql_db"
        ],
        recommendedCommands: [
          "ansible-builder build -t myee:aws-pg -f execution-environment.yml --verbosity 2",
          "ansible-navigator images --eei myee:aws-pg --mode stdout",
          "podman run --rm myee:aws-pg pip show boto3 psycopg2"
        ],
        validation: "La imagen se construye sin errores. ansible-navigator images muestra amazon.aws y community.postgresql instaladas. Un playbook de prueba que usa ambas colecciones se ejecuta correctamente.",
        commonErrors: [
          "bindep.txt no referenciado en execution-environment.yml — las dependencias del sistema no se instalan",
          "psycopg2 (compilado) falla en build porque falta libpq-devel — usar psycopg2-binary en requirements.txt para evitar compilación",
          "Token de Automation Hub no configurado para descargar colecciones certificadas durante el build"
        ]
      },
      {
        id: "ex374-s13",
        title: "Usar job slicing para gestionar un inventario grande",
        category: "Automation Controller",
        difficulty: "Avanzado",
        context: "Tienes un inventario de 500 servidores RHEL y un playbook de hardening que tarda 45 minutos en ejecutarse secuencialmente. El cluster del Controller tiene 5 nodos de ejecución disponibles.",
        objective: "Configurar job slicing para distribuir el inventario entre los 5 nodos y reducir el tiempo total de ejecución.",
        steps: [
          "Verificar que los 5 nodos de ejecución están en el mismo Instance Group asignado al Job Template",
          "En el Job Template, configurar el campo 'Job Slicing' con valor 5",
          "Asegurarse de que el playbook es idempotente y no depende de la ejecución en un orden concreto",
          "Lanzar el job y observar cómo se crean 5 jobs hijos, cada uno con ~100 hosts del inventario",
          "Monitorizar el progreso desde el job padre, que muestra el estado consolidado",
          "Verificar el tiempo total y comparar con la ejecución sin slicing"
        ],
        recommendedCommands: [
          "awx job_template modify --id <id> --job_slice_count 5",
          "awx job_template launch --id <id>",
          "curl /api/v2/jobs/<parent_id>/job_slices/"
        ],
        validation: "Se crean 5 jobs hijos, cada uno procesando ~100 hosts en paralelo. El tiempo total se reduce aproximadamente a 1/5 del tiempo original.",
        commonErrors: [
          "Playbook con dependencias entre hosts (serial, delegate_to) — el slicing puede romper la lógica si las tareas necesitan coordinación entre todos los hosts",
          "Nodos de ejecución con capacidad insuficiente — todos los slices esperan en cola si no hay forks disponibles",
          "El job padre marca fallo si cualquier slice falla — diseñar con gestión de errores adecuada"
        ]
      },
      {
        id: "ex374-s14",
        title: "Configurar Private Automation Hub y sincronizar colecciones",
        category: "Automation Hub",
        difficulty: "Avanzado",
        context: "Tu organización requiere un Private Automation Hub (PAH) para hospedar colecciones certificadas de Red Hat y colecciones privadas, sin acceso directo a Internet desde los nodos de automatización.",
        objective: "Configurar el PAH como fuente principal de colecciones y sincronizar el contenido certificado de Red Hat.",
        steps: [
          "Acceder al PAH y configurar el Remote para Red Hat Certified Content apuntando a console.redhat.com",
          "Añadir el token de Red Hat Customer Portal en la configuración del Remote",
          "Seleccionar las colecciones a sincronizar y ejecutar la sincronización",
          "Configurar ansible.cfg en los proyectos para usar el PAH como servidor de Galaxy primario",
          "Crear un namespace privado para las colecciones internas",
          "Publicar una colección interna en el PAH y verificar que está disponible",
          "Probar la instalación desde el PAH: ansible-galaxy collection install namespace.name --server automation_hub"
        ],
        recommendedCommands: [
          "ansible-galaxy collection install redhat.rhel_system_roles --server automation_hub",
          "ansible-galaxy collection install mycompany.internal --server private_hub",
          "curl -H 'Authorization: Token <pah_token>' https://hub.example.com/api/galaxy/v3/collections/"
        ],
        validation: "Las colecciones certificadas de Red Hat están disponibles en el PAH. Los nodos de automatización pueden instalar colecciones desde el PAH sin acceso directo a Internet.",
        commonErrors: [
          "Token de Red Hat Customer Portal sin la entitlement necesaria para descargar certified content",
          "Colección en estado 'needs_review' — un admin del PAH debe aprobarla antes de que esté disponible",
          "ansible.cfg mal configurado — los clientes siguen intentando descargar desde Galaxy.ansible.com"
        ]
      },
      {
        id: "ex374-s15",
        title: "Desarrollar un módulo personalizado en una colección",
        category: "Colecciones",
        difficulty: "Avanzado",
        context: "Necesitas un módulo personalizado para gestionar recursos de una API interna que no tiene un módulo oficial de Ansible. El módulo debe soportar los estados present y absent y seguir las convenciones de Ansible.",
        objective: "Crear un módulo Python personalizado dentro de una colección, siguiendo las mejores prácticas de Ansible.",
        steps: [
          "Crear la colección: ansible-galaxy collection init mycompany.api_tools",
          "Crear el módulo en plugins/modules/manage_resource.py",
          "Importar AnsibleModule de ansible.module_utils.basic y usar module.exit_json()/fail_json()",
          "Definir DOCUMENTATION, EXAMPLES y RETURN en el módulo",
          "Implementar la lógica: GET para verificar existencia, POST/DELETE según el estado deseado",
          "Añadir tests de integración en tests/integration/",
          "Construir y publicar la colección en el PAH",
          "Probar el módulo en un playbook con el FQCN: mycompany.api_tools.manage_resource"
        ],
        recommendedCommands: [
          "ansible-galaxy collection init mycompany.api_tools",
          "ansible-galaxy collection build",
          "ansible-galaxy collection publish mycompany-api_tools-1.0.0.tar.gz --server automation_hub",
          "ansible-doc mycompany.api_tools.manage_resource"
        ],
        validation: "El módulo funciona correctamente en modo --check, tiene documentación accesible con ansible-doc, y el playbook puede crear y eliminar recursos usando present/absent.",
        commonErrors: [
          "Módulo no idempotente — la segunda ejecución con el mismo estado siempre devuelve 'changed'",
          "Falta el bloque DOCUMENTATION/EXAMPLES/RETURN — ansible-doc no puede mostrar la ayuda",
          "Error en module.exit_json sin 'changed' — siempre incluir el campo 'changed' en exit_json"
        ]
      },
      {
        id: "ex374-s16",
        title: "Integrar Automation Controller en un pipeline GitOps",
        category: "API y CaC",
        difficulty: "Avanzado",
        context: "Tu equipo usa GitLab CI/CD. Cada merge a la rama main debe: 1) actualizar el proyecto en el Controller, 2) lanzar el job de test, 3) si los tests pasan, lanzar el job de despliegue a producción. Todo orquestado desde el pipeline.",
        objective: "Crear un pipeline GitLab que orqueste el Controller via API REST.",
        steps: [
          "Crear un token de API en el Controller para el pipeline GitLab y almacenarlo como secreto CI/CD",
          "En .gitlab-ci.yml, crear el stage 'update-project' que llame a POST /api/v2/projects/<id>/update/",
          "Esperar a que el sync del proyecto termine con polling a GET /api/v2/projects/<id>/",
          "En el stage 'run-tests', lanzar el Job Template de tests via POST y esperar resultado",
          "En el stage 'deploy', lanzar el Job Template de despliegue solo si los tests pasaron",
          "Manejar los estados del job: successful, failed, canceled"
        ],
        recommendedCommands: [
          "curl -H 'Authorization: Bearer $CONTROLLER_TOKEN' -X POST $CONTROLLER_URL/api/v2/projects/$PROJECT_ID/update/",
          "curl -H 'Authorization: Bearer $CONTROLLER_TOKEN' $CONTROLLER_URL/api/v2/jobs/$JOB_ID/",
          "curl -H 'Authorization: Bearer $CONTROLLER_TOKEN' $CONTROLLER_URL/api/v2/jobs/$JOB_ID/stdout/?format=txt"
        ],
        validation: "El pipeline de GitLab CI ejecuta el flujo completo: sync del proyecto, tests y despliegue. Un fallo en los tests detiene el pipeline antes del despliegue.",
        commonErrors: [
          "Sin polling del estado del job — el pipeline marca éxito sin esperar el resultado real",
          "Token sin permisos sobre los Job Templates específicos — HTTP 403 al lanzar los jobs",
          "Sync del proyecto no esperado — el job se lanza con código anterior si la sincronización aún no ha terminado"
        ]
      },
      {
        id: "ex374-s17",
        title: "Gestionar secretos con ansible-vault en proyectos del Controller",
        category: "Proyectos y SCM",
        difficulty: "Medio",
        context: "Tu repositorio de playbooks tiene archivos cifrados con ansible-vault (group_vars/prod/vault.yml con contraseñas de bases de datos). Necesitas que el Controller pueda descifrar esos archivos durante la ejecución.",
        objective: "Configurar credenciales de tipo Vault en Automation Controller para que los jobs puedan descifrar archivos protegidos con ansible-vault.",
        steps: [
          "Crear una credencial de tipo 'Vault' en el Controller con la contraseña del vault",
          "Si se usan múltiples IDs de vault (--vault-id), crear una credencial Vault por cada ID",
          "Asociar la/s credencial/es Vault al Job Template junto con las credenciales de máquina",
          "Verificar que el playbook funciona lanzando el job y comprobando que las variables del vault están disponibles",
          "Comprobar que el valor de las variables vault NO aparece en los logs (deben estar enmascaradas)"
        ],
        recommendedCommands: [
          "ansible-vault encrypt group_vars/prod/vault.yml --ask-vault-pass",
          "ansible-vault view group_vars/prod/vault.yml --ask-vault-pass",
          "awx credential create --name 'Prod Vault Password' --credential_type Vault --inputs '{\"vault_password\": \"secret\"}'"
        ],
        validation: "El job se ejecuta correctamente usando variables cifradas del vault sin mostrar su valor en los logs. Si se elimina la credencial Vault del Job Template, el job falla con error de descifrado.",
        commonErrors: [
          "Contraseña de vault incorrecta en la credencial — el job falla con 'ERROR! Decryption failed'",
          "Múltiples vault-ids no gestionados — si el repo usa --vault-id y solo se configura una credencial sin ID, puede no descifrar correctamente",
          "Variables de vault visibles en logs — verificar que no se están imprimiendo con debug o verbosity alta"
        ]
      },
      {
        id: "ex374-s18",
        title: "Crear y usar un lookup plugin personalizado en una colección",
        category: "Colecciones",
        difficulty: "Avanzado",
        context: "Tu equipo necesita un lookup plugin que consulte una API interna de CMDB para obtener la IP de un servidor dado su nombre. Este valor debe usarse en playbooks sin hardcodear IPs.",
        objective: "Desarrollar un lookup plugin Python en una colección y usarlo en plantillas Jinja2.",
        steps: [
          "Crear la colección mycompany.tools (o añadir a una existente)",
          "Crear plugins/lookup/cmdb_ip.py que herede de LookupBase",
          "Implementar el método run() que hace una petición HTTP a la API del CMDB y devuelve la IP",
          "Añadir DOCUMENTATION y EXAMPLES al plugin",
          "Reconstruir la colección y publicarla",
          "Usar el lookup en un playbook: {{ lookup('mycompany.tools.cmdb_ip', 'server-name') }}",
          "Verificar con ansible-navigator que el lookup funciona dentro del EE donde está la colección"
        ],
        recommendedCommands: [
          "ansible-galaxy collection build",
          "ansible-galaxy collection publish mycompany-tools-1.1.0.tar.gz --server automation_hub",
          "ansible-navigator run test_lookup.yml --eei myee:latest -m stdout"
        ],
        validation: "El playbook resuelve el nombre del servidor a su IP consultando la API del CMDB en tiempo de ejecución, sin IPs hardcodeadas.",
        commonErrors: [
          "Lookup plugin no hereda de LookupBase o el método run() no devuelve una lista",
          "Plugin no disponible en el EE — la colección fue actualizada pero el EE no fue reconstruido",
          "Credenciales de la API del CMDB hardcodeadas en el plugin — usar variables de entorno o parámetros del lookup"
        ]
      },
      {
        id: "ex374-s19",
        title: "Configurar LDAP en Automation Controller para autenticación corporativa",
        category: "Automation Controller",
        difficulty: "Avanzado",
        context: "Tu empresa usa Active Directory (LDAP) como directorio corporativo. Los usuarios deben poder autenticarse en Automation Controller con sus credenciales de AD, y los grupos de AD deben mapearse a organizaciones y equipos del Controller.",
        objective: "Configurar la integración LDAP en Automation Controller para autenticación y mapeo de grupos.",
        steps: [
          "En Automation Controller, navegar a Settings > Authentication > LDAP",
          "Configurar: LDAP Server URI (ldaps://ad.example.com:636), BIND DN y BIND password",
          "Configurar USER SEARCH con la base DN del AD y el filtro de usuarios",
          "Configurar GROUP_SEARCH y GROUP_TYPE (según el tipo de grupos de AD: PosixGroup, ActiveDirectoryGroupType, etc.)",
          "Definir LDAP Organization Map para mapear grupos de AD a organizaciones del Controller",
          "Definir LDAP Team Map para mapear grupos de AD a equipos del Controller",
          "Probar la autenticación con un usuario de AD desde la UI y verificar que se asigna a la organización correcta"
        ],
        recommendedCommands: [
          "# Verificar conectividad LDAP desde el servidor del Controller:",
          "ldapsearch -x -H ldaps://ad.example.com:636 -D 'cn=bind-user,dc=example,dc=com' -w password -b 'dc=example,dc=com' '(sAMAccountName=testuser)'"
        ],
        validation: "Los usuarios de AD pueden autenticarse en el Controller con sus credenciales corporativas y se asignan automáticamente a las organizaciones y equipos según sus grupos de AD.",
        commonErrors: [
          "Certificado SSL del LDAP no confiable — añadir el certificado CA a los trusted certs del Controller",
          "Filtro de usuario incorrecto para AD — usar '(sAMAccountName=%(user)s)' en lugar del filtro POSIX",
          "LDAP Group Type incorrecto para Active Directory — usar MemberDNGroupType o ActiveDirectoryGroupType"
        ]
      },
      {
        id: "ex374-s20",
        title: "Implementar ansible-lint en un pipeline CI/CD para colecciones",
        category: "Colecciones",
        difficulty: "Medio",
        context: "Tu equipo quiere garantizar la calidad del código de los playbooks y roles antes de que lleguen al Controller. Necesitas integrar ansible-lint en el pipeline de GitLab CI que se ejecuta en cada commit.",
        objective: "Configurar ansible-lint en el pipeline CI/CD para analizar playbooks y roles automáticamente.",
        steps: [
          "Crear .ansible-lint en la raíz del repositorio con la configuración del proyecto (skip_list, warn_list, offline: true)",
          "Añadir un stage 'lint' en .gitlab-ci.yml que ejecute ansible-lint dentro de una imagen EE o imagen de ansible-lint",
          "Configurar ansible-lint para que falle el pipeline si hay errores (exit code != 0) pero solo avise con warnings",
          "Añadir reglas obligatorias: fqcn-builtins, yaml, no-free-form",
          "Probar el pipeline con un playbook que tenga errores de lint y verificar que falla correctamente",
          "Corregir los errores y verificar que el pipeline pasa"
        ],
        recommendedCommands: [
          "ansible-lint site.yml",
          "ansible-lint --format json site.yml > lint-report.json",
          "ansible-lint --list-rules",
          "ansible-navigator lint site.yml --mode stdout"
        ],
        validation: "El pipeline falla automáticamente cuando hay errores de lint y pasa cuando el código cumple los estándares. Los warnings se reportan pero no bloquean el pipeline.",
        commonErrors: [
          "ansible-lint no instalado en la imagen CI — usar una imagen que incluya ansible-lint o instalarlo en el step",
          "Reglas demasiado estrictas bloquean el trabajo — empezar con warn_list amplio e ir reduciendo gradualmente",
          "Colecciones no disponibles en el entorno de lint — configurar offline: true para evitar intentos de descarga durante el análisis"
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
      },
      {
        id: "pc-ex374-9",
        category: "ansible-vault",
        title: "Cifrar archivos con ansible-vault",
        command: "ansible-vault",
        prompt: "ansible-vault",
        description: "Cifra, descifra y gestiona archivos protegidos con ansible-vault para uso seguro en proyectos del Controller",
        usage: "ansible-vault <subcommand> [OPTIONS] [FILE]",
        examples: [
          "ansible-vault encrypt group_vars/prod/vault.yml",
          "ansible-vault decrypt group_vars/prod/vault.yml",
          "ansible-vault view group_vars/prod/vault.yml",
          "ansible-vault edit group_vars/prod/vault.yml",
          "ansible-vault rekey group_vars/prod/vault.yml",
          "ansible-vault encrypt_string 'mysecret' --name db_password"
        ],
        simulatedOutput: `New Vault password:
Confirm New Vault password:
Encryption successful`,
        manPage: `ansible-vault SUBCOMMAND [OPTIONS] [FILE]

Encrypt, decrypt and view files protected by Ansible Vault.

Subcommands:
  encrypt        Encrypt a file
  decrypt        Decrypt a file
  view           View encrypted file without decrypting to disk
  edit           Edit an encrypted file in $EDITOR
  rekey          Change the encryption password
  encrypt_string Encrypt a string value for use in YAML

Options:
  --vault-id LABEL@SOURCE   Vault ID and source (password, prompt, script)
  --vault-password-file FILE   File containing vault password
  --ask-vault-pass          Prompt for vault password`
      },
      {
        id: "pc-ex374-10",
        category: "awx",
        title: "Gestionar Jobs en el Controller",
        command: "awx job",
        prompt: "awx job",
        description: "Gestiona y monitoriza jobs de Automation Controller desde la línea de comandos",
        usage: "awx job <action> [OPTIONS]",
        examples: [
          "awx job list",
          "awx job list --status failed",
          "awx job get --id 42",
          "awx job cancel --id 42",
          "awx job stdout --id 42",
          "awx job list --job_template 'Deploy App'"
        ],
        simulatedOutput: `== == ============ =========== ========== =========================
id  jt name          status      started    finished
== == ============ =========== ========== =========================
45  5  Deploy App    successful  2024-01-15 2024-01-15T10:32:00Z
44  5  Deploy App    failed      2024-01-14 2024-01-14T09:15:00Z
43  3  Run Tests     successful  2024-01-14 2024-01-14T09:10:00Z
== == ============ =========== ========== =========================`,
        manPage: `awx job ACTION [OPTIONS]

Manage Automation Controller jobs.

Actions:
  list     List jobs
  get      Get job details by ID
  cancel   Cancel a running or pending job
  stdout   Get job output (text)

Filters (for list):
  --status STATUS       Filter by: new, pending, waiting, running,
                        successful, failed, error, canceled
  --job_template NAME   Filter by job template name
  --inventory NAME      Filter by inventory`
      },
      {
        id: "pc-ex374-11",
        category: "ansible-galaxy",
        title: "Gestionar roles de Ansible",
        command: "ansible-galaxy role",
        prompt: "ansible-galaxy role",
        description: "Gestiona roles de Ansible: inicializar, instalar, listar y eliminar",
        usage: "ansible-galaxy role <subcommand> [OPTIONS]",
        examples: [
          "ansible-galaxy role init myrole",
          "ansible-galaxy role install geerlingguy.apache",
          "ansible-galaxy role install -r roles/requirements.yml",
          "ansible-galaxy role list",
          "ansible-galaxy role remove geerlingguy.apache",
          "ansible-galaxy role search nginx --author geerlingguy"
        ],
        simulatedOutput: `- Role geerlingguy.apache (5.1.0) was installed successfully

# Estructura de rol creado con init:
myrole/
├── defaults/
│   └── main.yml
├── handlers/
│   └── main.yml
├── meta/
│   └── main.yml
├── tasks/
│   └── main.yml
├── templates/
├── tests/
│   ├── inventory
│   └── test.yml
└── vars/
    └── main.yml`,
        manPage: `ansible-galaxy role SUBCOMMAND [OPTIONS]

Manage Ansible roles.

Subcommands:
  init      Initialize a new role structure
  install   Install role(s) from Galaxy or requirements file
  list      Show installed roles
  remove    Remove an installed role
  search    Search for roles on Galaxy
  info      Show role metadata

Options (install):
  -r FILE    Requirements file
  -p PATH    Path to install roles
  --force    Overwrite existing roles`
      },
      {
        id: "pc-ex374-12",
        category: "awx",
        title: "Gestionar Inventarios y Hosts",
        command: "awx inventory / awx host",
        prompt: "awx inventory",
        description: "Gestiona inventarios, grupos y hosts en Automation Controller",
        usage: "awx inventory <action> | awx host <action> | awx group <action>",
        examples: [
          "awx inventory list",
          "awx inventory create --name 'Staging' --organization Default",
          "awx host list --inventory 'Staging'",
          "awx host create --name 'web1.example.com' --inventory 'Staging'",
          "awx group create --name webservers --inventory 'Staging'",
          "awx inventory_source update --id 3"
        ],
        simulatedOutput: `== ============ ============ ==================
id name          organization  kind
== ============ ============ ==================
1  Production    Default       (static)
2  Staging       Default       (static)
3  AWS EC2       Default       (dynamic)
== ============ ============ ==================`,
        manPage: `awx inventory ACTION [OPTIONS]
awx host ACTION [OPTIONS]
awx group ACTION [OPTIONS]
awx inventory_source ACTION [OPTIONS]

Manage inventories, hosts, groups and inventory sources.

inventory actions: list, get, create, modify, delete
host actions:      list, get, create, modify, delete
group actions:     list, get, create, modify, delete
inventory_source:  list, get, create, modify, delete, update`
      },
      {
        id: "pc-ex374-13",
        category: "awx",
        title: "Gestionar Proyectos y sincronización SCM",
        command: "awx project",
        prompt: "awx project",
        description: "Gestiona proyectos y lanza sincronizaciones SCM en Automation Controller",
        usage: "awx project <action> [OPTIONS]",
        examples: [
          "awx project list",
          "awx project create --name 'My Playbooks' --scm_type git --scm_url 'https://github.com/org/repo.git' --organization Default",
          "awx project update --id 3",
          "awx project get --id 3",
          "awx project_update list --project 3 --status successful"
        ],
        simulatedOutput: `Project 'My Playbooks' was updated successfully

Sync status:
  Status:    successful
  Started:   2024-01-15T10:00:00Z
  Finished:  2024-01-15T10:00:15Z
  SCM URL:   https://github.com/org/repo.git
  Branch:    main
  Revision:  a3f2d1c`,
        manPage: `awx project ACTION [OPTIONS]

Manage Automation Controller projects.

Actions:
  list     List projects
  get      Get project details
  create   Create a new project
  modify   Update a project
  delete   Delete a project
  update   Sync the project with its SCM source

Options (create):
  --name NAME            Project name
  --scm_type TYPE        SCM type: git, svn, insights, archive
  --scm_url URL          Repository URL
  --scm_branch BRANCH    Branch/tag/commit
  --organization NAME    Organization name`
      },
      {
        id: "pc-ex374-14",
        category: "ansible-navigator",
        title: "Ejecutar con modo check y diff",
        command: "ansible-navigator run --check --diff",
        prompt: "ansible-navigator run",
        description: "Ejecuta el playbook en modo de verificación mostrando los cambios que se aplicarían sin modificar los sistemas",
        usage: "ansible-navigator run <playbook> --check [--diff] [--eei <image>] [-m stdout]",
        examples: [
          "ansible-navigator run site.yml --check --mode stdout",
          "ansible-navigator run site.yml --check --diff --mode stdout",
          "ansible-navigator run site.yml --check --diff --eei myee:latest -m stdout --limit web1.example.com"
        ],
        simulatedOutput: `PLAY [Configure web servers] **********************************************

TASK [Gathering Facts] ****************************************************
ok: [web1.example.com]

TASK [Deploy configuration file] *****************************************
--- before: /etc/app/config.yml
+++ after: /etc/app/config.yml
@@ -1,3 +1,3 @@
 server: web1
-max_connections: 100
+max_connections: 200

changed: [web1.example.com]

PLAY RECAP ****************************************************************
web1.example.com: ok=2  changed=1  unreachable=0  failed=0  (check mode)`,
        manPage: `ansible-navigator run PLAYBOOK [OPTIONS]

Options:
  --check           Run in check mode (dry-run), make no changes
  --diff            Show diffs for changed files/templates
  --eei IMAGE       Execution Environment image
  -m, --mode MODE   Output mode: stdout or interactive
  --limit HOSTS     Limit execution to specific hosts or groups`
      },
      {
        id: "pc-ex374-15",
        category: "ansible-navigator",
        title: "Replay de ejecución previa",
        command: "ansible-navigator replay",
        prompt: "ansible-navigator replay",
        description: "Revisa interactivamente la ejecución de un playbook anterior usando el artifact JSON guardado",
        usage: "ansible-navigator replay <artifact-file> [-m stdout|interactive]",
        examples: [
          "ansible-navigator replay site-2024-01-15.json",
          "ansible-navigator replay artifacts/deploy-20240115T100000.json -m interactive",
          "ansible-navigator replay site.json --mode stdout"
        ],
        simulatedOutput: `Replaying playbook artifact: site-2024-01-15.json

PLAY [Configure web servers] **********************************************
(Replaying from artifact - no actual execution)

TASK [Gathering Facts] ****************************************************
ok: [web1.example.com]
ok: [web2.example.com]

TASK [Install httpd] ******************************************************
changed: [web1.example.com]

PLAY RECAP ****************************************************************
web1.example.com: ok=3  changed=1`,
        manPage: `ansible-navigator replay [OPTIONS] ARTIFACT

Replay a previous playbook execution from an artifact file.

Arguments:
  ARTIFACT    Path to the playbook artifact JSON file

Options:
  -m, --mode MODE    Output mode: stdout or interactive (default: interactive)

Notes:
  Artifacts are generated when playbook-artifact.enable is true in
  ansible-navigator.yml or when using --playbook-artifact-enable.
  The default artifact path is ./{playbook_name}-artifact-{timestamp}.json`
      },
      {
        id: "pc-ex374-16",
        category: "ansible-lint",
        title: "Analizar playbooks con ansible-lint",
        command: "ansible-lint",
        prompt: "ansible-lint",
        description: "Analiza playbooks, roles y colecciones en busca de problemas de estilo y mejores prácticas",
        usage: "ansible-lint [OPTIONS] [PLAYBOOK|ROLE|COLLECTION]",
        examples: [
          "ansible-lint",
          "ansible-lint site.yml",
          "ansible-lint roles/myrole/",
          "ansible-lint --list-rules",
          "ansible-lint --skip-list no-free-form site.yml",
          "ansible-lint -f json site.yml > lint-report.json",
          "ansible-lint --warn-list yaml[line-length] site.yml"
        ],
        simulatedOutput: `WARNING  Overriding detected file kind 'yaml' with 'playbook' for given positional argument: site.yml
WARNING  [206] Variables in variable files should have 'var_' prefix
ERROR    [301] Commands should not change things if nothing needs doing: site.yml:15 (task: Install packages)
ERROR    [302] Use shell only when shell functionality is required: site.yml:23

Finished with 2 error(s), 1 warning(s) on 1 files.`,
        manPage: `ansible-lint [OPTIONS] [FILES]

Lint Ansible playbooks, roles and collections.

Options:
  --list-rules          List all available rules
  --list-tags           List all available tags
  -R, --rulesdir DIR    Add custom rules directory
  --skip-list RULES     Comma-separated list of rules to skip
  --warn-list RULES     Rules to show as warnings (not errors)
  -f, --format FORMAT   Output format: rich, plain, json, codeclimate, sarif
  --fix                 Auto-fix fixable issues
  --offline             Do not fetch remote content`
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
      },
      {
        id: "cm-ex374-9",
        title: "Cifrar una cadena con ansible-vault",
        category: "ansible-vault",
        prompt: "$ ",
        mission: "Cifra el string 'supersecret123' con ansible-vault para usarlo como variable en un playbook, guardándolo con el nombre 'db_password'.",
        hints: [
          "Usa ansible-vault encrypt_string para cifrar strings individuales",
          "El parámetro --name define el nombre de la variable resultante",
          "El resultado se puede pegar directamente en un archivo YAML"
        ],
        validCommands: [
          "ansible-vault encrypt_string 'supersecret123' --name db_password",
          "ansible-vault encrypt_string --name db_password 'supersecret123'"
        ],
        manPages: {
          "ansible-vault": "ansible-vault encrypt_string [OPTIONS] STRING_TO_ENCRYPT\n\n--name VAR_NAME: Variable name for the output"
        },
        successMessage: "¡Correcto! El string cifrado puede copiarse en variables YAML con el formato db_password: !vault |...",
        simulatedOutput: `New Vault password:
Confirm New Vault password:
db_password: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          61383636363437303839323866396235333830393838326336
          36323234333133616332616161336535383261643365336639
          3361303639363664623839323037663165663262343030390a
          Encryption successful`
      },
      {
        id: "cm-ex374-10",
        title: "Lanzar un Job Template via awx CLI",
        category: "Automation Controller",
        prompt: "$ ",
        mission: "Usa el comando awx para lanzar el Job Template con ID 5 pasando la variable extra 'env=production'.",
        hints: [
          "El subcomando para lanzar es job_template launch",
          "Las extra_vars se pasan como JSON con --extra_vars",
          "Necesitas haber hecho login con awx login previamente"
        ],
        validCommands: [
          "awx job_template launch --id 5 --extra_vars '{\"env\": \"production\"}'",
          "awx job_template launch 5 --extra_vars '{\"env\": \"production\"}'",
          "awx job_template launch --id 5 --extra_vars 'env=production'"
        ],
        manPages: {
          "awx": "awx job_template launch [OPTIONS]\n\n--id ID: Job Template ID\n--extra_vars VARS: Extra variables as JSON or key=value"
        },
        successMessage: "¡Bien! El Job Template se ha lanzado con la variable extra env=production. Puedes ver el ID del job en la respuesta.",
        simulatedOutput: `{
  "id": 47,
  "type": "job",
  "url": "/api/v2/jobs/47/",
  "status": "pending",
  "job_template": 5,
  "extra_vars": "{\"env\": \"production\"}"
}`
      },
      {
        id: "cm-ex374-11",
        title: "Verificar integridad de una colección instalada",
        category: "Colecciones",
        prompt: "$ ",
        mission: "Verifica que la colección 'community.general' instalada localmente coincide con la versión publicada en el servidor.",
        hints: [
          "El subcomando para verificar es ansible-galaxy collection verify",
          "Compara los checksums locales con los del servidor",
          "Útil para detectar modificaciones no autorizadas"
        ],
        validCommands: [
          "ansible-galaxy collection verify community.general",
          "ansible-galaxy collection verify community.general --server galaxy"
        ],
        manPages: {
          "ansible-galaxy": "ansible-galaxy collection verify NAMESPACE.NAME\n\nVerify installed collection against the server."
        },
        successMessage: "¡Correcto! La colección ha sido verificada. Si no hay output de error, la integridad es correcta.",
        simulatedOutput: `Successfully restored the collection namespace/name.
All checksums verified successfully for community.general:7.5.0`
      },
      {
        id: "cm-ex374-12",
        title: "Sincronizar proyecto en el Controller via awx",
        category: "Automation Controller",
        prompt: "$ ",
        mission: "Usa el comando awx para sincronizar (actualizar desde SCM) el proyecto con ID 3.",
        hints: [
          "El subcomando es project update",
          "Especifica el ID del proyecto con --id",
          "Esto equivale a pulsar 'Sync' en la UI del Controller"
        ],
        validCommands: [
          "awx project update --id 3",
          "awx project update 3"
        ],
        manPages: {
          "awx": "awx project update [OPTIONS]\n\n--id ID: Project ID to sync from SCM"
        },
        successMessage: "¡Perfecto! El proyecto ha sido sincronizado desde el repositorio Git. El código más reciente está disponible para los jobs.",
        simulatedOutput: `{
  "id": 12,
  "type": "project_update",
  "url": "/api/v2/project_updates/12/",
  "status": "running",
  "project": 3,
  "scm_type": "git"
}`
      },
      {
        id: "cm-ex374-13",
        title: "Ejecutar ansible-lint en un playbook",
        category: "Calidad de Código",
        prompt: "$ ",
        mission: "Ejecuta ansible-lint en el archivo site.yml para verificar que sigue las mejores prácticas de Ansible.",
        hints: [
          "El comando básico es ansible-lint seguido del archivo",
          "Sin argumentos adicionales usa la configuración de .ansible-lint si existe",
          "Los errores aparecen con regla infringida y línea del problema"
        ],
        validCommands: [
          "ansible-lint site.yml",
          "ansible-lint ./site.yml"
        ],
        manPages: {
          "ansible-lint": "ansible-lint [OPTIONS] [PLAYBOOK]\n\nLint Ansible playbooks and roles."
        },
        successMessage: "¡Bien! ansible-lint ha analizado el playbook. Si no hay errores, el código cumple las mejores prácticas.",
        simulatedOutput: `Passed with production profile: 0 failure(s), 0 warning(s) on 1 files.`
      },
      {
        id: "cm-ex374-14",
        title: "Ver grafo del inventario con ansible-navigator",
        category: "ansible-navigator",
        prompt: "$ ",
        mission: "Usa ansible-navigator para ver el grafo del inventario definido en el directorio 'inventory/' en modo stdout.",
        hints: [
          "El subcomando de navigator para inventarios es 'inventory'",
          "Usa --graph para ver la estructura jerárquica",
          "Especifica el inventario con -i"
        ],
        validCommands: [
          "ansible-navigator inventory -i inventory/ --graph -m stdout",
          "ansible-navigator inventory --inventory inventory/ --graph --mode stdout"
        ],
        manPages: {
          "ansible-navigator": "ansible-navigator inventory [OPTIONS]\n\n-i INVENTORY: Inventory source\n--graph: Show inventory graph\n-m MODE: stdout or interactive"
        },
        successMessage: "¡Correcto! El grafo muestra la jerarquía de grupos y hosts del inventario en formato árbol.",
        simulatedOutput: `@all:
  |--@ungrouped:
  |--@webservers:
  |  |--web1.example.com
  |  |--web2.example.com
  |--@databases:
  |  |--db1.example.com
  |--@production:
  |  |--@webservers:
  |  |--@databases:`
      },
      {
        id: "cm-ex374-15",
        title: "Publicar colección en Automation Hub privado",
        category: "Automation Hub",
        prompt: "$ ",
        mission: "Publica el artefacto de colección 'mycompany-tools-1.2.0.tar.gz' en el servidor de Automation Hub configurado como 'automation_hub' en ansible.cfg.",
        hints: [
          "Usa ansible-galaxy collection publish",
          "Especifica el servidor con --server",
          "El servidor debe estar configurado en ansible.cfg con su token"
        ],
        validCommands: [
          "ansible-galaxy collection publish mycompany-tools-1.2.0.tar.gz --server automation_hub",
          "ansible-galaxy collection publish mycompany-tools-1.2.0.tar.gz -s automation_hub"
        ],
        manPages: {
          "ansible-galaxy": "ansible-galaxy collection publish TARBALL [OPTIONS]\n\n--server SERVER: Galaxy server to publish to"
        },
        successMessage: "¡Perfecto! La colección ha sido publicada. Puede tardar unos segundos en aparecer en el catálogo del Hub.",
        simulatedOutput: `Publishing collection artifact 'mycompany-tools-1.2.0.tar.gz' to automation_hub https://hub.example.com
Collection has been published to the Galaxy server https://hub.example.com`
      },
      {
        id: "cm-ex374-16",
        title: "Ver el output de un job pasado con awx",
        category: "Automation Controller",
        prompt: "$ ",
        mission: "Recupera el output de texto del job con ID 47 usando la CLI de awx.",
        hints: [
          "El subcomando es job stdout",
          "Muestra el output del job tal como se vería en la UI del Controller",
          "Útil para depurar jobs fallidos o revisar el resultado en scripts"
        ],
        validCommands: [
          "awx job stdout --id 47",
          "awx job stdout 47"
        ],
        manPages: {
          "awx": "awx job stdout [OPTIONS]\n\n--id ID: Job ID\n\nRetrieve the standard output of a completed job."
        },
        successMessage: "¡Correcto! El output del job se muestra en la terminal igual que en la UI del Controller.",
        simulatedOutput: `PLAY [Configure web servers] **********************************************

TASK [Gathering Facts] ****************************************************
ok: [web1.example.com]

TASK [Install httpd] ******************************************************
changed: [web1.example.com]

PLAY RECAP ****************************************************************
web1.example.com           : ok=2    changed=1    unreachable=0    failed=0`
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
      },
      {
        id: "lpt-ex374-11",
        title: "Crear un filter plugin en una colección",
        category: "Colecciones",
        task: "Crea un filter plugin llamado 'to_upper_list' en la colección mycompany.utils que convierta una lista de strings a mayúsculas. El plugin debe poder usarse en Jinja2 como: {{ my_list | mycompany.utils.to_upper_list }}",
        hints: [
          "Los filter plugins van en plugins/filter/ dentro de la colección",
          "Deben devolver un diccionario con el nombre del filtro como clave y la función como valor en un método FilterModule con método filters()",
          "La función recibe el valor de la izquierda del pipe como primer argumento"
        ],
        validCommands: ["ansible-galaxy collection build", "ansible-navigator run test_filter.yml -m stdout"],
        solution: `# plugins/filter/string_utils.py
class FilterModule:
    def filters(self):
        return {
            'to_upper_list': self.to_upper_list
        }

    def to_upper_list(self, value):
        if not isinstance(value, list):
            raise TypeError("to_upper_list requires a list, got: {}".format(type(value)))
        return [item.upper() if isinstance(item, str) else item for item in value]

# Uso en playbook:
# - name: Convert list to uppercase
#   vars:
#     my_list: ['hello', 'world', 'ansible']
#   debug:
#     msg: "{{ my_list | mycompany.utils.to_upper_list }}"
# Resultado: ['HELLO', 'WORLD', 'ANSIBLE']`
      },
      {
        id: "lpt-ex374-12",
        title: "Crear un playbook para gestionar usuarios en el Controller",
        category: "API y CaC",
        task: "Escribe un playbook usando ansible.controller que cree: 1) un usuario llamado 'developer1' con email developer1@example.com, 2) un equipo 'Developers' en la organización 'Default', y 3) añada al usuario al equipo.",
        hints: [
          "Usa los módulos: ansible.controller.user, ansible.controller.team, ansible.controller.role",
          "Para añadir el usuario al equipo, asigna el rol 'member' en el equipo al usuario",
          "El módulo ansible.controller.user tiene los parámetros: username, password, email, organization"
        ],
        validCommands: ["ansible-playbook manage_users.yml", "ansible-navigator run manage_users.yml -m stdout"],
        solution: `---
- name: Manage Controller users and teams
  hosts: localhost
  gather_facts: false
  tasks:
    - name: Create developer user
      ansible.controller.user:
        username: developer1
        password: "{{ vault_dev_password }}"
        email: developer1@example.com
        first_name: Developer
        last_name: One
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false
        state: present

    - name: Create Developers team
      ansible.controller.team:
        name: Developers
        organization: Default
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false
        state: present

    - name: Add developer1 to Developers team
      ansible.controller.role:
        user: developer1
        target_team: Developers
        role: member
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false
        state: present`
      },
      {
        id: "lpt-ex374-13",
        title: "Configurar un schedule para un Job Template",
        category: "Notificaciones y Programación",
        task: "Usando la colección ansible.controller, crea un schedule llamado 'Daily Deploy' para el Job Template 'Deploy App' que se ejecute todos los días laborables (lunes a viernes) a las 08:00 UTC.",
        hints: [
          "El módulo es ansible.controller.schedule",
          "El formato de rrule para lunes-viernes a las 8am es: DTSTART:... RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
          "Los parámetros incluyen: name, unified_job_template, rrule, enabled"
        ],
        validCommands: ["ansible-playbook create_schedule.yml", "ansible-navigator run create_schedule.yml -m stdout"],
        solution: `---
- name: Create schedule for Deploy App
  hosts: localhost
  gather_facts: false
  tasks:
    - name: Create daily weekday deploy schedule
      ansible.controller.schedule:
        name: Daily Deploy
        state: present
        enabled: true
        unified_job_template: Deploy App
        rrule: "DTSTART;TZID=UTC:20240101T080000Z RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false`
      },
      {
        id: "lpt-ex374-14",
        title: "Crear un inventory plugin personalizado en una colección",
        category: "Colecciones",
        task: "Crea la estructura básica de un inventory plugin llamado 'cmdb_inventory' en la colección mycompany.infra que lea hosts desde un archivo YAML local. El plugin debe activarse cuando el archivo de inventario termina en '_cmdb.yml'.",
        hints: [
          "Los inventory plugins van en plugins/inventory/",
          "Deben heredar de BaseInventoryPlugin",
          "El método NAME define el FQCN del plugin",
          "verify_file() devuelve True si el plugin puede manejar el archivo dado"
        ],
        validCommands: ["ansible-navigator inventory -i hosts_cmdb.yml --list -m stdout"],
        solution: `# plugins/inventory/cmdb_inventory.py
from __future__ import absolute_import, division, print_function
__metaclass__ = type

DOCUMENTATION = '''
name: cmdb_inventory
short_description: CMDB inventory source
description:
  - Reads inventory from a CMDB YAML file
extends_documentation_fragment:
  - constructed
'''

from ansible.plugins.inventory import BaseInventoryPlugin
import yaml

class InventoryModule(BaseInventoryPlugin):
    NAME = 'mycompany.infra.cmdb_inventory'

    def verify_file(self, path):
        valid = False
        if super(InventoryModule, self).verify_file(path):
            if path.endswith('_cmdb.yml') or path.endswith('_cmdb.yaml'):
                valid = True
        return valid

    def parse(self, inventory, loader, path, cache=True):
        super(InventoryModule, self).parse(inventory, loader, path, cache)
        with open(path) as f:
            data = yaml.safe_load(f)
        for host in data.get('hosts', []):
            self.inventory.add_host(host['name'])
            for key, value in host.get('vars', {}).items():
                self.inventory.set_variable(host['name'], key, value)`
      },
      {
        id: "lpt-ex374-15",
        title: "Exportar la configuración del Controller con awx export",
        category: "API y CaC",
        task: "Usa el comando awx para exportar toda la configuración de Job Templates del Controller a un archivo JSON llamado 'controller_backup.json'. Después, muestra cómo importar ese backup en otro Controller.",
        hints: [
          "El subcomando de awx para exportar es 'export'",
          "Se puede filtrar por tipo de recurso con --job_templates, --inventories, etc.",
          "El subcomando de importación es 'import'"
        ],
        validCommands: ["awx export", "awx import"],
        solution: `# Exportar job templates
awx export --job_templates > controller_backup.json

# Exportar todos los recursos
awx export --all > controller_full_backup.json

# Exportar múltiples tipos de recursos
awx export --organizations --teams --users --credentials \\
           --projects --inventories --job_templates \\
           --workflow_job_templates > controller_full_backup.json

# Importar en otro Controller
# (configurar las credenciales del nuevo Controller en .tower_cli.cfg o variables de entorno)
awx import < controller_backup.json

# Verificar que los job templates fueron importados
awx job_template list`
      },
      {
        id: "lpt-ex374-16",
        title: "Crear un Notification Template de webhook con cuerpo personalizado",
        category: "Notificaciones y Programación",
        task: "Usando la colección ansible.controller, crea un Notification Template de tipo webhook que envíe una petición POST a https://hooks.internal.com/deploy con un cuerpo JSON personalizado que incluya el nombre del job, su estado y la URL al output.",
        hints: [
          "El módulo es ansible.controller.notification_template",
          "El tipo de notificación es 'webhook'",
          "El cuerpo personalizado se define en notification_configuration.body con variables de contexto como: {{ job_friendly_name }}, {{ status }}, {{ url }}"
        ],
        validCommands: ["ansible-playbook create_notification.yml", "ansible-navigator run create_notification.yml -m stdout"],
        solution: `---
- name: Create webhook notification template
  hosts: localhost
  gather_facts: false
  tasks:
    - name: Create deploy webhook notification
      ansible.controller.notification_template:
        name: Deploy Webhook
        notification_type: webhook
        notification_configuration:
          url: https://hooks.internal.com/deploy
          http_method: POST
          headers:
            Content-Type: application/json
            Authorization: "Bearer {{ vault_webhook_token }}"
          body: |
            {
              "job_name": "{{ '{{' }} job_friendly_name {{ '}}' }}",
              "status": "{{ '{{' }} status {{ '}}' }}",
              "url": "{{ '{{' }} url {{ '}}' }}",
              "started": "{{ '{{' }} started {{ '}}' }}",
              "finished": "{{ '{{' }} finished {{ '}}' }}"
            }
        organization: Default
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false
        state: present`
      },
      {
        id: "lpt-ex374-17",
        title: "Usar additional_build_steps en execution-environment.yml",
        category: "Execution Environments",
        task: "Crea un execution-environment.yml que, además de instalar colecciones, añada un paso de build personalizado (prepend) para configurar un repositorio RPM corporativo, y un paso append para limpiar la caché de yum al final de la construcción.",
        hints: [
          "La sección additional_build_steps tiene claves prepend y append",
          "Cada clave acepta una lista de instrucciones en formato Containerfile/Dockerfile",
          "prepend se ejecuta antes de instalar dependencias; append después"
        ],
        validCommands: ["ansible-builder build -t myee:corporate", "ansible-builder create"],
        solution: `---
version: 1

build_arg_defaults:
  EE_BASE_IMAGE: 'registry.redhat.io/ansible-automation-platform-22/ee-minimal-rhel8:latest'

dependencies:
  galaxy: collections/requirements.yml
  python: requirements.txt
  system: bindep.txt

additional_build_steps:
  prepend:
    - RUN echo "[corporate-repo]" > /etc/yum.repos.d/corporate.repo
    - RUN echo "baseurl=https://repo.internal.com/rhel8" >> /etc/yum.repos.d/corporate.repo
    - RUN echo "enabled=1" >> /etc/yum.repos.d/corporate.repo
    - RUN echo "gpgcheck=0" >> /etc/yum.repos.d/corporate.repo
  append:
    - RUN yum clean all
    - RUN rm -rf /var/cache/yum
    - LABEL maintainer="automation-team@example.com"
    - LABEL version="1.0"

# Construir:
# ansible-builder build -t myee:corporate -f execution-environment.yml --verbosity 2`
      },
      {
        id: "lpt-ex374-18",
        title: "Crear un Job Template con prompt on launch en inventario y credencial",
        category: "Automation Controller",
        task: "Usando ansible.controller.job_template, crea un Job Template llamado 'Flexible Deploy' que: permita seleccionar el inventario al lanzar (ask_inventory_on_launch), permita proporcionar variables extra al lanzar (ask_variables_on_launch), y tenga activada la opción de survey.",
        hints: [
          "Los campos 'prompt on launch' se configuran con ask_*_on_launch en el módulo",
          "ask_inventory_on_launch y ask_variables_on_launch son booleanos",
          "survey_enabled activa la survey; la survey_spec se configura por separado"
        ],
        validCommands: ["ansible-playbook create_jt.yml", "ansible-navigator run create_jt.yml -m stdout"],
        solution: `---
- name: Create flexible job template
  hosts: localhost
  gather_facts: false
  tasks:
    - name: Create Flexible Deploy job template
      ansible.controller.job_template:
        name: Flexible Deploy
        project: My Project
        playbook: deploy.yml
        organization: Default
        credentials:
          - SSH Key
        ask_inventory_on_launch: true
        ask_variables_on_launch: true
        ask_credential_on_launch: false
        ask_limit_on_launch: true
        survey_enabled: true
        verbosity: 1
        controller_host: "{{ controller_host }}"
        controller_username: "{{ controller_username }}"
        controller_password: "{{ vault_controller_password }}"
        validate_certs: false
        state: present`
      },
      {
        id: "lpt-ex374-19",
        title: "Crear requirements.yml para colecciones con múltiples fuentes",
        category: "Colecciones",
        task: "Crea un archivo collections/requirements.yml que instale: 1) ansible.posix versión >=1.5 desde el servidor 'automation_hub', 2) community.general versión 7.5.0 exacta desde Galaxy, 3) una colección privada 'mycompany.internal' desde el servidor 'private_hub', y 4) una colección desde una URL directa de tarball.",
        hints: [
          "El formato de requirements.yml tiene una clave 'collections' con lista de entradas",
          "Cada entrada puede tener: name, version, source (server name o URL)",
          "Para URL directa usar el campo 'source' con la URL completa del .tar.gz"
        ],
        validCommands: ["ansible-galaxy collection install -r collections/requirements.yml"],
        solution: `---
# collections/requirements.yml
collections:
  # Colección certificada desde Automation Hub
  - name: ansible.posix
    version: ">=1.5.0"
    source: automation_hub

  # Colección de comunidad con versión exacta desde Galaxy
  - name: community.general
    version: "7.5.0"
    source: https://galaxy.ansible.com

  # Colección privada desde hub interno
  - name: mycompany.internal
    version: ">=1.0.0"
    source: private_hub

  # Colección desde URL directa de tarball
  - name: mycompany.legacy
    source: https://artifacts.internal.com/ansible/mycompany-legacy-2.1.0.tar.gz`
      },
      {
        id: "lpt-ex374-20",
        title: "Implementar idempotencia en un módulo personalizado",
        category: "Colecciones",
        task: "Revisa el siguiente módulo personalizado incompleto y complétalo para que sea idempotente: solo devuelva 'changed: true' si el recurso necesita ser creado o modificado, y 'changed: false' si ya existe con el estado correcto. El módulo debe soportar check_mode.",
        hints: [
          "Antes de crear/modificar, verificar el estado actual con una petición GET",
          "Comparar el estado actual con el deseado; si son iguales, salir con changed=False",
          "Usar module.check_mode para no hacer cambios en modo check pero reportar lo que haría",
          "Siempre incluir 'changed' en module.exit_json()"
        ],
        validCommands: ["ansible-playbook test_module.yml --check", "ansible-playbook test_module.yml"],
        solution: `# plugins/modules/manage_resource.py (fragmento clave)
def run_module():
    module = AnsibleModule(
        argument_spec=dict(
            name=dict(type='str', required=True),
            state=dict(type='str', default='present', choices=['present', 'absent']),
            value=dict(type='str'),
        ),
        supports_check_mode=True
    )

    name = module.params['name']
    state = module.params['state']
    value = module.params['value']

    # 1. Verificar estado actual
    current = get_resource(name)  # petición GET a la API

    # 2. Determinar si hay cambios necesarios
    if state == 'absent':
        if current is None:
            module.exit_json(changed=False, msg="Resource already absent")
        if module.check_mode:
            module.exit_json(changed=True, msg="Would delete resource")
        delete_resource(name)
        module.exit_json(changed=True, msg="Resource deleted")

    if state == 'present':
        if current is not None and current.get('value') == value:
            module.exit_json(changed=False, msg="Resource already in desired state")
        if module.check_mode:
            module.exit_json(changed=True, msg="Would create/update resource")
        create_or_update_resource(name, value)
        module.exit_json(changed=True, msg="Resource created/updated")`
      }
    ]
  }
};
