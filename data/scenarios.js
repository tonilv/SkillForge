// ============================================================
// data/scenarios.js
// ============================================================
// Escenarios prácticos tipo examen RHCSA EX200.
// Sustituye los DEMO por escenarios reales del examen.
// ============================================================

const scenarios = [
  {
    id: 1,
    title: "Crear usuario con grupo secundario y permisos sudo",
    category: "Usuarios y grupos",
    difficulty: "básico",
    context: "Necesitas crear una cuenta para el desarrollador 'ana' con acceso administrativo mediante sudo.",
    objective: "Crear el usuario 'ana' con home, shell bash, grupo wheel y contraseña. Verificar que puede usar sudo.",
    steps: [
      "Crear usuario con home y shell: useradd -m -s /bin/bash ana",
      "Añadir al grupo wheel: usermod -aG wheel ana",
      "Establecer contraseña: passwd ana",
      "Verificar configuración: id ana",
      "Comprobar sudo: su - ana -c 'sudo whoami'"
    ],
    recommendedCommands: [
      "useradd -m -s /bin/bash ana",
      "usermod -aG wheel ana",
      "passwd ana",
      "id ana",
      "visudo # verificar %wheel ALL=(ALL) ALL"
    ],
    validation: "El usuario ana debe existir, pertenecer al grupo wheel y poder ejecutar sudo whoami.",
    commonErrors: [
      "Usar usermod -G wheel ana sin -a, eliminando otros grupos secundarios.",
      "Olvidar establecer contraseña con passwd.",
      "No verificar que %wheel esté descomentado en /etc/sudoers."
    ]
  },
  {
    id: 2,
    title: "Crear directorio compartido con permisos especiales",
    category: "Permisos",
    difficulty: "medio",
    context: "Necesitas un directorio /compartido donde todos los miembros del grupo 'dev' puedan crear y editar archivos.",
    objective: "Crear /compartido, asignar grupo 'dev', establecer SGID y permisos 2775. Verificar que archivos nuevos heredan el grupo.",
    steps: [
      "Crear grupo: groupadd dev",
      "Crear directorio: mkdir /compartido",
      "Cambiar grupo propietario: chown :dev /compartido",
      "Establecer SGID + permisos: chmod 2775 /compartido",
      "Verificar: ls -ld /compartido y crear un archivo de prueba"
    ],
    recommendedCommands: [
      "groupadd dev",
      "mkdir /compartido",
      "chown :dev /compartido",
      "chmod 2775 /compartido",
      "ls -ld /compartido"
    ],
    validation: "ls -ld debe mostrar drwxrwsr-x. Un archivo creado por cualquier usuario debe tener grupo 'dev'.",
    commonErrors: [
      "Olvidar SGID (chmod 775 sin el 2). Los archivos nuevos heredan el grupo primario del creador.",
      "No crear el grupo 'dev' antes de asignarlo.",
      "Confundir chown usuario:grupo con chown :grupo."
    ]
  },
  {
    id: 3,
    title: "Configurar IP estática con nmcli",
    category: "Redes",
    difficulty: "medio",
    context: "La interfaz eth1 debe tener IP estática 192.168.50.10/24, gateway 192.168.50.1 y DNS 8.8.8.8.",
    objective: "Configurar conexión eth1 con IP estática usando nmcli, activarla y verificar conectividad.",
    steps: [
      "Modificar IP: nmcli con modify eth1 ipv4.addresses 192.168.50.10/24",
      "Añadir gateway: nmcli con modify eth1 ipv4.gateway 192.168.50.1",
      "Añadir DNS: nmcli con modify eth1 ipv4.dns 8.8.8.8",
      "Deshabilitar DHCP: nmcli con modify eth1 ipv4.method manual",
      "Activar: nmcli con up eth1",
      "Verificar: ip addr show y ping 8.8.8.8"
    ],
    recommendedCommands: [
      "nmcli con modify eth1 ipv4.addresses 192.168.50.10/24",
      "nmcli con modify eth1 ipv4.gateway 192.168.50.1",
      "nmcli con modify eth1 ipv4.dns 8.8.8.8",
      "nmcli con modify eth1 ipv4.method manual",
      "nmcli con up eth1"
    ],
    validation: "ip addr show eth1 debe mostrar 192.168.50.10/24. ping a gateway y DNS debe funcionar.",
    commonErrors: [
      "Olvidar ipv4.method manual; la IP estática no se aplica porque sigue usando DHCP.",
      "No ejecutar nmcli con up tras modificar; los cambios no se aplican en caliente.",
      "Confundir la máscara: /24 no es lo mismo que /16."
    ]
  },
  {
    id: 4,
    title: "Cambiar hostname de forma persistente",
    category: "Redes",
    difficulty: "básico",
    context: "El servidor debe llamarse server1.ejemplo.com.",
    objective: "Cambiar el hostname de forma persistente y actualizar /etc/hosts para que resuelva a 127.0.0.1.",
    steps: [
      "Cambiar hostname: hostnamectl set-hostname server1.ejemplo.com",
      "Editar /etc/hosts: añadir '127.0.0.1 server1.ejemplo.com server1'",
      "Verificar: hostnamectl status",
      "Reiniciar para confirmar persistencia (opcional en examen)"
    ],
    recommendedCommands: [
      "hostnamectl set-hostname server1.ejemplo.com",
      "echo '127.0.0.1 server1.ejemplo.com server1' >> /etc/hosts",
      "hostnamectl status"
    ],
    validation: "hostnamectl debe mostrar server1.ejemplo.com. hostname -f debe resolver correctamente.",
    commonErrors: [
      "Usar hostname sin hostnamectl; el cambio no es persistente tras reiniciar.",
      "No actualizar /etc/hosts; algunos servicios fallan al no resolver el propio hostname.",
      "Olvidar reiniciar servicios que dependen del hostname."
    ]
  },
  {
    id: 5,
    title: "Crear partición, formatear y montarla en fstab",
    category: "Almacenamiento",
    difficulty: "medio",
    context: "Tienes un disco /dev/sdb sin particionar. Debes crear una partición, formatearla en XFS y montarla en /mnt/datos persistentemente.",
    objective: "Crear partición GPT en /dev/sdb, formatear en XFS, montar en /mnt/datos vía UUID en /etc/fstab.",
    steps: [
      "Crear tabla GPT: parted /dev/sdb mklabel gpt",
      "Crear partición: parted /dev/sdb mkpart primary xfs 0% 100%",
      "Formatear: mkfs.xfs /dev/sdb1",
      "Obtener UUID: blkid /dev/sdb1",
      "Crear punto de montaje: mkdir /mnt/datos",
      "Añadir a /etc/fstab: UUID=xxx /mnt/datos xfs defaults 0 0",
      "Probar: mount -a"
    ],
    recommendedCommands: [
      "parted /dev/sdb mklabel gpt",
      "parted /dev/sdb mkpart primary xfs 0% 100%",
      "mkfs.xfs /dev/sdb1",
      "blkid /dev/sdb1",
      "mkdir /mnt/datos",
      "mount -a"
    ],
    validation: "df -h /mnt/datos debe mostrar el filesystem. mount | grep /mnt/datos debe mostrar /dev/sdb1.",
    commonErrors: [
      "Usar /dev/sdb1 en fstab en lugar de UUID; el montaje puede fallar si cambian los nombres de dispositivo.",
      "No crear el punto de montaje antes de montar.",
      "Olvidar ejecutar mount -a para probar fstab sin reiniciar."
    ]
  },
  {
    id: 6,
    title: "Crear volumen lógico LVM y extenderlo",
    category: "LVM",
    difficulty: "medio",
    context: "Tienes /dev/sdc sin usar. Crea un PV, un VG vg_apps, un LV lv_web de 3 GB, fórmalo en XFS y monta en /var/www. Luego extiéndelo a 5 GB.",
    objective: "Crear LVM completo y extenderlo en caliente, expandiendo también el filesystem XFS.",
    steps: [
      "Crear PV: pvcreate /dev/sdc",
      "Crear VG: vgcreate vg_apps /dev/sdc",
      "Crear LV: lvcreate -L 3G -n lv_web vg_apps",
      "Formatear: mkfs.xfs /dev/vg_apps/lv_web",
      "Montar: mkdir /var/www; mount /dev/vg_apps/lv_web /var/www",
      "Añadir a fstab con /dev/mapper/vg_apps-lv_web",
      "Extender: lvextend -L 5G /dev/vg_apps/lv_web",
      "Expandir filesystem: xfs_growfs /var/www"
    ],
    recommendedCommands: [
      "pvcreate /dev/sdc",
      "vgcreate vg_apps /dev/sdc",
      "lvcreate -L 3G -n lv_web vg_apps",
      "mkfs.xfs /dev/vg_apps/lv_web",
      "lvextend -L 5G /dev/vg_apps/lv_web",
      "xfs_growfs /var/www"
    ],
    validation: "lvs debe mostrar lv_web con 5G. df -h /var/www debe reflejar el nuevo tamaño.",
    commonErrors: [
      "Extender el LV pero olvidar xfs_growfs. El filesystem sigue con el tamaño original.",
      "Usar resize2fs en lugar de xfs_growfs para XFS.",
      "No añadir a /etc/fstab; el montaje desaparece al reiniciar."
    ]
  },
  {
    id: 7,
    title: "Crear swap persistente",
    category: "Almacenamiento",
    difficulty: "medio",
    context: "Necesitas añadir 2 GB de swap usando un archivo /swapfile.",
    objective: "Crear archivo swap de 2 GB, activarlo y configurarlo en /etc/fstab para que sea persistente.",
    steps: [
      "Crear archivo: dd if=/dev/zero of=/swapfile bs=1M count=2048",
      "Permisos seguros: chmod 600 /swapfile",
      "Formatear: mkswap /swapfile",
      "Activar: swapon /swapfile",
      "Añadir a fstab: /swapfile swap swap defaults 0 0",
      "Verificar: swapon -s o free -h"
    ],
    recommendedCommands: [
      "dd if=/dev/zero of=/swapfile bs=1M count=2048",
      "chmod 600 /swapfile",
      "mkswap /swapfile",
      "swapon /swapfile",
      "echo '/swapfile swap swap defaults 0 0' >> /etc/fstab"
    ],
    validation: "swapon -s debe mostrar /swapfile. free -h debe mostrar swap aumentada.",
    commonErrors: [
      "Olvidar chmod 600 /swapfile. El kernel puede rechitar swap inseguro.",
      "No añadir a /etc/fstab; el swap desaparece al reiniciar.",
      "Usar count=2048 con bs=1M para 2GB, no count=2."
    ]
  },
  {
    id: 8,
    title: "Configurar servicio httpd con firewalld",
    category: "Firewalld",
    difficulty: "básico",
    context: "Instala y configura Apache (httpd). Debe estar activo y accesible a través del firewall.",
    objective: "Instalar httpd, iniciarlo, habilitarlo en el boot y abrir el servicio en firewalld.",
    steps: [
      "Instalar: dnf install -y httpd",
      "Iniciar y habilitar: systemctl enable --now httpd",
      "Abrir firewall: firewall-cmd --permanent --add-service=http",
      "Recargar firewall: firewall-cmd --reload",
      "Verificar: curl http://localhost"
    ],
    recommendedCommands: [
      "dnf install -y httpd",
      "systemctl enable --now httpd",
      "firewall-cmd --permanent --add-service=http",
      "firewall-cmd --reload",
      "curl http://localhost"
    ],
    validation: "systemctl status httpd debe estar active. curl debe devolver HTML de la página por defecto.",
    commonErrors: [
      "Olvidar --permanent en firewall-cmd; al reiniciar el puerto se cierra.",
      "No ejecutar --reload tras cambios permanentes.",
      "No habilitar httpd con systemctl enable; no arranca en el boot."
    ]
  },
  {
    id: 9,
    title: "Corregir contexto SELinux en ruta web",
    category: "SELinux",
    difficulty: "medio",
    context: "Has creado /webcontent para servir con Apache, pero SELinux bloquea el acceso. Los permisos Linux son correctos.",
    objective: "Diagnosticar el problema SELinux, añadir contexto persistente y aplicarlo.",
    steps: [
      "Verificar contexto: ls -Zd /webcontent",
      "Verificar logs: ausearch -m avc -ts recent",
      "Añadir regla persistente: semanage fcontext -a -t httpd_sys_content_t '/webcontent(/.*)?'",
      "Aplicar: restorecon -Rv /webcontent",
      "Verificar: ls -Zd /webcontent y curl http://localhost/webcontent"
    ],
    recommendedCommands: [
      "ls -Zd /webcontent",
      "ausearch -m avc -ts recent",
      "semanage fcontext -a -t httpd_sys_content_t '/webcontent(/.*)?'",
      "restorecon -Rv /webcontent"
    ],
    validation: "ls -Zd debe mostrar httpd_sys_content_t. curl debe acceder al contenido sin errores 403.",
    commonErrors: [
      "Usar chcon en lugar de semanage fcontext; el cambio es temporal y se pierde con restorecon.",
      "Olvidar la expresión regular (/.*)? que cubre subdirectorios.",
      "No revisar logs de SELinux para confirmar que el problema es de contexto."
    ]
  },
  {
    id: 10,
    title: "Permitir puerto no estándar con SELinux y firewalld",
    category: "SELinux + Firewalld",
    difficulty: "avanzado",
    context: "Apache debe escuchar en el puerto 8080. Necesitas abrir el puerto en firewalld y permitirlo en SELinux.",
    objective: "Configurar httpd en puerto 8080, abrir firewalld, permitir el puerto en SELinux y verificar acceso.",
    steps: [
      "Editar /etc/httpd/conf.d/listen.conf: Listen 8080",
      "Reiniciar httpd: systemctl restart httpd",
      "Abrir firewalld: firewall-cmd --permanent --add-port=8080/tcp",
      "Recargar firewalld: firewall-cmd --reload",
      "Permitir SELinux: semanage port -a -t http_port_t -p tcp 8080",
      "Verificar: curl http://localhost:8080"
    ],
    recommendedCommands: [
      "echo 'Listen 8080' > /etc/httpd/conf.d/listen.conf",
      "systemctl restart httpd",
      "firewall-cmd --permanent --add-port=8080/tcp",
      "firewall-cmd --reload",
      "semanage port -a -t http_port_t -p tcp 8080"
    ],
    validation: "ss -tlnp debe mostrar :8080. curl a localhost:8080 debe funcionar. getenforce debe estar enforcing.",
    commonErrors: [
      "Olvidar semanage port; SELinux bloquea httpd en 8080 aunque firewall esté abierto.",
      "No reiniciar httpd tras cambiar la configuración de puerto.",
      "Usar --permanent sin --reload en firewalld."
    ]
  },
  {
    id: 11,
    title: "Programar tarea con cron",
    category: "Tareas programadas",
    difficulty: "básico",
    context: "Necesitas que /usr/local/bin/backup.sh se ejecute todos los días a las 2:30 AM.",
    objective: "Programar la tarea en crontab de root y verificar que está configurada.",
    steps: [
      "Editar crontab: crontab -e",
      "Añadir línea: 30 2 * * * /usr/local/bin/backup.sh",
      "Verificar: crontab -l",
      "Asegurar que el script tiene permisos de ejecución: chmod +x /usr/local/bin/backup.sh"
    ],
    recommendedCommands: [
      "crontab -e",
      "30 2 * * * /usr/local/bin/backup.sh",
      "crontab -l",
      "chmod +x /usr/local/bin/backup.sh"
    ],
    validation: "crontab -l debe mostrar la línea. El script debe existir y ser ejecutable.",
    commonErrors: [
      "Usar /etc/crontab sin el formato correcto (requiere usuario).",
      "Olvidar permisos de ejecución del script.",
      "Error de formato: 2 30 en lugar de 30 2 (primero minutos, luego horas)."
    ]
  },
  {
    id: 12,
    title: "Crear timer básico de systemd",
    category: "Tareas programadas",
    difficulty: "medio",
    context: "Crea un timer de systemd que ejecute /usr/local/bin/cleanup.sh cada hora.",
    objective: "Crear unidad .service y .timer, habilitar el timer y verificar su estado.",
    steps: [
      "Crear /etc/systemd/system/cleanup.service con [Service] ExecStart=/usr/local/bin/cleanup.sh",
      "Crear /etc/systemd/system/cleanup.timer con [Timer] OnCalendar=hourly",
      "Recargar systemd: systemctl daemon-reload",
      "Habilitar timer: systemctl enable --now cleanup.timer",
      "Verificar: systemctl list-timers --all"
    ],
    recommendedCommands: [
      "systemctl daemon-reload",
      "systemctl enable --now cleanup.timer",
      "systemctl list-timers --all",
      "systemctl status cleanup.timer"
    ],
    validation: "systemctl list-timers debe mostrar cleanup.timer. systemctl status debe estar active (waiting).",
    commonErrors: [
      "Olvidar systemctl daemon-reload tras crear nuevas unidades.",
      "No habilitar el timer (solo el service).",
      "Error en OnCalendar (ej. OnCalendar=*:00 en lugar de hourly)."
    ]
  },
  {
    id: 13,
    title: "Configurar repositorio local con dnf",
    category: "Software",
    difficulty: "medio",
    context: "Montaste el DVD de RHEL en /mnt/dvd. Configura un repositorio local llamado 'dvd' para instalar paquetes sin internet.",
    objective: "Crear archivo .repo en /etc/yum.repos.d/ apuntando al DVD montado. Verificar con dnf repolist.",
    steps: [
      `Crear /etc/yum.repos.d/dvd.repo:\n[dvd]\nname=DVD Local\nbaseurl=file:///mnt/dvd/BaseOS\ngpgcheck=0\nenabled=1`,
      "Verificar: dnf repolist",
      "Probar: dnf list available | head",
      "Si hay AppStream, crear segunda sección o usar --setopt"
    ],
    recommendedCommands: [
      "dnf repolist",
      "dnf list available",
      "dnf install -y paquete"
    ],
    validation: "dnf repolist debe mostrar el repositorio 'dvd'. dnf install debe poder instalar paquetes.",
    commonErrors: [
      "Ruta incorrecta en baseurl; debe apuntar al directorio que contiene repodata/.",
      "Olvidar gpgcheck=0 cuando no hay clave GPG disponible.",
      "No montar el DVD antes de usar dnf."
    ]
  },
  {
    id: 14,
    title: "Montar recurso NFS",
    category: "NFS",
    difficulty: "medio",
    context: "El servidor nfs.ejemplo.com exporta /shared. Monta este recurso en /mnt/nfs de forma persistente.",
    objective: "Instalar nfs-utils, montar manualmente, añadir a /etc/fstab y verificar.",
    steps: [
      "Instalar cliente NFS: dnf install -y nfs-utils",
      "Crear punto de montaje: mkdir /mnt/nfs",
      "Montar manualmente: mount nfs.ejemplo.com:/shared /mnt/nfs",
      "Añadir a /etc/fstab: nfs.ejemplo.com:/shared /mnt/nfs nfs defaults 0 0",
      "Probar: mount -a; df -h /mnt/nfs"
    ],
    recommendedCommands: [
      "dnf install -y nfs-utils",
      "mount nfs.ejemplo.com:/shared /mnt/nfs",
      "echo 'nfs.ejemplo.com:/shared /mnt/nfs nfs defaults 0 0' >> /etc/fstab",
      "mount -a"
    ],
    validation: "df -h /mnt/nfs debe mostrar el recurso montado. Se debe poder leer/escribir según permisos.",
    commonErrors: [
      "No instalar nfs-utils; mount falla con 'nfs unknown filesystem type'.",
      "Olvidar añadir a /etc/fstab; el montaje no es persistente.",
      "No verificar que el servidor exporta el recurso con showmount -e."
    ]
  },
  {
    id: 15,
    title: "Configurar autofs",
    category: "NFS",
    difficulty: "avanzado",
    context: "Configura autofs para que /misc/nfs se monte automáticamente desde nfs.ejemplo.com:/shared cuando un usuario acceda a /misc/nfs.",
    objective: "Configurar /etc/auto.master, crear mapa /etc/auto.misc, activar autofs y probar.",
    steps: [
      "Editar /etc/auto.master: añadir /misc /etc/auto.misc",
      "Crear /etc/auto.misc: nfs -rw,sync nfs.ejemplo.com:/shared",
      "Activar autofs: systemctl enable --now autofs",
      "Probar: cd /misc/nfs; ls",
      "Verificar: df -h /misc/nfs"
    ],
    recommendedCommands: [
      "echo '/misc /etc/auto.misc' >> /etc/auto.master",
      "echo 'nfs -rw,sync nfs.ejemplo.com:/shared' > /etc/auto.misc",
      "systemctl enable --now autofs",
      "cd /misc/nfs; ls"
    ],
    validation: "cd /misc/nfs debe montar automáticamente. df -h debe mostrar el recurso NFS.",
    commonErrors: [
      "No activar autofs con systemctl enable --now.",
      "Error en el formato del mapa (olvidar las opciones -rw,sync).",
      "No crear /misc antes; autofs gestiona el punto padre, no la subcarpeta."
    ]
  },
  {
    id: 16,
    title: "Recuperar contraseña de root desde modo rescue",
    category: "Recuperación",
    difficulty: "avanzado",
    context: "Has olvidado la contraseña de root. El sistema usa SELinux en enforcing.",
    objective: "Usar rd.break para acceder al sistema, cambiar la contraseña de root y forzar relabelado de SELinux.",
    steps: [
      "Reiniciar, editar GRUB (e), añadir rd.break al kernel, arrancar (Ctrl+X)",
      "Remontar: mount -o remount,rw /sysroot",
      "Chroot: chroot /sysroot",
      "Cambiar contraseña: passwd root",
      "Forzar relabelado: touch /.autorelabel",
      "Salir: exit; exit"
    ],
    recommendedCommands: [
      "mount -o remount,rw /sysroot",
      "chroot /sysroot",
      "passwd root",
      "touch /.autorelabel",
      "exit"
    ],
    validation: "El sistema debe arrancar correctamente. Debe poder iniciar sesión como root con la nueva contraseña.",
    commonErrors: [
      "Olvidar touch /.autorelabel; SELinux impide el arranque porque /etc/shadow cambió.",
      "No hacer chroot /sysroot; passwd cambia la contraseña del initramfs, no del sistema real.",
      "No remontar /sysroot en rw; passwd falla al no poder escribir."
    ]
  },
  {
    id: 17,
    title: "Consultar logs con journalctl",
    category: "Logs",
    difficulty: "básico",
    context: "El servicio sshd está fallando. Necesitas ver los logs recientes para diagnosticar.",
    objective: "Usar journalctl para ver logs de sshd, filtrar por tiempo y prioridad.",
    steps: [
      "Ver logs del servicio: journalctl -u sshd",
      "Ver últimos errores: journalctl -u sshd -xe",
      "Filtrar por tiempo: journalctl -u sshd --since '30 min ago'",
      "Ver todo el boot actual: journalctl -b",
      "Limpiar logs antiguos: journalctl --vacuum-time=7d"
    ],
    recommendedCommands: [
      "journalctl -u sshd",
      "journalctl -u sshd -xe",
      "journalctl -u sshd --since '30 min ago'",
      "journalctl -b"
    ],
    validation: "Debe poder identificar el error en los logs y corregir la causa (ej. permisos, configuración).",
    commonErrors: [
      "Buscar en /var/log/messages en lugar de usar journalctl para servicios systemd.",
      "No usar -xe para ver explicaciones de errores.",
      "Olvidar --since para acotar la búsqueda."
    ]
  },
  {
    id: 18,
    title: "Activar servicio al arranque con systemctl",
    category: "Systemd",
    difficulty: "básico",
    context: "El servicio mariadb debe iniciar automáticamente cada vez que el sistema arranca.",
    objective: "Habilitar mariadb para el arranque y verificar que está activo.",
    steps: [
      "Habilitar e iniciar: systemctl enable --now mariadb",
      "Verificar estado: systemctl status mariadb",
      "Verificar que está enabled: systemctl is-enabled mariadb",
      "Comprobar que arranca en boot: ls -l /etc/systemd/system/multi-user.target.wants/mariadb.service"
    ],
    recommendedCommands: [
      "systemctl enable --now mariadb",
      "systemctl status mariadb",
      "systemctl is-enabled mariadb"
    ],
    validation: "systemctl is-enabled debe devolver 'enabled'. systemctl status debe mostrar active (running).",
    commonErrors: [
      "Usar systemctl start sin enable; el servicio no arranca en el próximo boot.",
      "Confundir enable con mask; mask impide totalmente el arranque.",
      "No verificar el estado tras habilitar."
    ]
  },
  {
    id: 19,
    title: "Crear script Bash simple con parámetros",
    category: "Bash",
    difficulty: "medio",
    context: "Crea un script /usr/local/bin/saluda.sh que reciba un nombre como parámetro y muestre 'Hola, nombre'.",
    objective: "Crear script con shebang, usar parámetro $1, dar permisos de ejecución y probar.",
    steps: [
      `Crear script:\n#!/bin/bash\necho "Hola, $1"`,
      "Dar permisos: chmod +x /usr/local/bin/saluda.sh",
      "Probar: /usr/local/bin/saluda.sh Mundo",
      "Verificar salida: Hola, Mundo"
    ],
    recommendedCommands: [
      `cat > /usr/local/bin/saluda.sh << 'EOF'\n#!/bin/bash\necho "Hola, $1"\nEOF`,
      "chmod +x /usr/local/bin/saluda.sh",
      "/usr/local/bin/saluda.sh Mundo"
    ],
    validation: "El script debe ejecutarse y mostrar 'Hola, Mundo'. Debe tener permisos de ejecución.",
    commonErrors: [
      "Olvidar el shebang #!/bin/bash; el script se ejecuta con la shell actual.",
      "No dar permisos de ejecución con chmod +x.",
      "Usar $0 en lugar de $1; $0 es el nombre del script."
    ]
  },
  {
    id: 20,
    title: "Configurar acceso SSH por clave pública",
    category: "SSH",
    difficulty: "medio",
    context: "El usuario 'developer' debe poder acceder al servidor via SSH sin contraseña usando clave pública.",
    objective: "Generar clave SSH, copiarla al servidor, verificar permisos y probar acceso.",
    steps: [
      "Generar clave (como developer): ssh-keygen -t rsa -b 4096",
      "Copiar al servidor: ssh-copy-id developer@server",
      "Verificar permisos en servidor: ~/.ssh debe ser 700, authorized_keys debe ser 600",
      "Probar: ssh developer@server (sin pedir contraseña)",
      "Deshabilitar password auth en /etc/ssh/sshd_config si se requiere"
    ],
    recommendedCommands: [
      "ssh-keygen -t rsa -b 4096",
      "ssh-copy-id developer@server",
      "chmod 700 ~/.ssh",
      "chmod 600 ~/.ssh/authorized_keys",
      "ssh developer@server"
    ],
    validation: "ssh developer@server debe conectar sin pedir contraseña. La clave pública debe estar en authorized_keys.",
    commonErrors: [
      "Permisos incorrectos en ~/.ssh (debe ser 700) o authorized_keys (debe ser 600).",
      "No copiar la clave pública (.pub) sino la privada.",
      "Olvidar reiniciar sshd tras cambiar sshd_config."
    ]
  }
];
