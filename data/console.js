// ============================================================
// data/console.js
// ============================================================
// Misiones interactivas para la Consola Viva del examen RHCSA EX200.
// El usuario escribe comandos y recibe feedback.
// Sustituye los DEMO por misiones reales del examen.
// ============================================================

const consoleMissions = [
  {
    id: 1, title: "Habilitar y arrancar un servicio", category: "Systemd",
    prompt: "[root@server ~]#",
    mission: "Habilita el servicio httpd para que inicie automáticamente en el arranque y arráncalo ahora mismo.",
    hints: ["Usa systemctl para gestionar servicios.","Necesitas dos acciones: enable y start.","Prueba con: man systemctl"],
    validCommands: ["systemctl enable --now httpd","systemctl enable httpd && systemctl start httpd"],
    manPages: { "systemctl": `SYSTEMCTL(1)                    systemctl                    SYSTEMCTL(1)\n\nNAME\n       systemctl - Control the systemd system and service manager\n\nSYNOPSIS\n       systemctl [OPTIONS...] COMMAND [NAME...]\n\nDESCRIPTION\n       systemctl may be used to introspect and control the state of the\n       systemd system and service manager.\n\n       start UNIT...     Start (activate) one or more units.\n       stop UNIT...      Stop (deactivate) one or more units.\n       enable UNIT...    Enable one or more units to start at boot.\n       --now             Also start or stop the unit after enabling/disabling.\n\nEXAMPLES\n       systemctl enable --now httpd\n           Enable httpd at boot and start it immediately.\n\nSEE ALSO\n       systemd(1), service(8)` },
    successMessage: "✓ Servicio httpd habilitado y arrancado correctamente.",
    simulatedOutput: `Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.`
  },
  {
    id: 2, title: "Configurar IP estática con nmcli", category: "Red",
    prompt: "[root@server ~]#",
    mission: "Configura la conexión 'eth1' con IP estática 192.168.1.50/24, gateway 192.168.1.1 y DNS 8.8.8.8. Luego actívala.",
    hints: ["Usa nmcli con modify para cambiar propiedades.","Las propiedades son ipv4.addresses, ipv4.gateway, ipv4.dns, ipv4.method.","Prueba con: man nmcli"],
    validCommands: ["nmcli con modify eth1 ipv4.addresses 192.168.1.50/24 ipv4.gateway 192.168.1.1 ipv4.dns 8.8.8.8 ipv4.method manual && nmcli con up eth1","nmcli con modify eth1 ipv4.addresses 192.168.1.50/24 && nmcli con modify eth1 ipv4.gateway 192.168.1.1 && nmcli con modify eth1 ipv4.dns 8.8.8.8 && nmcli con modify eth1 ipv4.method manual && nmcli con up eth1"],
    manPages: { "nmcli": `NMCLI(1)                        NetworkManager                        NMCLI(1)\n\nNAME\n       nmcli - command-line tool for controlling NetworkManager\n\nSYNOPSIS\n       nmcli [OPTIONS...] {general | networking | radio | connection | device | agent | monitor} [COMMAND] [ARGUMENTS...]\n\nDESCRIPTION\n       nmcli is a command-line tool for controlling NetworkManager.\n\n       con modify ID [SETTING.PROPERTY VALUE]...\n           Modify one or more properties in the connection profile.\n\n       con up ID\n           Activate a connection.\n\n       ipv4.addresses    IP address with prefix (e.g. 192.168.1.10/24)\n       ipv4.gateway      Default gateway\n       ipv4.dns          DNS servers (comma-separated)\n       ipv4.method       manual | auto (dhcp)\n\nEXAMPLES\n       nmcli con modify eth1 ipv4.addresses 192.168.1.50/24\n       nmcli con modify eth1 ipv4.gateway 192.168.1.1\n       nmcli con modify eth1 ipv4.dns 8.8.8.8\n       nmcli con modify eth1 ipv4.method manual\n       nmcli con up eth1\n\nSEE ALSO\n       NetworkManager(8), ip(8)` },
    successMessage: "✓ Conexión eth1 configurada con IP estática y activada.",
    simulatedOutput: `Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/5)`
  },
  {
    id: 3, title: "Crear un volumen lógico LVM", category: "Almacenamiento",
    prompt: "[root@server ~]#",
    mission: "Crea un volumen lógico de 2 GB llamado 'lv_docs' dentro del grupo de volúmenes 'vg_datos'.",
    hints: ["Primero necesitas un PV y un VG (asume que ya existen).","Usa lvcreate con la opción -L para tamaño y -n para nombre.","Prueba con: man lvcreate"],
    validCommands: ["lvcreate -L 2G -n lv_docs vg_datos","lvcreate --size 2G --name lv_docs vg_datos"],
    manPages: { "lvcreate": `LVCREATE(8)                    LVM2 Manual                    LVCREATE(8)\n\nNAME\n       lvcreate - create a logical volume in an existing volume group\n\nSYNOPSIS\n       lvcreate [OPTIONS] VG_NAME\n\nDESCRIPTION\n       lvcreate creates a new logical volume in a volume group.\n\n       -L, --size Size[m|UNIT]\n           Gives the size to allocate for the new logical volume.\n\n       -n, --name String\n           The name for the new logical volume.\n\n       -l, --extents Number[PERCENT]\n           Gives the number of logical extents to allocate.\n\nEXAMPLES\n       lvcreate -L 2G -n lv_docs vg_datos\n           Create a 2GB logical volume named lv_docs.\n\n       lvcreate -l 100%FREE -n lv_all vg_datos\n           Use all remaining free space.\n\nSEE ALSO\n       pvcreate(8), vgcreate(8), lvextend(8)` },
    successMessage: "✓ Volumen lógico lv_docs de 2 GB creado correctamente.",
    simulatedOutput: `Logical volume "lv_docs" created.`
  },
  {
    id: 4, title: "Cambiar contraseña de root en rd.break", category: "Recuperación",
    prompt: "sh-5.1#",
    mission: "Estás en modo rd.break. Ya hiciste chroot /sysroot. Ahora cambia la contraseña de root.",
    hints: ["El comando para cambiar contraseña es passwd.","Escribe 'passwd root' y luego la nueva contraseña.","Prueba con: man passwd"],
    validCommands: ["passwd root","passwd"],
    manPages: { "passwd": `PASSWD(1)                      User Commands                      PASSWD(1)\n\nNAME\n       passwd - update user's authentication tokens\n\nSYNOPSIS\n       passwd [OPTIONS] [USERNAME]\n\nDESCRIPTION\n       The passwd utility is used to update user's authentication token(s).\n\n       root can change any user's password. Regular users can only change\n       their own password.\n\n       When run without arguments, changes the current user's password.\n       When run with a username as argument, changes that user's password.\n\nEXAMPLES\n       passwd root\n           Change root's password.\n\n       passwd\n           Change current user's password.\n\nSEE ALSO\n       chpasswd(8), usermod(8), shadow(5)` },
    successMessage: "✓ Contraseña de root actualizada correctamente.",
    simulatedOutput: `Changing password for user root.\nNew password: ********\nRetype new password: ********\npasswd: all authentication tokens updated successfully.`
  },
  {
    id: 5, title: "Abrir puerto en firewalld", category: "Firewall",
    prompt: "[root@server ~]#",
    mission: "Abre permanentemente el puerto 8080/tcp en firewalld y recarga la configuración.",
    hints: ["Usa firewall-cmd con --permanent para que sea persistente.","Después de añadir la regla, debes recargar con --reload.","Prueba con: man firewall-cmd"],
    validCommands: ["firewall-cmd --permanent --add-port=8080/tcp && firewall-cmd --reload","firewall-cmd --permanent --add-port=8080/tcp; firewall-cmd --reload","firewall-cmd --permanent --add-port=8080/tcp","firewall-cmd --reload"],
    manPages: { "firewall-cmd": `FIREWALL-CMD(1)                    firewalld                    FIREWALL-CMD(1)\n\nNAME\n       firewall-cmd - firewalld command line client\n\nSYNOPSIS\n       firewall-cmd [OPTIONS...]\n\nDESCRIPTION\n       firewall-cmd is the command line client of the firewalld daemon.\n\n       --permanent\n           Make the change permanent. Changes are applied after reload.\n\n       --add-port=portid[-portid]/protocol\n           Add a port to the default zone.\n\n       --reload\n           Reload firewalld and apply permanent changes.\n\n       --list-all\n           List everything added for the default zone.\n\nEXAMPLES\n       firewall-cmd --permanent --add-port=8080/tcp\n           Open port 8080/tcp permanently.\n\n       firewall-cmd --reload\n           Apply permanent changes.\n\nSEE ALSO\n       firewalld(1), firewall-config(1)` },
    successMessage: "✓ Puerto 8080/tcp abierto permanentemente y firewalld recargado.",
    simulatedOutput: `success`
  },
  {
    id: 6, title: "Contexto SELinux persistente", category: "SELinux",
    prompt: "[root@server ~]#",
    mission: "Añade una regla de contexto SELinux persistente para que /webcontent y todo su contenido tenga el tipo httpd_sys_content_t.",
    hints: ["Usa semanage fcontext para reglas persistentes.","La expresión regular '/webcontent(/.*)?' cubre el directorio y su contenido.","Después usa restorecon -Rv para aplicar.","Prueba con: man semanage-fcontext"],
    validCommands: ["semanage fcontext -a -t httpd_sys_content_t '/webcontent(/.*)?' && restorecon -Rv /webcontent","semanage fcontext -a -t httpd_sys_content_t '/webcontent(/.*)?'; restorecon -Rv /webcontent"],
    manPages: { "semanage-fcontext": `SEMANAGE-FCONTEXT(8)           SELinux Policy           SEMANAGE-FCONTEXT(8)\n\nNAME\n       semanage-fcontext - SELinux Policy Management file context tool\n\nSYNOPSIS\n       semanage fcontext [OPTIONS] [-F file] file_spec\n\nDESCRIPTION\n       semanage is used to configure certain elements of SELinux policy.\n\n       -a, --add\n           Add a record of the specified object type.\n\n       -t, --type TYPE\n           SELinux type for the file context.\n\n       -m, --modify\n           Modify a record.\n\n       -d, --delete\n           Delete a record.\n\n       Regular expressions:\n           (/.*)?  matches the directory and all files/subdirectories.\n\nEXAMPLES\n       semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'\n           Add persistent context for web directory.\n\n       restorecon -Rv /web\n           Apply the context recursively.\n\nSEE ALSO\n       restorecon(8), chcon(1), setsebool(8)` },
    successMessage: "✓ Contexto SELinux persistente añadido y aplicado correctamente.",
    simulatedOutput: `Relabeled /webcontent from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0`
  },
  {
    id: 7, title: "Crear usuario con home y grupo wheel", category: "Usuarios",
    prompt: "[root@server ~]#",
    mission: "Crea el usuario 'developer' con directorio home, shell /bin/bash y añádelo al grupo wheel.",
    hints: ["Usa useradd con -m para crear home, -s para shell y -G para grupos.","El grupo wheel permite usar sudo.","Prueba con: man useradd"],
    validCommands: ["useradd -m -s /bin/bash -G wheel developer","useradd -m -G wheel -s /bin/bash developer"],
    manPages: { "useradd": `USERADD(8)                    System Management                    USERADD(8)\n\nNAME\n       useradd - create a new user or update default new user information\n\nSYNOPSIS\n       useradd [OPTIONS] LOGIN\n\nDESCRIPTION\n       useradd creates a new user account.\n\n       -m, --create-home\n           Create the user's home directory if it does not exist.\n\n       -s, --shell SHELL\n           The name of the user's login shell.\n\n       -G, --groups GROUP1[,GROUP2,...]\n           A list of supplementary groups.\n\n       -c, --comment COMMENT\n           Any text string, usually the full name.\n\nEXAMPLES\n       useradd -m -s /bin/bash -G wheel developer\n           Create user with home, bash shell and wheel group.\n\nSEE ALSO\n       usermod(8), passwd(1), groupadd(8)` },
    successMessage: "✓ Usuario 'developer' creado con home, bash y grupo wheel.",
    simulatedOutput: ``
  },
  {
    id: 8, title: "Programar tarea cron", category: "Tareas programadas",
    prompt: "[root@server ~]#",
    mission: "Programa una tarea cron que ejecute /usr/local/bin/backup.sh cada día a las 2:00 AM para el usuario root.",
    hints: ["Usa crontab -e para editar las tareas del usuario actual.","El formato es: minuto hora día mes día_semana comando","Prueba con: man crontab"],
    validCommands: ["crontab -e","echo '0 2 * * * /usr/local/bin/backup.sh' | crontab -"],
    manPages: { "crontab": `CRONTAB(1)                     User Commands                     CRONTAB(1)\n\nNAME\n       crontab - maintain crontab files for individual users\n\nSYNOPSIS\n       crontab [OPTIONS] [FILE]\n\nDESCRIPTION\n       crontab is the program used to install, deinstall or list the\n       tables used to drive the cron daemon.\n\n       -e     Edit the current crontab using the editor.\n       -l     List the current crontab.\n       -r     Remove the current crontab.\n\n       Format: minute hour day month weekday command\n       *      Any value\n       0-59   Minutes\n       0-23   Hours\n\nEXAMPLES\n       0 2 * * * /usr/local/bin/backup.sh\n           Run backup.sh every day at 2:00 AM.\n\n       */15 * * * * /usr/local/bin/monitor.sh\n           Run every 15 minutes.\n\nSEE ALSO\n       cron(8), at(1)` },
    successMessage: "✓ Tarea cron programada correctamente.",
    simulatedOutput: `no crontab for root - using an empty one\ncrontab: installing new crontab`
  },
  {
    id: 9, title: "Crear partición y formatear en XFS", category: "Almacenamiento",
    prompt: "[root@server ~]#",
    mission: "Crea una partición XFS en /dev/sdb1 (asume que /dev/sdb1 ya existe) y fórmatala.",
    hints: ["Usa mkfs.xfs para formatear.","Verifica con blkid después.","Prueba con: man mkfs.xfs"],
    validCommands: ["mkfs.xfs /dev/sdb1","mkfs -t xfs /dev/sdb1"],
    manPages: { "mkfs.xfs": `MKFS.XFS(8)                     System Manager                     MKFS.XFS(8)\n\nNAME\n       mkfs.xfs - construct an XFS filesystem\n\nSYNOPSIS\n       mkfs.xfs [OPTIONS] DEVICE\n\nDESCRIPTION\n       mkfs.xfs constructs an XFS filesystem by writing on a special\n       file using the values found in the arguments of the command line.\n\nEXAMPLES\n       mkfs.xfs /dev/sdb1\n           Create XFS filesystem on /dev/sdb1.\n\nSEE ALSO\n       xfs(5), mount(8), blkid(8)` },
    successOutput: `meta-data=/dev/sdb1              isize=512    agcount=4, agsize=65536 blks\n         =                       sectsz=512   attr=2, projid32bit=1\n         =                       crc=1        finobt=1, sparse=1, rmapbt=0\n         =                       reflink=1    bigtime=1 inobtcount=1\ndata     =                       bsize=4096   blocks=262144, imaxpct=25\n         =                       sunit=0      swidth=0 blks\nnaming   =version 2              bsize=4096   ascii-ci=0, ftype=1\nlog      =internal log           bsize=4096   blocks=2560, version=2\n         =                       sectsz=512   sunit=0 blks, lazy-count=1\nrealtime =none                   extsz=4096   blocks=0, rtextents=0\ndiscard=none`,
    successMessage: "✓ Filesystem XFS creado correctamente en /dev/sdb1.",
    simulatedOutput: `meta-data=/dev/sdb1              isize=512    agcount=4, agsize=65536 blks\n         =                       sectsz=512   attr=2, projid32bit=1\n         =                       crc=1        finobt=1, sparse=1, rmapbt=0\n         =                       reflink=1    bigtime=1 inobtcount=1\ndata     =                       bsize=4096   blocks=262144, imaxpct=25\n         =                       sunit=0      swidth=0 blks\nnaming   =version 2              bsize=4096   ascii-ci=0, ftype=1\nlog      =internal log           bsize=4096   blocks=2560, version=2\n         =                       sectsz=512   sunit=0 blks, lazy-count=1\nrealtime =none                   extsz=4096   blocks=0, rtextents=0\ndiscard=none`
  },
  {
    id: 10, title: "Montar por UUID en /etc/fstab", category: "Montajes",
    prompt: "[root@server ~]#",
    mission: "Añade /dev/sdb1 (UUID=abc123) al /etc/fstab para que se monte en /mnt/datos al arrancar.",
    hints: ["Usa echo para añadir la línea a /etc/fstab.","El formato es: UUID=xxx punto_montaje tipo opciones dump pass.","Prueba con: man fstab"],
    validCommands: ["echo 'UUID=abc123 /mnt/datos xfs defaults 0 0' >> /etc/fstab","echo '/dev/sdb1 /mnt/datos xfs defaults 0 0' >> /etc/fstab"],
    manPages: { "fstab": `FSTAB(5)                        File formats                        FSTAB(5)\n\nNAME\n       fstab - static information about the filesystems\n\nSYNOPSIS\n       /etc/fstab\n\nDESCRIPTION\n       The file fstab contains descriptive information about the filesystems.\n\n       Fields: fs_spec fs_file fs_vfstype fs_mntops fs_freq fs_passno\n\n       UUID=xxx   Use UUID instead of device name.\n       defaults   Use default mount options.\n       0 0        No dump, no fsck.\n\nEXAMPLES\n       UUID=abc123 /mnt/datos xfs defaults 0 0\n           Mount by UUID at boot.\n\nSEE ALSO\n       mount(8), blkid(8), uuid(1)` },
    successMessage: "✓ Entrada añadida a /etc/fstab correctamente.",
    simulatedOutput: ``
  }
];
