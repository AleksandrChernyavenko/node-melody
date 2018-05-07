PHP-ubuntu
=========

Install PHP 5.5/5.6/7.0/7.1 version.

Requirements
------------

Ubuntu trusty with the package python-pycurl and python-software-properties installed.

Role Variables
--------------

Available variables are listed below, along with default values (see [defaults/main.yml](defaults/main.yml) ):

    php_ppa: "ppa:ondrej/php"
    php_v: "7.0"
    php_packages: [
    #    "php{{ php_v }}", # for Apache
        "php{{ php_v }}-fpm", # for Nginx
        "php{{ php_v }}-dev",
        "php{{ php_v }}-cli",
        "php{{ php_v }}-pgsql",
        "php{{ php_v }}-mysql",
        "php{{ php_v }}-curl",
        "php{{ php_v }}-gd",
        "php{{ php_v }}-mcrypt",
        "php{{ php_v }}-mbstring",
        "php{{ php_v }}-intl"
    ]
    php_max_execution_time: '30'
    php_memory_limit: '128M'
    php_error_reporting: 'E_ALL & ~E_DEPRECATED & ~E_STRICT'
    php_display_errors: 'On' #'Off'
    php_post_max_size: '8M'
    php_file_uploads: 'On'
    php_upload_max_filesize: '2M'
    php_max_file_uploads: '20'
    php_ini_template_src: php.ini.j2 # Path of a Jinja2 formatted template on the local server. This can be a relative or absolute path.
    php_fpm_template_src: php-fpm.conf.j2 # Path of a Jinja2 formatted template on the local server. This can be a relative or absolute path.
    php_fpm_emergency_restart_threshold: '10'
    php_fpm_emergency_restart_interval: '1m'
    php_fpm_process_control_timeout: '30s'
    php_fpm_log_level: 'error'
    php_fpm_process_max: '128'

Dependencies
------------

None.

License
-------

MIT

Author Information
------------------

[MobiDev](http://mobidev.biz/).
