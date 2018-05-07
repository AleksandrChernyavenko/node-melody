# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"
Vagrant.require_version ">= 1.8.1"

# OPTIONS
require 'yaml'
options = YAML.load_file File.join(File.dirname(__FILE__), 'vagrant.yaml')

#detect environment variables
host_os = RbConfig::CONFIG['host_os']
vagrant_command = ARGV[0]

if vagrant_command == "up"
  # check and install required Vagrant plugins
  required_plugins = %w( vagrant-vbguest vagrant-cachier vagrant-hostsupdater )
  required_plugins.each do |plugin|
    if Vagrant.has_plugin? plugin
       system "echo OK: #{plugin} already installed."
    else
      system "echo Required plugin isn't installed: #{plugin} ..."
      system "vagrant plugin install #{plugin}"
    end
  end

  # install nfs-kernel-server in Linux to support synced_folder via nfs
  if host_os =~ /linux/
    # system "sudo apt-get install nfs-kernel-server nfs-common rpcbind"
  end
end

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.boot_timeout = options['vm']['boot_timeout']
  config.vm.box = options['vm']['box']

  if options['vm']['box_url'] && options['vm']['box_url'].strip.empty? == false
    config.vm.box_url = options['vm']['box_url']
  end

  config.vm.box_check_update = options['vm']['check_update']
  config.vm.network "private_network", ip: options['network']['private_ip']

  if options['network']['http_port'] && options['network']['http_port'].strip.empty? == false
    config.vm.network "forwarded_port", guest: 80, host: options['network']['http_port'], auto_correct: true
  end

  if (options['host']['aliases'] && options['host']['aliases'].empty? == false)
    config.vm.post_up_message = "Your machine is up and running \n\r Navigate to http://#{options['host']['aliases'] * ', http://'}"
  end

  # share synced_folder via nfs for Mac nd Linux
  if host_os =~ /linux/ or host_os =~ /darwin/
    config.vm.synced_folder options['sync']['synced_folder'], options['sync']['vagrant_folder'], type: "nfs", version: 3, nfs_udp: 1

    if (options['sync']['second_synced_folder'] &&
      options['sync']['second_vagrant_folder'] &&
      options['sync']['second_synced_folder'].strip.empty? == false &&
      options['sync']['second_vagrant_folder'].strip.empty? == false)
      config.vm.synced_folder options['sync']['second_synced_folder'], options['sync']['second_vagrant_folder'], type: "nfs", version: 3, nfs_udp: 1
    end
  else
    config.vm.synced_folder options['sync']['synced_folder'], options['sync']['vagrant_folder'] #, owner: "www-data", group: "www-data"

    if (options['sync']['second_synced_folder'] &&
      options['sync']['second_vagrant_folder'] &&
      options['sync']['second_synced_folder'].strip.empty? == false &&
      options['sync']['second_vagrant_folder'].strip.empty? == false)
      config.vm.synced_folder options['sync']['second_synced_folder'], options['sync']['second_vagrant_folder'] #, owner: "www-data", group: "www-data"
    end
  end

  # PLUGINS
  # Set entries in hosts file
  # https://github.com/cogitatio/vagrant-hostsupdater
  config.vm.hostname = options['host']['name']
  config.hostsupdater.remove_on_suspend = true
  if (options['host']['aliases'] && options['host']['aliases'].empty? == false)
    config.hostsupdater.aliases = options['host']['aliases']
  end

  memory = options['vm']['memory']
  cpus = options['vm']['cpus']
  # auto - Use all CPU cores and 1/4 system memory
  if options['vm']['memory'] == 'auto'
    # Give VM 1/4 system memory
    if host_os =~ /darwin/
      # sysctl returns Bytes and we need to convert to MB
      memory = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4
    elsif host_os =~ /linux/
      # meminfo shows KB and we need to convert to MB
      memory = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4
    else # sorry Windows folks, I can't help you
      memory = 2048
    end
  end
  if options['vm']['cpus'] == 'auto'
    # Give VM access to all cpu cores on the host
    if host_os =~ /darwin/
      cpus = `sysctl -n hw.ncpu`.to_i
    elsif host_os =~ /linux/
      cpus = `nproc`.to_i
    else # sorry Windows folks, I can't help you
      cpus = 2
    end
  end

  # Configure some Virtual Box params
  config.vm.provider "virtualbox" do |vb|
    vb.name = options['vm']['name']
    vb.cpus = cpus
    vb.memory = memory
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", options['vm']['cpuexecutioncap']]
  end

  if Vagrant.has_plugin?("vagrant-cachier")
    # Configure cached packages to be shared between instances of the same base box.
    # More info on http://fgrehm.viewdocs.io/vagrant-cachier/usage
    config.cache.scope = :box

    # OPTIONAL: If you are using VirtualBox, you might want to use that to enable
    # NFS for shared folders. This is also very useful for vagrant-libvirt if you
    # want bi-directional sync
    config.cache.synced_folder_opts = {
      type: :nfs,
      # The nolock option can be useful for an NFSv3 client that wants to avoid the
      # NLM sideband protocol. Without this option, apt-get might hang if it tries
      # to lock files needed for /var/cache/* operations. All of this can be avoided
      # by using NFSv4 everywhere. Please note that the tcp option is not the default.
      mount_options: ['rw', 'vers=3', 'tcp', 'nolock']
    }
    # For more information please check http://docs.vagrantup.com/v2/synced-folders/basic_usage.html
  end

  # PROVISIONING
  # Ansible
  # To use Ansible provisioning you should have Ansible installed on your host machine
  # see here http://docs.ansible.com/intro_installation.html#installing-the-control-machine
  config.vm.provision "ansible" do |ansible|
    ansible.limit = "all"
    ansible.playbook = options['ansible']['playbook']
    ansible.inventory_path = options['ansible']['inventory_path']
    # set to 'vvvv' for debug output in case of problems or leave it false
    ansible.verbose = 'vvvv'
    ansible.host_key_checking = false
  end
end
