FROM hyperledger/sawtooth-validator:chime
RUN ["sawtooth", "keygen", "my_key"]
RUN ["sawadm", "keygen"]
RUN ["echo", "VALIDATOR PUBLIC KEY:"]
RUN ["cat", "/etc/sawtooth/keys/validator.pub"]
CMD ["sh", "-c", "sawtooth-validator -vv --endpoint tcp://$MY_IP:8800 --bind component:tcp://eth0:4004 --bind consensus:tcp://eth0:5050 --bind network:tcp://eth0:8800 --scheduler parallel --peering static --maximum-peer-connectivity 10000 --peers tcp://$OTHER_IP_1:8800 --peers tcp://$OTHER_IP_2:8800 --peers tcp://$OTHER_IP_3:8800"]
