module.exports = {
      ex294: {
        id: 'ex294',
        name: 'EX294 - Red Hat Certified Engineer',
        shortName: 'EX294',
        description: 'Prepara tu certificación Red Hat con test prácticos, simulacros, escenarios y conceptos clave de ingeniería de sistemas.',
        hasPractice: true,
        hasScenarios: true,
        hasConsole: true,
        hasLivePractice: true,
        questions: [
          { id: 1, category: "DNS", level: "medio", question: "¿Qué comando se utiliza para verificar la resolución DNS de un nombre de dominio?", options: ["dig example.com", "nslookup example.com", "host example.com", "Todos los anteriores"], correctAnswer: 3, explanation: "Todos los comandos mencionados (dig, nslookup, host) pueden utilizarse para verificar la resolución DNS. dig ofrece la salida más detallada, nslookup es más interactivo, y host es más simple.", command: "dig example.com" },
          { id: 2, category: "LDAP", level: "avanzado", question: "¿Cuál es el comando correcto para autenticar un usuario LDAP con un DN específico?", options: ["ldapsearch -x -D 'cn=admin,dc=example,dc=com' -W", "ldapwhoami -x -D 'cn=admin,dc=example,dc=com' -W", "ldapauth -x -D 'cn=admin,dc=example,dc=com' -W", "ldapbind -x -D 'cn=admin,dc=example,dc=com' -W"], correctAnswer: 1, explanation: "ldapwhoami se utiliza para verificar la autenticación LDAP. La opción -x especifica autenticación simple, -D especifica el DN del usuario y -W solicita la contraseña.", command: "ldapwhoami -x -D 'cn=admin,dc=example,dc=com' -W" },
          { id: 3, category: "Kerberos", level: "avanzado", question: "¿Qué comando se utiliza para obtener un ticket Kerberos para un usuario?", options: ["kinit username@REALM", "kget username@REALM", "kticket username@REALM", "kauth username@REALM"], correctAnswer: 0, explanation: "kinit se utiliza para obtener e inicializar credenciales Kerberos. El formato es kinit usuario@REALM donde REALM es el dominio Kerberos en mayúsculas.", command: "kinit user@EXAMPLE.COM" },
          { id: 4, category: "NTP", level: "medio", question: "¿Cuál es el servicio utilizado para sincronización de tiempo en RHEL 8/9?", options: ["ntpd", "chronyd", "timesyncd", "timed"], correctAnswer: 1, explanation: "chronyd es el servicio de sincronización de tiempo predeterminado en RHEL 8/9. Reemplaza al antiguo ntpd y ofrece mejor precisión y menor consumo de recursos.", command: "systemctl status chronyd" },
          { id: 5, category: "MariaDB", level: "medio", question: "¿Qué comando se utiliza para crear una base de datos en MariaDB?", options: ["CREATE DATABASE database_name;", "NEW DATABASE database_name;", "MAKE DATABASE database_name;", "ADD DATABASE database_name;"], correctAnswer: 0, explanation: "En SQL, el comando estándar para crear una base de datos es CREATE DATABASE. Este comando debe ejecutarse desde el cliente de MariaDB o MySQL.", command: "mysql -e 'CREATE DATABASE mydb;'" },
          { id: 6, category: "Postfix", level: "medio", question: "¿Dónde se configura principalmente Postfix en RHEL?", options: ["/etc/postfix/main.cf", "/etc/mail/sendmail.cf", "/etc/smtp.conf", "/etc/mail.conf"], correctAnswer: 0, explanation: "El archivo principal de configuración de Postfix es /etc/postfix/main.cf. Contiene todas las directivas de configuración principales del servidor de correo.", command: "postconf -n" },
          { id: 7, category: "Samba", level: "medio", question: "¿Qué comando se utiliza para unirse a un dominio Active Directory desde un cliente Linux?", options: ["net ads join -U administrator", "smbclient -U administrator", "realm join example.com", "Todas las anteriores"], correctAnswer: 3, explanation: "Todas las opciones pueden utilizarse para unirse a un dominio AD, aunque net ads join y realm join son los métodos más comunes. realm join es el método más moderno y recomendado.", command: "realm join example.com" },
          { id: 8, category: "HTTP Virtual Hosts", level: "medio", question: "¿Dónde se configuran típicamente los hosts virtuales de Apache en RHEL?", options: ["/etc/httpd/conf/httpd.conf", "/etc/httpd/conf.d/", "/etc/apache2/sites-available/", "/var/www/html/"], correctAnswer: 1, explanation: "En RHEL, los hosts virtuales de Apache se configuran típicamente en archivos individuales dentro del directorio /etc/httpd/conf.d/. Cada archivo representa un sitio diferente.", command: "ls /etc/httpd/conf.d/" },
          { id: 9, category: "iSCSI", level: "avanzado", question: "¿Qué comando se utiliza para descubrir destinos iSCSI disponibles en una dirección IP específica?", options: ["iscsiadm -m discovery -t sendtargets -p IP_ADDRESS", "iscsi-discovery IP_ADDRESS", "iscsiadm --discover IP_ADDRESS", "iscsiadm -m node -T TARGET_NAME -p IP_ADDRESS --login"], correctAnswer: 0, explanation: "El comando iscsiadm con el modo discovery se utiliza para descubrir destinos iSCSI. La opción -t sendtargets especifica el tipo de descubrimiento y -p indica la dirección IP del portal.", command: "iscsiadm -m discovery -t sendtargets -p 192.168.1.100" },
          { id: 10, category: "FTP", level: "medio", question: "¿Qué servicio FTP es el predeterminado en RHEL 8/9?", options: ["vsftpd", "proftpd", "pure-ftpd", "wu-ftpd"], correctAnswer: 0, explanation: "vsftpd (Very Secure FTP Daemon) es el servidor FTP predeterminado en RHEL 8/9. Es conocido por su seguridad y rendimiento.", command: "systemctl status vsftpd" },
          { id: 11, category: "NFS", level: "medio", question: "¿Qué archivo se utiliza para exportar directorios mediante NFS en el servidor?", options: ["/etc/exports", "/etc/nfs.conf", "/etc/fstab", "/etc/nfs/exports"], correctAnswer: 0, explanation: "/etc/exports es el archivo de configuración principal del servidor NFS donde se definen los directorios que se compartirán y sus opciones de acceso.", command: "cat /etc/exports" },
          { id: 12, category: "SELinux Boolean", level: "avanzado", question: "¿Qué comando se utiliza para permitir que Apache se conecte a bases de datos remotas?", options: ["setsebool -P httpd_can_network_connect_db on", "setsebool httpd_can_network_connect on", "semanage boolean -m httpd_can_network_connect_db", "setenforce httpd_can_network_connect_db"], correctAnswer: 0, explanation: "El booleano httpd_can_network_connect_db permite a Apache conectarse a bases de datos remotas. La opción -P hace que el cambio sea persistente tras reinicios.", command: "setsebool -P httpd_can_network_connect_db on" },
          { id: 13, category: "Firewall Rich Rules", level: "avanzado", question: "¿Cómo se crearía una regla rica en firewalld para permitir conexiones SSH solo desde una subred específica?", options: ["firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=192.168.1.0/24 service name=ssh accept'", "firewall-cmd --permanent --add-source=192.168.1.0/24 --add-service=ssh", "firewall-cmd --permanent --add-rule ipv4 192.168.1.0/24 ssh allow", "Ambas A y B son correctas"], correctAnswer: 3, explanation: "Ambas opciones son válidas. La primera usa una regla rica explícita, mientras que la segunda combina add-source con add-service, ambas logran el mismo objetivo.", command: "firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=192.168.1.0/24 service name=ssh accept'" },
          { id: 14, category: "Systemd Journal", level: "medio", question: "¿Qué comando muestra los logs del kernel desde el arranque actual?", options: ["journalctl -k", "dmesg", "journalctl --dmesg", "Ambas A y B"], correctAnswer: 3, explanation: "Tanto journalctl -k como dmesg muestran los mensajes del kernel. journalctl -k es parte del registro estructurado de systemd, mientras que dmesg muestra el buffer directamente del kernel.", command: "journalctl -k" },
          { id: 15, category: "LVM Snapshots", level: "avanzado", question: "¿Qué comando crea un snapshot LVM de un volumen lógico?", options: ["lvcreate -L 1G -s -n snap_lv /dev/vg/lv", "lvcreate --snapshot -L 1G -n snap_lv /dev/vg/lv", "lvcreate -L 1G --type snapshot -n snap_lv /dev/vg/lv", "Todas las anteriores"], correctAnswer: 3, explanation: "Todas las opciones son formas válidas de crear un snapshot LVM. La opción -s es la forma abreviada de --snapshot, y --type snapshot es la forma explícita.", command: "lvcreate -L 1G -s -n snap_lv /dev/vg/lv" },
          { id: 16, category: "Stratis", level: "avanzado", question: "¿Qué comando se utiliza para crear un pool Stratis?", options: ["stratis pool create pool_name /dev/sdb", "stratis filesystem create pool_name fs_name", "stratis blockdev list", "stratis pool add-data pool_name /dev/sdc"], correctAnswer: 0, explanation: "Para crear un pool Stratis, se utiliza stratis pool create seguido del nombre del pool y los dispositivos de bloque que se usarán.", command: "stratis pool create mypool /dev/sdb" },
          { id: 17, category: "Cockpit", level: "básico", question: "¿Qué puerto utiliza Cockpit por defecto?", options: ["9090", "8080", "443", "22"], correctAnswer: 0, explanation: "Cockpit utiliza el puerto 9090 por defecto para su interfaz web. Este puerto puede cambiarse en la configuración si es necesario.", command: "systemctl status cockpit" },
          { id: 18, category: "Container Registries", level: "medio", question: "¿Dónde se configuran los registros de contenedores en Podman?", options: ["/etc/containers/registries.conf", "/etc/docker/daemon.json", "/etc/podman/registries.conf", "/var/lib/containers/registries.conf"], correctAnswer: 0, explanation: "En sistemas que usan Podman, los registros de contenedores se configuran en /etc/containers/registries.conf. Este archivo define los registros de búsqueda y confianza.", command: "cat /etc/containers/registries.conf" },
          { id: 19, category: "Web Console", level: "básico", question: "¿Qué paquete proporciona la consola web (Cockpit) en RHEL?", options: ["cockpit", "webconsole", "rhel-web-console", "system-administration-tools"], correctAnswer: 0, explanation: "El paquete cockpit proporciona la interfaz web de administración de sistemas en RHEL. Una vez instalado, se puede acceder a través del navegador en el puerto 9090.", command: "dnf install cockpit" },
          { id: 20, category: "System Roles", level: "medio", question: "¿Qué paquete proporciona roles del sistema para automatización en RHEL?", options: ["rhel-system-roles", "ansible-system-roles", "linux-system-roles", "redhat-system-roles"], correctAnswer: 0, explanation: "El paquete rhel-system-roles proporciona roles Ansible predefinidos para configurar servicios comunes en RHEL, facilitando la automatización de tareas administrativas.", command: "dnf install rhel-system-roles" },
          { id: 21, category: "IdM DNS", level: "avanzado", question: "¿Qué comando se utiliza para añadir un registro DNS A en IdM (Identity Management)?", options: ["ipa dnsrecord-add example.com server1 --a-rec 192.168.1.50", "ipa dns-add example.com server1 192.168.1.50", "ipa dns-a-record-add example.com server1 192.168.1.50", "ipa add-dns example.com server1 --ip 192.168.1.50"], correctAnswer: 0, explanation: "En IdM, se utiliza ipa dnsrecord-add para añadir registros DNS. La opción --a-rec especifica que se trata de un registro A con la dirección IP correspondiente.", command: "ipa dnsrecord-add example.com server1 --a-rec 192.168.1.50" },
          { id: 22, category: "IdM Users", level: "medio", question: "¿Qué comando se utiliza para crear un usuario en IdM?", options: ["ipa user-add username --first=Nombre --last=Apellido", "ipa add-user username --firstname=Nombre --lastname=Apellido", "ipa create-user username --givenname=Nombre --surname=Apellido", "useradd --ipa username"], correctAnswer: 0, explanation: "En IdM, se utiliza ipa user-add para crear usuarios. Las opciones --first y --last especifican el nombre y apellido respectivamente.", command: "ipa user-add jsmith --first=John --last=Smith" },
          { id: 23, category: "Ansible Configuration", level: "medio", question: "¿Cuál es el archivo de configuración principal de Ansible?", options: ["/etc/ansible/ansible.cfg", "/etc/ansible.cfg", "~/.ansible.cfg", "Todas las anteriores"], correctAnswer: 3, explanation: "Ansible busca su configuración en varios lugares en orden de prioridad: 1) archivo especificado por ANSIBLE_CONFIG, 2) ~/.ansible.cfg, 3) ./ansible.cfg, 4) /etc/ansible/ansible.cfg.", command: "ansible --version" },
          { id: 24, category: "Ansible Modules", level: "medio", question: "¿Qué módulo Ansible se utiliza para copiar archivos?", options: ["copy", "file", "template", "synchronize"], correctAnswer: 0, explanation: "El módulo copy de Ansible se utiliza para copiar archivos desde la máquina de control al nodo gestionado. Puede manejar contenido inline o archivos existentes.", command: "ansible webservers -m copy -a 'src=/etc/hosts dest=/tmp/hosts'" },
          { id: 25, category: "HA Cluster", level: "avanzado", question: "¿Qué componente es fundamental en un cluster de alta disponibilidad en RHEL?", options: ["Pacemaker", "Corosync", "pcs", "Todos los anteriores"], correctAnswer: 3, explanation: "Un cluster HA en RHEL requiere Pacemaker (gestor de recursos), Corosync (capa de comunicación) y pcs (herramienta de configuración). Todos trabajan conjuntamente.", command: "pcs status" },
          { id: 26, category: "SELinux Ports", level: "avanzado", question: "¿Qué comando permite que Apache escuche en un puerto no estándar según SELinux?", options: ["semanage port -a -t http_port_t -p tcp 8080", "setsebool -P httpd_port_t 8080", "chcon -t http_port_t :8080", "audit2allow -p httpd 8080"], correctAnswer: 0, explanation: "semanage port -a añade un puerto al tipo SELinux especificado. Esto permite que servicios como Apache puedan escuchar en puertos no estándar sin violaciones de SELinux.", command: "semanage port -a -t http_port_t -p tcp 8080" },
          { id: 27, category: "Systemd Drop-in", level: "medio", question: "¿Dónde se colocan los archivos de personalización de unidades systemd?", options: ["/etc/systemd/system/unit.service.d/", "/etc/systemd/system/unit.service/", "/usr/lib/systemd/system/unit.service.d/", "/run/systemd/system/unit.service.d/"], correctAnswer: 0, explanation: "Los archivos de personalización (drop-in) se colocan en /etc/systemd/system/nombreunidad.service.d/. Estos archivos permiten modificar configuraciones sin alterar el archivo de unidad original.", command: "mkdir /etc/systemd/system/httpd.service.d/" },
          { id: 28, category: "DNF Modules", level: "medio", question: "¿Qué comando se utiliza para instalar un módulo DNF específico?", options: ["dnf module install nodejs:16/minimal", "dnf install nodejs:16", "dnf install-module nodejs:16", "dnf module enable nodejs:16 && dnf install nodejs"], correctAnswer: 0, explanation: "Para instalar un módulo DNF específico con un perfil particular, se utiliza dnf module install seguido de nombre:stream/profile. Esto instala los paquetes asociados al perfil especificado.", command: "dnf module install nodejs:16/minimal" },
          { id: 29, category: "Network Bonding", level: "medio", question: "¿Qué tipo de bonding proporciona tolerancia a fallos con dos interfaces de red?", options: ["balance-rr", "active-backup", "broadcast", "802.3ad"], correctAnswer: 1, explanation: "El modo active-backup proporciona tolerancia a fallos activando solo una interfaz a la vez. Si la interfaz activa falla, automáticamente se cambia a la de respaldo.", command: "nmcli con add type bond con-name bond0 ifname bond0 mode active-backup" },
          { id: 30, category: "Time Sync", level: "medio", question: "¿Qué comando verifica la sincronización de tiempo en un sistema RHEL?", options: ["timedatectl", "chronyc sources", "ntpq -p", "Todas las anteriores"], correctAnswer: 3, explanation: "Todos estos comandos pueden verificar la sincronización de tiempo. timedatectl muestra el estado general, chronyc sources muestra las fuentes de tiempo, y ntpq -p muestra peers NTP.", command: "timedatectl status" },
          { id: 31, category: "Package Signing", level: "medio", question: "¿Qué comando verifica la firma RPM de un paquete?", options: ["rpm -K package.rpm", "rpm --checksig package.rpm", "rpm -q --signatures package.rpm", "Todas las anteriores"], correctAnswer: 3, explanation: "Todas estas opciones verifican las firmas RPM. La opción -K es la forma abreviada de --checksig, y -q --signatures consulta las firmas de paquetes instalados.", command: "rpm -K package.rpm" },
          { id: 32, category: "Kernel Modules", level: "medio", question: "¿Qué comando carga un módulo del kernel en tiempo de ejecución?", options: ["modprobe module_name", "insmod module_name", "lsmod module_name", "depmod module_name"], correctAnswer: 0, explanation: "modprobe carga módulos del kernel y maneja automáticamente las dependencias. insmod también carga módulos pero no resuelve dependencias automáticamente.", command: "modprobe vboxdrv" },
          { id: 33, category: "Process Priority", level: "medio", question: "¿Qué valor de nice da la máxima prioridad a un proceso en Linux?", options: ["-20", "-10", "0", "19"], correctAnswer: 0, explanation: "El valor de nice varía de -20 a 19. -20 es la máxima prioridad (solo root puede asignar valores negativos), mientras que 19 es la mínima prioridad.", command: "nice -n -10 command" },
          { id: 34, category: "File Attributes", level: "medio", question: "¿Qué comando establece el atributo immutable en un archivo?", options: ["chattr +i filename", "chmod 700 filename", "chown root filename", "lsattr filename"], correctAnswer: 0, explanation: "chattr +i establece el atributo immutable, lo que previene que el archivo sea modificado, borrado o renombrado, incluso por root (excepto con chattr -i).", command: "chattr +i /important/file" },
          { id: 35, category: "Audit Rules", level: "avanzado", question: "¿Dónde se configuran las reglas de auditoría permanentes en RHEL?", options: ["/etc/audit/rules.d/audit.rules", "/etc/audit/audit.rules", "/etc/auditd.conf", "/var/lib/audit/rules.conf"], correctAnswer: 0, explanation: "Las reglas de auditoría permanentes se configuran en archivos dentro de /etc/audit/rules.d/. Estas reglas persisten tras reinicios del sistema.", command: "cat /etc/audit/rules.d/audit.rules" },
          { id: 36, category: "System Logging", level: "medio", question: "¿Qué servicio reemplaza a rsyslog en la gestión de logs en RHEL 8/9?", options: ["systemd-journald", "rsyslog aún se utiliza", "syslog-ng", "El sistema no tiene servicio de logs"], correctAnswer: 1, explanation: "Aunque systemd-journald maneja el registro estructurado, rsyslog sigue siendo el servicio de logging tradicional en RHEL 8/9, encargándose de la persistencia y envío de logs.", command: "systemctl status rsyslog" },
          { id: 37, category: "Boot Process", level: "medio", question: "¿Qué comando muestra los objetivos (targets) disponibles en systemd?", options: ["systemctl list-units --type=target", "systemctl get-default", "systemctl list-targets", "ls /usr/lib/systemd/system/*.target"], correctAnswer: 0, explanation: "systemctl list-units --type=target muestra todos los targets disponibles en el sistema. Los targets son grupos de unidades que representan estados del sistema.", command: "systemctl list-units --type=target" },
          { id: 38, category: "Performance Tuning", level: "medio", question: "¿Qué herramienta se utiliza para aplicar perfiles de optimización del sistema?", options: ["tuned-adm", "perf", "tuning-profiles", "sysctl"], correctAnswer: 0, explanation: "tuned-adm se utiliza para aplicar perfiles de optimización del sistema. tuned es el servicio que aplica estos perfiles para mejorar el rendimiento según el caso de uso.", command: "tuned-adm list" },
          { id: 39, category: "Virtualization", level: "medio", question: "¿Qué comando verifica si la virtualización está habilitada en el hardware?", options: ["egrep -c '(vmx|svm)' /proc/cpuinfo", "virt-host-validate", "lsmod | grep kvm", "lscpu | grep Virtualization"], correctAnswer: 0, explanation: "Este comando busca las extensiones de virtualización Intel VT-x (vmx) o AMD-V (svm) en /proc/cpuinfo. Un valor mayor que 0 indica que la virtualización está habilitada en el hardware.", command: "egrep -c '(vmx|svm)' /proc/cpuinfo" },
          { id: 40, category: "Storage Encryption", level: "avanzado", question: "¿Qué comando se utiliza para cifrar un dispositivo de bloque con LUKS?", options: ["cryptsetup luksFormat /dev/sdb1", "luksformat /dev/sdb1", "encrypt-device /dev/sdb1", "blockdev --encrypt /dev/sdb1"], correctAnswer: 0, explanation: "cryptsetup luksFormat es el comando estándar para cifrar un dispositivo de bloque con LUKS. Este proceso borra todos los datos existentes en el dispositivo.", command: "cryptsetup luksFormat /dev/sdb1" }
        ],
        concepts: [
          { title: "DNS y LDAP", description: "Configuración de servicios de directorio y resolución de nombres. Integración con directorios LDAP y DNS.", commands: ["dig example.com", "ldapsearch -x -b dc=example,dc=com", "ipa dnsrecord-add example.com server1 --a-rec 192.168.1.50", "nslookup example.com"], typicalError: "Confundir las herramientas de consulta DNS o no entender cómo autenticarse correctamente en LDAP.", checklist: ["Verificar resolución DNS con dig/nslookup", "Probar autenticación LDAP con ldapwhoami", "Configurar registros DNS en IdM", "Validar conectividad con servidores LDAP/DNS"] },
          { title: "Kerberos y Autenticación", description: "Implementación de autenticación centralizada con Kerberos. Gestión de tickets y principios.", commands: ["kinit user@EXAMPLE.COM", "klist", "kdestroy", "ipa user-add username"], typicalError: "No entender el concepto de realms o cómo obtener y gestionar tickets Kerberos correctamente.", checklist: ["Obtener tickets con kinit", "Verificar tickets activos con klist", "Crear usuarios en IdM", "Configurar clientes para autenticación Kerberos"] },
          { title: "Servicios de Tiempo", description: "Configuración de sincronización de tiempo con chronyd. Importante para autenticación y registro.", commands: ["timedatectl", "chronyc sources", "systemctl status chronyd", "chronyd -Q"], typicalError: "No asegurar que los servidores tienen el tiempo sincronizado, causando fallos en autenticación.", checklist: ["Verificar estado de chronyd", "Configurar servidores de tiempo", "Validar sincronización", "Ajustar zona horaria con timedatectl"] },
          { title: "Base de Datos", description: "Administración básica de MariaDB/MySQL. Creación de bases de datos, usuarios y permisos.", commands: ["mysql -u root -p", "CREATE DATABASE dbname;", "GRANT ALL PRIVILEGES ON dbname.* TO 'user'@'localhost';", "SHOW DATABASES;"], typicalError: "Otorgar permisos innecesariamente amplios o no especificar correctamente el host al crear usuarios.", checklist: ["Instalar y arrancar MariaDB", "Crear bases de datos y usuarios", "Asignar permisos apropiados", "Verificar conectividad con la base de datos"] },
          { title: "Servicios de Correo", description: "Configuración de Postfix como servidor SMTP. Gestión de aliases y relay.", commands: ["postconf -n", "systemctl status postfix", "mailq", "postalias /etc/aliases"], typicalError: "Configurar relay abierto permitiendo spam o no actualizar correctamente los aliases.", checklist: ["Configurar main.cf con parámetros básicos", "Definir relayhost si es necesario", "Actualizar aliases con newaliases", "Verificar conectividad SMTP"] },
          { title: "Compartición de Archivos", description: "Configuración de servicios NFS, Samba y FTP. Exportación e importación de recursos.", commands: ["exportfs -arv", "showmount -e server", "smbclient //server/share -U user", "mount -t nfs server:/export /mnt"], typicalError: "No especificar correctamente opciones de seguridad o permisos en exports/samba.", checklist: ["Configurar /etc/exports para NFS", "Crear usuarios Samba con smbpasswd", "Verificar conectividad con servicios", "Montar recursos compartidos"] },
          { title: "SELinux Avanzado", description: "Gestión avanzada de políticas SELinux. Booleanos, puertos y contextos personalizados.", commands: ["getsebool -a | grep service", "setsebool -P boolean_name on", "semanage port -a -t port_type -p tcp port", "audit2allow -a"], typicalError: "Desactivar SELinux completamente en lugar de configurarlo correctamente.", checklist: ["Identificar violaciones con ausearch", "Usar audit2allow para soluciones", "Configurar booleanos necesarios", "Añadir puertos y contextos personalizados"] },
          { title: "Firewall Avanzado", description: "Reglas ricas y zonas personalizadas en firewalld. Integración con servicios y aplicaciones.", commands: ["firewall-cmd --permanent --add-rich-rule='rule...'", "firewall-cmd --new-zone=custom", "firewall-cmd --info-zone=custom", "firewall-cmd --reload"], typicalError: "Crear reglas contradictorias o dejar puertos innecesarios abiertos.", checklist: ["Definir zonas según necesidades", "Crear reglas ricas para acceso específico", "Validar reglas con --list-all", "Aplicar cambios con --reload"] },
          { title: "Almacenamiento Avanzado", description: "Gestión avanzada de LVM, snapshots, Stratis y cifrado. Ampliación y optimización.", commands: ["lvcreate -s -L 1G -n snap_lv /dev/vg/lv", "stratis pool create poolname /dev/device", "cryptsetup luksFormat /dev/device", "lvs -o +data_percent,metadata_percent"], typicalError: "No dejar suficiente espacio para metadatos o crear snapshots demasiado pequeños.", checklist: ["Planificar pools Stratis", "Crear snapshots para backup", "Cifrar dispositivos sensibles", "Monitorear uso de espacio en VGs"] },
          { title: "Contenedores", description: "Gestión de contenedores con Podman. Registros, imágenes y redes personalizadas.", commands: ["podman run -d --name container image", "podman build -t image .", "podman push registry/image:tag", "podman network create custom-net"], typicalError: "No utilizar volúmenes para persistencia o exponer innecesariamente puertos.", checklist: ["Configurar registros en registries.conf", "Crear imágenes con Dockerfile", "Gestionar volúmenes para persistencia", "Publicar imágenes en registros"] },
          { title: "Automatización con Ansible", description: "Creación de playbooks y roles para automatización. Inventarios y variables.", commands: ["ansible-playbook playbook.yml", "ansible-inventory --list", "ansible-galaxy role init rolename", "ansible-doc module_name"], typicalError: "No usar roles reutilizables o hardcodear valores en lugar de usar variables.", checklist: ["Crear inventario con grupos", "Desarrollar playbooks modulares", "Utilizar roles para tareas comunes", "Validar con ansible-playbook --check"] },
          { title: "Clusters de Alta Disponibilidad", description: "Configuración de clusters con Pacemaker y Corosync. Recursos y restricciones.", commands: ["pcs status", "pcs resource create resource_name", "pcs constraint colocation add", "pcs property set stonith-enabled=false"], typicalError: "No configurar STONITH correctamente o crear restricciones contradictorias.", checklist: ["Instalar y configurar pcs", "Crear recursos para servicios", "Definir restricciones de ubicación", "Validar estado del cluster"] },
          { title: "Monitorización y Logs", description: "Análisis avanzado de logs con journalctl y rsyslog. Métricas del sistema.", commands: ["journalctl -u service --since '1 hour ago'", "rsyslog configuration in /etc/rsyslog.conf", "logrotate configuration", "journalctl --disk-usage"], typicalError: "No rotar logs adecuadamente causando problemas de espacio en disco.", checklist: ["Configurar retención de logs", "Crear reglas personalizadas en rsyslog", "Verificar espacio usado por journals", "Implementar envío remoto de logs"] },
          { title: "Seguridad del Sistema", description: "Endurecimiento del sistema. Auditoría, atributos de archivos y módulos del kernel.", commands: ["auditctl -w /path -p wa -k keyname", "chattr +i filename", "lsmod", "aureport --summary"], typicalError: "No auditar eventos críticos o proteger archivos importantes contra cambios.", checklist: ["Configurar reglas de auditoría críticas", "Proteger archivos del sistema con chattr", "Verificar módulos del kernel cargados", "Generar informes de auditoría"] },
          { title: "Optimización del Rendimiento", description: "Perfiles de rendimiento con tuned. Prioridades de procesos y afinidad CPU.", commands: ["tuned-adm list", "tuned-adm profile profile_name", "nice -n value command", "taskset -c cpu-list command"], typicalError: "Aplicar perfiles inadecuados para el caso de uso o modificar nice sin autorización.", checklist: ["Seleccionar perfil tuned apropiado", "Ajustar prioridades de procesos críticos", "Asignar procesos a CPUs específicas", "Monitorear impacto en el rendimiento"] }
        ],
        scenarios: [
          { id: 1, title: "Configurar servidor DNS con IdM", category: "DNS", difficulty: "medio", context: "Necesitas configurar un servidor DNS autoritativo para example.com utilizando IdM.", objective: "Crear registros DNS en IdM para servidores web, correo y base de datos.", steps: ["Autenticarse en IdM: kinit admin", "Crear registro A para web: ipa dnsrecord-add example.com www --a-rec 192.168.1.10", "Crear registro A para mail: ipa dnsrecord-add example.com mail --a-rec 192.168.1.20", "Crear registro MX: ipa dnsrecord-add example.com @ --mx-rec '0 mail.example.com.'", "Verificar resolución: dig www.example.com"], recommendedCommands: ["ipa dnsrecord-add example.com www --a-rec 192.168.1.10", "ipa dnsrecord-add example.com @ --mx-rec '0 mail.example.com.'", "dig example.com MX", "nslookup www.example.com"], validation: "Los registros deben resolverse correctamente con dig/nslookup. El registro MX debe apuntar al servidor de correo.", commonErrors: ["Olvidar el punto final en registros MX", "No autenticarse antes de usar comandos IPA", "Confundir @ con el símbolo de inicio de línea"] },
          { id: 2, title: "Integrar cliente Linux con IdM", category: "LDAP", difficulty: "medio", context: "Debes integrar un servidor RHEL con IdM para autenticación centralizada.", objective: "Configurar el cliente para autenticación LDAP/Kerberos y verificar el acceso.", steps: ["Instalar cliente IdM: dnf install ipa-client", "Configurar cliente: ipa-client-install --domain=example.com --realm=EXAMPLE.COM", "Crear usuario de prueba en IdM", "Probar autenticación: su - testuser", "Verificar grupos: id testuser"], recommendedCommands: ["ipa-client-install --domain=example.com --realm=EXAMPLE.COM", "sssctl domain-list", "getent passwd testuser", "kinit testuser"], validation: "El usuario debe poder autenticarse en el sistema y sus grupos deben ser visibles con el comando id.", commonErrors: ["No abrir puertos requeridos en firewall", "Errores en resolución DNS previa a la instalación", "No reiniciar servicios SSSD tras la configuración"] },
          { id: 3, title: "Configurar servidor MariaDB con acceso remoto", category: "Database", difficulty: "medio", context: "Necesitas configurar MariaDB para permitir conexiones remotas seguras desde aplicaciones web.", objective: "Instalar MariaDB, crear base de datos y usuario, y permitir conexiones remotas.", steps: ["Instalar MariaDB: dnf install mariadb-server", "Arrancar y habilitar: systemctl enable --now mariadb", "Ejecutar configuración inicial: mysql_secure_installation", "Crear base de datos: CREATE DATABASE webapp;", "Crear usuario: CREATE USER 'webuser'@'192.168.1.%' IDENTIFIED BY 'password';", "Otorgar permisos: GRANT ALL PRIVILEGES ON webapp.* TO 'webuser'@'192.168.1.%';", "Modificar bind-address en /etc/my.cnf", "Abrir firewall: firewall-cmd --permanent --add-service=mysql"], recommendedCommands: ["mysql -u root -p", "CREATE DATABASE webapp;", "CREATE USER 'webuser'@'192.168.1.%' IDENTIFIED BY 'password';", "GRANT ALL PRIVILEGES ON webapp.* TO 'webuser'@'192.168.1.%';"], validation: "Conexión exitosa desde cliente remoto y acceso a la base de datos con las credenciales creadas.", commonErrors: ["No modificar bind-address para escuchar en todas las interfaces", "Otorgar permisos con @'%' en lugar de rango específico", "Olvidar abrir puerto en firewall"] },
          { id: 4, title: "Configurar NFS con Kerberos", category: "NFS", difficulty: "avanzado", context: "Debes compartir un directorio mediante NFS con autenticación Kerberos para mayor seguridad.", objective: "Configurar servidor NFS seguro con Kerberos y montar en cliente.", steps: ["Configurar IdM y obtener tickets Kerberos", "Instalar nfs-utils y nfs-secure en ambos nodos", "Crear directorio compartido: mkdir /shared", "Configurar /etc/exports con opción sec=krb5", "Arrancar servicios NFS y nfs-secure", "En cliente, montar con: mount -t nfs -o sec=krb5 server:/shared /mnt/shared", "Verificar: ls /mnt/shared"], recommendedCommands: ["echo '/shared *(rw,sec=krb5)' >> /etc/exports", "systemctl enable --now nfs-server nfs-secure", "mount -t nfs -o sec=krb5 server.example.com:/shared /mnt/shared", "showmount -e server.example.com"], validation: "Montaje exitoso con seguridad Kerberos y acceso a archivos compartidos.", commonErrors: ["No sincronizar tiempo entre servidor y cliente", "Omitir configuración de nfs-secure en cliente", "Usar opciones de exportación inseguras"] },
          { id: 5, title: "Crear cluster de alta disponibilidad", category: "Clustering", difficulty: "avanzado", context: "Necesitas crear un cluster de dos nodos para servicio web con failover automático.", objective: "Configurar cluster con Pacemaker/Corosync y migrar servicio Apache entre nodos.", steps: ["Instalar pacemaker, corosync y pcs en ambos nodos", "Configurar autenticación con pcs host auth", "Crear cluster con pcs cluster setup", "Arrancar cluster: pcs cluster start --all", "Deshabilitar STONITH para entorno de prueba: pcs property set stonith-enabled=false", "Crear recurso IP flotante: pcs resource create virtual_ip IPaddr2 ip=192.168.1.100", "Crear recurso Apache: pcs resource create website apache configfile=/etc/httpd/conf/httpd.conf", "Crear restricción de colocación: pcs constraint colocation add website with virtual_ip INFINITY", "Verificar estado: pcs status"], recommendedCommands: ["pcs cluster setup clustername node1 node2", "pcs resource create virtual_ip IPaddr2 ip=192.168.1.100", "pcs resource create website apache configfile=/etc/httpd/conf/httpd.conf", "pcs constraint colocation add website with virtual_ip INFINITY"], validation: "Cluster activo con recursos en uno de los nodos. Servicio web accesible mediante IP flotante.", commonErrors: ["No deshabilitar STONITH en entornos de prueba", "Crear restricciones contradictorias", "No validar que servicios arranquen fuera del cluster primero"] },
          { id: 6, title: "Automatizar configuración con Ansible", category: "Automation", difficulty: "medio", context: "Debes configurar 10 servidores web idénticos usando Ansible.", objective: "Crear playbook que instale y configure Apache, firewall y contenido web.", steps: ["Crear inventario con grupo webservers", "Crear playbook que instale httpd: dnf install httpd", "Abrir servicio en firewall: firewall-cmd --permanent --add-service=http", "Copiar contenido web: copy module con index.html", "Habilitar e iniciar servicio: systemd module", "Ejecutar playbook: ansible-playbook -i inventory webconfig.yml"], recommendedCommands: ["ansible-playbook -i inventory webconfig.yml", "dnf install httpd", "firewall-cmd --permanent --add-service=http", "systemctl enable --now httpd"], validation: "Todos los servidores deben tener Apache instalado, firewall configurado y contenido web accesible.", commonErrors: ["No usar handlers para reiniciar servicios", "Hardcodear valores en lugar de usar variables", "No validar idempotencia del playbook"] },
          { id: 7, title: "Configurar contenedor con persistencia", category: "Containers", difficulty: "medio", context: "Necesitas ejecutar una aplicación web en contenedor con datos persistentes.", objective: "Crear imagen personalizada, ejecutar con volúmenes y exponer puerto.", steps: ["Crear Dockerfile con aplicación web", "Construir imagen: podman build -t webapp .", "Crear volumen para datos: podman volume create webdata", "Ejecutar contenedor con volumen: podman run -d --name web -p 8080:80 -v webdata:/var/www/html webapp", "Verificar: podman ps", "Probar acceso: curl http://localhost:8080"], recommendedCommands: ["podman build -t webapp .", "podman volume create webdata", "podman run -d --name web -p 8080:80 -v webdata:/var/www/html webapp", "podman exec -it web /bin/bash"], validation: "Contenedor ejecutándose con datos persistentes en volumen y aplicación accesible en puerto 8080.", commonErrors: ["No usar volúmenes para persistencia", "Exponer puertos innecesariamente", "No etiquetar imágenes apropiadamente"] },
          { id: 8, title: "Optimizar rendimiento de servidor web", category: "Performance", difficulty: "medio", context: "Un servidor web tiene problemas de rendimiento bajo carga alta.", objective: "Aplicar perfil de optimización y ajustar prioridades de procesos.", steps: ["Verificar perfil tuned actual: tuned-adm active", "Aplicar perfil throughput-performance: tuned-adm profile throughput-performance", "Identificar procesos apache con top", "Ajustar nice value de procesos no críticos: renice +5 PID", "Verificar configuración MPM de Apache", "Monitorear con vmstat/iostat", "Ajustar MaxRequestWorkers si es necesario"], recommendedCommands: ["tuned-adm profile throughput-performance", "top -p $(pgrep httpd)", "renice +5 -p PID", "httpd -V | grep -i mpm"], validation: "Mejora en tiempos de respuesta y mejor utilización de recursos del sistema.", commonErrors: ["Aplicar perfiles inadecuados para el workload", "Modificar nice sin comprender impacto", "No reiniciar servicios después de cambios"] },
          { id: 9, title: "Auditar accesos a archivo crítico", category: "Security", difficulty: "medio", context: "Necesitas auditar quién accede a un archivo de configuración sensible.", objective: "Configurar reglas de auditoría y generar informes de accesos.", steps: ["Agregar regla audit: auditctl -w /etc/secret.conf -p rwxa -k secret_access", "Hacer accesos de prueba al archivo", "Generar informe: ausearch -f /etc/secret.conf", "Generar resumen: aureport -k secret_access --summary", "Hacer regla persistente en /etc/audit/rules.d/"], recommendedCommands: ["auditctl -w /etc/secret.conf -p rwxa -k secret_access", "ausearch -f /etc/secret.conf", "aureport -k secret_access --summary", "echo '-w /etc/secret.conf -p rwxa -k secret_access' >> /etc/audit/rules.d/secret.rules"], validation: "Registro de accesos al archivo con detalles de quién, cuándo y cómo accedió.", commonErrors: ["No hacer reglas persistentes", "Usar permisos incorrectos en reglas audit", "No reiniciar servicio auditd para aplicar cambios"] },
          { id: 10, title: "Configurar backup con LVM snapshots", category: "Storage", difficulty: "medio", context: "Debes realizar backups consistentes de una base de datos en volumen LVM.", objective: "Crear snapshot LVM, montarlo y realizar backup del sistema de archivos.", steps: ["Verificar espacio libre en VG: vgs", "Crear snapshot: lvcreate -L 1G -s -n db_backup /dev/vg_database/lv_data", "Crear punto de montaje: mkdir /mnt/snapshot", "Montar snapshot: mount -o ro /dev/vg_database/db_backup /mnt/snapshot", "Realizar backup: tar czf /backup/database_$(date +%F).tar.gz /mnt/snapshot", "Desmontar y remover snapshot: umount /mnt/snapshot && lvremove /dev/vg_database/db_backup", "Verificar backup: tar tzf /backup/database_*.tar.gz | head"], recommendedCommands: ["lvcreate -L 1G -s -n db_backup /dev/vg_database/lv_data", "mount -o ro /dev/vg_database/db_backup /mnt/snapshot", "tar czf /backup/database_$(date +%F).tar.gz /mnt/snapshot", "lvremove /dev/vg_database/db_backup"], validation: "Backup creado correctamente sin interrupción del servicio de base de datos.", commonErrors: ["Snapshot demasiado pequeño para datos cambiantes", "No montar como solo lectura", "No remover snapshot después del backup ocupando espacio"] }
        ],
        practiceCommands: [
          { id: 1, category: "DNS", title: "dig - Consultar registros DNS", command: "dig example.com MX", prompt: "[root@server ~]#", description: "Consulta registros MX para un dominio específico.", usage: "dig [@server] [name] [type]", examples: ["dig example.com","dig @8.8.8.8 example.com","dig example.com MX","dig -x 192.168.1.1"], simulatedOutput: `; <<>> DiG 9.11.4-P2-RedHat-9.11.4-26.P2.el8 <<>> example.com MX
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;example.com.                   IN      MX

;; ANSWER SECTION:
example.com.            3600    IN      MX      10 mail.example.com.
example.com.            3600    IN      MX      20 backup.example.com.`, manPage: `DIG(1)                          User Commands                          DIG(1)

NAME
       dig - DNS lookup utility

SYNOPSIS
       dig [@server] [name] [type] [class] [queryopt...]

DESCRIPTION
       dig is a flexible tool for interrogating DNS name servers.

       -x     Simplified reverse lookups, for mapping addresses to names.
       -t     Specify the query type (A, MX, NS, etc.)
       @server Specify the nameserver to query

EXAMPLES
       dig example.com
           Look up the A record for example.com.

       dig example.com MX
           Look up MX records for example.com.

       dig -x 192.168.1.1
           Reverse DNS lookup for IP address.

SEE ALSO
       host(1), nslookup(1), named(8)` },
          { id: 2, category: "LDAP", title: "ldapsearch - Buscar en directorio LDAP", command: "ldapsearch -x -b dc=example,dc=com '(uid=john)' cn mail", prompt: "[root@server ~]#", description: "Busca el usuario john en LDAP y muestra sus atributos cn y mail.", usage: "ldapsearch [options] [filter] [attributes...]", examples: ["ldapsearch -x -b dc=example,dc=com '(uid=*)'","ldapsearch -LLL -x -b dc=example,dc=com '(uid=john)'","ldapsearch -H ldaps://ldap.example.com -x -b dc=example,dc=com '(objectClass=person)'"], simulatedOutput: `# extended LDIF
#
# LDAPv3
# base <dc=example,dc=com> with scope subtree
# filter: (uid=john)
# requesting: cn mail
#

# john, People, example.com
dn: uid=john,ou=People,dc=example,dc=com
cn: John Smith
mail: john@example.com

# search result
search: 2
result: 0 Success

# numResponses: 2
# numEntries: 1`, manPage: `LDAPSEARCH(1)               LDAP Search Commands               LDAPSEARCH(1)

NAME
       ldapsearch - LDAP search tool

SYNOPSIS
       ldapsearch [OPTION]... [filter [attrs...]]

DESCRIPTION
       ldapsearch opens a connection to an LDAP server, binds, and performs a
       search using specified parameters.

       -x     Simple authentication (default is SASL).
       -b     Base DN for search.
       -LLL   Output in LDIF format without comments/version.

EXAMPLES
       ldapsearch -x -b dc=example,dc=com '(uid=john)'
           Search for user john with all attributes.

       ldapsearch -x -b dc=example,dc=com '(objectClass=person)' cn mail
           Search for persons and return only cn and mail attributes.

SEE ALSO
       ldapadd(1), ldapdelete(1), ldapmodify(1)` },
          { id: 3, category: "Kerberos", title: "kinit - Obtener ticket Kerberos", command: "kinit user@EXAMPLE.COM", prompt: "[root@server ~]#", description: "Obtiene e inicializa credenciales Kerberos para el usuario especificado.", usage: "kinit [principal]", examples: ["kinit user@EXAMPLE.COM","kinit -k -t user.keytab user@EXAMPLE.COM","kinit -l 12h user@EXAMPLE.COM"], simulatedOutput: `Password for user@EXAMPLE.COM: *********
Authenticated to realm EXAMPLE.COM`, manPage: `KINIT(1)                    Kerberos Applications                    KINIT(1)

NAME
       kinit - obtain and cache Kerberos ticket-granting ticket

SYNOPSIS
       kinit [options] [principal]

DESCRIPTION
       kinit obtains and caches an initial ticket-granting ticket for principal.

       principal
           Principal name in the format user@REALM.

       -k     Use keytab file instead of password.
       -t     Keytab file name.
       -l     Lifetime of the ticket.

EXAMPLES
       kinit user@EXAMPLE.COM
           Obtain ticket with password authentication.

       kinit -k -t user.keytab user@EXAMPLE.COM
           Obtain ticket using keytab file.

SEE ALSO
       klist(1), kdestroy(1), ktutil(1)` },
          { id: 4, category: "MariaDB", title: "mysql - Cliente MariaDB", command: "mysql -u root -p -e 'SHOW DATABASES;'", prompt: "[root@server ~]#", description: "Conecta a MariaDB y ejecuta comando SHOW DATABASES.", usage: "mysql [options] [database]", examples: ["mysql -u root -p","mysql -u user -p database -e 'SELECT * FROM table;'","mysql -h remote.host -u user -p"], simulatedOutput: `Enter password: ********
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| webapp             |
+--------------------+`, manPage: `MYSQL(1)                    MySQL Database Client                    MYSQL(1)

NAME
       mysql - the MySQL command-line tool

SYNOPSIS
       mysql [options] [database]

DESCRIPTION
       mysql is a simple SQL shell with input line editing capabilities.

       -u, --user=name     User for login if not current user.
       -p, --password[=name] Prompt for password.
       -e, --execute=name  Execute command and quit.
       -h, --host=name     Connect to host.

EXAMPLES
       mysql -u root -p
           Connect to local MySQL server as root.

       mysql -u user -p database -e 'SHOW TABLES;'
           Execute command and exit.

SEE ALSO
       mysqld(8), mysqldump(1)` },
          { id: 5, category: "Postfix", title: "postconf - Configuración de Postfix", command: "postconf -n", prompt: "[root@server ~]#", description: "Muestra parámetros de configuración de Postfix con valores no predeterminados.", usage: "postconf [options] [parameter...]", examples: ["postconf -n","postconf myhostname","postconf -e 'parameter = value'"], simulatedOutput: `alias_database = hash:/etc/aliases
alias_maps = hash:/etc/aliases
command_directory = /usr/sbin
config_directory = /etc/postfix
daemon_directory = /usr/libexec/postfix
data_directory = /var/lib/postfix
debug_peer_list = 192.168.1.5
home_mailbox = Maildir/
inet_interfaces = all
mydestination = $myhostname, localhost.$mydomain, localhost
myhostname = mail.example.com
mynetworks = 192.168.1.0/24, 127.0.0.0/8`, manPage: `POSTCONF(5)                 Postfix Configuration                 POSTCONF(5)

NAME
       postconf - Postfix configuration utility

SYNOPSIS
       postconf [options] [parameter ...]

DESCRIPTION
       By default, postconf displays the values of main.cf configuration parameters.

       -n     Show only parameters that have explicit name=value settings.
       -e     Edit the main.cf configuration file.
       -d     Show default parameter values.

EXAMPLES
       postconf -n
           Show non-default configuration parameters.

       postconf myhostname
           Show the value of myhostname parameter.

       postconf -e 'myhostname = mail.example.com'
           Set myhostname parameter in main.cf.

SEE ALSO
       postconf(5), master(5), postfix(1)` },
          { id: 6, category: "Samba", title: "smbclient - Cliente SMB/CIFS", command: "smbclient //server/share -U user", prompt: "[root@server ~]#", description: "Conecta a un recurso compartido SMB/CIFS solicitando nombre de usuario.", usage: "smbclient //server/service [options]", examples: ["smbclient //server/share -U user","smbclient -L server","smbclient //server/share -N"], simulatedOutput: `Enter WORKGROUP\\\\user's password: ********
Try "help" to get a list of possible commands.
smb: \\> ls
  .                                   D        0  Wed Jan 15 10:00:00 2024
  ..                                  D        0  Wed Jan 15 09:00:00 2024
  document.pdf                        A  1048576  Wed Jan 15 10:00:00 2024

                10485760 blocks of size 1024. 5242880 blocks available
smb: \\> quit`, manPage: `SMBCLIENT(1)                Samba Suite Utilities               SMBCLIENT(1)

NAME
       smbclient - ftp-like client to access SMB/CIFS resources on servers

SYNOPSIS
       smbclient //server/service [options]

DESCRIPTION
       smbclient is a client that can 'talk' to an SMB/CIFS server.

       //server/service  The service to connect to.
       -U username      Sets the SMB username.
       -L server        List services available on server.
       -N               Suppress password prompt.

EXAMPLES
       smbclient //server/share -U user
           Connect to share with authentication.

       smbclient -L server
           List shares available on server.

SEE ALSO
       smbd(8), smb.conf(5), nmbd(8)` },
          { id: 7, category: "iSCSI", title: "iscsiadm - Gestión iSCSI", command: "iscsiadm -m discovery -t sendtargets -p 192.168.1.100", prompt: "[root@server ~]#", description: "Descubre destinos iSCSI disponibles en la dirección IP especificada.", usage: "iscsiadm -m mode [mode specific options]", examples: ["iscsiadm -m discovery -t sendtargets -p IP","iscsiadm -m node -T target -p IP --login","iscsiadm -m session"], simulatedOutput: `192.168.1.100:3260,1 iqn.2003-01.org.linux-iscsi.server:storage
192.168.1.100:3260,1 iqn.2003-01.org.linux-iscsi.server:backup`, manPage: `ISCSIADM(8)                    Linux Administrator's Guide                    ISCSIADM(8)

NAME
       iscsiadm - open-iscsi administration utility

SYNOPSIS
       iscsiadm -m mode [mode specific options]

DESCRIPTION
       iscsiadm is a command-line tool to manage (update, delete, insert, etc.)
       the iSCSI database.

       -m, --mode=mode
           Specifies the mode. Relevant modes are discovery, node, session, iface.

       discovery mode options:
       -t, --type=type      Type of discovery (sendtargets).
       -p, --portal=IP[:port] IP address and optional port of portal.

EXAMPLES
       iscsiadm -m discovery -t sendtargets -p 192.168.1.100
           Discover iSCSI targets on IP.

       iscsiadm -m node -T iqn.target:name -p IP --login
           Log into specific target.

SEE ALSO
       iscsid(8), iscsi(8)` },
          { id: 8, category: "FTP", title: "ftp - Cliente FTP", command: "ftp ftp.example.com", prompt: "[student@workstation ~]$ ", description: "Conecta al servidor FTP especificado.", usage: "ftp [host [port]]", examples: ["ftp ftp.example.com","ftp -n ftp.example.com","~/.netrc file for automatic login"], simulatedOutput: `Connected to ftp.example.com.
220 (vsFTPd 3.0.3)
Name (ftp.example.com:user): user
331 Please specify the password.
Password: ********
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||54321|)
150 Here comes the directory listing.
-rw-r--r--    1 0        0            1024 Jan 15 10:00 file.txt
226 Directory send OK.
ftp> quit
221 Goodbye.`, manPage: `FTP(1)                         User Commands                         FTP(1)

NAME
       ftp - ARPANET file transfer program

SYNOPSIS
       ftp [host [port]]

DESCRIPTION
       ftp is the standard File Transfer Protocol client.

       host   Host name or IP address of FTP server.
       port   Port number to connect to.

INTERACTIVE COMMANDS
       ls [remotedir [localfile]] List contents of remote directory.
       get remote-file [local-file] Retrieve file.
       put local-file [remote-file] Send file.
       cd remote-directory      Change remote working directory.
       lcd local-directory      Change local working directory.
       quit                     Terminate ftp session.

EXAMPLES
       ftp ftp.example.com
           Connect to FTP server.

       ftp> ls
           List files in current directory.

       ftp> get file.txt
           Download file.txt.

SEE ALSO
       sftp(1), scp(1), vsftpd(8)` }
        ],
        consoleMissions: [
          { id: 1, title: "Configurar registros DNS en IdM", category: "DNS", prompt: "[root@server ~]#", mission: "Agrega un registro DNS A para 'web' apuntando a 192.168.1.50 en el dominio example.com usando IdM.", hints: ["Usa ipa dnsrecord-add","El formato es: ipa dnsrecord-add ZONA REGISTRO --TIPO valor","Necesitas autenticarte primero con kinit admin","Prueba con: man ipa"], validCommands: ["ipa dnsrecord-add example.com web --a-rec 192.168.1.50","kinit admin && ipa dnsrecord-add example.com web --a-rec 192.168.1.50"], manPages: { "ipa": `IPA(1)                          FreeIPA                          IPA(1)

NAME
       ipa - The Identity, Policy and Audit system

SYNOPSIS
       ipa [options] COMMAND

DESCRIPTION
       IPA is an integrated security information management solution.

       dnsrecord-add - Add DNS record
           ipa dnsrecord-add ZONE NAME --TYPE value

       EXAMPLE
           ipa dnsrecord-add example.com web --a-rec 192.168.1.50

SEE ALSO
       ipa-dns(1), named(8)` }, successMessage: "✓ Registro DNS A para web.example.com creado correctamente.", simulatedOutput: `  Record name: web
  A record: 192.168.1.50` },
          { id: 2, title: "Crear snapshot LVM", category: "Storage", prompt: "[root@server ~]#", mission: "Crea un snapshot LVM de 1GB llamado 'db_snapshot' del volumen lógico '/dev/vg_data/lv_db'.", hints: ["Usa lvcreate con la opción -s","Especifica el tamaño con -L","El formato es: lvcreate -L tamaño -s -n nombre_snap lv_origen","Prueba con: man lvcreate"], validCommands: ["lvcreate -L 1G -s -n db_snapshot /dev/vg_data/lv_db","lvcreate --size 1G --snapshot --name db_snapshot /dev/vg_data/lv_db"], manPages: { "lvcreate": `LVCREATE(8)                    LVM2 Manual                    LVCREATE(8)

NAME
       lvcreate - create a logical volume in an existing volume group

SYNOPSIS
       lvcreate [OPTIONS] VG_NAME

OPTIONS
       -L, --size Size[m|UNIT]
           Gives the size to allocate for the new logical volume.

       -l, --extents Number[PERCENT]
           Gives the number of logical extents to allocate.

       -n, --name String
           The name for the new logical volume.

       -s, --snapshot
           Creates a snapshot logical volume.

EXAMPLES
       lvcreate -L 1G -s -n db_snapshot /dev/vg_data/lv_db
           Create a 1GB snapshot of lv_db.

SEE ALSO
       vgcreate(8), lvextend(8), lvs(8)` }, successMessage: "✓ Snapshot LVM 'db_snapshot' de 1GB creado correctamente.", simulatedOutput: `  Logical volume "db_snapshot" created.` },
          { id: 3, title: "Configurar acceso NFS con Kerberos", category: "NFS", prompt: "[root@server ~]#", mission: "Modifica /etc/exports para exportar /shared con seguridad Kerberos solo a client.example.com.", hints: ["Edita /etc/exports","Usa la opción sec=krb5","Formato: directorio cliente(opciones)","Aplica cambios con exportfs -arv","Prueba con: man exports"], validCommands: ["echo '/shared client.example.com(rw,sec=krb5)' >> /etc/exports && exportfs -arv","exportfs -arv # (después de editar /etc/exports manualmente)"], manPages: { "exports": `EXPORTS(5)                   File Formats Manual                   EXPORTS(5)

NAME
       exports - NFS server export table

DESCRIPTION
       The file /etc/exports serves as the access control list for NFS exports.

FORMAT
       dir host(options)
       
       Common options:
       rw        Allow read/write access
       ro        Allow only read access
       sync      Reply to requests only after changes are committed
       sec=      Security mode (sys, krb5, krb5i, krb5p)

EXAMPLES
       /shared client.example.com(rw,sec=krb5)
           Export /shared to client with Kerberos security.

SEE ALSO
       exportfs(8), nfsd(8)` }, successMessage: "✓ Directorio /shared exportado con seguridad Kerberos.", simulatedOutput: `  exporting client.example.com:/shared` },
          { id: 4, title: "Crear usuario en IdM", category: "LDAP", prompt: "[root@server ~]#", mission: "Crea un usuario en IdM llamado 'jdoe' con nombre 'John' y apellido 'Doe'.", hints: ["Usa ipa user-add","Parámetros: --first=Nombre --last=Apellido","Necesitas estar autenticado como admin","Prueba con: man ipa-user"], validCommands: ["ipa user-add jdoe --first=John --last=Doe","kinit admin && ipa user-add jdoe --first=John --last=Doe"], manPages: { "ipa-user": `IPA-USER(1)                     FreeIPA                     IPA-USER(1)

NAME
       ipa-user - Manage users and groups

SYNOPSIS
       ipa user-add [OPTIONS...] UID

DESCRIPTION
       Add a new user.

       UID                User ID (login)
       --first=FIRST      First name
       --last=LAST        Last name
       --email=EMAIL      Email address

EXAMPLES
       ipa user-add jdoe --first=John --last=Doe
           Create user jdoe with name John Doe.

SEE ALSO
       ipa(1), sssd(8)` }, successMessage: "✓ Usuario 'jdoe' creado correctamente en IdM.", simulatedOutput: `-------------------
Added user "jdoe"
-------------------
  User login: jdoe
  First name: John
  Last name: Doe
  Full name: John Doe
  Display name: John Doe
  Initials: JD
  Home directory: /home/jdoe
  GECOS: John Doe
  Login shell: /bin/sh
  Principal name: jdoe@EXAMPLE.COM
  Principal alias: jdoe@EXAMPLE.COM
  Email address: jdoe@example.com
  UID: 12345
  GID: 12345
  Password: False
  Member of groups: ipausers
  Kerberos keys available: False` },
          { id: 5, title: "Configurar firewall para MariaDB", category: "Firewall", prompt: "[root@server ~]#", mission: "Abre permanentemente el servicio MariaDB en firewalld y recarga la configuración.", hints: ["Usa firewall-cmd","Añade el servicio mysql (nombre para MariaDB)","Haz los cambios permanentes","Recarga para aplicar cambios","Prueba con: man firewall-cmd"], validCommands: ["firewall-cmd --permanent --add-service=mysql && firewall-cmd --reload","firewall-cmd --permanent --add-service=mysql; firewall-cmd --reload"], manPages: { "firewall-cmd": `FIREWALL-CMD(1)                    firewalld                    FIREWALL-CMD(1)

NAME
       firewall-cmd - firewalld command line client

SYNOPSIS
       firewall-cmd [OPTIONS...]

DESCRIPTION
       firewall-cmd is the command line client of the firewalld daemon.

       --permanent
           Make the change permanent. Changes are applied after reload.

       --add-service=service
           Add a service to the default zone permanently or temporarily.

       --reload
           Reload firewalld and apply permanent changes.

       --list-services
           List services in the default zone.

EXAMPLES
       firewall-cmd --permanent --add-service=mysql
           Open MariaDB service permanently.

       firewall-cmd --reload
           Apply permanent changes.

SEE ALSO
       firewalld(1), firewall-config(1)` }, successMessage: "✓ Servicio MariaDB abierto permanentemente en firewall.", simulatedOutput: `success` },
          { id: 6, title: "Crear contenedor con Podman", category: "Containers", prompt: "[student@workstation ~]$ ", mission: "Ejecuta un contenedor nginx en modo detach con el nombre 'webserver' y mapea el puerto 8080 del host al 80 del contenedor.", hints: ["Usa podman run","Las opciones son -d para detach, --name para nombre","Mapeo de puertos con -p puerto_host:puerto_contenedor","nginx es el nombre de la imagen","Prueba con: man podman-run"], validCommands: ["podman run -d --name webserver -p 8080:80 nginx","podman run --detach --name webserver --publish 8080:80 nginx"], manPages: { "podman-run": `PODMAN-RUN(1)                    Podman Manual                    PODMAN-RUN(1)

NAME
       podman-run - Run a command in a new container

SYNOPSIS
       podman run [options] IMAGE [COMMAND [ARG...]]

DESCRIPTION
       Run a process in a new container from an image.

       -d, --detach
           Run container in background and print container ID.

       --name string
           Assign a name to the container.

       -p, --publish list
           Publish a container's port(s) to the host.

EXAMPLES
       podman run -d --name webserver -p 8080:80 nginx
           Run nginx container detached, named webserver, port 8080:80.

SEE ALSO
       podman(1), docker-run(1)` }, successMessage: "✓ Contenedor 'webserver' ejecutándose con nginx.", simulatedOutput: `Trying to pull registry.access.redhat.com/nginx:latest...
Getting image source signatures
Copying blob sha256:abcd1234...
Copying config sha256:efgh5678...
Writing manifest to image destination
Storing signatures
a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890ab` },
          { id: 7, title: "Crear tabla en MariaDB", category: "Database", prompt: "[root@server ~]#", mission: "Crea una tabla llamada 'employees' en la base de datos 'company' con campos id (INT, PK, AI), name (VARCHAR(50)) y email (VARCHAR(100)).", hints: ["Conéctate a MariaDB con mysql","Usa CREATE TABLE","Define PRIMARY KEY y AUTO_INCREMENT","Prueba con: man mysql"], validCommands: ["mysql -u root -p company -e 'CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), email VARCHAR(100));'","mysql -u root -p -e 'USE company; CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), email VARCHAR(100));'"], manPages: { "mysql": `MYSQL(1)                    MySQL Database Client                    MYSQL(1)

NAME
       mysql - the MySQL command-line tool

SYNOPSIS
       mysql [options] [database]

DESCRIPTION
       mysql is a simple SQL shell with input line editing capabilities.

       -u, --user=name     User for login if not current user.
       -p, --password[=name] Prompt for password.
       -e, --execute=name  Execute command and quit.
       -h, --host=name     Connect to host.

SQL SYNTAX
       CREATE TABLE table_name (
           column1 datatype constraints,
           column2 datatype constraints,
           ...
       );

       Constraints:
       PRIMARY KEY    Unique identifier for each row
       AUTO_INCREMENT Automatically incrementing integer

EXAMPLES
       CREATE TABLE employees (
           id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(50),
           email VARCHAR(100)
       );

SEE ALSO
       mysqld(8), mysqldump(1)` }, successMessage: "✓ Tabla 'employees' creada correctamente en base de datos 'company'.", simulatedOutput: `` },
          { id: 8, title: "Aplicar perfil tuned", category: "Performance", prompt: "[root@server ~]#", mission: "Aplica el perfil 'latency-performance' de tuned para optimizar para baja latencia.", hints: ["Usa tuned-adm profile","Verifica perfiles disponibles con list","Perfil 'latency-performance' optimiza para baja latencia","Prueba con: man tuned-adm"], validCommands: ["tuned-adm profile latency-performance","tuned-adm profile latency-performance && tuned-adm active"], manPages: { "tuned-adm": `TUNED-ADM(8)                    Linux System Administration                    TUNED-ADM(8)

NAME
       tuned-adm - command line interface for tuned

SYNOPSIS
       tuned-adm [command] [command options]

DESCRIPTION
       tuned-adm is used to interact with tuned daemon.

       profile profile
           Switch to a specific static profile.

       list
           List all available profiles.

       active
           Show current active profile.

PROFILES
       latency-performance    Low latency, deterministic execution
       throughput-performance High throughput for disk and network
       virtual-guest          Optimize for virtual guests
       balanced               Balanced performance and power consumption

EXAMPLES
       tuned-adm profile latency-performance
           Apply low latency profile.

       tuned-adm active
           Show current active profile.

SEE ALSO
       tuned(8), tuned.conf(5)` }, successMessage: "✓ Aplicado perfil 'latency-performance' para baja latencia.", simulatedOutput: `  Trying to establish connection to tuned daemon...
  Connection established.
  Profile 'latency-performance' applied.` }
        ],
        livePracticeTasks: [
          { id: 1, title: "Crear registro DNS A", category: "DNS", task: "Agrega un registro DNS A para 'intranet' apuntando a 192.168.2.10 en example.com usando IdM.", hints: ["Usa ipa dnsrecord-add","Necesitas autenticarte primero","Formato: ipa dnsrecord-add zona registro --tipo valor","Prueba con: man ipa"], validCommands: ["kinit admin && ipa dnsrecord-add example.com intranet --a-rec 192.168.2.10","ipa dnsrecord-add example.com intranet --a-rec 192.168.2.10"], solution: "kinit admin && ipa dnsrecord-add example.com intranet --a-rec 192.168.2.10" },
          { id: 2, title: "Configurar cliente IdM", category: "LDAP", task: "Instala y configura cliente IdM para el dominio example.com y realm EXAMPLE.COM.", hints: ["Instala ipa-client","Usa ipa-client-install","Especifica dominio y realm","Prueba con: man ipa-client-install"], validCommands: ["dnf install ipa-client && ipa-client-install --domain=example.com --realm=EXAMPLE.COM","ipa-client-install --domain=example.com --realm=EXAMPLE.COM"], solution: "ipa-client-install --domain=example.com --realm=EXAMPLE.COM" },
          { id: 3, title: "Crear snapshot LVM", category: "Storage", task: "Crea un snapshot de 2GB llamado 'data_snap' del LV '/dev/vg_app/lv_data'.", hints: ["Usa lvcreate","Opciones: -L para tamaño, -s para snapshot, -n para nombre","Prueba con: man lvcreate"], validCommands: ["lvcreate -L 2G -s -n data_snap /dev/vg_app/lv_data","lvcreate --size 2G --snapshot --name data_snap /dev/vg_app/lv_data"], solution: "lvcreate -L 2G -s -n data_snap /dev/vg_app/lv_data" },
          { id: 4, title: "Exportar NFS seguro", category: "NFS", task: "Exporta /data a clients.example.com con seguridad Kerberos en /etc/exports.", hints: ["Edita /etc/exports","Formato: directorio cliente(opciones)","Usa sec=krb5 para Kerberos","Aplica con exportfs -arv"], validCommands: ["echo '/data clients.example.com(rw,sec=krb5)' >> /etc/exports && exportfs -arv","exportfs -arv # (tras editar manualmente /etc/exports)"], solution: "echo '/data clients.example.com(rw,sec=krb5)' >> /etc/exports && exportfs -arv" },
          { id: 5, title: "Configurar firewall para HTTPS", category: "Firewall", task: "Abre permanentemente el servicio HTTPS en firewalld y recarga la configuración.", hints: ["Usa firewall-cmd","--permanent para persistencia","--add-service=https","Recarga con --reload"], validCommands: ["firewall-cmd --permanent --add-service=https && firewall-cmd --reload","firewall-cmd --permanent --add-service=https; firewall-cmd --reload"], solution: "firewall-cmd --permanent --add-service=https && firewall-cmd --reload" },
          { id: 6, title: "Ejecutar contenedor Apache", category: "Containers", task: "Ejecuta un contenedor httpd en modo detach llamado 'website' mapeando puerto 8080:80.", hints: ["Usa podman run","-d para detach, --name para nombre","-p para mapeo de puertos","httpd es la imagen de Apache"], validCommands: ["podman run -d --name website -p 8080:80 httpd","podman run --detach --name website --publish 8080:80 httpd"], solution: "podman run -d --name website -p 8080:80 httpd" },
          { id: 7, title: "Crear base de datos", category: "Database", task: "Crea una base de datos llamada 'inventory' en MariaDB.", hints: ["Conéctate con mysql","Usa CREATE DATABASE","Asegúrate de tener privilegios","Prueba con: man mysql"], validCommands: ["mysql -u root -p -e 'CREATE DATABASE inventory;'","mysql -u root -p inventory"], solution: "mysql -u root -p -e 'CREATE DATABASE inventory;'" },
          { id: 8, title: "Crear usuario IdM", category: "LDAP", task: "Crea un usuario en IdM llamado 'asmith' con nombre 'Alice' y apellido 'Smith'.", hints: ["Usa ipa user-add","Requiere autenticación como admin","Parámetros: --first y --last","Prueba con: man ipa"], validCommands: ["kinit admin && ipa user-add asmith --first=Alice --last=Smith","ipa user-add asmith --first=Alice --last=Smith"], solution: "kinit admin && ipa user-add asmith --first=Alice --last=Smith" },
          { id: 9, title: "Aplicar perfil throughput", category: "Performance", task: "Aplica el perfil 'throughput-performance' de tuned para optimizar servidores.", hints: ["Usa tuned-adm profile","Perfil throughput-performance para servidores","Verifica con tuned-adm active","Prueba con: man tuned-adm"], validCommands: ["tuned-adm profile throughput-performance","tuned-adm profile throughput-performance && tuned-adm active"], solution: "tuned-adm profile throughput-performance" },
          { id: 10, title: "Crear tabla productos", category: "Database", task: "Crea tabla 'products' con campos id (INT,PK,AI), name (VARCHAR(100)), price (DECIMAL(10,2)).", hints: ["Conéctate a la base de datos","Usa CREATE TABLE","Define tipos y restricciones","Prueba con: man mysql"], validCommands: ["mysql -u root -p -e 'CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2));'","USE database; CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2));"], solution: "mysql -u root -p -e 'CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2));'" },
          { id: 11, title: "Configurar registro DNS MX", category: "DNS", task: "Agrega un registro MX para example.com apuntando a mail.example.com con prioridad 10.", hints: ["Usa ipa dnsrecord-add","Tipo de registro es --mx-rec","Formato: prioridad servidor","Prueba con: man ipa"], validCommands: ["ipa dnsrecord-add example.com @ --mx-rec '10 mail.example.com.'","kinit admin && ipa dnsrecord-add example.com @ --mx-rec '10 mail.example.com.'"], solution: "ipa dnsrecord-add example.com @ --mx-rec '10 mail.example.com.'" },
          { id: 12, title: "Crear volumen Podman", category: "Containers", task: "Crea un volumen Podman llamado 'webdata' para persistencia de datos web.", hints: ["Usa podman volume create","Especifica nombre del volumen","Prueba con: man podman-volume"], validCommands: ["podman volume create webdata","podman volume create --driver local webdata"], solution: "podman volume create webdata" },
          { id: 13, title: "Configurar autenticación Kerberos", category: "Kerberos", task: "Obtén un ticket Kerberos para el usuario 'admin' en el realm EXAMPLE.COM.", hints: ["Usa kinit","Formato: usuario@REALM","REALM debe estar en mayúsculas","Prueba con: man kinit"], validCommands: ["kinit admin@EXAMPLE.COM","kinit -V admin@EXAMPLE.COM"], solution: "kinit admin@EXAMPLE.COM" },
          { id: 14, title: "Crear pool Stratis", category: "Storage", task: "Crea un pool Stratis llamado 'datapool' usando el dispositivo /dev/sdb.", hints: ["Usa stratis pool create","Especifica nombre del pool","Indica dispositivo de bloque","Prueba con: man stratis"], validCommands: ["stratis pool create datapool /dev/sdb","stratis pool create --redundancy none datapool /dev/sdb"], solution: "stratis pool create datapool /dev/sdb" },
          { id: 15, title: "Configurar SELinux para NFS", category: "SELinux", task: "Permite que el servicio NFS exporte directorios con contexto personalizado.", hints: ["Usa setsebool","Booleano: nfs_export_all_rw","Hazlo persistente con -P","Prueba con: man setsebool"], validCommands: ["setsebool -P nfs_export_all_rw on","setsebool -P nfs_export_all_ro off"], solution: "setsebool -P nfs_export_all_rw on" }
        ]
      }
};
