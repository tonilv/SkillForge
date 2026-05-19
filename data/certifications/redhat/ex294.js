module.exports = {
      ex294: {
        id: 'ex294',
        name: 'EX294 - Red Hat Certified Engineer',
        shortName: 'EX294',
        description: 'Prepara tu certificación RHCE con test prácticos de Ansible: playbooks, roles, vault, templates y automatización de sistemas RHEL.',
        hasPractice: true,
        hasScenarios: true,
        hasConsole: true,
        hasLivePractice: true,
        questions: [
          { id: 1, certification: "ex294", category: "Instalación y Configuración", difficulty: "Fácil", question: "¿Qué paquete se instala para disponer de Ansible en RHEL 8/9?", options: ["ansible-core", "ansible-engine", "python3-ansible", "rhel-ansible"], correctAnswer: 0, explanation: "En RHEL 8/9 el paquete base es ansible-core. Proporciona ansible, ansible-playbook y el conjunto de módulos builtin de la colección ansible.builtin." },
          { id: 2, certification: "ex294", category: "Instalación y Configuración", difficulty: "Fácil", question: "¿Cuál es el orden de prioridad de búsqueda de los archivos de configuración de Ansible?", options: ["ANSIBLE_CONFIG > ./ansible.cfg > ~/.ansible.cfg > /etc/ansible/ansible.cfg", "/etc/ansible/ansible.cfg > ~/.ansible.cfg > ./ansible.cfg > ANSIBLE_CONFIG", "~/.ansible.cfg > ./ansible.cfg > /etc/ansible/ansible.cfg > ANSIBLE_CONFIG", "./ansible.cfg > ~/.ansible.cfg > ANSIBLE_CONFIG > /etc/ansible/ansible.cfg"], correctAnswer: 0, explanation: "Ansible busca configuración en este orden: 1) variable ANSIBLE_CONFIG, 2) ./ansible.cfg en el directorio actual, 3) ~/.ansible.cfg del usuario, 4) /etc/ansible/ansible.cfg global. El primero encontrado gana." },
          { id: 3, certification: "ex294", category: "Instalación y Configuración", difficulty: "Fácil", question: "¿Qué parámetro en ansible.cfg define la ruta del inventario por defecto?", options: ["inventory", "hosts", "hostfile", "inventory_file"], correctAnswer: 0, explanation: "El parámetro 'inventory' en la sección [defaults] de ansible.cfg define el archivo o directorio de inventario que Ansible usará cuando no se especifique -i en la línea de comandos." },
          { id: 4, certification: "ex294", category: "Instalación y Configuración", difficulty: "Fácil", question: "¿Qué parámetro en ansible.cfg desactiva la comprobación de SSH host key?", options: ["host_key_checking = False", "ssh_check = False", "strict_host_check = False", "check_host_keys = False"], correctAnswer: 0, explanation: "host_key_checking = False en la sección [defaults] desactiva la verificación de clave de host SSH. Útil en entornos de laboratorio, aunque no recomendado en producción." },
          { id: 5, certification: "ex294", category: "Inventarios", difficulty: "Fácil", question: "¿Cómo se define correctamente un grupo de hosts llamado 'webservers' en un inventario INI?", options: ["[webservers]", "group: webservers", "(webservers)", "#webservers"], correctAnswer: 0, explanation: "En formato INI, los grupos se definen entre corchetes [nombre_grupo]. Los hosts se listan debajo del encabezado del grupo, uno por línea." },
          { id: 6, certification: "ex294", category: "Inventarios", difficulty: "Medio", question: "¿Qué directorio contiene variables que se aplican a todos los hosts de un grupo llamado 'webservers'?", options: ["group_vars/webservers/", "host_vars/webservers/", "vars/groups/webservers/", "inventory/webservers/vars/"], correctAnswer: 0, explanation: "El directorio group_vars/<nombre_grupo>/ contiene archivos YAML con variables para todos los hosts de ese grupo. Es la forma estándar de organizar variables por grupo en proyectos Ansible." },
          { id: 7, certification: "ex294", category: "Inventarios", difficulty: "Medio", question: "¿Qué directorio contiene variables específicas para un host llamado 'server1.example.com'?", options: ["host_vars/server1.example.com/", "group_vars/server1.example.com/", "vars/hosts/server1.example.com/", "inventory/host_vars/server1.example.com/"], correctAnswer: 0, explanation: "El directorio host_vars/<nombre_host>/ contiene variables específicas de ese host. Tiene mayor prioridad que las variables de grupo." },
          { id: 8, certification: "ex294", category: "Inventarios", difficulty: "Fácil", question: "¿Qué comando lista todos los hosts del inventario en formato árbol?", options: ["ansible-inventory --graph", "ansible --list-hosts all", "ansible-inventory --list", "ansible-config dump"], correctAnswer: 0, explanation: "ansible-inventory --graph muestra el inventario en árbol con grupos y hosts. ansible-inventory --list lo muestra en JSON. Ambos son útiles pero --graph es más legible para exploración." },
          { id: 9, certification: "ex294", category: "Comandos Ad-hoc", difficulty: "Fácil", question: "¿Cuál es el formato correcto de un comando ad-hoc de Ansible?", options: ["ansible <patrón> -m <módulo> -a '<argumentos>'", "ansible-run <patrón> --module <módulo>", "ansible <patrón> --execute <módulo>:<argumentos>", "ansible-adhoc <patrón> -m <módulo>"], correctAnswer: 0, explanation: "La sintaxis de un comando ad-hoc es: ansible <patrón_hosts> -m <módulo> -a '<argumentos>'. El patrón puede ser un grupo, host individual o 'all'." },
          { id: 10, certification: "ex294", category: "Módulos", difficulty: "Medio", question: "¿Cuál es la diferencia principal entre los módulos 'command' y 'shell'?", options: ["'shell' procesa pipes (|), redirecciones (>) y variables de entorno, 'command' no", "'command' es más rápido que 'shell' porque usa más CPU", "'shell' solo funciona en Linux, 'command' es multiplataforma", "No hay diferencia funcional, son equivalentes"], correctAnswer: 0, explanation: "El módulo shell ejecuta comandos a través de /bin/sh, permitiendo pipes (|), redirecciones (>) y variables de entorno ($VAR). El módulo command ejecuta directamente sin shell, siendo más seguro y predecible." },
          { id: 11, certification: "ex294", category: "Módulos", difficulty: "Medio", question: "¿Qué módulo se debe usar para instalar paquetes en RHEL garantizando idempotencia?", options: ["ansible.builtin.dnf", "ansible.builtin.command con 'dnf install'", "ansible.builtin.shell con 'rpm -i'", "ansible.builtin.yum o ansible.builtin.dnf"], correctAnswer: 3, explanation: "Los módulos yum y dnf son idempotentes: solo instalan si el paquete no está presente. Usar command/shell con dnf no garantiza idempotencia ya que no comprenden el estado deseado." },
          { id: 12, certification: "ex294", category: "Módulos", difficulty: "Fácil", question: "¿Qué argumentos del módulo 'service' habilita e inicia un servicio simultáneamente?", options: ["state=started enabled=yes", "state=running autostart=true", "action=start_enable", "start=yes enable=yes"], correctAnswer: 0, explanation: "El módulo service (o systemd) acepta state=started para iniciar y enabled=yes para habilitar en el arranque. Pueden combinarse en la misma tarea." },
          { id: 13, certification: "ex294", category: "Playbooks", difficulty: "Fácil", question: "¿Qué directiva en un play activa la escalada de privilegios (sudo)?", options: ["become: true", "sudo: true", "privilege_escalation: true", "root: true"], correctAnswer: 0, explanation: "La directiva 'become: true' activa la escalada de privilegios. Por defecto usa sudo. Puede definirse a nivel de play o de tarea individual. become_user especifica el usuario destino (por defecto root)." },
          { id: 14, certification: "ex294", category: "Playbooks", difficulty: "Medio", question: "¿Qué son los 'handlers' en Ansible y cuándo se ejecutan?", options: ["Tareas especiales que se ejecutan al final del play si fueron notificadas por al menos una tarea que cambió", "Tareas que se ejecutan al inicio del play antes que cualquier otra tarea", "Variables que controlan el flujo del playbook", "Módulos que manejan errores automáticamente"], correctAnswer: 0, explanation: "Los handlers son tareas que solo se ejecutan cuando son notificadas con 'notify'. Se ejecutan una sola vez al final del play, independientemente de cuántas tareas los hayan notificado, y solo si la tarea notificadora hizo un cambio." },
          { id: 15, certification: "ex294", category: "Playbooks", difficulty: "Fácil", question: "¿Qué comando verifica la sintaxis de un playbook sin ejecutarlo ni conectarse a hosts?", options: ["ansible-playbook --syntax-check playbook.yml", "ansible-playbook --dry-run playbook.yml", "ansible-playbook --validate playbook.yml", "ansible-lint playbook.yml"], correctAnswer: 0, explanation: "--syntax-check analiza la sintaxis YAML del playbook y lo valida estructuralmente sin conectar a ningún host ni ejecutar tareas. Es la primera verificación que debe hacerse antes de ejecutar." },
          { id: 16, certification: "ex294", category: "Playbooks", difficulty: "Fácil", question: "¿Qué opción de ansible-playbook ejecuta en modo simulación sin aplicar cambios reales?", options: ["--check", "--dry-run", "--simulate", "--test"], correctAnswer: 0, explanation: "--check ejecuta el playbook en modo 'dry run': conecta a los hosts, evalúa qué cambiaría pero no aplica ningún cambio. Algunos módulos pueden no funcionar correctamente en modo check." },
          { id: 17, certification: "ex294", category: "Variables y Facts", difficulty: "Fácil", question: "¿Cómo se referencia una variable llamada 'http_port' en un playbook o template Ansible?", options: ["{{ http_port }}", "${http_port}", "<%=http_port%>", "##http_port##"], correctAnswer: 0, explanation: "Las variables se referencian con dobles llaves {{ variable }}. Esta es la sintaxis Jinja2 que Ansible usa para interpolación de variables en playbooks, templates y argumentos de módulos." },
          { id: 18, certification: "ex294", category: "Variables y Facts", difficulty: "Fácil", question: "¿Qué módulo recopila información del sistema (facts) de los hosts gestionados?", options: ["ansible.builtin.setup", "ansible.builtin.gather_facts", "ansible.builtin.facts", "ansible.builtin.sysinfo"], correctAnswer: 0, explanation: "El módulo setup recopila facts: IP, OS, memoria, CPU, etc. Se ejecuta automáticamente al inicio de cada play (gather_facts: true por defecto). Puede invocarse manualmente con ad-hoc." },
          { id: 19, certification: "ex294", category: "Variables y Facts", difficulty: "Medio", question: "¿Cómo se accede a la dirección IPv4 principal de un host mediante Ansible facts?", options: ["{{ ansible_default_ipv4.address }}", "{{ ansible_ip_address }}", "{{ facts.network.ip }}", "{{ hostvars.ip4 }}"], correctAnswer: 0, explanation: "La fact ansible_default_ipv4.address contiene la IP de la interfaz de red predeterminada. Los facts de red se almacenan bajo ansible_default_ipv4, ansible_default_ipv6 y ansible_interfaces." },
          { id: 20, certification: "ex294", category: "Variables y Facts", difficulty: "Medio", question: "¿Para qué se usa la directiva 'register' en una tarea de Ansible?", options: ["Para capturar la salida de una tarea en una variable", "Para registrar la tarea en el log del sistema", "Para marcar una tarea como crítica", "Para registrar el módulo en el inventario"], correctAnswer: 0, explanation: "register almacena el resultado completo de una tarea (stdout, stderr, return code, changed, etc.) en una variable. Esta variable puede usarse en condiciones (when), debug o tareas posteriores." },
          { id: 21, certification: "ex294", category: "Condiciones y Bucles", difficulty: "Medio", question: "¿Qué directiva se usa para ejecutar condicionalmente una tarea en Ansible?", options: ["when:", "if:", "condition:", "only_when:"], correctAnswer: 0, explanation: "La directiva 'when:' acepta una expresión Jinja2 que debe evaluarse como verdadera para que la tarea se ejecute. Puede combinar múltiples condiciones con 'and' y 'or'. No necesita dobles llaves {{ }}." },
          { id: 22, certification: "ex294", category: "Condiciones y Bucles", difficulty: "Medio", question: "¿Qué directiva es la forma moderna de iterar sobre una lista en Ansible (desde 2.5)?", options: ["loop:", "with_items:", "iterate:", "foreach:"], correctAnswer: 0, explanation: "'loop:' es el estándar recomendado desde Ansible 2.5. 'with_items:' sigue siendo válido pero es legacy. 'loop:' es más consistente y soporta más plugins de lookup." },
          { id: 23, certification: "ex294", category: "Condiciones y Bucles", difficulty: "Medio", question: "Dentro de un bucle, ¿cómo se referencia el elemento actual de la iteración?", options: ["{{ item }}", "{{ current }}", "{{ element }}", "{{ loop_item }}"], correctAnswer: 0, explanation: "La variable especial 'item' contiene el valor del elemento actual en cada iteración. Para bucles con diccionarios se accede con item.clave. Por ejemplo: {{ item.name }} si el loop es una lista de dicts." },
          { id: 24, certification: "ex294", category: "Roles", difficulty: "Fácil", question: "¿Qué comando crea automáticamente la estructura de directorios de un rol de Ansible?", options: ["ansible-galaxy role init nombre_rol", "ansible role create nombre_rol", "ansible-playbook --init-role nombre_rol", "ansible-galaxy create nombre_rol"], correctAnswer: 0, explanation: "ansible-galaxy role init crea la estructura estándar: tasks/, handlers/, templates/, files/, vars/, defaults/, meta/. Es la forma recomendada de inicializar un rol nuevo." },
          { id: 25, certification: "ex294", category: "Roles", difficulty: "Fácil", question: "¿En qué archivo de un rol se definen las tareas principales?", options: ["tasks/main.yml", "main/tasks.yml", "playbooks/tasks.yml", "role/main.yml"], correctAnswer: 0, explanation: "El archivo tasks/main.yml es el punto de entrada de las tareas de un rol. Ansible lo carga automáticamente. Puede incluir otros archivos con import_tasks o include_tasks para organizar tareas complejas." },
          { id: 26, certification: "ex294", category: "Roles", difficulty: "Fácil", question: "¿Cuál es la diferencia entre 'defaults/main.yml' y 'vars/main.yml' en un rol?", options: ["defaults tiene la menor prioridad y es para variables configurables; vars tiene mayor prioridad y es para variables internas", "Son equivalentes, cualquiera puede usarse indistintamente", "defaults es para variables de entorno; vars es para variables del playbook", "defaults solo se usa en modo check; vars se usa en ejecución normal"], correctAnswer: 0, explanation: "defaults/main.yml tiene la menor prioridad de todas las variables: cualquier variable del inventario, grupo o host la sobreescribe. Es para defaults configurables. vars/main.yml tiene alta prioridad y es para variables internas del rol." },
          { id: 27, certification: "ex294", category: "Roles", difficulty: "Medio", question: "¿Qué comando instala un rol desde Ansible Galaxy?", options: ["ansible-galaxy role install autor.nombre_rol", "ansible-galaxy download autor.nombre_rol", "ansible-galaxy get autor.nombre_rol", "ansible-install autor.nombre_rol"], correctAnswer: 0, explanation: "ansible-galaxy role install instala roles de Galaxy. El formato es 'autor.nombre_rol'. Con -r requirements.yml se instalan múltiples roles definidos en el archivo de requisitos." },
          { id: 28, certification: "ex294", category: "Ansible Vault", difficulty: "Medio", question: "¿Qué comando cifra un archivo existente con Ansible Vault?", options: ["ansible-vault encrypt archivo.yml", "ansible-vault create archivo.yml", "ansible-vault lock archivo.yml", "ansible-vault protect archivo.yml"], correctAnswer: 0, explanation: "ansible-vault encrypt cifra un archivo existente con AES256. ansible-vault create crea un nuevo archivo ya cifrado. ansible-vault view muestra el contenido sin descifrarlo al disco." },
          { id: 29, certification: "ex294", category: "Ansible Vault", difficulty: "Medio", question: "¿Qué opción de ansible-playbook solicita la contraseña del vault interactivamente?", options: ["--ask-vault-pass", "--vault-password", "--decrypt", "--vault-key"], correctAnswer: 0, explanation: "--ask-vault-pass solicita la contraseña del vault en tiempo de ejecución. Alternativamente, --vault-password-file especifica un archivo que contiene la contraseña para uso en pipelines automatizados." },
          { id: 30, certification: "ex294", category: "Ansible Vault", difficulty: "Medio", question: "¿Qué comando permite editar el contenido de un archivo cifrado con Vault sin descifrarlo permanentemente?", options: ["ansible-vault edit archivo.yml", "ansible-vault open archivo.yml", "ansible-vault modify archivo.yml", "ansible-vault decrypt archivo.yml && vi archivo.yml"], correctAnswer: 0, explanation: "ansible-vault edit descifra el archivo temporalmente en memoria, abre el editor ($EDITOR) y vuelve a cifrarlo al guardar. Es más seguro que decrypt porque el archivo nunca queda en texto plano en disco." },
          { id: 31, certification: "ex294", category: "Templates Jinja2", difficulty: "Fácil", question: "¿Cuál es la extensión estándar para los archivos de template Jinja2 en Ansible?", options: [".j2", ".tmpl", ".tpl", ".jinja"], correctAnswer: 0, explanation: "La convención es usar la extensión .j2 para archivos de template Jinja2. El módulo template de Ansible procesa estos archivos sustituyendo variables antes de copiarlos al host remoto." },
          { id: 32, certification: "ex294", category: "Templates Jinja2", difficulty: "Medio", question: "¿Cuál es la sintaxis correcta de un bloque condicional en un template Jinja2?", options: ["{% if condicion %}...{% endif %}", "{{ if condicion }}...{{ endif }}", "#if condicion#...#endif#", "<%if condicion%>...<%endif%>"], correctAnswer: 0, explanation: "Los bloques de control en Jinja2 usan {% %}. El condicional if tiene la forma {% if condicion %}...{% elif condicion %}...{% else %}...{% endif %}. Las variables se insertan con {{ variable }}." },
          { id: 33, certification: "ex294", category: "Templates Jinja2", difficulty: "Medio", question: "¿Cuál es la sintaxis correcta de un bucle for en un template Jinja2?", options: ["{% for item in lista %}...{% endfor %}", "{{ for item in lista }}...{{ endfor }}", "#for item in lista#...#endfor#", "{% foreach item in lista %}...{% end %}"], correctAnswer: 0, explanation: "Los bucles en Jinja2 usan la forma {% for variable in iterable %}...{% endfor %}. Son útiles para generar configuraciones repetitivas como múltiples VirtualHosts o entradas de configuración." },
          { id: 34, certification: "ex294", category: "Manejo de Errores", difficulty: "Medio", question: "¿Qué directiva permite que un playbook continúe aunque una tarea falle?", options: ["ignore_errors: true", "continue_on_error: true", "skip_on_fail: true", "error_ignore: yes"], correctAnswer: 0, explanation: "ignore_errors: true hace que Ansible registre el fallo pero continúe con las siguientes tareas. El play no se marcará como fallido por esa tarea. Útil para tareas opcionales o de diagnóstico." },
          { id: 35, certification: "ex294", category: "Manejo de Errores", difficulty: "Avanzado", question: "¿Qué estructura en Ansible equivale al try/catch/finally de otros lenguajes de programación?", options: ["block/rescue/always", "try/catch/finally", "begin/rescue/ensure", "attempt/recover/complete"], correctAnswer: 0, explanation: "La estructura block/rescue/always permite agrupar tareas (block), definir qué ejecutar si alguna falla (rescue) y qué ejecutar siempre independientemente del resultado (always). Es el manejo de errores estructurado en Ansible." },
          { id: 36, certification: "ex294", category: "Manejo de Errores", difficulty: "Medio", question: "¿Qué directiva fuerza el fallo de una tarea basándose en la salida del comando aunque el exit code sea 0?", options: ["failed_when:", "fail_if:", "error_when:", "force_fail:"], correctAnswer: 0, explanation: "failed_when: acepta una condición Jinja2. Si se evalúa como verdadera, la tarea se marca como fallida aunque el comando tuviera exit code 0. Se combina frecuentemente con register para evaluar la salida." },
          { id: 37, certification: "ex294", category: "ansible-navigator", difficulty: "Medio", question: "¿Qué opción de ansible-navigator muestra la salida en modo texto estándar (no interactivo)?", options: ["-m stdout", "--output text", "--mode cli", "--format standard"], correctAnswer: 0, explanation: "ansible-navigator run playbook.yml -m stdout ejecuta el playbook mostrando la salida en modo texto estándar, similar a ansible-playbook. Sin -m stdout, abre la TUI interactiva." },
          { id: 38, certification: "ex294", category: "ansible-navigator", difficulty: "Medio", question: "¿Qué archivo configura el comportamiento de ansible-navigator en un proyecto?", options: ["ansible-navigator.yml", ".navigator.yml", "navigator.cfg", "ansible.navigator.cfg"], correctAnswer: 0, explanation: "ansible-navigator.yml (o .yaml) en el directorio del proyecto configura las opciones de ansible-navigator: imagen de ejecución, modo de salida, configuración de Ansible, logging, etc." },
          { id: 39, certification: "ex294", category: "RHEL System Roles", difficulty: "Fácil", question: "¿Qué paquete proporciona los RHEL System Roles y dónde se instalan?", options: ["rhel-system-roles, en /usr/share/ansible/roles/", "ansible-system-roles, en /etc/ansible/roles/", "linux-system-roles, en /usr/lib/ansible/roles/", "redhat-roles, en /opt/ansible/roles/"], correctAnswer: 0, explanation: "El paquete rhel-system-roles instala roles predefinidos en /usr/share/ansible/roles/. Incluye roles para timesync, selinux, network, firewall, kdump, postfix y otros servicios comunes de RHEL." },
          { id: 40, certification: "ex294", category: "RHEL System Roles", difficulty: "Medio", question: "¿Qué variable se usa en el RHEL System Role 'timesync' para definir los servidores NTP?", options: ["timesync_ntp_servers", "ntp_servers", "chrony_servers", "timesync_servers"], correctAnswer: 0, explanation: "La variable timesync_ntp_servers acepta una lista de servidores NTP con sus opciones (hostname, iburst, pool, etc.). Es la variable principal del rol rhel-system-roles.timesync para configurar chrony." }
        ],
        concepts: [
          { title: "Instalación y ansible.cfg", description: "Configuración del nodo de control, archivo ansible.cfg y estructura del proyecto Ansible.", commands: ["dnf install ansible-core", "ansible --version", "ansible-config dump --only-changed", "ansible all -m ping"], typicalError: "No configurar remote_user o become en ansible.cfg, causando fallos de autenticación en todos los plays.", checklist: ["Instalar ansible-core con dnf", "Crear ansible.cfg en el directorio del proyecto", "Definir inventory, remote_user y become: true", "Verificar conectividad con ansible all -m ping"] },
          { title: "Inventarios Estáticos", description: "Definición de hosts y grupos en formato INI o YAML. Uso de group_vars y host_vars para variables organizadas.", commands: ["ansible-inventory --list", "ansible-inventory --graph", "ansible all --list-hosts", "ansible webservers -m ping"], typicalError: "Confundir group_vars con host_vars o no respetar la jerarquía de grupos padre/hijo.", checklist: ["Crear inventario con grupos significativos [webservers], [dbservers]", "Definir variables en group_vars/grupo/vars.yml", "Usar host_vars/host/ para variables específicas de host", "Validar con ansible-inventory --graph"] },
          { title: "Módulos Esenciales del Examen", description: "Módulos más evaluados: dnf, service/systemd, copy, template, file, user, group, firewalld, selinux, seboolean, authorized_key, lineinfile.", commands: ["ansible-doc dnf", "ansible-doc service", "ansible-doc template", "ansible-doc user"], typicalError: "Usar command/shell cuando existe un módulo idempotente equivalente, perdiendo idempotencia.", checklist: ["Preferir módulos sobre command/shell", "Verificar idempotencia de las tareas (ejecutar dos veces = mismo resultado)", "Consultar ansible-doc <módulo> para sintaxis exacta", "Usar state=present/absent en módulos de recursos"] },
          { title: "Playbooks y Estructura YAML", description: "Estructura de plays y tareas. Directivas hosts, tasks, become, vars, handlers, notify.", commands: ["ansible-playbook site.yml", "ansible-playbook --syntax-check site.yml", "ansible-playbook --check site.yml", "ansible-playbook -v site.yml"], typicalError: "Indentación incorrecta en YAML o mezclar espacios con tabuladores causando errores de parseo.", checklist: ["Validar sintaxis siempre con --syntax-check", "Probar con --check antes de aplicar en producción", "Usar -v/-vv/-vvv para depuración incremental", "Nombrar todas las tareas con 'name:' descriptivo"] },
          { title: "Variables y Precedencia", description: "22 niveles de precedencia. extra_vars tiene la mayor, role defaults la menor. group_vars y host_vars son los más usados.", commands: ["ansible-playbook -e 'var=value' playbook.yml", "ansible all -m setup -a 'filter=ansible_os*'", "ansible-playbook --extra-vars @vars.json playbook.yml", "ansible-config dump | grep VARIABLE"], typicalError: "No entender la precedencia: extra_vars (-e) sobreescribe todo, role defaults son sobreescritos por todo.", checklist: ["Poner variables configurables en defaults/main.yml de roles", "Usar group_vars para variables por grupo", "Usar extra_vars (-e) para override en ejecución", "Usar set_fact para variables computadas dinámicamente"] },
          { title: "Facts del Sistema", description: "Información del sistema recopilada automáticamente: OS, IP, memoria, CPU. Esencial para condicionales basados en el host.", commands: ["ansible all -m setup", "ansible all -m setup -a 'filter=ansible_memory*'", "ansible all -m setup -a 'gather_subset=network'", "ansible server1 -m setup | grep ansible_os_family"], typicalError: "Desactivar gather_facts y luego referenciar facts en condicionales o templates, causando errores de variable indefinida.", checklist: ["Mantener gather_facts: true (valor por defecto)", "Filtrar facts con filter= para mejorar rendimiento en inventarios grandes", "Usar ansible_os_family para condicionales de distribución", "Usar ansible_default_ipv4.address para obtener la IP del host"] },
          { title: "Handlers y Notificaciones", description: "Handlers para reiniciar servicios solo cuando hay cambios reales. Se ejecutan una vez al final del play.", commands: ["ansible-playbook -v site.yml", "ansible-playbook --force-handlers site.yml", "# notify: Restart Apache", "# meta: flush_handlers"], typicalError: "Poner handlers en tasks/main.yml en lugar de handlers/main.yml, o notificar un handler con nombre incorrecto.", checklist: ["Definir handlers bajo 'handlers:' en el play o en handlers/main.yml del rol", "Notificar con 'notify: nombre_handler' en la tarea que genera el cambio", "Los handlers solo se ejecutan si la tarea que los notifica tiene 'changed'", "Usar 'meta: flush_handlers' si necesitas ejecutarlos antes del fin del play"] },
          { title: "Roles y Estructura", description: "Componente de reutilización de Ansible. Estructura estándar con tasks, handlers, templates, files, vars, defaults, meta.", commands: ["ansible-galaxy role init mi_rol", "ansible-galaxy role list", "ls roles/mi_rol/", "ansible-playbook site.yml # con roles:"], typicalError: "Poner variables configurables en vars/ (alta prioridad) en lugar de defaults/ (baja prioridad), impidiendo sobreescritura.", checklist: ["Inicializar con ansible-galaxy role init --init-path roles/ nombre", "Poner variables configurables en defaults/main.yml", "Poner dependencias de otros roles en meta/main.yml", "Incluir en playbook con 'roles:', 'include_role:' o 'import_role:'"] },
          { title: "Ansible Galaxy y requirements.yml", description: "Descarga de roles y colecciones. requirements.yml para gestionar dependencias de forma reproducible.", commands: ["ansible-galaxy role install geerlingguy.apache", "ansible-galaxy collection install community.general", "ansible-galaxy install -r requirements.yml", "ansible-galaxy list"], typicalError: "No especificar versión en requirements.yml, causando instalación de versiones incompatibles en distintos entornos.", checklist: ["Crear requirements.yml con roles y colecciones necesarias", "Especificar siempre la versión: version: '3.2.0'", "Instalar con ansible-galaxy install -r requirements.yml", "Hacer commit de requirements.yml en el repositorio"] },
          { title: "Templates Jinja2", description: "Archivos .j2 para generar configuraciones dinámicas. Variables con {{ }}, lógica con {% %}, comentarios con {# #}.", commands: ["# Módulo template en playbook", "ansible all -m template -a 'src=t.j2 dest=/tmp/out'", "ansible-playbook site.yml --check", "# python3 -c 'from jinja2 import ...' para pruebas"], typicalError: "Confundir {{ }} (insertar valor) con {% %} (bloque de control) en Jinja2.", checklist: ["Usar {{ variable }} para insertar valores en el texto", "Usar {% if condicion %}...{% endif %} para condicionales", "Usar {% for item in lista %}...{% endfor %} para bucles", "Añadir extensión .j2 y almacenar en templates/ del rol"] },
          { title: "Ansible Vault", description: "Cifrado AES256 de archivos con datos sensibles: contraseñas, tokens, claves privadas.", commands: ["ansible-vault encrypt vars/secrets.yml", "ansible-vault view vars/secrets.yml", "ansible-vault edit vars/secrets.yml", "ansible-vault rekey vars/secrets.yml"], typicalError: "Hacer commit de archivos de vault descifrados o perder la contraseña del vault.", checklist: ["Cifrar archivos con credenciales con 'ansible-vault encrypt'", "Usar --ask-vault-pass o --vault-password-file en ejecución", "Añadir .vault_pass al .gitignore", "Usar 'ansible-vault edit' para modificar sin descifrar a disco"] },
          { title: "Control de Errores", description: "ignore_errors, failed_when, changed_when para control fino. block/rescue/always para manejo estructurado tipo try/catch.", commands: ["# ignore_errors: true", "# failed_when: result.rc != 0", "# changed_when: false", "# block / rescue / always"], typicalError: "Usar ignore_errors en todo el play en lugar de en tareas específicas, ocultando fallos reales.", checklist: ["Usar block/rescue/always para manejo estructurado de errores", "Aplicar ignore_errors solo en tareas donde el fallo es esperado", "Usar failed_when para definir criterios de fallo personalizados", "Usar changed_when: false en tareas de solo lectura para evitar notificaciones"] },
          { title: "Condiciones y Bucles", description: "when: para ejecución condicional. loop: para iteración. Variables de facts como ansible_os_family en condiciones.", commands: ["# when: ansible_os_family == 'RedHat'", "# loop: ['httpd', 'mod_ssl', 'php']", "# when: result.rc != 0", "# loop: {{ lista_variable }}"], typicalError: "Poner {{ }} alrededor de la expresión 'when', lo cual no es necesario y puede causar errores.", checklist: ["Usar when: sin {{ }} alrededor de la expresión", "Combinar condiciones con 'and' y 'or'", "Referenciar el elemento del bucle con {{ item }}", "Para diccionarios en bucle usar {{ item.nombre_clave }}"] },
          { title: "ansible-navigator y EE", description: "Herramienta moderna que reemplaza a ansible-playbook en entornos con Execution Environments (contenedores).", commands: ["ansible-navigator run site.yml -m stdout", "ansible-navigator doc dnf -m stdout", "ansible-navigator images -m stdout", "ansible-navigator collections -m stdout"], typicalError: "No instalar podman o no tener la imagen EE disponible, causando fallo al arrancar el contenedor.", checklist: ["Instalar ansible-navigator con pip install ansible-navigator", "Crear ansible-navigator.yml en el proyecto", "Usar -m stdout para salida no interactiva (equivalente a ansible-playbook)", "Verificar EE disponibles con ansible-navigator images -m stdout"] },
          { title: "RHEL System Roles", description: "Roles predefinidos de Red Hat para timesync, selinux, network, firewall, kdump. Instalados via dnf.", commands: ["dnf install rhel-system-roles", "ls /usr/share/ansible/roles/", "# roles_path = /usr/share/ansible/roles en ansible.cfg", "ansible-playbook timesync.yml"], typicalError: "No añadir /usr/share/ansible/roles/ al roles_path en ansible.cfg, causando que Ansible no encuentre los roles.", checklist: ["Instalar con: dnf install rhel-system-roles", "Localizar roles en /usr/share/ansible/roles/", "Revisar README.md de cada rol para conocer sus variables", "Añadir roles_path = /usr/share/ansible/roles en ansible.cfg si es necesario"] }
        ],
        scenarios: [
          { id: 1, title: "Configurar nodo de control Ansible", category: "Configuración", difficulty: "básico", context: "Debes preparar un nodo de control Ansible para gestionar un grupo de servidores web en tu organización.", objective: "Instalar Ansible, crear inventario con grupo webservers y verificar conectividad.", steps: ["Instalar ansible-core: dnf install ansible-core", "Crear directorio del proyecto: mkdir ~/ansible-project && cd ~/ansible-project", "Crear ansible.cfg con los parámetros: inventory, remote_user, become=True, host_key_checking=False", "Crear inventory con grupo [webservers] y los hosts", "Verificar conectividad: ansible webservers -m ping", "Listar estructura del inventario: ansible-inventory --graph"], recommendedCommands: ["dnf install ansible-core", "ansible --version", "ansible webservers -m ping", "ansible-inventory --graph"], validation: "ansible webservers -m ping debe devolver SUCCESS en todos los hosts.", commonErrors: ["No configurar remote_user o become en ansible.cfg", "Hosts no alcanzables por SSH sin clave configurada", "Inventario con sintaxis INI incorrecta"] },
          { id: 2, title: "Playbook para servidor web Apache", category: "Playbooks", difficulty: "básico", context: "Debes automatizar la instalación y configuración de Apache en todos los servidores web del inventario.", objective: "Crear playbook que instale httpd, configure firewall, despliegue página web y use handlers para reinicios.", steps: ["Crear httpd.yml con play apuntando a webservers con become: true", "Añadir tarea para instalar httpd con módulo dnf (state: present)", "Añadir tarea para abrir puerto 80 con módulo firewalld (permanent: true, immediate: true)", "Añadir handler 'Restart Apache' para reiniciar httpd", "Añadir tarea para copiar index.html con módulo copy y notify al handler", "Añadir tarea para habilitar e iniciar httpd (state: started, enabled: true)", "Verificar: ansible-playbook --syntax-check httpd.yml && ansible-playbook httpd.yml"], recommendedCommands: ["ansible-playbook --syntax-check httpd.yml", "ansible-playbook --check httpd.yml", "ansible-playbook httpd.yml", "ansible webservers -a 'systemctl status httpd'"], validation: "httpd activo y habilitado en todos los servidores, puerto 80 abierto en firewall.", commonErrors: ["Olvidar become: true para instalar paquetes o abrir firewall", "No añadir handler para reiniciar tras cambio de configuración", "No usar permanent: true en firewalld, perdiendo la regla tras reinicio"] },
          { id: 3, title: "Crear y usar un rol de Ansible", category: "Roles", difficulty: "medio", context: "La configuración de Apache se usa en múltiples proyectos. Debes crear un rol reutilizable.", objective: "Crear rol 'apache' con tasks, handlers, template de configuración y variables con defaults.", steps: ["Crear rol: ansible-galaxy role init --init-path roles/ apache", "Definir variables en defaults/main.yml: http_port: 80, server_name: '{{ inventory_hostname }}'", "Crear tarea en tasks/main.yml para instalar httpd, abrir firewall y habilitar servicio", "Crear template templates/httpd.conf.j2 usando {{ http_port }} y {{ server_name }}", "Añadir handler en handlers/main.yml para reiniciar Apache", "Crear playbook site.yml que incluya el rol con 'roles: [apache]'", "Ejecutar y validar configuración en los hosts"], recommendedCommands: ["ansible-galaxy role init --init-path roles/ apache", "ls roles/apache/", "ansible-playbook --syntax-check site.yml", "ansible-playbook site.yml -v"], validation: "Apache configurado con el template. El rol es reutilizable en otros proyectos.", commonErrors: ["Poner variables configurables en vars/ en vez de defaults/", "Olvidar extensión .j2 en los templates", "No definir el handler con el nombre exacto que se usa en notify:"] },
          { id: 4, title: "Proteger credenciales con Ansible Vault", category: "Ansible Vault", difficulty: "medio", context: "Tu playbook necesita una contraseña de base de datos que no debe estar en texto plano en el repositorio.", objective: "Cifrar variables sensibles con Vault e integrarlas transparentemente en un playbook.", steps: ["Crear archivo de variables: touch group_vars/all/vault.yml", "Añadir la variable db_password en el archivo", "Cifrar el archivo: ansible-vault encrypt group_vars/all/vault.yml", "Verificar cifrado: cat group_vars/all/vault.yml (debe mostrar solo ANSIBLE_VAULT header)", "Referenciar {{ db_password }} en el playbook normalmente", "Ejecutar con contraseña: ansible-playbook --ask-vault-pass site.yml", "Alternativa con archivo: ansible-playbook --vault-password-file .vault_pass site.yml"], recommendedCommands: ["ansible-vault encrypt group_vars/all/vault.yml", "ansible-vault view group_vars/all/vault.yml", "ansible-playbook --ask-vault-pass site.yml", "ansible-vault rekey group_vars/all/vault.yml"], validation: "El archivo vault.yml muestra solo contenido cifrado. El playbook usa la variable correctamente.", commonErrors: ["Hacer commit del archivo descifrado en git", "Perder la contraseña del vault sin backup", "No añadir el archivo .vault_pass al .gitignore"] },
          { id: 5, title: "Template Jinja2 para configuración dinámica", category: "Templates", difficulty: "medio", context: "Cada servidor web necesita una configuración de Apache diferente basada en variables del inventario.", objective: "Crear template Jinja2 que genere httpd.conf dinámico con datos de variables de cada host.", steps: ["Definir variables server_name y doc_root en host_vars/ para cada servidor", "Crear template templates/httpd.conf.j2 con {{ server_name }} y {{ doc_root }}", "Añadir bloque condicional {% if ssl_enabled %}...{% endif %} para SSL", "Usar módulo template en playbook: src=httpd.conf.j2 dest=/etc/httpd/conf/httpd.conf", "Añadir notify al handler de restart Apache", "Verificar: ansible all -a 'httpd -t' para validar sintaxis de la config generada"], recommendedCommands: ["ansible-playbook site.yml --check --diff", "ansible-playbook site.yml", "ansible all -a 'httpd -t'", "ansible all -a 'cat /etc/httpd/conf/httpd.conf'"], validation: "Cada servidor tiene httpd.conf con su server_name correcto. httpd -t sin errores.", commonErrors: ["Usar {{ }} en lugar de {% %} para bloques if/for en templates", "No reiniciar Apache después del template (usar handler con notify)", "Variables de host_vars sin definir en algún host causando error de template"] },
          { id: 6, title: "Instalar y usar rol de Ansible Galaxy", category: "Galaxy", difficulty: "medio", context: "Necesitas gestionar usuarios en todos los servidores usando un rol de la comunidad de Galaxy.", objective: "Crear requirements.yml, instalar el rol y usarlo en un playbook con las variables correctas.", steps: ["Buscar un rol adecuado en galaxy.ansible.com", "Crear requirements.yml con el rol y su versión específica", "Instalar: ansible-galaxy install -r requirements.yml", "Verificar instalación: ansible-galaxy list", "Crear playbook users.yml que use el rol con las variables de configuración", "Definir las variables del rol en group_vars o vars del play", "Ejecutar y verificar usuarios creados en los hosts"], recommendedCommands: ["ansible-galaxy install -r requirements.yml", "ansible-galaxy list", "ansible-galaxy role info autor.nombre_rol", "ansible-playbook users.yml -v"], validation: "Usuarios creados en todos los hosts con los atributos correctos.", commonErrors: ["No especificar versión en requirements.yml", "No revisar README del rol para conocer variables requeridas", "Instalar el rol en directorio distinto al definido en roles_path"] },
          { id: 7, title: "Gestionar usuarios y claves SSH con Ansible", category: "Playbooks", difficulty: "básico", context: "Debes crear usuarios, grupos y distribuir claves SSH en múltiples servidores de forma automatizada.", objective: "Playbook que cree grupo 'webadmins', usuarios con clave SSH y configuración de sudo.", steps: ["Crear playbook users.yml con become: true", "Añadir tarea para crear grupo webadmins: módulo group (name: webadmins, state: present)", "Añadir tarea para crear usuario: módulo user (name, groups: webadmins, shell: /bin/bash)", "Añadir tarea para distribuir clave SSH: módulo authorized_key (user, key, state: present)", "Añadir tarea para configurar sudo: módulo copy para /etc/sudoers.d/webadmins", "Ejecutar y verificar: ansible all -a 'id webadmin1'"], recommendedCommands: ["ansible-playbook users.yml", "ansible all -a 'id webadmin1'", "ansible all -a 'getent group webadmins'", "ansible all -m shell -a 'ls /home/webadmin1/.ssh/authorized_keys'"], validation: "Usuarios existen en todos los hosts, pertenecen al grupo webadmins y pueden autenticarse con su clave SSH.", commonErrors: ["No especificar state: present en módulo user (aunque es el default, es más explícito)", "Clave pública con formato incorrecto o espacios extra", "Permisos incorrectos en .ssh o authorized_keys"] },
          { id: 8, title: "Configurar SELinux con Ansible", category: "Seguridad", difficulty: "medio", context: "Debes asegurar que SELinux está en modo enforcing y configurar booleanos para permitir conexiones de red a Apache.", objective: "Usar módulo selinux para el modo y seboolean para booleanos de forma persistente.", steps: ["Crear playbook selinux.yml con become: true", "Añadir tarea con módulo selinux: policy: targeted, state: enforcing", "Añadir tarea con módulo seboolean: name: httpd_can_network_connect, state: true, persistent: yes", "Añadir tarea para cambiar contexto SELinux de directorio personalizado: módulo sefcontext", "Añadir tarea para aplicar contextos: módulo command con restorecon -Rv /path", "Verificar: ansible all -a 'getenforce' && ansible all -m shell -a 'getsebool httpd_can_network_connect'"], recommendedCommands: ["ansible-playbook selinux.yml", "ansible all -a 'getenforce'", "ansible all -m shell -a 'getsebool httpd_can_network_connect'", "ansible all -m shell -a 'ls -Z /var/www/'"], validation: "SELinux en enforcing, booleano httpd_can_network_connect activado de forma persistente.", commonErrors: ["Usar command con setsebool en vez del módulo seboolean", "No usar persistent: yes haciendo el booleano temporal", "Olvidar restorecon después de cambiar contextos SELinux"] },
          { id: 9, title: "Usar RHEL System Role para NTP", category: "System Roles", difficulty: "básico", context: "Debes configurar la sincronización de tiempo en todos los servidores usando el RHEL System Role de timesync.", objective: "Instalar rhel-system-roles y crear playbook que configure chrony con servidores NTP específicos.", steps: ["Instalar: dnf install rhel-system-roles", "Localizar el rol: ls /usr/share/ansible/roles/ | grep timesync", "Revisar variables: cat /usr/share/ansible/roles/rhel-system-roles.timesync/README.md", "Añadir roles_path = /usr/share/ansible/roles en ansible.cfg si no está", "Crear playbook timesync.yml con la variable timesync_ntp_servers (lista de servidores)", "Ejecutar y verificar: ansible all -a 'chronyc sources'"], recommendedCommands: ["dnf install rhel-system-roles", "ls /usr/share/ansible/roles/", "ansible-playbook timesync.yml", "ansible all -a 'chronyc tracking'"], validation: "chronyc sources muestra los servidores NTP configurados y el tiempo está sincronizado.", commonErrors: ["Buscar el rol en /etc/ansible/roles en lugar de /usr/share/ansible/roles/", "No añadir /usr/share/ansible/roles/ a roles_path en ansible.cfg", "No revisar el README del rol para la sintaxis correcta de timesync_ntp_servers"] },
          { id: 10, title: "Manejo de errores con block/rescue/always", category: "Manejo de Errores", difficulty: "avanzado", context: "Tu playbook hace cambios críticos y debes garantizar un rollback limpio si algo falla.", objective: "Implementar block/rescue/always para manejo estructurado de errores y estado consistente.", steps: ["Crear estructura block: con las tareas críticas principales", "Añadir rescue: con las tareas de rollback si algo en block falla", "Añadir always: con las tareas de limpieza que deben ejecutarse siempre", "Añadir tarea de debug en rescue para mostrar el error: {{ ansible_failed_result }}", "Probar el escenario de fallo con failed_when artificial", "Verificar que rescue ejecuta el rollback y always siempre se ejecuta"], recommendedCommands: ["ansible-playbook site.yml -v", "ansible-playbook site.yml --check", "ansible-playbook site.yml -e 'simulate_failure=true'", "ansible-playbook site.yml -v 2>&1 | grep -E 'TASK|RESCUE|ALWAYS'"], validation: "En caso de fallo en block, rescue ejecuta rollback. always ejecuta limpieza siempre.", commonErrors: ["Olvidar que rescue solo se ejecuta cuando falla algo en el block", "No incluir tareas de rollback idempotentes en rescue", "Usar ignore_errors en lugar de block/rescue para manejo estructurado"] }
        ],
        practiceCommands: [
          { id: 1, category: "Playbooks", title: "ansible-playbook - Ejecutar playbooks", command: "ansible-playbook -i inventory site.yml", prompt: "[student@control ~]$", description: "Ejecuta un playbook de Ansible contra el inventario especificado.", usage: "ansible-playbook [options] playbook.yml", examples: ["ansible-playbook site.yml", "ansible-playbook -i inventory site.yml", "ansible-playbook --check site.yml", "ansible-playbook --syntax-check site.yml", "ansible-playbook -v site.yml"], simulatedOutput: `PLAY [webservers] **************************************************************

TASK [Gathering Facts] *********************************************************
ok: [server1.example.com]
ok: [server2.example.com]

TASK [Install Apache] **********************************************************
changed: [server1.example.com]
changed: [server2.example.com]

TASK [Start and enable Apache] *************************************************
changed: [server1.example.com]
changed: [server2.example.com]

RUNNING HANDLER [Restart Apache] ***********************************************
changed: [server1.example.com]
changed: [server2.example.com]

PLAY RECAP *********************************************************************
server1.example.com : ok=4  changed=3  unreachable=0  failed=0  skipped=0
server2.example.com : ok=4  changed=3  unreachable=0  failed=0  skipped=0`, manPage: `ANSIBLE-PLAYBOOK(1)

NAME
       ansible-playbook - Runs Ansible playbooks

SYNOPSIS
       ansible-playbook [options] playbook.yml [playbook2.yml ...]

OPTIONS
       -i INVENTORY   Specify inventory host path.
       -v             Verbose mode (-vvv for more debug output).
       --check        Dry-run mode, don't make changes.
       --syntax-check Only check playbook syntax.
       --diff         Show file diffs when changing files.
       -e EXTRA_VARS  Set additional variables as key=value.
       --ask-vault-pass  Ask for vault password.
       --become       Run operations with become (sudo).
       --limit        Limit to a subset of hosts.

EXAMPLES
       ansible-playbook site.yml
           Run site.yml against default inventory.

       ansible-playbook -i hosts site.yml --check
           Dry run against custom inventory.

SEE ALSO
       ansible(1), ansible-vault(1), ansible-galaxy(1)` },
          { id: 2, category: "Ad-hoc", title: "ansible - Comandos ad-hoc", command: "ansible all -m ping", prompt: "[student@control ~]$", description: "Ejecuta el módulo ping contra todos los hosts del inventario.", usage: "ansible <pattern> -m <module> [-a <args>]", examples: ["ansible all -m ping", "ansible webservers -m dnf -a 'name=httpd state=present' --become", "ansible all -m setup -a 'filter=ansible_os_family'", "ansible all -m service -a 'name=httpd state=restarted' --become"], simulatedOutput: `server1.example.com | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
server2.example.com | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}`, manPage: `ANSIBLE(1)

NAME
       ansible - Define and run a single task against a set of hosts

SYNOPSIS
       ansible <host-pattern> [options]

OPTIONS
       -m MODULE_NAME  Module name to execute (default=command).
       -a MODULE_ARGS  Module arguments.
       -i INVENTORY    Specify inventory host path.
       --become, -b    Run operations with become (sudo).
       -u REMOTE_USER  Connect as this user.
       -v              Verbose mode.

EXAMPLES
       ansible all -m ping
           Test connectivity to all hosts.

       ansible webservers -m dnf -a 'name=httpd state=present' -b
           Install Apache on webservers group.

       ansible all -m setup -a 'filter=ansible_distribution'
           Get OS distribution fact from all hosts.

SEE ALSO
       ansible-playbook(1), ansible-inventory(1)` },
          { id: 3, category: "Ansible Vault", title: "ansible-vault - Gestionar datos cifrados", command: "ansible-vault encrypt vars/secrets.yml", prompt: "[student@control ~]$", description: "Cifra un archivo de variables con AES256 usando una contraseña.", usage: "ansible-vault {encrypt|decrypt|view|edit|create|rekey} [file]", examples: ["ansible-vault encrypt vars/secrets.yml", "ansible-vault create vars/newfile.yml", "ansible-vault view vars/secrets.yml", "ansible-vault edit vars/secrets.yml", "ansible-vault rekey vars/secrets.yml"], simulatedOutput: `New Vault password:
Confirm New Vault password:
Encryption successful`, manPage: `ANSIBLE-VAULT(1)

NAME
       ansible-vault - encryption/decryption utility for Ansible data files

SYNOPSIS
       ansible-vault [create|decrypt|edit|view|encrypt|rekey] [options] [vaultfile.yml]

SUBCOMMANDS
       create     Create and open a new encrypted file.
       decrypt    Decrypt encrypted files in place.
       edit       Edit encrypted files in place.
       view       View encrypted file contents without writing to disk.
       encrypt    Encrypt provided files in place.
       rekey      Re-encrypt a vaulted file with a new secret.

OPTIONS
       --ask-vault-pass      Ask for vault password interactively.
       --vault-password-file Path to vault password file.

EXAMPLES
       ansible-vault encrypt secrets.yml
           Encrypt existing file.

       ansible-vault view secrets.yml
           View encrypted file without decrypting to disk.

       ansible-vault rekey secrets.yml
           Change vault password.

SEE ALSO
       ansible-playbook(1)` },
          { id: 4, category: "Galaxy", title: "ansible-galaxy - Gestionar roles y colecciones", command: "ansible-galaxy role install -r requirements.yml", prompt: "[student@control ~]$", description: "Instala roles de Ansible Galaxy definidos en requirements.yml.", usage: "ansible-galaxy {role|collection} {install|list|init|remove} [options]", examples: ["ansible-galaxy role install geerlingguy.apache", "ansible-galaxy role install -r requirements.yml", "ansible-galaxy role init mi_rol", "ansible-galaxy collection install community.general", "ansible-galaxy list"], simulatedOutput: `Starting galaxy role install process
- downloading role 'apache', owned by geerlingguy
- downloading role from https://github.com/geerlingguy/ansible-role-apache/archive/3.2.0.tar.gz
- extracting geerlingguy.apache to /home/student/.ansible/roles/geerlingguy.apache
- geerlingguy.apache (3.2.0) was installed successfully`, manPage: `ANSIBLE-GALAXY(1)

NAME
       ansible-galaxy - Perform various Role and Collection related operations

SYNOPSIS
       ansible-galaxy [role|collection] COMMAND [options]

ROLE COMMANDS
       init       Initialize new role with the base structure.
       install    Install role(s) from file, URL or Ansible Galaxy.
       remove     Delete a role from roles_path.
       list       Show the name and version of each role installed.
       info       View role information.

COLLECTION COMMANDS
       install    Install collection(s).
       list       Show installed collections.

OPTIONS
       -r REQUIREMENTS_FILE  A file containing a list of roles/collections.
       -p ROLES_PATH         The path to the directory containing your roles.

EXAMPLES
       ansible-galaxy role install geerlingguy.apache
           Install specific role from Galaxy.

       ansible-galaxy install -r requirements.yml
           Install all roles in requirements.yml.

SEE ALSO
       ansible-playbook(1)` },
          { id: 5, category: "ansible-navigator", title: "ansible-navigator - Ejecutar y explorar playbooks", command: "ansible-navigator run site.yml -m stdout", prompt: "[student@control ~]$", description: "Ejecuta un playbook en modo stdout (no interactivo), similar a ansible-playbook.", usage: "ansible-navigator run|doc|images|collections [options]", examples: ["ansible-navigator run site.yml -m stdout", "ansible-navigator run site.yml --check -m stdout", "ansible-navigator doc dnf -m stdout", "ansible-navigator images -m stdout", "ansible-navigator collections -m stdout"], simulatedOutput: `PLAY [webservers] **************************************************************

TASK [Gathering Facts] *********************************************************
ok: [server1.example.com]

TASK [Install Apache] **********************************************************
changed: [server1.example.com]

PLAY RECAP *********************************************************************
server1.example.com : ok=2  changed=1  unreachable=0  failed=0`, manPage: `ANSIBLE-NAVIGATOR(1)

NAME
       ansible-navigator - A TUI and CLI tool for running Ansible

SYNOPSIS
       ansible-navigator [subcommand] [options]

SUBCOMMANDS
       run        Run a playbook.
       doc        Show documentation for a plugin.
       images     Explore execution environment images.
       collections Browse Ansible collections.
       inventory  Explore the inventory.
       config     Explore configuration.

OPTIONS
       -m MODE    Mode: stdout (non-interactive) or interactive (TUI).
       --eei IMAGE  Execution environment image to use.
       --check    Run in dry-run mode.
       -v         Verbose output.

EXAMPLES
       ansible-navigator run site.yml -m stdout
           Run playbook in non-interactive mode.

       ansible-navigator doc dnf -m stdout
           Show documentation for dnf module.

SEE ALSO
       ansible-playbook(1)` },
          { id: 6, category: "Inventarios", title: "ansible-inventory - Explorar inventario", command: "ansible-inventory --graph", prompt: "[student@control ~]$", description: "Muestra el inventario en forma de árbol con grupos y hosts.", usage: "ansible-inventory [options] [host|group]", examples: ["ansible-inventory --graph", "ansible-inventory --list", "ansible-inventory --host server1.example.com", "ansible-inventory --graph --vars"], simulatedOutput: `@all:
  |--@ungrouped:
  |--@webservers:
  |  |--server1.example.com
  |  |--server2.example.com
  |--@dbservers:
  |  |--db1.example.com
  |--@production:
  |  |--@webservers:
  |  |--@dbservers:`, manPage: `ANSIBLE-INVENTORY(1)

NAME
       ansible-inventory - Show Ansible inventory information

SYNOPSIS
       ansible-inventory [options] [host|group]

OPTIONS
       --list     Output all hosts info in JSON format.
       --host HOST Output specific host info.
       --graph    Create inventory graph (tree format).
       --vars     Add vars to graph display.
       -i INVENTORY  The inventory being queried.

EXAMPLES
       ansible-inventory --graph
           Show inventory as tree.

       ansible-inventory --list
           Show inventory in JSON format.

       ansible-inventory --host server1
           Show variables for a specific host.

SEE ALSO
       ansible(1), ansible-playbook(1)` },
          { id: 7, category: "Documentación", title: "ansible-doc - Documentación de módulos", command: "ansible-doc dnf", prompt: "[student@control ~]$", description: "Muestra documentación completa del módulo dnf con opciones y ejemplos.", usage: "ansible-doc [-l] [-s] [-t <plugin type>] [plugin]", examples: ["ansible-doc dnf", "ansible-doc -l | grep service", "ansible-doc -s copy", "ansible-doc user", "ansible-doc template"], simulatedOutput: `> ANSIBLE.BUILTIN.DNF    (/usr/lib/python3/dist-packages/ansible/modules/dnf.py)

        Installs, upgrade, removes, and lists packages and groups
        with the dnf package manager.

OPTIONS (= is mandatory):

= name
        A package name or package specifier with version.
        type: list / elements=string

- state
        Whether to install (present, latest) or remove (absent).
        (Choices: absent, installed, latest, present, removed)
        [Default: None]

EXAMPLES:
- name: Install httpd
  ansible.builtin.dnf:
    name: httpd
    state: present`, manPage: `ANSIBLE-DOC(1)

NAME
       ansible-doc - Plugin documentation tool

SYNOPSIS
       ansible-doc [-l] [-s] [-t <plugin type>] [plugin]

OPTIONS
       -l, --list         List available plugins.
       -s, --snippet      Show playbook snippet for specified plugin.
       -t TYPE            Choose which plugin type: module, callback, etc.

EXAMPLES
       ansible-doc dnf
           Show full documentation for dnf module.

       ansible-doc -s template
           Show snippet/example for template module.

       ansible-doc -l | grep ^ansible.builtin
           List all builtin modules.

SEE ALSO
       ansible(1), ansible-playbook(1)` },
          { id: 8, category: "Configuración", title: "ansible-config - Explorar configuración activa", command: "ansible-config dump --only-changed", prompt: "[student@control ~]$", description: "Muestra solo los parámetros de configuración que difieren del valor por defecto.", usage: "ansible-config {list|dump|view|init} [options]", examples: ["ansible-config dump --only-changed", "ansible-config list", "ansible-config view", "ansible-config dump | grep INVENTORY"], simulatedOutput: `DEFAULT_BECOME(/home/student/ansible-project/ansible.cfg) = True
DEFAULT_HOST_LIST(/home/student/ansible-project/ansible.cfg) = ['/home/student/ansible-project/inventory']
DEFAULT_REMOTE_USER(/home/student/ansible-project/ansible.cfg) = devops
HOST_KEY_CHECKING(/home/student/ansible-project/ansible.cfg) = False`, manPage: `ANSIBLE-CONFIG(1)

NAME
       ansible-config - View ansible configuration.

SYNOPSIS
       ansible-config [view|dump|list|init] [--help] [options] [ansible.cfg]

SUBCOMMANDS
       view   Displays the current config file.
       dump   Dump configuration settings.
       list   List and describe valid config settings.
       init   Create initial configuration.

OPTIONS
       --only-changed   Show only non-default configuration values.

EXAMPLES
       ansible-config dump --only-changed
           Show non-default settings and their source file.

       ansible-config view
           Display current ansible.cfg contents.

SEE ALSO
       ansible(1)` }
        ],
        consoleMissions: [
          { id: 1, title: "Verificar conectividad con ping", category: "Ad-hoc", prompt: "[student@control ~]$", mission: "Ejecuta un comando ad-hoc para verificar la conectividad con todos los hosts del inventario usando el módulo ping.", hints: ["Usa el comando ansible", "El patrón 'all' selecciona todos los hosts", "La opción -m especifica el módulo", "Prueba con: ansible-doc ping"], validCommands: ["ansible all -m ping", "ansible '*' -m ping", "ansible all -m ansible.builtin.ping"], manPages: { "ansible": `ANSIBLE(1)

NAME
       ansible - run a task against a set of hosts

SYNOPSIS
       ansible <host-pattern> [options]

OPTIONS
       -m MODULE_NAME  Module name (default: command).
       -a MODULE_ARGS  Module arguments.
       -b, --become    Run with privilege escalation.
       -i INVENTORY    Inventory file or directory.

EXAMPLES
       ansible all -m ping
           Test connectivity to all hosts.` }, successMessage: "Conectividad verificada con todos los hosts.", simulatedOutput: `server1.example.com | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
server2.example.com | SUCCESS => {
    "changed": false,
    "ping": "pong"
}` },
          { id: 2, title: "Listar hosts del inventario en árbol", category: "Inventarios", prompt: "[student@control ~]$", mission: "Muestra el inventario en formato de árbol (graph) para visualizar grupos y hosts.", hints: ["Usa ansible-inventory", "La opción --graph muestra árbol", "Prueba con: ansible-inventory --help"], validCommands: ["ansible-inventory --graph", "ansible-inventory --graph --vars"], manPages: { "ansible-inventory": `ANSIBLE-INVENTORY(1)

NAME
       ansible-inventory - Show Ansible inventory information

OPTIONS
       --graph    Create inventory graph.
       --list     Output all hosts info, works as inventory script.
       --vars     Add vars to graph display.` }, successMessage: "Inventario mostrado en formato árbol.", simulatedOutput: `@all:
  |--@ungrouped:
  |--@webservers:
  |  |--server1.example.com
  |  |--server2.example.com
  |--@dbservers:
  |  |--db1.example.com` },
          { id: 3, title: "Cifrar archivo con Vault", category: "Ansible Vault", prompt: "[student@control ansible-project]$", mission: "Cifra el archivo 'group_vars/all/vault.yml' usando ansible-vault.", hints: ["Usa ansible-vault encrypt", "Te pedirá una contraseña nueva", "Confirma la contraseña", "Prueba con: man ansible-vault"], validCommands: ["ansible-vault encrypt group_vars/all/vault.yml"], manPages: { "ansible-vault": `ANSIBLE-VAULT(1)

NAME
       ansible-vault - encryption/decryption utility

SUBCOMMANDS
       encrypt    Encrypt provided files in place.
       decrypt    Decrypt provided files in place.
       view       View encrypted file.
       edit       Edit encrypted file.
       create     Create new encrypted file.
       rekey      Re-key vaulted file.

EXAMPLES
       ansible-vault encrypt secrets.yml` }, successMessage: "Archivo group_vars/all/vault.yml cifrado con Ansible Vault.", simulatedOutput: `New Vault password:
Confirm New Vault password:
Encryption successful` },
          { id: 4, title: "Verificar sintaxis de playbook", category: "Playbooks", prompt: "[student@control ansible-project]$", mission: "Verifica la sintaxis del playbook 'site.yml' sin ejecutarlo ni conectarse a ningún host.", hints: ["Usa ansible-playbook", "La opción --syntax-check valida la sintaxis", "No se conecta a hosts ni ejecuta tareas"], validCommands: ["ansible-playbook --syntax-check site.yml", "ansible-playbook site.yml --syntax-check"], manPages: { "ansible-playbook": `ANSIBLE-PLAYBOOK(1)

OPTIONS
       --syntax-check  Perform a syntax check on the playbook, but do not
                       execute it. Does not connect to hosts.
       --check         Run in check mode (connects to hosts, dry run).
       -v              Verbose output.` }, successMessage: "Sintaxis de site.yml verificada sin errores.", simulatedOutput: `playbook: site.yml` },
          { id: 5, title: "Instalar rol desde Galaxy", category: "Galaxy", prompt: "[student@control ansible-project]$", mission: "Instala todos los roles definidos en el archivo 'requirements.yml' usando ansible-galaxy.", hints: ["Usa ansible-galaxy role install", "La opción -r especifica el archivo de requisitos", "Prueba con: ansible-galaxy --help"], validCommands: ["ansible-galaxy role install -r requirements.yml", "ansible-galaxy install -r requirements.yml"], manPages: { "ansible-galaxy": `ANSIBLE-GALAXY(1)

ROLE COMMANDS
       install    Install role from file, URL or Galaxy.
       list       Show installed roles.

OPTIONS
       -r REQUIREMENTS_FILE  A file containing a list of roles.
       -p ROLES_PATH         The path to install roles.

EXAMPLES
       ansible-galaxy role install -r requirements.yml
           Install roles from requirements file.` }, successMessage: "Roles de requirements.yml instalados desde Galaxy.", simulatedOutput: `- downloading role 'timesync', owned by linux-system-roles
- linux-system-roles.timesync was installed successfully` },
          { id: 6, title: "Crear estructura de un rol", category: "Roles", prompt: "[student@control ansible-project]$", mission: "Crea la estructura de un nuevo rol llamado 'webserver' dentro del directorio 'roles/'.", hints: ["Usa ansible-galaxy role init", "Especifica la ruta con --init-path", "Formato: ansible-galaxy role init --init-path roles/ nombre_rol"], validCommands: ["ansible-galaxy role init --init-path roles/ webserver", "ansible-galaxy role init roles/webserver"], manPages: { "ansible-galaxy": `ANSIBLE-GALAXY(1)

ROLE SUBCOMMANDS
       init       Initialize new role with the base structure.

OPTIONS for init:
       --init-path PATH  The path in which the skeleton role will be created.

EXAMPLES
       ansible-galaxy role init my_role
           Create my_role in current directory.

       ansible-galaxy role init --init-path roles/ my_role
           Create my_role inside roles/ directory.` }, successMessage: "Estructura del rol 'webserver' creada en roles/.", simulatedOutput: `- Role roles/webserver was created successfully` },
          { id: 7, title: "Obtener facts de red de un host", category: "Facts", prompt: "[student@control ~]$", mission: "Muestra el fact ansible_default_ipv4 del host server1.example.com para ver su configuración de red.", hints: ["Usa ansible con el módulo setup", "La opción filter= filtra los facts por nombre", "Prueba con: ansible-doc setup"], validCommands: ["ansible server1.example.com -m setup -a 'filter=ansible_default_ipv4'", "ansible server1.example.com -m setup -a 'filter=ansible_default_ipv4*'"], manPages: { "setup": `ANSIBLE.BUILTIN.SETUP module

NAME
       setup - Gathers facts about remote hosts

OPTIONS
       filter    If supplied, only return facts that match this shell-style
                 wildcard. An empty string means 'all'.

EXAMPLES
       ansible all -m setup
           Get all facts from all hosts.

       ansible all -m setup -a 'filter=ansible_distribution'
           Get only OS distribution fact.` }, successMessage: "Facts de red de server1 mostrados correctamente.", simulatedOutput: `server1.example.com | SUCCESS => {
    "ansible_facts": {
        "ansible_default_ipv4": {
            "address": "192.168.1.10",
            "alias": "eth0",
            "gateway": "192.168.1.1",
            "interface": "eth0",
            "netmask": "255.255.255.0",
            "network": "192.168.1.0"
        }
    },
    "changed": false
}` },
          { id: 8, title: "Instalar paquete con ad-hoc y become", category: "Ad-hoc", prompt: "[student@control ~]$", mission: "Instala el paquete 'httpd' en el grupo 'webservers' usando un comando ad-hoc con escalada de privilegios.", hints: ["Usa ansible con módulo dnf", "Necesitas escalada de privilegios con --become o -b", "El argumento es 'name=httpd state=present'", "Prueba con: ansible-doc dnf"], validCommands: ["ansible webservers -m dnf -a 'name=httpd state=present' --become", "ansible webservers -m dnf -a 'name=httpd state=present' -b", "ansible webservers -b -m dnf -a 'name=httpd state=present'"], manPages: { "dnf": `ANSIBLE.BUILTIN.DNF module

NAME
       dnf - Manages packages with the dnf package manager

OPTIONS
= name
        Package name(s) or package specifier.
        type: list / elements=string

- state
        Whether to install (present, latest) or remove (absent).
        Choices: absent, installed, latest, present, removed

EXAMPLES
- name: Install httpd
  ansible.builtin.dnf:
    name: httpd
    state: present` }, successMessage: "Paquete httpd instalado en todos los webservers.", simulatedOutput: `server1.example.com | CHANGED => {
    "changed": true,
    "msg": "Installed: httpd-2.4.51-7.el9.x86_64"
}
server2.example.com | CHANGED => {
    "changed": true,
    "msg": "Installed: httpd-2.4.51-7.el9.x86_64"
}` }
        ],
        livePracticeTasks: [
          { id: 1, title: "Verificar conectividad ad-hoc", category: "Ad-hoc", task: "Ejecuta un comando ad-hoc para verificar conectividad con el grupo 'webservers' usando el módulo ping.", hints: ["ansible webservers -m ping", "Usa 'all' para todos los hosts"], validCommands: ["ansible webservers -m ping", "ansible webservers -m ansible.builtin.ping"], solution: "ansible webservers -m ping" },
          { id: 2, title: "Instalar paquete ad-hoc", category: "Ad-hoc", task: "Instala el paquete 'vim-enhanced' en todos los hosts usando un comando ad-hoc con escalada de privilegios.", hints: ["Usa el módulo dnf", "Necesitas --become o -b para privilegios"], validCommands: ["ansible all -m dnf -a 'name=vim-enhanced state=present' --become", "ansible all -b -m dnf -a 'name=vim-enhanced state=present'"], solution: "ansible all -m dnf -a 'name=vim-enhanced state=present' --become" },
          { id: 3, title: "Verificar sintaxis de playbook", category: "Playbooks", task: "Verifica la sintaxis del archivo 'site.yml' sin ejecutarlo.", hints: ["Usa --syntax-check", "ansible-playbook --help para ver opciones"], validCommands: ["ansible-playbook --syntax-check site.yml", "ansible-playbook site.yml --syntax-check"], solution: "ansible-playbook --syntax-check site.yml" },
          { id: 4, title: "Modo dry-run de playbook", category: "Playbooks", task: "Ejecuta el playbook 'httpd.yml' en modo check (dry-run) para ver los cambios sin aplicarlos.", hints: ["Usa --check", "Muestra cambios simulados sin aplicarlos realmente"], validCommands: ["ansible-playbook --check httpd.yml", "ansible-playbook httpd.yml --check"], solution: "ansible-playbook --check httpd.yml" },
          { id: 5, title: "Cifrar archivo de vault", category: "Ansible Vault", task: "Cifra el archivo 'group_vars/all/vault.yml' con ansible-vault.", hints: ["ansible-vault encrypt archivo", "Te pedirá contraseña nueva"], validCommands: ["ansible-vault encrypt group_vars/all/vault.yml"], solution: "ansible-vault encrypt group_vars/all/vault.yml" },
          { id: 6, title: "Ver archivo cifrado", category: "Ansible Vault", task: "Visualiza el contenido del archivo cifrado 'vars/secrets.yml' sin descifrarlo permanentemente al disco.", hints: ["ansible-vault view archivo", "Te pedirá la contraseña del vault"], validCommands: ["ansible-vault view vars/secrets.yml"], solution: "ansible-vault view vars/secrets.yml" },
          { id: 7, title: "Crear estructura de rol", category: "Roles", task: "Crea la estructura de un rol llamado 'database' dentro del directorio 'roles/'.", hints: ["ansible-galaxy role init", "--init-path para especificar directorio destino"], validCommands: ["ansible-galaxy role init --init-path roles/ database", "ansible-galaxy role init roles/database"], solution: "ansible-galaxy role init --init-path roles/ database" },
          { id: 8, title: "Instalar rol de Galaxy", category: "Galaxy", task: "Instala el rol 'geerlingguy.mysql' desde Ansible Galaxy.", hints: ["ansible-galaxy role install autor.rol"], validCommands: ["ansible-galaxy role install geerlingguy.mysql", "ansible-galaxy install geerlingguy.mysql"], solution: "ansible-galaxy role install geerlingguy.mysql" },
          { id: 9, title: "Listar roles instalados", category: "Galaxy", task: "Lista todos los roles de Ansible instalados en el sistema.", hints: ["ansible-galaxy role list"], validCommands: ["ansible-galaxy role list", "ansible-galaxy list"], solution: "ansible-galaxy role list" },
          { id: 10, title: "Documentación de módulo", category: "Documentación", task: "Muestra la documentación completa del módulo 'user' de Ansible.", hints: ["ansible-doc nombre_modulo"], validCommands: ["ansible-doc user", "ansible-doc ansible.builtin.user"], solution: "ansible-doc user" },
          { id: 11, title: "Facts de distribución", category: "Facts", task: "Obtén el fact ansible_distribution de todos los hosts del inventario.", hints: ["Módulo setup con filter=", "ansible all -m setup -a 'filter=...'"], validCommands: ["ansible all -m setup -a 'filter=ansible_distribution'", "ansible all -m setup -a 'filter=ansible_distribution*'"], solution: "ansible all -m setup -a 'filter=ansible_distribution'" },
          { id: 12, title: "Gráfico de inventario con variables", category: "Inventarios", task: "Muestra el inventario completo en formato árbol incluyendo las variables de cada grupo y host.", hints: ["ansible-inventory --graph --vars"], validCommands: ["ansible-inventory --graph --vars", "ansible-inventory --graph"], solution: "ansible-inventory --graph --vars" },
          { id: 13, title: "Ejecutar playbook con navigator", category: "ansible-navigator", task: "Ejecuta el playbook 'site.yml' con ansible-navigator en modo stdout (no interactivo).", hints: ["ansible-navigator run playbook -m stdout", "-m stdout para salida no interactiva similar a ansible-playbook"], validCommands: ["ansible-navigator run site.yml -m stdout", "ansible-navigator run site.yml --mode stdout"], solution: "ansible-navigator run site.yml -m stdout" },
          { id: 14, title: "Cambiar contraseña de vault", category: "Ansible Vault", task: "Cambia la contraseña de cifrado del archivo vault 'vars/secrets.yml' (rekey).", hints: ["ansible-vault rekey archivo", "Pedirá la contraseña actual y la nueva contraseña"], validCommands: ["ansible-vault rekey vars/secrets.yml"], solution: "ansible-vault rekey vars/secrets.yml" },
          { id: 15, title: "Configuración activa de Ansible", category: "Configuración", task: "Muestra solo los parámetros de configuración de Ansible que difieren del valor por defecto.", hints: ["ansible-config dump --only-changed"], validCommands: ["ansible-config dump --only-changed", "ansible-config dump --only-changed -v"], solution: "ansible-config dump --only-changed" }
        ]
      }
};
