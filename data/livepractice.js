// ============================================================
// data/livepractice.js
// ============================================================
// Tareas de práctica en vivo (laboratorio guiado) para RHCSA EX200.
// El usuario escribe comandos en un input y pulsa "Comprobar".
// Sustituye los DEMO por tareas reales del examen.
// ============================================================

const livePracticeTasks = [
  {
    id: 1,
    title: "Crear un usuario",
    category: "Usuarios y grupos",
    task: "Crea el usuario 'ana' con directorio home y shell /bin/bash.",
    hints: [
      "Usa useradd con -m para crear el directorio home.",
      "La opción -s establece la shell del usuario.",
      "Ejemplo: useradd -m -s /bin/bash nombre"
    ],
    validCommands: [
      "useradd -m -s /bin/bash ana",
      "useradd -ms /bin/bash ana"
    ],
    solution: "useradd -m -s /bin/bash ana"
  },
  {
    id: 2,
    title: "Añadir usuario a grupo wheel",
    category: "Usuarios y grupos",
    task: "Añade el usuario 'ana' al grupo wheel como grupo secundario.",
    hints: [
      "Usa usermod para modificar un usuario existente.",
      "La opción -G establece grupos secundarios.",
      "¡Importante! Usa -a (append) para no borrar otros grupos."
    ],
    validCommands: [
      "usermod -aG wheel ana",
      "usermod --append --groups wheel ana"
    ],
    solution: "usermod -aG wheel ana"
  },
  {
    id: 3,
    title: "Crear un directorio",
    category: "Permisos",
    task: "Crea el directorio /datos.",
    hints: [
      "Usa mkdir para crear directorios.",
      "Necesitas permisos de root o sudo."
    ],
    validCommands: [
      "mkdir /datos",
      "mkdir -p /datos"
    ],
    solution: "mkdir /datos"
  },
  {
    id: 4,
    title: "Dar permisos 770",
    category: "Permisos",
    task: "Establece permisos 770 en el directorio /datos.",
    hints: [
      "chmod cambia permisos.",
      "7 = rwx, 6 = rw-, 5 = r-x, 4 = r--",
      "770 significa: rwx para propietario, rwx para grupo, --- para otros."
    ],
    validCommands: [
      "chmod 770 /datos",
      "chmod u=rwx,g=rwx,o= /datos"
    ],
    solution: "chmod 770 /datos"
  },
  {
    id: 5,
    title: "Cambiar propietario de /datos",
    category: "Permisos",
    task: "Cambia el propietario de /datos al usuario 'ana' y al grupo 'dev'.",
    hints: [
      "Usa chown para cambiar propietario y grupo.",
      "Sintaxis: chown usuario:grupo ruta",
      "Solo root puede cambiar propietarios."
    ],
    validCommands: [
      "chown ana:dev /datos",
      "chown ana /datos && chgrp dev /datos"
    ],
    solution: "chown ana:dev /datos"
  },
  {
    id: 6,
    title: "Instalar httpd",
    category: "Software",
    task: "Instala el paquete httpd (Apache) sin pedir confirmación.",
    hints: [
      "Usa dnf install.",
      "La opción -y responde automáticamente 'yes'.",
      "Necesitas permisos de root."
    ],
    validCommands: [
      "dnf install -y httpd",
      "dnf -y install httpd",
      "dnf install httpd -y"
    ],
    solution: "dnf install -y httpd"
  },
  {
    id: 7,
    title: "Activar httpd al arranque",
    category: "Systemd",
    task: "Habilita el servicio httpd para que arranque automáticamente y inícialo ahora.",
    hints: [
      "Usa systemctl.",
      "enable habilita el arranque automático.",
      "--now también lo inicia inmediatamente."
    ],
    validCommands: [
      "systemctl enable --now httpd",
      "systemctl enable httpd && systemctl start httpd"
    ],
    solution: "systemctl enable --now httpd"
  },
  {
    id: 8,
    title: "Abrir http en firewalld",
    category: "Firewalld",
    task: "Abre permanentemente el servicio http en firewalld y recarga.",
    hints: [
      "Usa firewall-cmd.",
      "--permanent hace que la regla sea persistente.",
      "Después usa --reload para aplicar."
    ],
    validCommands: [
      "firewall-cmd --permanent --add-service=http && firewall-cmd --reload",
      "firewall-cmd --permanent --add-service=http; firewall-cmd --reload"
    ],
    solution: "firewall-cmd --permanent --add-service=http && firewall-cmd --reload"
  },
  {
    id: 9,
    title: "Crear un volumen lógico",
    category: "LVM",
    task: "Crea un volumen lógico de 3 GB llamado 'lv_web' en el grupo 'vg_datos'.",
    hints: [
      "Usa lvcreate.",
      "-L establece el tamaño (ej. 3G).",
      "-n establece el nombre."
    ],
    validCommands: [
      "lvcreate -L 3G -n lv_web vg_datos",
      "lvcreate --size 3G --name lv_web vg_datos"
    ],
    solution: "lvcreate -L 3G -n lv_web vg_datos"
  },
  {
    id: 10,
    title: "Formatear volumen en XFS",
    category: "Almacenamiento",
    task: "Formatea el volumen lógico /dev/vg_datos/lv_web con filesystem XFS.",
    hints: [
      "Usa mkfs.xfs.",
      "Asegúrate de usar la ruta completa del dispositivo.",
      "¡Cuidado! Esto borra cualquier dato existente."
    ],
    validCommands: [
      "mkfs.xfs /dev/vg_datos/lv_web",
      "mkfs -t xfs /dev/vg_datos/lv_web"
    ],
    solution: "mkfs.xfs /dev/vg_datos/lv_web"
  },
  {
    id: 11,
    title: "Montar por UUID en fstab",
    category: "Montajes",
    task: "Añade una entrada en /etc/fstab para montar automáticamente /dev/sdb1 (UUID=abc123) en /mnt/backup con XFS.",
    hints: [
      "Usa echo para añadir la línea al archivo.",
      "El formato es: UUID=xxx punto_montaje tipo opciones dump pass.",
      "Usa >> para añadir al final sin sobrescribir."
    ],
    validCommands: [
      "echo 'UUID=abc123 /mnt/backup xfs defaults 0 0' >> /etc/fstab",
      "echo '/dev/sdb1 /mnt/backup xfs defaults 0 0' >> /etc/fstab"
    ],
    solution: "echo 'UUID=abc123 /mnt/backup xfs defaults 0 0' >> /etc/fstab"
  },
  {
    id: 12,
    title: "Configurar IP estática",
    category: "Redes",
    task: "Configura la conexión 'eth1' con IP 192.168.10.5/24, gateway 192.168.10.1 y método manual.",
    hints: [
      "Usa nmcli con modify.",
      "ipv4.addresses para la IP con prefijo.",
      "ipv4.gateway para la puerta de enlace.",
      "ipv4.method manual para desactivar DHCP."
    ],
    validCommands: [
      "nmcli con modify eth1 ipv4.addresses 192.168.10.5/24 ipv4.gateway 192.168.10.1 ipv4.method manual",
      "nmcli con modify eth1 ipv4.addresses 192.168.10.5/24 && nmcli con modify eth1 ipv4.gateway 192.168.10.1 && nmcli con modify eth1 ipv4.method manual"
    ],
    solution: "nmcli con modify eth1 ipv4.addresses 192.168.10.5/24 ipv4.gateway 192.168.10.1 ipv4.method manual"
  },
  {
    id: 13,
    title: "Cambiar hostname persistente",
    category: "Redes",
    task: "Cambia el hostname del sistema a 'server1.ejemplo.com' de forma persistente.",
    hints: [
      "Usa hostnamectl.",
      "set-hostname establece el nombre de forma persistente.",
      "También actualiza /etc/hosts si es necesario."
    ],
    validCommands: [
      "hostnamectl set-hostname server1.ejemplo.com",
      "hostnamectl set-hostname server1.ejemplo.com && echo '127.0.0.1 server1.ejemplo.com server1' >> /etc/hosts"
    ],
    solution: "hostnamectl set-hostname server1.ejemplo.com"
  },
  {
    id: 14,
    title: "Programar backup con cron",
    category: "Tareas programadas",
    task: "Programa una tarea cron para ejecutar /usr/local/bin/backup.sh todos los días a las 3:00 AM.",
    hints: [
      "Usa crontab -e para editar.",
      "Formato: minuto hora día mes semana comando.",
      "0 3 * * * ejecuta a las 3:00 AM diariamente."
    ],
    validCommands: [
      "echo '0 3 * * * /usr/local/bin/backup.sh' | crontab -",
      "crontab -e  # y añadir la línea manualmente"
    ],
    solution: "echo '0 3 * * * /usr/local/bin/backup.sh' | crontab -"
  },
  {
    id: 15,
    title: "Crear clave SSH",
    category: "SSH",
    task: "Genera un par de claves RSA de 4096 bits para el usuario actual.",
    hints: [
      "Usa ssh-keygen.",
      "-t rsa establece el tipo.",
      "-b 4096 establece los bits."
    ],
    validCommands: [
      "ssh-keygen -t rsa -b 4096",
      "ssh-keygen -t rsa -b 4096 -C 'usuario@servidor'"
    ],
    solution: "ssh-keygen -t rsa -b 4096"
  }
];
