#!/bin/bash
usage()
{
cat << EOF

This script run deployment with ansible

OPTIONS:
   -h       Show this message
   -s       server to build
   -i       install all roles (default update only roles associated with the code)
   -l       list of available servers
   -f       force update (ignore lock file)
EOF
}

list()
{
cat << EOF

Available servers to deploy

SERVERS:
	- sandbox
	- production

EOF
}
#environment

while getopts "hilfs:" OPTION
do
     case $OPTION in
         h)
             usage
             exit 0
             ;;
         s)
             SERVER=$OPTARG
             ;;
         l)
	         list
             exit 0
             ;;
          i)
	         INSTALL_ALL=1
             ;;
         f)
	         FORCE_UPDATE=1
             ;;
         ?)
             usage
             exit
             ;;
     esac
done

if [ -z "$SERVER" ]; then
  echo "-s [option] is required"
  exit
fi

# Set only read for amazon key
sudo chmod 0600 amazon_key/dev.pem

if [ "$INSTALL_ALL" == 1 ]; then
    PLAYBOOK=$SERVER"_install_all.yml"
else
    PLAYBOOK=$SERVER.yml
fi


if [ "$FORCE_UPDATE" == 1 ]; then
	ansible-playbook -i $SERVER $PLAYBOOK -vvvv -T 120 -c ssh -e "pipelining=True host_key_checking=False force_update=true" --ask-sudo-pass
else
	ansible-playbook -i $SERVER $PLAYBOOK -vvvv -T 120 -c ssh -e "pipelining=True host_key_checking=False" --ask-sudo-pass
fi


