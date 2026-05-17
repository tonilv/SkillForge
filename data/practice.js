// ============================================================
// data/practice.js
// ============================================================
// Comandos para práctica en vivo con terminal animado y man pages.
// Sustituye los DEMO por comandos reales del examen RHCSA EX200.
// ============================================================

const practiceCommands = [
  {
    id: 1, category: "Servicios", title: "systemctl - Gestionar servicios",
    command: "systemctl enable --now httpd", prompt: "[root@server ~]#",
    description: "Habilita el servicio httpd para que inicie en el boot y lo arranca inmediatamente.",
    usage: "systemctl [OPTIONS...] {COMMAND} [NAME...]",
    examples: ["systemctl start httpd","systemctl stop httpd","systemctl restart httpd","systemctl status httpd","systemctl enable httpd","systemctl disable httpd","systemctl list-units --type=service","systemctl mask httpd","systemctl unmask httpd"],
    simulatedOutput: `● httpd.service - The Apache HTTP Server\n   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)\n   Active: active (running) since Mon 2024-01-15 09:23:14 EST; 2s ago\n Main PID: 4521 (httpd)\n   Status: "Started, listening on: port 80"\n    Tasks: 213 (limit: 11120)\n   Memory: 24.5M\n   CGroup: /system.slice/httpd.service\n           ├─4521 /usr/sbin/httpd -DFOREGROUND\n           ├─4522 /usr/sbin/httpd -DFOREGROUND\n           └─4523 /usr/sbin/httpd -DFOREGROUND`,
    manPage: `SYSTEMCTL(1)                    systemctl                    SYSTEMCTL(1)\n\nNAME\n       systemctl - Control the systemd system and service manager\n\nSYNOPSIS\n       systemctl [OPTIONS...] COMMAND [NAME...]\n\nDESCRIPTION\n       systemctl may be used to introspect and control the state of the\n       systemd system and service manager.\n\n       --now\n           Also start or stop the unit after enabling or disabling it.\n\n       enable UNIT...\n           Enable one or more units. This creates symlinks in\n           /etc/systemd/system/.\n\n       disable UNIT...\n           Disable one or more units. Removes symlinks.\n\n       start UNIT...\n           Start (activate) one or more units.\n\n       stop UNIT...\n           Stop (deactivate) one or more units.\n\n       status UNIT...\n           Show runtime status of one or more units.\n\nEXAMPLES\n       systemctl enable --now httpd\n           Enable httpd and start it immediately.\n\n       systemctl restart sshd\n           Restart the sshd service.\n\nSEE ALSO\n       systemd(1), service(8), chkconfig(8)`
  },
  {
    id: 2, category: "Red", title: "nmcli - Configurar conexiones de red",
    command: "nmcli con add type ethernet con-name eth1 ifname eth1 ip4 192.168.1.50/24 gw4 192.168.1.1",
    prompt: "[root@server ~]#",
    description: "Crea una conexión ethernet estática con IP, máscara y gateway.",
    usage: "nmcli [OPTIONS] OBJECT { COMMAND | help }",
    examples: ["nmcli con show --active","nmcli con modify 'Wired connection 1' ipv4.addresses 10.0.0.5/24","nmcli con modify eth1 ipv4.method manual","nmcli con modify eth1 ipv4.dns '8.8.8.8,1.1.1.1'","nmcli con up eth1","nmcli dev status","nmcli con reload"],
    simulatedOutput: `Connection 'eth1' (a1b2c3d4-e5f6-7890-abcd-ef1234567890) successfully added.`,
    manPage: `NMCLI(1)                        NetworkManager                        NMCLI(1)\n\nNAME\n       nmcli - command-line tool for controlling NetworkManager\n\nSYNOPSIS\n       nmcli [OPTIONS...] {general | networking | radio | connection |\n              device | agent | monitor} [COMMAND] [ARGUMENTS...]\n\nDESCRIPTION\n       nmcli is a command-line tool for controlling NetworkManager and\n       reporting network status.\n\n       con add\n           Add a new connection profile.\n\n       con modify ID [SETTING.PROPERTY VALUE]...\n           Modify properties of a connection profile.\n\n       con up ID\n           Activate a connection profile.\n\n       con show --active\n           Show active connection profiles.\n\nEXAMPLES\n       nmcli con add type ethernet con-name eth1 ifname eth1 ip4 192.168.1.50/24 gw4 192.168.1.1\n           Create a static ethernet connection.\n\n       nmcli con modify eth1 ipv4.dns '8.8.8.8'\n           Set DNS servers for the connection.\n\nSEE ALSO\n       NetworkManager(8), nmcli-examples(7), ip(8)`
  },
  {
    id: 3, category: "Almacenamiento", title: "LVM - Crear volumen lógico completo",
    command: "lvcreate -L 2G -n lv_docs vg_datos", prompt: "[root@server ~]#",
    description: "Crea un volumen lógico de 2 GB llamado lv_docs dentro del grupo vg_datos.",
    usage: "lvcreate [OPTIONS] VG_NAME",
    examples: ["pvcreate /dev/sdb1","vgcreate vg_datos /dev/sdb1","lvcreate -L 5G -n lv_web vg_datos","lvcreate -l 100%FREE -n lv_all vg_datos","lvextend -L +2G /dev/vg_datos/lv_docs","xfs_growfs /mnt/docs","lvs","vgs","pvs"],
    simulatedOutput: `Logical volume "lv_docs" created.`,
    manPage: `LVCREATE(8)                    LVM2 Manual                    LVCREATE(8)\n\nNAME\n       lvcreate - create a logical volume in an existing volume group\n\nSYNOPSIS\n       lvcreate [OPTIONS] VG_NAME\n\nDESCRIPTION\n       lvcreate creates a new logical volume in a volume group.\n\n       -L, --size Size[m|UNIT]\n           Gives the size to allocate for the new logical volume.\n\n       -l, --extents Number[PERCENT]\n           Gives the number of logical extents to allocate.\n\n       -n, --name String\n           The name for the new logical volume.\n\n       -l 100%FREE\n           Use all remaining free space in the volume group.\n\nEXAMPLES\n       lvcreate -L 2G -n lv_docs vg_datos\n           Create a 2GB logical volume named lv_docs.\n\n       lvcreate -l 100%FREE -n lv_all vg_datos\n           Use all remaining space.\n\nSEE ALSO\n       pvcreate(8), vgcreate(8), lvextend(8), xfs_growfs(8)`
  },
  {
    id: 4, category: "SELinux", title: "semanage + restorecon - Contexto persistente",
    command: "semanage fcontext -a -t httpd_sys_content_t '/webcontent(/.*)?'", prompt: "[root@server ~]#",
    description: "Añade una regla de contexto SELinux persistente para un directorio web personalizado.",
    usage: "semanage fcontext [OPTIONS] [-F file] file_spec",
    examples: ["semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'","semanage fcontext -m -t public_content_t '/shared(/.*)?'","restorecon -Rv /webcontent","ls -Zd /webcontent","getenforce","setenforce 1","setsebool -P httpd_enable_homedirs on"],
    simulatedOutput: `Relabeled /webcontent from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0`,
    manPage: `SEMANAGE-FCONTEXT(8)           SELinux Policy           SEMANAGE-FCONTEXT(8)\n\nNAME\n       semanage-fcontext - SELinux Policy Management file context tool\n\nSYNOPSIS\n       semanage fcontext [OPTIONS] [-F file] file_spec\n\nDESCRIPTION\n       semanage is used to configure certain elements of SELinux policy\n       without requiring modification to or recompilation from policy\n       sources.\n\n       -a, --add\n           Add a record of the specified object type.\n\n       -m, --modify\n           Modify a record of the specified object type.\n\n       -t, --type TYPE\n           SELinux type.\n\n       -d, --delete\n           Delete a record.\n\nEXAMPLES\n       semanage fcontext -a -t httpd_sys_content_t '/web(/.*)?'\n           Add persistent context for web directory.\n\n       restorecon -Rv /web\n           Apply the context recursively.\n\nSEE ALSO\n       restorecon(8), chcon(1), setsebool(8), getenforce(8)`
  },
  {
    id: 5, category: "Firewall", title: "firewall-cmd - Gestionar reglas de firewalld",
    command: "firewall-cmd --permanent --add-port=8080/tcp", prompt: "[root@server ~]#",
    description: "Abre el puerto 8080/tcp de forma permanente en firewalld.",
    usage: "firewall-cmd [OPTIONS...]",
    examples: ["firewall-cmd --get-active-zones","firewall-cmd --list-all","firewall-cmd --permanent --add-service=http","firewall-cmd --permanent --add-port=8080/tcp","firewall-cmd --reload","firewall-cmd --remove-service=ftp","firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=192.168.1.0/24 accept'"],
    simulatedOutput: `success`,
    manPage: `FIREWALL-CMD(1)                    firewalld                    FIREWALL-CMD(1)\n\nNAME\n       firewall-cmd - firewalld command line client\n\nSYNOPSIS\n       firewall-cmd [OPTIONS...]\n\nDESCRIPTION\n       firewall-cmd is the command line client of the firewalld daemon.\n\n       --permanent\n           Make the change permanent. Changes are applied after reload.\n\n       --add-service=service\n           Add a service to the default zone permanently or temporarily.\n\n       --add-port=portid[-portid]/protocol\n           Add a port to the default zone.\n\n       --reload\n           Reload firewalld and apply permanent changes.\n\n       --list-all\n           List everything added for the default zone.\n\nEXAMPLES\n       firewall-cmd --permanent --add-port=8080/tcp\n           Open port 8080/tcp permanently.\n\n       firewall-cmd --reload\n           Apply permanent changes.\n\nSEE ALSO\n       firewalld(1), firewall-cmd(1), firewall-config(1)`
  },
  {
    id: 6, category: "Usuarios", title: "useradd + usermod - Crear y modificar usuarios",
    command: "useradd -m -G wheel -c 'John Doe' johndoe", prompt: "[root@server ~]#",
    description: "Crea el usuario johndoe con directorio home, lo añade al grupo wheel y establece el nombre completo.",
    usage: "useradd [OPTIONS] LOGIN",
    examples: ["useradd -m -s /bin/bash alice","usermod -aG wheel alice","usermod -L alice","usermod -U alice","passwd alice","chage -M 90 alice","id alice","groups alice"],
    simulatedOutput: `[root@server ~]# id johndoe\nuid=1001(johndoe) gid=1001(johndoe) groups=1001(johndoe),10(wheel)`,
    manPage: `USERADD(8)                    System Management                    USERADD(8)\n\nNAME\n       useradd - create a new user or update default new user information\n\nSYNOPSIS\n       useradd [OPTIONS] LOGIN\n\nDESCRIPTION\n       useradd creates a new user account using the values specified on\n       the command line plus the default values from the system.\n\n       -m, --create-home\n           Create the user's home directory if it does not exist.\n\n       -G, --groups GROUP1[,GROUP2,...]\n           A list of supplementary groups which the user is also a member of.\n\n       -c, --comment COMMENT\n           Any text string, usually the user's full name.\n\n       -s, --shell SHELL\n           The name of the user's login shell.\n\n       -u, --uid UID\n           The numerical value of the user's ID.\n\nEXAMPLES\n       useradd -m -G wheel -c 'John Doe' johndoe\n           Create user with home, wheel group and full name.\n\nSEE ALSO\n       usermod(8), userdel(8), passwd(1), groupadd(8)`
  },
  {
    id: 7, category: "Permisos", title: "chmod + chown - Gestionar permisos y propiedad",
    command: "chmod 2775 /shared && chown :developers /shared", prompt: "[root@server ~]#",
    description: "Establece permisos SGID (2) + rwxrwxr-x en /shared y cambia el grupo propietario a developers.",
    usage: "chmod [OPTION]... MODE[,MODE]... FILE...",
    examples: ["chmod 755 script.sh","chmod u+x file","chmod g+s directory","chmod o+t directory","chown user:group file","chown -R user:group /directory","chmod 600 /etc/ssh/ssh_host_rsa_key","umask 0027"],
    simulatedOutput: `[root@server ~]# ls -ld /shared\ndrwxrwsr-x. 2 root developers 4096 Jan 15 10:00 /shared`,
    manPage: `CHMOD(1)                       User Commands                       CHMOD(1)\n\nNAME\n       chmod - change file mode bits\n\nSYNOPSIS\n       chmod [OPTION]... MODE[,MODE]... FILE...\n       chmod [OPTION]... OCTAL-MODE FILE...\n\nDESCRIPTION\n       chmod changes the file mode bits of each given file.\n\n       The format of a symbolic mode is [ugoa...][[+-=][perms...]...].\n\n       OCTAL-MODE:\n         4 = read (r)\n         2 = write (w)\n         1 = execute (x)\n\n       Special bits:\n         4 = SUID\n         2 = SGID\n         1 = sticky bit\n\nEXAMPLES\n       chmod 2775 /shared\n           SGID bit + rwxrwxr-x.\n\n       chmod 1777 /tmp\n           Sticky bit + rwxrwxrwx.\n\nSEE ALSO\n       chown(1), chgrp(1), umask(2), ls(1)`
  },
  {
    id: 8, category: "Recuperación", title: "rd.break - Recuperar contraseña de root",
    command: "mount -o remount,rw /sysroot", prompt: "switch_root:/#",
    description: "En modo rd.break, remonta /sysroot en lectura/escritura para poder cambiar la contraseña de root.",
    usage: "mount [OPTION] DEVICE DIRECTORY",
    examples: ["mount -o remount,rw /sysroot","chroot /sysroot","passwd root","touch /.autorelabel","exit","exit"],
    simulatedOutput: `switch_root:/# chroot /sysroot\nsh-5.1# passwd root\nChanging password for user root.\nNew password: ********\nRetype new password: ********\npasswd: all authentication tokens updated successfully.\nsh-5.1# touch /.autorelabel\nsh-5.1# exit\nswitch_root:/# exit`,
    manPage: `RD.BREAK(7)                    Kernel Boot                    RD.BREAK(7)\n\nNAME\n       rd.break - interrupt early userspace boot\n\nDESCRIPTION\n       rd.break is a kernel boot parameter that stops the initramfs boot\n       process before switching to the real root filesystem.\n\n       This allows system recovery operations such as resetting the root\n       password.\n\nRECOVERY PROCEDURE\n       1. Reboot and edit the GRUB entry (press 'e').\n       2. Append rd.break to the linux line.\n       3. Press Ctrl+X to boot.\n       4. Remount /sysroot read-write:\n          mount -o remount,rw /sysroot\n       5. Enter chroot:\n          chroot /sysroot\n       6. Change root password:\n          passwd root\n       7. Force SELinux relabel:\n          touch /.autorelabel\n       8. Exit twice to continue boot.\n\nSEE ALSO\n       grub2(8), passwd(1), chroot(1), mount(8)`
  },
  {
    id: 9, category: "Tareas programadas", title: "crontab - Programar tareas recurrentes",
    command: "crontab -e", prompt: "[root@server ~]#",
    description: "Edita la tabla de tareas cron del usuario actual para programar scripts.",
    usage: "crontab [OPTIONS] [FILE]",
    examples: ["crontab -e","crontab -l","crontab -r","echo '0 2 * * * /usr/local/bin/backup.sh' | crontab -","cat /etc/cron.d/custom","systemctl status crond"],
    simulatedOutput: `[root@server ~]# crontab -l\n0 2 * * * /usr/local/bin/backup.sh\n*/15 * * * * /usr/local/bin/monitor.sh`,
    manPage: `CRONTAB(1)                     User Commands                     CRONTAB(1)\n\nNAME\n       crontab - maintain crontab files for individual users\n\nSYNOPSIS\n       crontab [OPTIONS] [FILE]\n\nDESCRIPTION\n       crontab is the program used to install, deinstall or list the\n       tables used to drive the cron daemon.\n\n       -e     Edit the current crontab.\n       -l     List the current crontab.\n       -r     Remove the current crontab.\n\n       Format: minute hour day month weekday command\n\n       *      Any value\n       */n    Every n units\n       n      Exact value\n\nEXAMPLES\n       0 2 * * * /usr/local/bin/backup.sh\n           Run backup.sh every day at 2:00 AM.\n\n       */15 * * * * /usr/local/bin/monitor.sh\n           Run every 15 minutes.\n\nSEE ALSO\n       cron(8), crond(8), at(1)`
  },
  {
    id: 10, category: "Procesos", title: "ps + kill - Gestionar procesos",
    command: "ps aux | grep httpd", prompt: "[root@server ~]#",
    description: "Lista todos los procesos y filtra los relacionados con httpd.",
    usage: "ps [OPTIONS]",
    examples: ["ps aux","ps -ef","ps -o pid,ppid,cmd -u apache","top","kill 1234","kill -9 1234","killall httpd","pkill -f httpd","systemctl status httpd"],
    simulatedOutput: `root      4521  0.0  0.5  21524  5420 ?        Ss   09:23   0:00 /usr/sbin/httpd -DFOREGROUND\napache    4522  0.0  0.3  21524  3120 ?        S    09:23   0:00 /usr/sbin/httpd -DFOREGROUND\napache    4523  0.0  0.3  21524  3120 ?        S    09:23   0:00 /usr/sbin/httpd -DFOREGROUND`,
    manPage: `PS(1)                          User Commands                          PS(1)\n\nNAME\n       ps - report a snapshot of the current processes\n\nSYNOPSIS\n       ps [OPTIONS]\n\nDESCRIPTION\n       ps displays information about a selection of the active processes.\n\n       a      Lift the BSD-style "only yourself" restriction.\n       u      Display user-oriented format.\n       x      Lift the BSD-style "must have a tty" restriction.\n       e      Show the environment after the command.\n       f      ASCII art process hierarchy (forest).\n\n       aux    Show all processes for all users in user-oriented format.\n       -ef    Show every process in full format.\n\nEXAMPLES\n       ps aux | grep httpd\n           Find httpd processes.\n\n       kill -9 PID\n           Forcefully terminate a process.\n\nSEE ALSO\n       top(1), kill(1), pgrep(1), pkill(1), systemctl(1)`
  },
  {
    id: 11, category: "Logs", title: "journalctl - Consultar logs de systemd",
    command: "journalctl -u httpd --since '1 hour ago'", prompt: "[root@server ~]#",
    description: "Muestra los logs del servicio httpd de la última hora.",
    usage: "journalctl [OPTIONS...] [MATCHES...]",
    examples: ["journalctl","journalctl -xe","journalctl -u sshd","journalctl --since '2024-01-15 08:00' --until '2024-01-15 12:00'","journalctl -k","journalctl --disk-usage","journalctl --vacuum-time=7d"],
    simulatedOutput: `Jan 15 09:23:14 server httpd[4521]: AH00558: httpd: Could not reliably determine the server's fully qualified domain name\nJan 15 09:23:14 server httpd[4521]: Server configured, listening on: port 80`,
    manPage: `JOURNALCTL(1)                    journalctl                    JOURNALCTL(1)\n\nNAME\n       journalctl - Query the systemd journal\n\nSYNOPSIS\n       journalctl [OPTIONS...] [MATCHES...]\n\nDESCRIPTION\n       journalctl may be used to query the contents of the systemd(1)\n       journal.\n\n       -u, --unit=UNIT\n           Show logs for the specified systemd unit.\n\n       -xe\n           Show the most recent journal entries and explain errors.\n\n       --since, --until\n           Show entries newer or older than the specified time.\n\n       -k\n           Show only kernel messages.\n\nEXAMPLES\n       journalctl -u httpd --since '1 hour ago'\n           Show httpd logs from the last hour.\n\n       journalctl --vacuum-time=7d\n           Remove journal entries older than 7 days.\n\nSEE ALSO\n       systemd-journald(8), systemctl(1), dmesg(1)`
  },
  {
    id: 12, category: "SSH", title: "ssh-keygen + ssh-copy-id - Claves SSH",
    command: "ssh-keygen -t rsa -b 4096 -C 'admin@server'", prompt: "[student@server ~]$",
    description: "Genera un par de claves RSA de 4096 bits para autenticación sin contraseña.",
    usage: "ssh-keygen [OPTIONS]",
    examples: ["ssh-keygen -t ed25519","ssh-keygen -t rsa -b 4096","ssh-copy-id user@remote","ssh -i ~/.ssh/id_rsa user@remote","cat ~/.ssh/id_rsa.pub","chmod 600 ~/.ssh/id_rsa","chmod 700 ~/.ssh"],
    simulatedOutput: `Generating public/private rsa key pair.\nEnter file in which to save the key (/home/student/.ssh/id_rsa):\nCreated directory '/home/student/.ssh'.\nEnter passphrase (empty for no passphrase):\nYour identification has been saved in /home/student/.ssh/id_rsa\nYour public key has been saved in /home/student/.ssh/id_rsa.pub\nThe key fingerprint is:\nSHA256:abc123... admin@server`,
    manPage: `SSH-KEYGEN(1)                  OpenSSH tools                  SSH-KEYGEN(1)\n\nNAME\n       ssh-keygen - authentication key generation, management and conversion\n\nSYNOPSIS\n       ssh-keygen [OPTIONS]\n\nDESCRIPTION\n       ssh-keygen generates, manages and converts authentication keys for\n       ssh(1).\n\n       -t type\n           Specifies the type of key to create (rsa, dsa, ecdsa, ed25519).\n\n       -b bits\n           Specifies the number of bits in the key.\n\n       -C comment\n           Provides a comment for the key.\n\n       -f filename\n           Specifies the filename of the key file.\n\nEXAMPLES\n       ssh-keygen -t rsa -b 4096 -C 'admin@server'\n           Generate a 4096-bit RSA key.\n\n       ssh-copy-id user@remote\n           Copy public key to remote server.\n\nSEE ALSO\n       ssh(1), ssh-copy-id(1), sshd(8), authorized_keys(5)`
  }
];
