// ============================================================
// data/questions.js
// ============================================================
// Preguntas tipo test para preparar el examen RHCSA EX200.
// Sustituye las DEMO por preguntas reales del examen.
// Añade nuevas preguntas siguiendo el mismo formato.
// ============================================================

const questions = [
  {
    id: 1,
    category: "Usuarios y grupos",
    level: "básico",
    question: "[DEMO] ¿Qué comando crea un usuario llamado 'developer' con directorio home y shell /bin/bash?",
    options: [
      "useradd -m -s /bin/bash developer",
      "adduser developer --home /bin/bash",
      "usermod -m -s /bin/bash developer",
      "groupadd developer"
    ],
    correctAnswer: 0,
    explanation: "[DEMO] useradd -m crea el home, -s establece la shell. adduser no existe en RHEL por defecto; usermod modifica usuarios existentes; groupadd crea grupos.",
    command: "useradd -m -s /bin/bash developer"
  },
  {
    id: 2,
    category: "Permisos Linux",
    level: "básico",
    question: "[DEMO] ¿Qué permisos octales asignan lectura, escritura y ejecución al propietario, solo lectura al grupo, y nada a otros?",
    options: [
      "755",
      "740",
      "644",
      "700"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] 7=rwx (propietario), 4=r (grupo), 0=--- (otros). 755 daría r-x al grupo, 644 es rw-r--r--, 700 excluye al grupo por completo.",
    command: "chmod 740 archivo"
  },
  {
    id: 3,
    category: "Sudo",
    level: "medio",
    question: "[DEMO] ¿Dónde se configura qué usuarios pueden usar sudo y qué comandos pueden ejecutar?",
    options: [
      "/etc/passwd",
      "/etc/sudoers y /etc/sudoers.d/",
      "/etc/group",
      "/etc/shadow"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] /etc/sudoers es el archivo principal de configuración de sudo. Se edita con visudo. /etc/sudoers.d/ permite configuraciones modulares.",
    command: "visudo"
  },
  {
    id: 4,
    category: "SELinux",
    level: "medio",
    question: "[DEMO] ¿Cuál es el modo de SELinux que registra violaciones pero no las bloquea?",
    options: [
      "Enforcing",
      "Permissive",
      "Disabled",
      "Restricted"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] Permissive registra denegaciones de acceso en los logs pero no bloquea las operaciones. Enforcing sí bloquea. Disabled desactiva SELinux por completo.",
    command: "setenforce 0 # cambia a Permissive temporalmente"
  },
  {
    id: 5,
    category: "Firewalld",
    level: "básico",
    question: "[DEMO] ¿Qué opción de firewall-cmd hace que una regla sea persistente tras reiniciar?",
    options: [
      "--reload",
      "--permanent",
      "--persistent",
      "--save"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] --permanent guarda la regla en la configuración persistente. Después se debe ejecutar --reload para aplicarla en la sesión actual.",
    command: "firewall-cmd --permanent --add-service=http"
  },
  {
    id: 6,
    category: "Systemd",
    level: "básico",
    question: "[DEMO] ¿Qué comando habilita un servicio para que arranque automáticamente en el boot y lo inicia inmediatamente?",
    options: [
      "systemctl start servicio",
      "systemctl enable --now servicio",
      "chkconfig servicio on",
      "service servicio enable"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] systemctl enable --now crea los enlaces simbólicos para el arranque automático y ejecuta start en la misma operación. chkconfig es obsoleto en RHEL 7+.",
    command: "systemctl enable --now httpd"
  },
  {
    id: 7,
    category: "LVM",
    level: "medio",
    question: "[DEMO] ¿Cuál es el orden correcto para crear un volumen lógico desde cero?",
    options: [
      "pvcreate → vgcreate → lvcreate",
      "lvcreate → pvcreate → vgcreate",
      "vgcreate → pvcreate → lvcreate",
      "pvcreate → lvcreate → vgcreate"
    ],
    correctAnswer: 0,
    explanation: "[DEMO] Primero Physical Volume (pvcreate), luego Volume Group (vgcreate), y finalmente Logical Volume (lvcreate).",
    command: "pvcreate /dev/sdb1; vgcreate vg_datos /dev/sdb1; lvcreate -L 5G -n lv_web vg_datos"
  },
  {
    id: 8,
    category: "Particiones",
    level: "medio",
    question: "[DEMO] ¿Qué herramienta se usa en RHEL 9 para crear una partición GPT en un disco de más de 2 TB?",
    options: [
      "fdisk",
      "parted",
      "mkfs",
      "mount"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] parted soporta tablas de particiones GPT y discos de cualquier tamaño. fdisk tradicional está limitado a MBR (2TB). En RHEL 8+ fdisk también soporta GPT, pero parted es la herramienta preferida para GPT.",
    command: "parted /dev/sdb mklabel gpt; parted /dev/sdb mkpart primary xfs 0% 100%"
  },
  {
    id: 9,
    category: "Montajes persistentes",
    level: "medio",
    question: "[DEMO] ¿Qué campo de /etc/fstab indica el orden de verificación con fsck al arrancar?",
    options: [
      "dump",
      "pass",
      "options",
      "type"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] El último campo (pass) indica el orden de fsck. 0=no verificar, 1=raíz primero, 2=otros filesystems. dump es obsoleto.",
    command: "UUID=xxx /mnt/data xfs defaults 0 0"
  },
  {
    id: 10,
    category: "Redes",
    level: "medio",
    question: "[DEMO] ¿Qué comando de nmcli configura una conexión con IP estática, desactivando DHCP?",
    options: [
      "nmcli con modify eth1 ipv4.method auto",
      "nmcli con modify eth1 ipv4.method manual",
      "nmcli con modify eth1 ipv4.ignore-auto-dns yes",
      "nmcli con down eth1"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] ipv4.method manual desactiva DHCP y permite usar IP estática. auto activa DHCP. Después de configurar IP, gateway y DNS, se usa nmcli con up.",
    command: "nmcli con modify eth1 ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual"
  },
  {
    id: 11,
    category: "Repositorios y dnf",
    level: "básico",
    question: "[DEMO] ¿Qué comando instala un paquete y sus dependencias sin pedir confirmación?",
    options: [
      "dnf install httpd",
      "dnf install -y httpd",
      "dnf download httpd",
      "rpm -ivh httpd"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] dnf install -y responde automáticamente 'yes' a las confirmaciones. dnf download solo descarga el RPM. rpm -ivh no resuelve dependencias.",
    command: "dnf install -y httpd"
  },
  {
    id: 12,
    category: "SSH",
    level: "básico",
    question: "[DEMO] ¿Qué comando copia la clave pública SSH al servidor remoto para acceso sin contraseña?",
    options: [
      "ssh-copy-id user@remote",
      "scp id_rsa.pub user@remote:",
      "ssh-keygen -t rsa user@remote",
      "cat id_rsa.pub | ssh user@remote"
    ],
    correctAnswer: 0,
    explanation: "[DEMO] ssh-copy-id instala la clave pública en ~/.ssh/authorized_keys del servidor remoto. Es la forma más sencilla y segura.",
    command: "ssh-copy-id root@server.example.com"
  },
  {
    id: 13,
    category: "Cron, at y timers",
    level: "medio",
    question: "[DEMO] ¿Qué significa esta línea de crontab: 0 2 * * 1 /usr/local/bin/backup.sh?",
    options: [
      "Ejecutar todos los días a las 2:00",
      "Ejecutar los lunes a las 2:00",
      "Ejecutar el día 2 de cada mes",
      "Ejecutar cada 2 horas los lunes"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] minuto=0, hora=2, día_mes=*, mes=*, día_semana=1 (lunes). Por tanto, se ejecuta todos los lunes a las 2:00 AM.",
    command: "crontab -e # añadir: 0 2 * * 1 /usr/local/bin/backup.sh"
  },
  {
    id: 14,
    category: "Logs",
    level: "básico",
    question: "[DEMO] ¿Qué comando muestra los logs de un servicio específico desde la última hora?",
    options: [
      "tail -f /var/log/messages",
      "journalctl -u httpd --since '1 hour ago'",
      "dmesg | grep httpd",
      "systemctl logs httpd"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] journalctl -u filtra por unidad (servicio). --since permite rangos de tiempo relativos como '1 hour ago'. systemctl logs no existe.",
    command: "journalctl -u httpd --since '1 hour ago'"
  },
  {
    id: 15,
    category: "NFS y autofs",
    level: "avanzado",
    question: "[DEMO] ¿Qué archivo configura el punto de montaje automático con autofs para un recurso NFS?",
    options: [
      "/etc/fstab",
      "/etc/auto.master y /etc/auto.misc (o similar)",
      "/etc/exports",
      "/etc/nfs.conf"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] /etc/auto.master define el punto de montaje padre y el mapa a usar. El mapa (ej. /etc/auto.misc) define las subcarpetas y los recursos NFS. /etc/exports es para el servidor NFS.",
    command: "# /etc/auto.master:\n/misc /etc/auto.misc\n# /etc/auto.misc:\nshare -rw,sync server:/exported/path"
  },
  {
    id: 16,
    category: "Recuperación de root",
    level: "avanzado",
    question: "[DEMO] Durante la recuperación con rd.break, ¿qué paso permite escribir en /sysroot?",
    options: [
      "chroot /sysroot",
      "mount -o remount,rw /sysroot",
      "passwd root",
      "touch /.autorelabel"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] En rd.break, /sysroot está montado en modo solo lectura. mount -o remount,rw lo vuelve lectura/escritura para poder modificar archivos como /etc/shadow.",
    command: "mount -o remount,rw /sysroot"
  },
  {
    id: 17,
    category: "Bash scripting",
    level: "medio",
    question: "[DEMO] ¿Qué construcción de Bash ejecuta un bloque de código solo si un comando falla (código distinto de 0)?",
    options: [
      "cmd && echo 'éxito'",
      "cmd || echo 'fallo'",
      "if [ $? -eq 0 ]; then ... fi",
      "cmd ; echo 'siempre'"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] || es el operador OR lógico en Bash: ejecuta el segundo comando solo si el primero falla (retorna != 0). && ejecuta solo si tiene éxito.",
    command: "mkdir /datos || echo 'No se pudo crear el directorio'"
  },
  {
    id: 18,
    category: "Firewalld",
    level: "medio",
    question: "[DEMO] ¿Qué comando de firewall-cmd permite ver todas las reglas activas de la zona por defecto?",
    options: [
      "firewall-cmd --get-active-zones",
      "firewall-cmd --list-all",
      "firewall-cmd --list-services",
      "firewall-cmd --state"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] --list-all muestra la zona por defecto con todos sus servicios, puertos, reglas rich, interfaces... --get-active-zones solo lista zonas activas, no sus reglas.",
    command: "firewall-cmd --list-all"
  },
  {
    id: 19,
    category: "SELinux",
    level: "avanzado",
    question: "[DEMO] ¿Qué comando aplica permanentemente el contexto httpd_sys_content_t a /web y todo su contenido?",
    options: [
      "chcon -t httpd_sys_content_t /web",
      "semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?' && restorecon -Rv /web",
      "setsebool -P httpd_enable_homedirs on",
      "chmod 755 /web"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] semanage fcontext añade la regla a la base de datos persistente de SELinux. restorecon -Rv la aplica recursivamente. chcon es temporal (se pierde al restaurar).",
    command: "semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?' && restorecon -Rv /web"
  },
  {
    id: 20,
    category: "Almacenamiento",
    level: "medio",
    question: "[DEMO] ¿Qué comando extiende un volumen lógico LVM en caliente y luego expande el filesystem XFS?",
    options: [
      "lvextend -L +2G /dev/vg_datos/lv_docs && resize2fs /dev/vg_datos/lv_docs",
      "lvextend -L +2G /dev/vg_datos/lv_docs && xfs_growfs /mnt/docs",
      "lvresize -L +2G /dev/vg_datos/lv_docs && mkfs.xfs /dev/vg_datos/lv_docs",
      "vgextend vg_datos /dev/sdc1"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] lvextend aumenta el tamaño del LV. xfs_growfs expande el filesystem XFS sin desmontar. resize2fs es para ext2/3/4, no para XFS.",
    command: "lvextend -L +2G /dev/vg_datos/lv_docs && xfs_growfs /mnt/docs"
  },
  {
    id: 21,
    category: "Usuarios y grupos",
    level: "medio",
    question: "[DEMO] ¿Qué comando modifica un usuario existente para añadirlo al grupo wheel como grupo secundario?",
    options: [
      "usermod -aG wheel developer",
      "usermod -G wheel developer",
      "groupmod -a wheel developer",
      "useradd -G wheel developer"
    ],
    correctAnswer: 0,
    explanation: "[DEMO] usermod -aG añade (append) el grupo wheel sin eliminar los grupos secundarios actuales. -G sin -a reemplaza todos los grupos secundarios, lo cual es peligroso.",
    command: "usermod -aG wheel developer"
  },
  {
    id: 22,
    category: "Systemd",
    level: "medio",
    question: "[DEMO] ¿Qué comando crea un timer de systemd que ejecute /usr/local/bin/backup.sh cada día a las 3:00 AM?",
    options: [
      "systemctl timer add backup.timer",
      "Se crean dos archivos de unidad: backup.service y backup.timer",
      "crontab -e",
      "systemctl enable cron.timer"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] Los timers de systemd requieren dos unidades: un .service que define qué ejecutar, y un .timer que define cuándo. Se colocan en /etc/systemd/system/.",
    command: "# /etc/systemd/system/backup.timer:\n[Unit]\nDescription=Daily backup\n[Timer]\nOnCalendar=*-*-* 03:00:00\n[Install]\nWantedBy=timers.target"
  },
  {
    id: 23,
    category: "Redes",
    level: "básico",
    question: "[DEMO] ¿Qué comando muestra la configuración IP actual de todas las interfaces?",
    options: [
      "ifconfig -a",
      "ip addr show",
      "netstat -i",
      "nmcli con show"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] ip addr show (o ip a) es el comando moderno en RHEL para ver interfaces y direcciones IP. ifconfig está obsoleto. nmcli con show muestra conexiones, no interfaces.",
    command: "ip addr show"
  },
  {
    id: 24,
    category: "Permisos Linux",
    level: "avanzado",
    question: "[DEMO] ¿Qué bit especial hace que los archivos creados dentro de un directorio hereden el grupo del directorio?",
    options: [
      "SUID (4xxx)",
      "SGID (2xxx)",
      "Sticky bit (1xxx)",
      "ACL (setfacl)"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] SGID (Set Group ID, bit 2 en octal) en un directorio hace que los archivos nuevos hereden el grupo del directorio, no el grupo primario del usuario creador.",
    command: "chmod 2775 /compartido"
  },
  {
    id: 25,
    category: "Logs",
    level: "medio",
    question: "[DEMO] ¿Dónde se almacenan por defecto los logs de denegación de SELinux?",
    options: [
      "/var/log/secure",
      "/var/log/audit/audit.log",
      "/var/log/messages",
      "/var/log/dmesg"
    ],
    correctAnswer: 1,
    explanation: "[DEMO] /var/log/audit/audit.log contiene los registros de auditoría de SELinux, incluyendo las denegaciones AVC (Access Vector Cache). /var/log/messages también puede mostrar resúmenes.",
    command: "ausearch -m avc -ts recent"
  }
];
