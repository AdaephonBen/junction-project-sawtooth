FROM hyperledger/sawtooth-validator:chime
RUN ["sawtooth", "keygen", "my_key"]
RUN echo 5ab895a5be553938906cedb64642b45c9f4c482a2bac11009d3d94eb0a32d06c >> /etc/sawtooth/keys/validator.priv
RUN echo 02fcf74b402c378962197815f8b842627beff9581ac6d84f5f805b2cd7b45cc7da >> /etc/sawtooth/keys/validator.pub
RUN ["echo", "VALIDATOR PUBLIC KEY:"]
RUN ["cat", "/etc/sawtooth/keys/validator.pub"]
RUN ["apt", "update"]
RUN ["apt", "install", "-y", "curl"]
WORKDIR /tmp
RUN ["sawset", "genesis", "--key", "/root/.sawtooth/keys/my_key.priv", "-o", "config-genesis.batch"]
RUN echo $(cat /etc/sawtooth/keys/validator.pub)
RUN sawset proposal create --key /root/.sawtooth/keys/my_key.priv -o config-consensus.batch sawtooth.consensus.algorithm.name=pbft sawtooth.consensus.algorithm.version=1.0 sawtooth.consensus.pbft.members='["02fcf74b402c378962197815f8b842627beff9581ac6d84f5f805b2cd7b45cc7da","03f190353addc9270989a3510c0f1a8dfd93f03f91ff075f88d6841d3ad89e9c4e","02325300c0e9ec621aecdc3d7747a68bc482b5c7a916a7cbbd046b411d629f639f","030815cd3adaa5437457e2a956ebf922572bb4b0841789a14f9ac8968f17afaf88"]'
RUN ["sawadm", "genesis", "config-genesis.batch", "config-consensus.batch"]
CMD ["sh", "-c", "sawtooth-validator -vv --endpoint tcp://$MY_IP:8800 --bind component:tcp://eth0:4004 --bind consensus:tcp://eth0:5050 --bind network:tcp://eth0:8800 --scheduler parallel --peering static --maximum-peer-connectivity 10000 --peers tcp://$OTHER_IP_1:8800 --peers tcp://$OTHER_IP_2:8800 --peers tcp://$OTHER_IP_3:8800"]
