// ============================================================
// data/concepts.js
// ============================================================
// Conceptos clave para el examen RHCSA EX200.
// Sustituye los DEMO por contenido real del examen.
// ============================================================

const keyConcepts = [
  {
    title: "Usuarios y grupos",
    description: "Gestión de cuentas de usuario y grupos en RHEL. Crear, modificar, eliminar y configurar permisos de sudo.",
    commands: [
      "useradd -m -s /bin/bash -G wheel usuario",
      "usermod -aG wheel usuario",
      "passwd usuario",
      "chage -M 90 usuario",
      "id usuario",
      "visudo"
    ],
    typicalError: "Olvidar usar -a (append) en usermod -G, lo que elimina todos los grupos secundarios existentes del usuario.",
    checklist: [
      "Crear usuario con home y shell correctos",
      "Añadir a grupo wheel con -aG (no solo -G)",
      "Establecer contraseña con passwd",
      "Configurar expiración con chage",
      "Verificar con id usuario"
    ]
  },
  {
    title: "Permisos Linux",
    description: "Permisos tradicionales de Linux: lectura, escritura, ejecución. Bits especiales SUID, SGID y sticky bit.",
    commands: [
      "chmod 755 archivo",
      "chmod 2775 directorio",
      "chmod 1777 /tmp",
      "chown usuario:grupo archivo",
      "umask 0027"
    ],
    typicalError: "Confundir SUID (4) con SGID (2). SUID afecta a archivos ejecutables; SGID en directorios hace que los archivos nuevos hereden el grupo del directorio.",
    checklist: [
      "Verificar permisos con ls -l",
      "Usar chmod octal o simbólico",
      "Configurar SGID en directorios compartidos",
      "Ajustar umask para nuevos archivos",
      "Revisar propietario con chown"
    ]
  },
  {
    title: "SELinux",
    description: "Security-Enhanced Linux controla el acceso mediante contextos de seguridad. Un contexto incorrecto puede bloquear un servicio aunque los permisos Linux sean correctos.",
    commands: [
      "getenforce",
      "setenforce 1",
      "ls -Z",
      "semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'",
      "restorecon -Rv /web",
      "ausearch -m avc -ts recent"
    ],
    typicalError: "Configurar bien permisos y firewall, pero olvidar restaurar el contexto SELinux. El servicio no funciona y no se entiende por qué.",
    checklist: [
      "Revisar modo con getenforce",
      "Verificar contextos con ls -Z",
      "Añadir reglas persistentes con semanage fcontext",
      "Aplicar cambios con restorecon -Rv",
      "Consultar logs de denegación en /var/log/audit/audit.log"
    ]
  },
  {
    title: "Firewalld",
    description: "Firewall dinámico de RHEL. Gestiona zonas, servicios, puertos y reglas rich. Las reglas permanentes requieren reload.",
    commands: [
      "firewall-cmd --get-active-zones",
      "firewall-cmd --list-all",
      "firewall-cmd --permanent --add-service=http",
      "firewall-cmd --permanent --add-port=8080/tcp",
      "firewall-cmd --reload"
    ],
    typicalError: "Añadir una regla sin --permanent y reiniciar: la regla desaparece. O añadir con --permanent pero olvidar --reload para aplicar en la sesión actual.",
    checklist: [
      "Verificar zona activa",
      "Añadir reglas con --permanent",
      "Recargar con --reload",
      "Verificar con --list-all",
      "Comprobar conectividad"
    ]
  },
  {
    title: "Systemd",
    description: "Sistema de inicio y gestión de servicios de RHEL. Unidades, targets, timers, journal y logs.",
    commands: [
      "systemctl start|stop|restart|status servicio",
      "systemctl enable --now servicio",
      "systemctl list-units --type=service --state=failed",
      "systemctl mask servicio",
      "systemctl set-default multi-user.target"
    ],
    typicalError: "Habilitar un servicio con systemctl enable pero no iniciarlo. El servicio arrancará en el próximo boot, pero no está activo ahora.",
    checklist: [
      "Verificar estado con systemctl status",
      "Habilitar e iniciar con enable --now",
      "Revisar unidades fallidas",
      "Consultar logs con journalctl -u servicio",
      "Configurar target por defecto"
    ]
  },
  {
    title: "Redes",
    description: "Configuración de red con NetworkManager. Conexiones, IP estática, DNS, hostname persistente.",
    commands: [
      "nmcli con show --active",
      "nmcli con modify eth1 ipv4.addresses 192.168.1.10/24 ipv4.method manual",
      "nmcli con up eth1",
      "hostnamectl set-hostname server.example.com",
      "ip addr show"
    ],
    typicalError: "Configurar IP con nmcli pero olvidar ipv4.method manual, por lo que sigue usando DHCP y la IP estática no se aplica.",
    checklist: [
      "Identificar conexión activa",
      "Configurar IP, gateway, DNS",
      "Establecer método manual",
      "Activar conexión con con up",
      "Verificar con ip addr y ping"
    ]
  },
  {
    title: "Almacenamiento y particiones",
    description: "Crear particiones, formatear con XFS/ext4, montar y configurar /etc/fstab para montaje persistente.",
    commands: [
      "parted /dev/sdb mklabel gpt",
      "parted /dev/sdb mkpart primary xfs 0% 100%",
      "mkfs.xfs /dev/sdb1",
      "blkid /dev/sdb1",
      "mount UUID=xxx /mnt/data"
    ],
    typicalError: "Usar /dev/sdb1 en /etc/fstab en lugar de UUID. Si cambia el orden de los discos, el montaje falla o se monta en el dispositivo equivocado.",
    checklist: [
      "Crear partición con parted/fdisk",
      "Formatear con mkfs.xfs",
      "Obtener UUID con blkid",
      "Añadir a /etc/fstab con UUID",
      "Probar con mount -a"
    ]
  },
  {
    title: "LVM",
    description: "Logical Volume Manager permite gestionar almacenamiento de forma flexible: PV, VG, LV, extensión en caliente.",
    commands: [
      "pvcreate /dev/sdb1",
      "vgcreate vg_datos /dev/sdb1",
      "lvcreate -L 5G -n lv_web vg_datos",
      "lvextend -L +2G /dev/vg_datos/lv_web",
      "xfs_growfs /mnt/web"
    ],
    typicalError: "Extender el LV con lvextend pero olvidar expandir el filesystem. El LV tiene más espacio pero el filesystem sigue con el tamaño antiguo.",
    checklist: [
      "Crear PV, VG, LV",
      "Formatear y montar",
      "Extender LV con lvextend",
      "Expandir filesystem (xfs_growfs o resize2fs)",
      "Verificar con df -h y lvs"
    ]
  },
  {
    title: "Swap",
    description: "Creación y activación de espacio de intercambio (swap). Puede ser una partición o un archivo.",
    commands: [
      "mkswap /dev/sdc1",
      "swapon /dev/sdc1",
      "echo '/dev/sdc1 swap swap defaults 0 0' >> /etc/fstab",
      "dd if=/dev/zero of=/swapfile bs=1M count=2048",
      "mkswap /swapfile && swapon /swapfile"
    ],
    typicalError: "Crear un archivo swap pero olvidar ajustar los permisos a 600. Swap inseguro puede ser rechazado por el kernel.",
    checklist: [
      "Crear partición o archivo swap",
      "Formatear con mkswap",
      "Activar con swapon",
      "Añadir a /etc/fstab",
      "Verificar con swapon -s o free -h"
    ]
  },
  {
    title: "Repositorios y dnf",
    description: "Gestión de paquetes con dnf. Repositorios, instalación, actualización, grupos de paquetes.",
    commands: [
      "dnf repolist",
      "dnf install -y httpd",
      "dnf groupinstall 'Development Tools'",
      "dnf module list nodejs",
      "dnf clean all"
    ],
    typicalError: "Intentar instalar un paquete sin configurar repositorios. En el examen, puede ser necesario montar un DVD o configurar un repo local.",
    checklist: [
      "Verificar repositorios con dnf repolist",
      "Instalar paquetes con dnf install",
      "Usar grupos con dnf groupinstall",
      "Configurar repos en /etc/yum.repos.d/",
      "Actualizar caché si es necesario"
    ]
  },
  {
    title: "SSH",
    description: "Secure Shell para acceso remoto. Configuración de claves públicas, restricciones de root, puerto.",
    commands: [
      "ssh-keygen -t rsa -b 4096",
      "ssh-copy-id user@remote",
      "ssh -p 2222 user@remote",
      "scp archivo user@remote:/ruta",
      "# /etc/ssh/sshd_config: PermitRootLogin no"
    ],
    typicalError: "Generar clave SSH pero no copiarla al servidor con ssh-copy-id. El acceso sin contraseña no funciona hasta que la clave pública esté en ~/.ssh/authorized_keys.",
    checklist: [
      "Generar par de claves",
      "Copiar clave pública al servidor",
      "Verificar permisos de .ssh (700) y authorized_keys (600)",
      "Configurar sshd_config si es necesario",
      "Reiniciar sshd"
    ]
  },
  {
    title: "Cron, at y timers",
    description: "Programación de tareas periódicas con cron, tareas puntuales con at, y timers de systemd.",
    commands: [
      "crontab -e",
      "echo '0 2 * * * /usr/local/bin/backup.sh' | crontab -",
      "at now + 5 minutes",
      "systemctl list-timers --all",
      "systemctl enable backup.timer"
    ],
    typicalError: "Editar /etc/crontab directamente en lugar de usar crontab -e, cometiendo errores de formato o permisos.",
    checklist: [
      "Usar crontab -e para tareas de usuario",
      "Verificar formato: min hora día mes semana",
      "Usar at para tareas puntuales",
      "Crear timers systemd para tareas complejas",
      "Verificar ejecución con logs"
    ]
  },
  {
    title: "Logs con journalctl",
    description: "Sistema de logs de systemd. Consulta por servicio, tiempo, prioridad, kernel.",
    commands: [
      "journalctl -u httpd",
      "journalctl --since '1 hour ago'",
      "journalctl -k",
      "journalctl --disk-usage",
      "journalctl --vacuum-time=7d"
    ],
    typicalError: "Buscar logs en /var/log/messages cuando el servicio usa journald. journalctl -u servicio es la herramienta correcta.",
    checklist: [
      "Filtrar por servicio con -u",
      "Usar rangos de tiempo con --since/--until",
      "Ver logs del kernel con -k",
      "Gestionar espacio con --vacuum-time",
      "Usar -xe para ver errores recientes"
    ]
  },
  {
    title: "NFS y autofs",
    description: "Montaje de recursos de red. NFS para compartir directorios, autofs para montaje automático bajo demanda.",
    commands: [
      "showmount -e server",
      "mount server:/export /mnt/nfs",
      "# /etc/auto.master: /misc /etc/auto.misc",
      "# /etc/auto.misc: share -rw,sync server:/exported",
      "systemctl enable --now autofs"
    ],
    typicalError: "Configurar autofs pero olvidar activar el servicio. Los puntos de montaje no aparecen hasta que se accede a ellos y autofs está activo.",
    checklist: [
      "Verificar exportaciones con showmount",
      "Montar manualmente para probar",
      "Configurar /etc/auto.master",
      "Crear mapa de montajes",
      "Activar autofs"
    ]
  },
  {
    title: "Recuperación del sistema",
    description: "Recuperar acceso root olvidado mediante rd.break, modo rescue o DVD de instalación.",
    commands: [
      "# GRUB: añadir rd.break al kernel",
      "mount -o remount,rw /sysroot",
      "chroot /sysroot",
      "passwd root",
      "touch /.autorelabel"
    ],
    typicalError: "Cambiar la contraseña de root en rd.break pero olvidar touch /.autorelabel cuando SELinux está en enforcing. El sistema no arranca correctamente.",
    checklist: [
      "Editar GRUB y añadir rd.break",
      "Remontar /sysroot en rw",
      "Entrar en chroot",
      "Cambiar contraseña",
      "Forzar relabelado de SELinux"
    ]
  },
  {
    title: "Bash scripting básico",
    description: "Scripts de shell para automatizar tareas. Variables, condiciones, bucles, parámetros.",
    commands: [
      "#!/bin/bash",
      "echo $1 $2",
      "if [ -f /etc/passwd ]; then ... fi",
      "for f in *.txt; do echo $f; done",
      "chmod +x script.sh"
    ],
    typicalError: "Olvidar dar permisos de ejecución (chmod +x) al script. Al intentar ejecutarlo directamente sale 'Permission denied'.",
    checklist: [
      "Añadir shebang #!/bin/bash",
      "Usar variables y parámetros",
      "Verificar condiciones con if",
      "Dar permisos de ejecución",
      "Probar el script antes del examen"
    ]
  },
  {
    title: "Procesos",
    description: "Gestión de procesos en Linux. Listar, terminar, priorizar y monitorizar.",
    commands: [
      "ps aux | grep httpd",
      "top",
      "kill -9 PID",
      "pkill -f httpd",
      "nice -n 10 comando"
    ],
    typicalError: "Usar kill sin verificar el PID correcto. Es mejor usar pkill con el nombre del proceso para evitar matar procesos equivocados.",
    checklist: [
      "Listar procesos con ps o top",
      "Identificar PID correcto",
      "Usar kill o pkill según convenga",
      "Ajustar prioridad con nice/renice",
      "Verificar con systemctl si es un servicio"
    ]
  }
];
